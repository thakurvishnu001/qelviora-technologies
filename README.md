# Qelviora Technologies

Complete website source is in website-source.zip. The build script checks the archive SHA-256 and extracts it into app/ without external dependencies.

## Run
Use Node 22.15+. Run npm run build, then npm start. For local admin setup, run npm run admin:setup. No administrator password or database is included.

## Render
Deploy as a Node Web Service: build command npm run build, start command npm start, health check /healthz. Set HOST=0.0.0.0, NODE_ENV=production and APP_URL to the assigned public HTTPS origin. The render.yaml describes a Starter service and 1 GB disk; review hosting costs before deploying. Set QELVIORA_DATABASE_PATH=/var/data/qelviora.sqlite and UPLOAD_DIRECTORY=/var/data/uploads. Configure private EMAIL_SERVER and EMAIL_FROM to deliver enquiry notifications. Without SMTP, emails remain queued.

Create the production administrator using npm run admin:setup in the Render service shell. Localhost admin credentials are not transferred. Review app/DEPLOYMENT.md and app/README.md for details.

Current training fees: 6-month programs ₹10,499; 4-month programs ₹7,499. Communication Skills retains ₹7,999 total and ₹999 registration. Payment proofs require transaction ID and receipt, with admin approval.

Validated browser syntax, login changes, QR/UPI amount generation and program application links. Deployment and real SMTP delivery still require live verification.
