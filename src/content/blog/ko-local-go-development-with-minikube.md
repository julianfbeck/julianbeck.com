---
author: Julian Beck
title: Fast local Development using Ko, Golang, and Minikube
description: Deploy Golang directly to minikube using ko.
pubDate: 2021-01-01T15:22:00Z
featured: false
draft: false
tags:
  - Go
  - Kubernetes
---
[ko](https://github.com/google/ko) is a simple, fast container image builder for Go applications. In combination
with [minikube](https://minikube.sigs.k8s.io/docs/start/), it enables an easy local development cycle.

In this post, I will explain how to set up ko to directly build and deploy Golang applications to minikube.

First, we need to start a local minikube cluster. Use the following command to deploy a local cluster and set it as the current
`kubectl` context.
```sh
minikube start
```
Ko can build and push containers to all kinds of registries. Ko depends on an environment variable, `KO_DOCKER_REPO`, to identify where it should push images that it builds. For local development, we don't want to push the images to a remote registry, we will publish the images to the local Docker daemon by exporting the following environment variable:
```sh
export KO_DOCKER_REPO=ko.local
```
Next, we need to point the shell to minikube's docker-daemon by running the following command

```sh
eval $(minikube -p minikube docker-env)
```
Now we are ready to deploy Go applications directly to minikube.
We will deploy a basic application that utilizes the Go prometheus-client using ko:
```go
import (
    "fmt"
    "net/http"

    "github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
    http.Handle("/metrics", promhttp.Handler())
    http.ListenAndServe(":8080", nil)
    fmt.Println("Starting the server on port 8080")
}
```
The Go application is named `testGoExport`. Next, we will define the Kubernetes Deployment.
However, instead of using a path to a remote image, we will reference the Go binary by its importpath, prefixed with `ko://`
For this to work, make sure that your `GOPATH` is set correctly.
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  creationTimestamp: null
  labels:
    app: prom-test
  name: prom-test

spec:
  replicas: 1
  selector:
    matchLabels:
      app: prom-test
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: prom-test
    spec:
      containers:
        - image: ko://github.com/jufabeck2202/testGoExporter
          name: testgoexporter
          ports:
            - containerPort: 8080
          imagePullPolicy: Never
          livenessProbe:
            httpGet:
              path: /metrics
              port: 8080
          resources: {}
```
To deploy the Deployment we will now run `ko apply -f deployment.yaml` instead of `kubectl apply -f deployment.yaml`.
This will:
1. Scan the YAML file for the `ko://` prefix
2. Build the Go application
3. Publish the application to the local docker daemon
4. Replace the image name with the fully-specified image reference of the build image
5. Deploy the Deployment
After executing:
```sh
ko apply -f deployment.yaml
```
```
Output:

2022/01/04 17:22:21 Using base gcr.io/distroless/static:nonroot for github.com/jufabeck2202/testGoExporter
2022/01/04 17:22:22 Building github.com/jufabeck2202/testGoExporter for linux/amd64
2022/01/04 17:22:24 Loading ko.local/testgoexporter-18931265053c2910578ee5844178b709:beb82aa376e6822d87b72e69a48356427674630e844d720357afb532b73b6896
2022/01/04 17:22:24 Loaded ko.local/testgoexporter-18931265053c2910578ee5844178b709:beb82aa376e6822d87b72e69a48356427674630e844d720357afb532b73b6896
2022/01/04 17:22:24 Adding tag latest
2022/01/04 17:22:24 Added tag latest
deployment.apps/prom-test created
```
If we now check the current deployments we see our deployed applications:
```
kubectl get deployments

NAME                            READY   UP-TO-DATE   AVAILABLE   AGE
prom-test                       1/1     1            1           68s
```
The Deployment uses the image called `ko.local/testgoexporter-18931265053c2910578ee5844178b709:beb82aa376e6822d87b72e69a4`

To learn more, make sure to check out ko documentation at the [GitHub repository](https://github.com/google/ko)!
