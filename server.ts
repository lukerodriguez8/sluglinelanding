import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.warn("RESEND_API_KEY is missing. Email sending will be mocked.");
      return null;
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/notify", async (req, res) => {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    console.log(`Notification request for: ${email}`);

    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Welcome to the Waitlist | Slugline Studio",
          tags: [
            {
              name: "category",
              value: "slugline-interest-auto-reply",
            },
          ],
          html: `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Slugline Studio</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    :root { color-scheme: dark; }
    body { margin: 0; padding: 0; background-color: #000000; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    
    @media screen and (max-width: 600px) {
      .outer-pad { padding: 40px 16px !important; }
      .content { padding: 48px 24px !important; }
      .masthead-wrapper { margin-bottom: 48px !important; }
      .text-container { width: 100% !important; padding: 0 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000;">

  <div style="display: none; font-size: 1px; color: #000000; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Thanks for stepping in early. We're building this in the open.
    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="background-color: #000000;">
    <tr>
      <td class="outer-pad" align="center" style="background-color: #000000; padding: 100px 20px;">
        <table class="container" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #000000; border: 1px solid #ffffff; border-radius: 12px; overflow: hidden;">
          <tr>
            <td class="content" align="center" style="padding: 80px 40px; text-align: center;">
              
              <div class="masthead-wrapper" style="margin-bottom: 56px;">
                <div class="logo-mark" style="display: inline-block; width: 40px; height: 40px; line-height: 40px; background-color: #ffffff; border-radius: 4px; text-align: center; color: #000000; font-size: 24px; font-weight: bold; font-family: 'Neue Haas Grotesk Display', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; margin-bottom: 16px;">S</div>
                <div class="brand-name" style="display: block; color: #ffffff; font-size: 13px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Neue Haas Grotesk Display', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">SLUGLINE STUDIO</div>
              </div>
              
              <div class="text-container" style="max-width: 480px; margin: 0 auto; text-align: center;">
                
                <p style="margin: 0 0 32px 0; color: #ffffff; font-size: 16px; line-height: 1.5; font-weight: 400; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">
                  Thanks for stepping in early.
                </p>
                
                <p style="margin: 0 0 32px 0; color: #ffffff; font-size: 16px; line-height: 1.5; font-weight: 400; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">
                  We’re building this in the open,<br>
                  and we’ll keep you close as it takes shape.<br>
                  You’ll hear from us with occasional updates<br>
                  as the system evolves into what it’s built to do.
                </p>
                
                <p style="margin: 0 0 32px 0; color: #ffffff; font-size: 16px; line-height: 1.5; font-weight: 400; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">
                  We’re also running a small pilot right now<br>
                  with a handful of companies who feel the gap<br>
                  and want to explore a different way of working.
                </p>
                
                <p style="margin: 0 0 48px 0; color: #ffffff; font-size: 16px; line-height: 1.5; font-weight: 400; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">
                  If that’s you, just reply here. We’ll walk you through it.
                </p>
                
                <p style="margin: 0; color: #ffffff; font-size: 16px; line-height: 1.5; font-weight: 400; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;">
                  More soon.<br>
                  <strong>Team Slugline</strong>
                </p>

              </div>

              <div class="footer" style="margin-top: 80px; color: #444444; font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase; font-family: 'Neue Haas Grotesk Text', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; text-align: center;">
                &copy; 2026 SLUGLINE STUDIO. ALL RIGHTS RESERVED.
              </div>

            </td>
          </tr>
        </table>
        </td>
    </tr>
  </table>
</body>
</html>`,
        });
        return res.json({ success: true, message: "Email sent successfully" });
      } catch (error: any) {
        console.error("Resend error:", error);
        return res.status(500).json({ error: "Failed to send email", details: error.message });
      }
    } else {
      // Mock success if no API key
      console.log("Mocking email success (no API key provided)");
      return res.json({ success: true, message: "Email mocked (no API key)" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      res.sendFile(indexPath);
    });
  }

  const server = app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Handle shutdown gracefully
  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Process terminated");
    });
  });
}

startServer();
