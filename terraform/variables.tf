variable "aws_region" {
  description = "AWS Region"
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Project name"
  default     = "devops-fullstack"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t3.large"
}

variable "key_name" {
  description = "EC2 Key Pair Name"
  type        = string
  default     = "devops-key"
}

variable "dockerhub_username" {
  description = "DockerHub username"
  default     = "dheeraj202"
}

variable "app_image" {
  description = "Docker image to deploy"
  default     = "dheeraj202/devops-fullstack-app:latest"
}
