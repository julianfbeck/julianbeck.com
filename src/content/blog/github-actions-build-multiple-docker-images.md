---
author: Julian Beck
title: "Github Actions: Build Multiple docker images in Mono Repo"
description: "Github Actions allows you to simply build multiple docker images for a single repository using matrix builds"
pubDate: 2023-02-20T15:22:00Z
featured: false
draft: false
tags:
  - Kubernetes
  - DevOps
---

Learn how to build multiple Docker images for a single repository using matrix builds with Github Actions in this comprehensive tutorial. Dockerizing applications is a powerful way to deploy them, and Github Actions provides an easy way to build and push Docker images to a registry. Follow along as we demonstrate how to use matrix builds to build multiple Docker images for a single repository with Github Actions

## Building a single docker image
For this example, we will use the `Build and Push Docker Images` action from the Github Marketplace. The action is very simple to use. You only need to specify the Docker registry, the username and password.

```yaml
name: ci

on:
  push:
    branches:
      - 'main'

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v3
      -
        name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
	   -
        name: Docker meta
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: your-docker-registry/app1
      -
        name: Build and push
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: user/app:latest

```
This will use the `Dockerfile` in the root of the repository to build the docker image and push it to the Docker Hub registry.

## Building multiple docker images
Now we are going to build multiple docker images for a single repository. We will use the same action as before, but we will use a matrix build to build multiple docker images.

Matrix builds allow you to run the same job multiple times with different parameters. In our case, we will use the matrix to build multiple docker images.

```yaml
name: ci
on:
  push:
    branches:
      - 'main'

jobs:
  docker:
    runs-on: ubuntu-latest
	strategy:
	  matrix:
		include:
		  - image: your-docker-registry/app1
		    dockerfile: app1/Dockerfile
		  - image: user/app2
		    dockerfile: your-docker-registry/app1
    steps:
      -
        name: Checkout
        uses: actions/checkout@v3
      -
        name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
	  -
	    name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ${{ matrix.image }}
      -
        name: Build and push
        uses: docker/build-push-action@v4
       	with:
          context: .
          file: ${{ matrix.dockerfile }}
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }
```
This will build two docker images. One for `your-docker-registry/app1` and one for `your-docker-registry/app2`. The `Dockerfile` for `your-docker-registry/app1` is located in the `app1` folder. The `Dockerfile` for `your-docker-registry/app2` is located in the root of the repository.
