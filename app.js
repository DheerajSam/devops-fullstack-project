const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Fullstack App</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        h1 { color: #2c3e50; }
        .card { background: white; padding: 20px; margin: 10px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .badge { background: #27ae60; color: white; padding: 4px 10px; border-radius: 4px; font-size: 12px; }
      </style>
    </head>
    <body>
      <h1>🚀 DevOps Fullstack Project</h1>
      <span class="badge">✅ Pipeline Running</span>
      <div class="card"><h3>Pipeline Stack</h3>
        <p>GitHub Actions → Docker → AWS ECR → Kubernetes → Prometheus + Grafana</p>
      </div>
      <div class="card"><h3>Infrastructure</h3>
        <p>Provisioned with Terraform | AWS VPC + EKS + ECR</p>
      </div>
      <div class="card"><h3>Monitoring</h3>
        <p>Prometheus metrics | Grafana dashboards | ELK logging</p>
      </div>
      <p><small>Host: ${process.env.HOSTNAME} | Version: ${process.env.APP_VERSION || 'v1.0'}</small></p>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date(), version: process.env.APP_VERSION || 'v1.0' });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# HELP app_requests_total Total requests\n# TYPE app_requests_total counter\napp_requests_total 100\n`);
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
