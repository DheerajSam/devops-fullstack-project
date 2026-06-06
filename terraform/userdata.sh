#!/bin/bash
apt-get update -y
apt-get install -y docker.io curl git

# Start Docker
systemctl start docker
systemctl enable docker
usermod -aG docker ubuntu

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
install minikube-linux-amd64 /usr/local/bin/minikube

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Pull and run app
docker pull dheeraj202/devops-fullstack-app:latest
docker run -d --name devops-app -p 3000:3000 --restart always dheeraj202/devops-fullstack-app:latest

echo "Setup complete!" > /tmp/setup-done.txt

