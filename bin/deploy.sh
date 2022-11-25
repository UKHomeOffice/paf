#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export DATA_SERVICE_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/data-service-external-annotations.yaml

export SCHEMA_ACTION=migrate

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)

  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/save-return-data -f kube/clue-resolver  -f kube/html-pdf -f kube/app
  echo "Torn Down UAT Branch - paf-$DRONE_SOURCE_BRANCH.internal.paf-branch.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps -f kube/certs
  # $kd -f kube/clue-resolver
  $kd -f kube/html-pdf -f kube/save-return-data
  $kd -f kube/redis
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml
  # $kd -f kube/clue-resolver
  $kd -f kube/html-pdf -f kube/save-return-data
  $kd -f kube/redis
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml
  $kd -f kube/clue-resolver -f kube/html-pdf
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  $kd -f kube/redis -f kube/save-return-data
  $kd -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd --delete -f kube/jobs/ms-schema-job.yml
  $kd -f kube/jobs/ms-schema-job.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/clue-resolver -f kube/html-pdf
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/redis -f kube/save-return-data
  $kd -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "App Branch - paf-$DRONE_SOURCE_BRANCH.internal.paf-branch.homeoffice.gov.uk"
  echo "Data Service Branch - data-service-$DRONE_SOURCE_BRANCH.paf-branch.homeoffice.gov.uk"
fi
