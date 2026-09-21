const express = require('express');
const client = require('prom-client');
client.collectDefaultMetrics();
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code']
});
const app = express();
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
  const start = process.hrtime(); 
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    });
  const [seconds, nanoseconds] = process.hrtime(start);
  const duration = seconds + nanoseconds / 1e9;

    httpRequestDuration.observe({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode
    },
    duration
    );
  });

  next();
});

app.get('/', (req, res) => {
  const version = process.env.APP_VERSION || 'v1.0';
  const hostname = process.env.HOSTNAME || 'local';
  const environment = process.env.NODE_ENV || 'development';

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Operations Dashboard</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: #e2e8f0;
        }
        .container {
          max-width: 1100px;
          margin: auto;
          padding: 40px 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        h1 { margin: 0; }
        .status {
          background: #14532d;
          color: #86efac;
          padding: 8px 14px;
          border-radius: 20px;
          font-size: 14px;
        }
        .subtitle { color: #94a3b8; margin-top: 8px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 25px;
        }
        .card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 22px;
        }
        .card h3 {
          margin-top: 0;
          color: #cbd5e1;
        }
        .value {
          font-size: 24px;
          font-weight: bold;
          margin-top: 12px;
        }
        .pipeline {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          margin-top: 20px;
        }
        .stage {
          background: #334155;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .arrow { color: #64748b; }
        .links a {
          color: #60a5fa;
          text-decoration: none;
          margin-right: 20px;
        }
        footer {
          color: #64748b;
          margin-top: 30px;
          font-size: 13px;
        }
      </style>
    </head>

    <body>
      <div class="container">

        <div class="header">
          <div>
            <h1>⚡ DevOps Operations Dashboard</h1>
            <div class="subtitle">
              Production-style CI/CD, Kubernetes & Observability Platform
            </div>
          </div>
          <div class="status">● APPLICATION HEALTHY</div>
        </div>

        <div class="grid">

          <div class="card">
            <h3>🚀 Application</h3>
            <div class="value">Online</div>
          </div>

          <div class="card">
            <h3>📦 Version</h3>
            <div class="value">${version}</div>
          </div>

          <div class="card">
            <h3>☸ Runtime</h3>
            <div class="value">${hostname}</div>
          </div>

          <div class="card">
            <h3>🌐 Environment</h3>
            <div class="value">${environment}</div>
          </div>

        </div>

        <div class="card">
          <h3>🔄 CI/CD Pipeline</h3>

          <div class="pipeline">
            <div class="stage">GitHub</div>
            <span class="arrow">→</span>
            <div class="stage">Tests</div>
            <span class="arrow">→</span>
            <div class="stage">SonarQube</div>
            <span class="arrow">→</span>
            <div class="stage">Trivy</div>
            <span class="arrow">→</span>
            <div class="stage">DockerHub</div>
            <span class="arrow">→</span>
            <div class="stage">Kubernetes</div>
          </div>
        </div>

        <div class="grid">

          <div class="card">
            <h3>📊 Metrics</h3>
            <p>Prometheus-compatible application metrics</p>
            <div class="links">
              <a href="/metrics">View Metrics →</a>
            </div>
          </div>

          <div class="card">
            <h3>❤️ Health</h3>
            <p>Application health endpoint</p>
            <div class="links">
              <a href="/health">Health Check →</a>
            </div>
          </div>

          <div class="card">
            <h3>🔐 Security</h3>
            <p>SonarQube code analysis + Trivy vulnerability scanning</p>
          </div>

          <div class="card">
            <h3>📈 Observability</h3>
            <p>Prometheus + Grafana + Loki</p>
          </div>

        </div>

        <footer>
          DevOps Fullstack Project · Automated CI/CD · Infrastructure as Code · Kubernetes · Observability
        </footer>

      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date(), version: process.env.APP_VERSION || 'v1.0' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}

module.exports = app;
