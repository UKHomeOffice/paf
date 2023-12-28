#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 20m --check-interval 10s'

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/app -f kube/ims-resolver
  # echo "Torn Down UAT Branch - paf-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "Torn Down Branch - paf-${DRONE_SOURCE_BRANCH}.internal.${BRANCH_ENV}.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps
  $kd -f kube/certs
  $kd -f kube/redis
  $kd -f kube/app
  $kd -f kube/ims-resolver
  $kd -f kube/file-vault
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/certs
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  $kd -f kube/redis -f kube/app/deployment.yml
  $kd -f kube/ims-resolver
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/networkpolicy-internal.yml -f kube/app/ingress-internal.yml
  $kd -f kube/redis -f kube/app/deployment.yml
  $kd -f kube/ims-resolver
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/certs
  $kd -f kube/app/networkpolicy-external.yml -f kube/app/ingress-external.yml
  $kd -f kube/redis -f kube/app/deployment.yml
  $kd -f kube/ims-resolver
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  # echo "UAT Branch - paf-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
    echo "Branch - paf-${DRONE_SOURCE_BRANCH}.internal.${BRANCH_ENV}.homeoffice.gov.uk"
fi
