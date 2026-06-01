#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export CERTCONFIGMAP_VALUES=$HOF_CONFIG/imscertchain-store.yaml
export CERTCONFIGMAP_PROD_VALUES=$HOF_CONFIG/ims-ebsa-prod-ca-prod.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

configure_redis_persistence() {
  : "${REDIS_PERSISTENCE_ENABLED:=}"
  : "${REDIS_PERSISTENCE_ACCESS_MODES:=ReadWriteOnce}"
  : "${REDIS_PERSISTENCE_STORAGE_CLASS:=}"
  : "${REDIS_PERSISTENCE_EXISTING_CLAIM:=}"
  : "${REDIS_PERSISTENCE_SIZE:=}"

  REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED}" | tr '[:upper:]' '[:lower:]')

  if [[ "${KUBE_NAMESPACE}" == "${PROD_ENV}" ]]; then
    REDIS_PERSISTENCE_ENABLED="true"
    REDIS_PERSISTENCE_SIZE="10Gi"
  elif [[ "${KUBE_NAMESPACE}" == "${STG_ENV}" ]]; then
    REDIS_PERSISTENCE_ENABLED="true"
    REDIS_PERSISTENCE_SIZE="1Gi"
  else
    REDIS_PERSISTENCE_ENABLED="false"
  fi

  export REDIS_PERSISTENCE_ENABLED
  export REDIS_PERSISTENCE_ACCESS_MODES
  export REDIS_PERSISTENCE_STORAGE_CLASS
  export REDIS_PERSISTENCE_EXISTING_CLAIM
  export REDIS_PERSISTENCE_SIZE
}

deploy_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f kube/redis/redis-pvc.yml
  fi

  $kd -f kube/redis/redis-service.yml
  $kd -f kube/redis/redis-network-policy.yml
  $kd -f kube/redis/redis-deployment.yml
}

delete_redis() {
  $kd --delete -f kube/redis/redis-deployment.yml
  $kd --delete -f kube/redis/redis-network-policy.yml
  $kd --delete -f kube/redis/redis-service.yml

  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd --delete -f kube/redis/redis-pvc.yml
  fi
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  configure_redis_persistence
  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/app -f kube/ims-resolver -f kube/file-vault
  # echo "Torn Down UAT Branch - paf-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Torn Down Branch - paf-${DRONE_SOURCE_BRANCH}.internal.${BRANCH_ENV}.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')
configure_redis_persistence

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml
  $kd -f kube/certmounts/certmounts.yml
  $kd -f kube/certs
  deploy_redis
  $kd -f kube/app
  $kd -f kube/autoscale/hpa-paf.yml
  $kd -f kube/ims-resolver
  $kd -f kube/file-vault
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/certmounts/certmounts.yml
  $kd -f kube/certs
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app/deployment.yml
  $kd -f kube/autoscale/hpa-paf.yml
  $kd -f kube/ims-resolver
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  deploy_redis
  $kd -f kube/app/deployment.yml
  $kd -f kube/autoscale/hpa-paf.yml
  $kd -f kube/ims-resolver
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/certmounts/certmounts-prod.yml
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  deploy_redis
  $kd -f kube/file-vault
  $kd -f kube/app/deployment.yml
  $kd -f kube/autoscale/hpa-paf.yml
  $kd -f kube/ims-resolver
fi

sleep $READY_FOR_TEST_DELAY


# Print all external and internal ingress URLs in Drone builds
if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "External Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Internal Branch url - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  echo "External UAT url - $APP_NAME.uat.sas-notprod.homeoffice.gov.uk"
  echo "Internal UAT url - sas-$APP_NAME.uat.internal.sas-notprod.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  echo "External STG url - $APP_NAME.stg.sas.homeoffice.gov.uk"
  echo "Internal STG url - "stg.internal.paf.sas.homeoffice.gov.uk"
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  echo "External PROD url - $PRODUCTION_URL"
fi
