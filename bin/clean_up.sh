#! /bin/bash
set -e

export KUBE_NAMESPACE=$1
export IGNORE_NETPOL=("acp-deny-all")
export IGNORE_CONFIGMAP=("bundle")

export kubectl="kubectl --insecure-skip-tls-verify --server=$KUBE_SERVER --namespace=$KUBE_NAMESPACE --token=$KUBE_TOKEN"

$kubectl delete --all deploy --v=0
$kubectl delete --all svc --v=0
$kubectl delete --all ing --v=0

for each in $($kubectl get netpol -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_NETPOL[@]} " =~ " ${each} " ]]; then
    $kubectl delete netpol "$each"
  fi
done

for each in $($kubectl get configmap -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_CONFIGMAP[@]} " =~ " ${each} " ]]; then
    $kubectl delete configmap "$each"
  fi
done
