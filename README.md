# Node.js Microservice Application with RabbitMQ and Kubernetes

## Overview
This README provides a detailed guide to the architecture and deployment of a Node.js microservice application, leveraging RabbitMQ for messaging and Kubernetes for orchestration. It aims to explain the 'why' and 'how' behind the choices in communication and deployment mechanisms.

## Table of Contents
- [Why RabbitMQ?](#why-rabbitmq)
- [How Services Communicate](#how-services-communicate)
- [Why Kubernetes?](#why-kubernetes)
- [Kubernetes Architecture](#kubernetes-architecture)
- [Deployment Process](#deployment-process)
- [Useful Commands](#useful-commands)
- [Node.js Docker Kubernetes RabbitMQ Example](#nodejs-docker-kubernetes-rabbitmq-example)
  - [Prerequisites](#prerequisites)
  - [Directory Structure](#directory-structure)
  - [Docker Configuration](#docker-configuration)
  - [Kubernetes Configuration](#kubernetes-configuration)
  - [Skaffold Configuration](#skaffold-configuration)
  - [Port Forwarding](#port-forwarding)
  - [Accessing the Application](#accessing-the-application)

## Why RabbitMQ?
RabbitMQ is chosen for this microservice architecture due to its robust messaging capabilities, which facilitate efficient communication between different parts of the application. It supports complex routing and ensures message delivery and fault tolerance, which are crucial for the reliability of microservices.

## How Services Communicate
Services communicate using RabbitMQ as a message broker. Each service sends and receives messages via queues, enabling decoupled and scalable interactions. This asynchronous communication pattern helps handle varying loads and ensures that the failure of one service does not impact others.

## Why Kubernetes?
Kubernetes is utilized for its powerful container orchestration. It handles the deployment, scaling, and management of containerized applications, making it ideal for microservices. Kubernetes provides high availability, load balancing, and automated rollouts and rollbacks, enhancing the resilience and scalability of applications.

## Kubernetes Architecture
- **Pods**: The smallest deployable units created and managed by Kubernetes. Each pod represents a running process in your cluster.
- **Clusters**: A set of node machines for running containerized applications. A Kubernetes cluster has at least one worker node and a master node that coordinates the cluster.
- **Nodes**: Worker machines in Kubernetes, which can be either physical or virtual machines, depending on the cluster.
- **Deployments**: Kubernetes objects that manage the deployment of containerized applications, ensuring that a specified number of pods are running at any given time.

## Deployment Process
The deployment process involves several steps:
1. **Creating Docker images**: Package the Node.js application and its dependencies into Docker containers.
2. **Pushing to a Registry**: Push the Docker images to a container registry (e.g., Docker Hub).
3. **Deploying to Kubernetes**: Use Kubernetes manifests to deploy your application. This includes setting up services, deployments, and necessary configurations.
4. **Managing with kubectl**: Use kubectl commands to manage the Kubernetes resources.

## Useful Commands
- `kubectl get pods`: List all pods in the current namespace.
- `kubectl get deployments`: Display the current deployments.
- `kubectl describe pod <pod-name>`: Get detailed information about a specific pod.
- `kubectl logs <pod-name>`: Fetch the logs of a pod. Useful for debugging.
- `kubectl apply -f <file.yaml>`: Apply a configuration to a resource by filename or stdin.
- `kubectl delete -f <file.yaml>`: Delete resources using the configuration in the file.
- `kubectl port-forward svc/my-service 8080:80`: Forward port 8080 on the local machine to port 80 on the service `my-service`. Useful for local testing.

## Node.js Docker Kubernetes RabbitMQ Example
### Prerequisites
To work with this application, you need:
- Docker installed on your machine.
- Kubernetes cluster set up (Minikube, EKS, GKE, etc.).
- Skaffold installed for easy deployment and testing.
- RabbitMQ setup either locally or in the cluster.
- Rancher Desktop (This will smoothen the process of installing Docker and K8s)

### Directory Structure
The repository is structured as follows:

### Docker Configuration
Each microservice has its own `Dockerfile` which defines how the Docker image for that service is built. The Dockerfiles include the application's dependencies and the command to run the application.

### Kubernetes Configuration
#### ConfigMap
ConfigMaps are used to store configuration data that can be accessed by the microservices.

#### Deployments
Kubernetes `deployment.yaml` defines how the publisher and subscriber microservices are deployed. It includes specifications like the number of replicas, Docker image to use, and necessary environment variables.

#### Services
Kubernetes `service.yaml` files are used to expose the microservices within the cluster. This ensures that the publisher and subscriber can communicate with each other and with RabbitMQ.

### Skaffold Configuration
The `skaffold.yaml` file is used to manage the development and deployment lifecycle of the microservices using Skaffold. This includes building the Docker images and deploying them to Kubernetes. Useful commands include:
- `skaffold dev`: Runs Skaffold in development mode, monitoring your source code for changes and performing builds and deployments automatically.
- `skaffold build`: Builds the Docker images using the configurations provided in `skaffold.yaml`.
- `skaffold deploy`: Deploys your application to Kubernetes according to the `skaffold.yaml` configuration.

### Port Forwarding
Port forwarding is configured to allow local access to the Kubernetes services. Commands for setting this up include:
- `kubectl port-forward svc/publisher 8080:80`: Forward traffic from your local machine's port 8080 to the Kubernetes service `publisher` on port 80.
- `kubectl port-forward svc/subscriber 9090:90`: Forward traffic from your local machine's port 9090 to the Kubernetes service `subscriber` on port 90.

### Accessing the Application
Once everything is deployed, you can access the application by navigating to the specific port on your local machine, as defined in the port forwarding settings.
