# Dockerize and Deploy a Node.js Application to Kubernetes

## Step 1: Create a Node.js Application

1. **Set up your project directory**:
    ```bash
    mkdir nodejs-app
    cd nodejs-app
    ```

2. **Initialize a Node.js project**:
    ```bash
    npm init -y
    ```

3. **Create your application files**:
    - `app.js`:
        ```javascript
        const http = require('http');
        const port = 3000;

        const requestHandler = (request, response) => {
          response.end('Hello, Kubernetes!');
        };

        const server = http.createServer(requestHandler);

        server.listen(port, (err) => {
          if (err) {
            return console.log('Something bad happened', err);
          }

          console.log(`Server is listening on ${port}`);
        });
        ```

    - `package.json`:
        ```json
        {
          "name": "nodejs-app",
          "version": "1.0.0",
          "main": "app.js",
          "scripts": {
            "start": "node app.js"
          },
          "dependencies": {}
        }
        ```

4. **Install dependencies**:
    ```bash
    npm install
    ```

## Step 2: Dockerize the Node.js Application

1. **Create a Dockerfile**:
    ```Dockerfile
    # Use the official Node.js image
    FROM node:14

    # Create and change to the app directory
    WORKDIR /app

    # Copy application files
    COPY package*.json ./
    COPY app.js ./

    # Install dependencies
    RUN npm install

    # Expose the port the app runs on
    EXPOSE 3000

    # Run the application
    CMD ["node", "app.js"]
    ```

2. **Build the Docker image**:
    ```bash
    docker build -t nodejs-app:1.0 .
    ```

3. **Run the Docker container**:
    ```bash
    docker run -p 3000:3000 nodejs-app:1.0
    ```

4. **Verify the application**:
    Open a browser and navigate to `http://localhost:3000`. You should see "Hello, Kubernetes!".

## Step 3: Set Up Kubernetes

1. **Install Minikube and kubectl**:
    - Follow the installation guides:
      - [Minikube](https://minikube.sigs.k8s.io/docs/start/)
      - [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

2. **Start Minikube**:
    ```bash
    minikube start
    ```

3. **Check Minikube status**:
    ```bash
    minikube status
    ```

## Step 4: Deploy the Node.js App to Kubernetes

1. **Create Kubernetes deployment file**:
    - `deployment.yaml`:
        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: nodejs-app
        spec:
          replicas: 2
          selector:
            matchLabels:
              app: nodejs-app
          template:
            metadata:
              labels:
                app: nodejs-app
            spec:
              containers:
              - name: nodejs-app
                image: nodejs-app:1.0
                ports:
                - containerPort: 3000
        ```

2. **Create Kubernetes service file**:
    - `service.yaml`:
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: nodejs-app-service
        spec:
          type: NodePort
          selector:
            app: nodejs-app
          ports:
          - port: 3000
            targetPort: 3000
            nodePort: 30001
        ```

3. **Apply the deployment and service configurations**:
    ```bash
    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
    ```

4. **Check the status of the deployment**:
    ```bash
    kubectl get deployments
    ```

5. **Check the status of the pods**:
    ```bash
    kubectl get pods
    ```

6. **Check the status of the service**:
    ```bash
    kubectl get services
    ```

7. **Access the application**:
    - Get the Minikube IP:
      ```bash
      minikube ip
      ```
    - Access the application by navigating to `http://<minikube-ip>:30001`.
