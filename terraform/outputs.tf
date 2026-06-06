output "app_public_ip" {
  description = "Public IP of the app server"
  value       = aws_eip.app.public_ip
}

output "app_url" {
  description = "App URL"
  value       = "http://${aws_eip.app.public_ip}:3000"
}

output "ssh_command" {
  description = "SSH command to connect"
  value       = "ssh -i ~/.ssh/devops-key ubuntu@${aws_eip.app.public_ip}"
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

