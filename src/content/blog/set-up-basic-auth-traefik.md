---
author: Julian Beck
title: Set up Basic-Auth using Traefik 2 on Kubernetes
description: Set up Basic-Auth using Traefik 2 on Kubernetes
pubDate: 2021-01-05T15:22:00Z
featured: false
draft: false
tags:
  - Kubernetes
---

[Traefik](https://doc.traefik.io/traefik/) is a modern reverse proxy and load balancer that makes deploying microservices easy. Traefik is natively compliant with Kubernetes, Docker and a lot of other cluster technologies.

Traefik allows the use of middlewares to tweak requests before they are sent to a service.
There are several available middlewares in Traefik, some can modify the request, the headers, some are in charge of redirections and some add authentication.

This Post explains how to configure the **BasicAuth**-Middleware for Traefik 2 in Kubernetes.
The BasicAuth-Middleware restricts access to services by prompting the user for a username and password.


There are multiple ways to enable and configure different Middlewares for Traefik. For the use with Kubernetes I will explain the
**File-Provider** and the **Kubernetes-Provider**:
## Configuration using File-Provider:
The File-Provider uses a YAML-Configuration-File that defines all the activated middlewares.
The Following YAML shows my current Middleware File:
```yaml
http:
  middlewares:
    sslheader:
      headers:
        customRequestHeaders:
          X-Forwarded-Proto: "https"
    compression:
        compress:
          excludedContentTypes:
          -  "text/event-stream"
```
To enable **BasicAuth** the file needs to be extended. First, we have to generate a user:password combination. The password must be hashed using MD5, SHA1, or BCrypt.
Generate a new user using the `htpasswd` command:
```sh
echo $(htpasswd -nB user)
```
Now we can extend the configuration file:
```yaml
http:
  middlewares:
    sslheader:
      headers:
        customRequestHeaders:
          X-Forwarded-Proto: "https"
    compression:
        compress:
          excludedContentTypes:
          -  "text/event-stream"
    test-auth:
      basicAuth:
        users:
          - "user:$apr1$H6uskkkW$IgXLP6ewTrSuBkTrqE8wj/"
```
To activate **BasicAuth** make sure that the configuration is mounted inside your Traefik deployment.
To do so, I use a Configuration-Map:
```yaml
apiVersion: v1
data:
  middleware.yaml: |
    http:
      middlewares:
        sslheader:
          headers:
            customRequestHeaders:
              X-Forwarded-Proto: "https"
        compression:
            compress:
              excludedContentTypes:

kind: ConfigMap
metadata:
  name: traefik-config
  namespace: kube-system
---
```
And mount the volume inside the Traefik-Deployment:
```yaml
# .... Deployment-Configs....
- image: traefik:v2.3.6
          name: traefik
          ports:
            - name: http
              containerPort: 80
              hostPort: 80
            - name: https
              containerPort: 443
              hostPort: 443
            - name: admin
              containerPort: 8080
              hostPort: 8080
          args:
            - --configFile=/config/traefik.yaml
          volumeMounts:
            - mountPath: /config/traefik.yaml
              name: traefik
              subPath: traefik.yaml
            - mountPath: /config/common/middleware.yaml
              name: traefik
              subPath: middleware.yaml
          resources:
            limits:
              memory: 512Mi
              cpu: "1"
          livenessProbe:
            httpGet:
              port: 8082
              path: /ping
          readinessProbe:
            httpGet:
              port: 8082
              path: /ping
      volumes:
        - name: traefik
          configMap:
            name: traefik-config
```
To enable the Taefik-Middleware for a route, add the following annotation to your ingress resource:
```yaml
traefik.ingress.kubernetes.io/router.middlewares: test-auth@file
```
## Configuration using Kubernetes-Provider:
The better way to enable and configure a **BasicAuth**-Middleware is by using the Kubernetes-Provider and custom CRD-resources.
First, we need to create a custom `kind: Middleware` manifest to tell Traefik to enable the Middleware:
```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: basic-auth-middleware
  namespace: kube-system
spec:
  basicAuth:
    removeHeader: true
    secret: basic-auth
```
The middleware links to a Kubernetes-Secret called `test-auth` that holds the `user:password`.
To generate the secret, run the following commands:
```sh
echo $(htpasswd -nB user) >> test-auth
kubectl create secret generic test-auth --from-file test-auth --namespace kube-system -o yaml --dry-run=client >> basic-auth-secret.yaml

```
This will generate the following File:
```yaml
apiVersion: v1
data:
  test-auth: dXNlcjokMnkkMDUkemV1Yzg0UmN0eFdJSE1MTC5RVzE4LnB3U256Wkp6UFYyT1JpSWF6ODNFU2JqSTMuZkRoUC4K
kind: Secret
metadata:
  creationTimestamp: null
  name: basic-auth
  namespace: kube-system
```
Apply both manifests:
```sh
kubectl create -f basic-auth-middleware.yaml
kubectl create -f test-auth-secret.yaml
```
If you now open your Traefik-Dashboard you will see that Traefik found the `test-auth-middleware`:
![traefik](/media/traefik.png)

To enable **BasicAuth** for a specific route, use the name displayed in the Dashboard.
The Name consists out of `<namespace>-<middleware-name>@kubernetescrd`.
For example, to enable the **BasicAuth** for the Traefik-Dashboard the ingress should be:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    kubernetes.io/ingress.class: traefik
    traefik.ingress.kubernetes.io/router.entrypoints: https
    traefik.ingress.kubernetes.io/router.tls: "true"
    traefik.ingress.kubernetes.io/router.middlewares: kube-system-basic-auth-middleware@kubernetescrd
  generation: 1
  name: traefik
  namespace: kube-system
spec:
  rules:
  - host: traefik.example.com
    http:
      paths:
      - backend:
          service:
            name: traefik
            port:
              number: 8080
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - traefik.example.com
    secretName: ingeress-tls

```
