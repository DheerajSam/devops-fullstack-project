# 🚀 Full-Stack DevOps Pipeline — End-to-End Production Architecture

## Architecture

GitHub Push → GitHub Actions → Docker → DockerHub

↓

Terraform (VPC + EC2 + IAM + SG)

↓

Kubernetes (2 replicas)

↓

Prometheus + Grafana + Loki Monitoring

## Stack
| Tool | Purpose |
|---|---|
| GitHub Actions | CI/CD Pipeline |
| Docker | Containerization |
| Terraform | AWS Infrastructure as Code |
| Kubernetes | Container Orchestration |
| Prometheus + Grafana | Monitoring & Dashboards |
| Loki + Promtail | Log Aggregation |

## Screenshots
![App](app.png)
![Grafana](grafana.png)
![Prometheus](prometheus.png)
![Loki Logs](loki.png)
![GitHub Actions](pipeline.png)

