# Qelviora Technologies

Sanitized source is in website-source.zip. Build verifies its checksum and extracts app/. Use Node 22.15+, npm run build, npm start.

Render Free: build npm run build, start npm start, health /healthz. APP_URL is the assigned HTTPS origin. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN privately for persistent accounts, form records and attachments. Configure EMAIL_SERVER and EMAIL_FROM for the verified sender. Brevo supports port 2525 with required STARTTLS; BREVO_API_KEY enables HTTPS email delivery.

Initial owner setup: ADMIN_BOOTSTRAP_EMAIL creates an account requiring an email password reset before sign-in. Existing passwords are not replaced. Remove this setting after initial setup. No passwords, keys or private account data are included.

Fixture tests cover signup, login, single-use password reset, session revocation, database persistence, attachments and email retry behavior.
