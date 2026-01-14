---
author: Julian Beck
title: Deploy Uptime Kuma on Kubernetes
description: "How to deploy the uptime monitoring tool Uptime-Kuma on Kubernetes"
pubDate: 2021-01-01T15:22:00Z
featured: false
draft: false
tags:
  - Kubernetes
---
**[Uptime-Kuma](https://github.com/louislam/uptime-kuma)** is a self-hosted monitoring tool that gains more and more popularity on GitHub.

This post describes how to deploy the **Uptime-Kuma** on Kubernetes.

Use the following `StatefulSet` to deploy **Uptime-Kuma**:
```yaml
# StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: uptime-kuma
  namespace: monitoring
spec:
  replicas: 1
  serviceName: uptime-kuma-service
  selector:
    matchLabels:
      app: uptime-kuma
  template:
    metadata:
      labels:
        app: uptime-kuma
    spec:
      containers:
        - name: uptime-kuma
          image: louislam/uptime-kuma
          env:
            - name: UPTIME_KUMA_PORT
              value: "3001"
            - name: PORT
              value: "3001"
          ports:
            - name: uptime-kuma
              containerPort: 3001
              protocol: TCP
          volumeMounts:
            - name: uptime-kuma-data
              mountPath: /app/data

  volumeClaimTemplates:
    - metadata:
        name: uptime-kuma-data
      spec:
        accessModes: ["ReadWriteOnce"]
        volumeMode: Filesystem
        resources:
          requests:
            storage: 2Gi
        storageClassName: <your-storage-class>
```
Make sure to enter a storage class you want to use.

Next define the service:
```yaml
# Service
apiVersion: v1
kind: Service
metadata:
  name: uptime-kuma-service
spec:
  selector:
    app: uptime-kuma
  ports:
  - name: uptime-kuma
    port: 3001
  clusterIP: None
```
For ingress, I use the Traefik Reverse Proxy using the following Definition.
Make sure to set up certmanager:
```yaml
# Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    kubernetes.io/ingress.class: traefik
    traefik.ingress.kubernetes.io/router.entrypoints: https
    traefik.ingress.kubernetes.io/router.tls: "true"
  name: uptime-kuma-ingress
  namespace: monitoring
spec:
  rules:
    - host: uptimekuma.example.com
      http:
        paths:
          - backend:
              service:
                name: uptime-kuma-service
                port:
                  number: 3001
            path: /
            pathType: Prefix
  tls:
    - hosts:
        - uptimekuma.example.com
      secretName: uptime-tls
status:
  loadBalancer: {}
```
Alternatively, you can use nginx:
```yaml
# Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: uptime-kuma-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
    kubernetes.io/tls-acme: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  rules:
  - host: uptime.example.com
    http:
      paths:
      - backend:
          service:
            name: uptime-service
            port:
              number: 3001
        path: /
        pathType: ImplementationSpecific
  tls:
  - secretName: <Your certificate>
    hosts:
    - "uptime.example.com"
```
