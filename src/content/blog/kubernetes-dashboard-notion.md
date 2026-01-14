---
author: Julian Beck
title: "Build a Kubernetes Dashboard in Notion using a go controller"
description: "Build a live updating Kubernetes Dashboard in Notion using a custom controller in golang"
pubDate: 2022-11-28T15:22:00Z
featured: false
draft: false
ogImage: "/media/cluster-preview.png"
tags:
  - Kubernetes
---



Notion is a web based note-taking software. Its supports all kind of note types like kanban boards, tables, lists, and more.
This post will show you how to use the Notion api to generate a live updating Kubernetes Dashboard in Notion using a custom controller in golang to show the currently
running pods in a Kubernetes cluster.

![Example](/media/notion-dashboard.gif)

The code to the Repository can be found [here](https://github.com/julianfbeck/k8s-in-notion)

## Setting up the Notion API
To use the Notion API, you need to create a Notion account and create a new integration.
Go to the [Notion API](https://www.notion.so/my-integrations/) and click on the "Create Integration" button.
Name your integration and select the Capabilities "Read, update, insert". Also make sure to select the correct workspace and internal integration.
After creating the integration, you will be redirected to the integration page. Here you can find the integration token. Copy the token and save it for later use.

![Notion Integration Page](/media/notion-integration.png)

Lastly you need to add the integration to an existing Notion page. Create a new page and add the integration to the page.
Now you are ready to use the Notion API with the particular page and all subpages.
![Notion Page with Integration](/media/notion-connection.png)

## Setting up the Kubernetes Cluster
To setup the Kubernetes cluster we will use [kind](https://kind.sigs.k8s.io/). Kind is a tool for running local Kubernetes clusters using Docker container "nodes".

To create a cluster run the following command to create a cluster with 1 control-plane node and 1 worker nodes:
```sh
make create
```

## Setting up the Controller
The controller is written in golang and uses the [client-go](https://github.com/kubernetes/client-go) library to communicate with the Kubernetes API, and the [go-notion](https://github.com/dstotijn/go-notion) library to communicate with the Notion API.
The controll-flow is as following: Get Updates from the Kubernetes API -> Update the Notion Page.
### Getting updates from the Kubernetes API

We need to create a new clientset in order to communicate with the Kubernetes API. When using the controller outside of the cluster we will use the kubeconfig file to authenticate with the Kubernetes API. If the controller is run inside the cluster, the service account token will be used to authenticate with the Kubernetes API.
```go
// creates the in-cluster config   see the source for the complete controller
config, err := rest.InClusterConfig()
if err != nil {
	panic(err.Error())
}
// creates the clientset
clientset, err = kubernetes.NewForConfig(config)
if err != nil {
	panic(err.Error())
}
```

To get notified when something inside the cluster has changed  we need to create a watcher. The watcher will watch for changes in the cluster and notify us when something has changed.
```go
func WatchForPods(clientset *kubernetes.Clientset, fn func(*v1.Pod, watch.Event)) {
	watch, err := clientset.CoreV1().Pods("").Watch(context.Background(), metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}
	for event := range watch.ResultChan() {
		fn(event.Object.(*v1.Pod), event)
	}
}
```
The WatchForPods function passes the detected event changes to another function. This function will be called when a change is detected.
### Updating the Notion Page
To update the Notion page we need to create a new client. The client needs the integration token to authenticate with the Notion API.
```go
client := notion.NewClient(token)
```
Besides the token we also need the Page-id of the page where we added the integration to. The page-id can be found in the url of the page.
When we start the application we will create a new subpage with a table to display the pods:
```go
func CreateDatabase(client *notion.Client) notion.Database {
	database, err := client.CreateDatabase(context.Background(), notion.CreateDatabaseParams{
		Title: []notion.RichText{
			{
				PlainText: "Kubernetes Cluster Pods",
				Text: &notion.Text{
					Content: "Kubernetes Cluster Pods",
				},
			},
		},
		ParentPageID: "06336be68e0b4278999eb22c6b461a26",
		Properties: notion.DatabaseProperties{
			"Name": notion.DatabaseProperty{
				Type:  "title",
				Name:  "Name",
				Title: &notion.EmptyMetadata{},
			},

			"namespace": notion.DatabaseProperty{
				Type: "select",
				Name: "namespace",
				Select: &notion.SelectMetadata{
					Options: []notion.SelectOptions{},
				},
			},
			"node": notion.DatabaseProperty{
				Type: "select",
				Name: "node",
				Select: &notion.SelectMetadata{
					Options: []notion.SelectOptions{},
				},
			},
			"status": notion.DatabaseProperty{
				Type:     "rich_text",
				Name:     "status",
				RichText: &notion.EmptyMetadata{},
			},
			"id": notion.DatabaseProperty{
				Type:     "rich_text",
				Name:     "id",
				RichText: &notion.EmptyMetadata{},
			},

			"date": notion.DatabaseProperty{
				Type:     "rich_text",
				Name:     "date",
				RichText: &notion.EmptyMetadata{},
			},
		},
	})
	if err != nil {
		log.Default().Println(err)
	}

	return database
}
```
The CreateDatabase function creates a new subpage with a table to display the pods. The function returns the database object which contains the database-id. The database-id is needed to add new rows to the table.
Besides the function to create the new database we also need functions to:
* Add a new row to the table
* Update a row in the table
* Delete a row from the table

## Deploy the Controller
To deploy the controller we will use ko. [ko](https://github.com/google/ko) is a simple, fast container image builder for Go applications.
We will use ko to build and deploy the custom controller directly to the kubernetes-cluster, set up by kind.

We created 3 manifest files to deploy the controller:
* [deployment.yaml](https://github.com/julianfbeck/k8s-in-notion/blob/main/k8s/deployment.yaml) - The deployment manifest file. This contains the notion_token and the page_id as environment variables.
* [service-account.yaml](https://github.com/julianfbeck/k8s-in-notion/blob/main/k8s/sa.yaml) - The service account manifest file. Creates a new service account
* [clusterrolebinding.yaml](https://github.com/julianfbeck/k8s-in-notion/blob/main/k8s/clusterrolebinding.yaml) - The clusterrolebinding manifest file to bind the service account to the cluster role view in order to view cluster-wide resources.

To deploy the controller replace the `KO_DOCKER_REPO` environment variable inside the `Makefile` with your docker repository. Then run the following command:
```bash
make deploy
```
This will build and then deploy the controller inside the cluster.

## Conclusion
In this article we created a custom controller to watch for changes in the Kubernetes cluster and update a Notion page.
While currently works for watching pods, the implementation is still only a proof of concept. The controller can be extended to watch for other resources in the cluster,
although the you need to be careful to not overload the Notion API.

The source code of the controller can be found on [GitHub](https://github.com/julianfbeck/k8s-in-notion).
