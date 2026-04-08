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
          from: "Slugline Studio <hello@slugline.studio>",
          to: email,
          subject: "Welcome to the Waitlist | Slugline Studio",
          tags: [
            {
              name: "category",
              value: "slugline-interest-auto-reply",
            },
          ],
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>Slugline Studio</title>
  <style>
    @media screen and (max-width: 600px) {
      .outer-pad { padding: 40px 20px !important; }
      .content { padding: 0 !important; }
      .text-body { font-size: 15px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#000000">
    <tr>
      <td class="outer-pad" align="center" style="padding: 60px 0;">
        
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
          <tr>
            <td class="content" align="center" style="padding: 0 40px; text-align: center;">
              
              <div style="margin-bottom: 48px;">
                <div style="display: inline-block; width: 40px; height: 40px; line-height: 40px; background-color: #ffffff; border-radius: 4px; color: #000000; font-size: 24px; font-weight: bold; text-align: center;">S</div>
                <div style="margin-top: 16px; color: #ffffff; font-size: 13px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;">SLUGLINE STUDIO</div>
              </div>
              
              <div class="text-body" style="color: #ffffff; font-size: 16px; line-height: 1.6; text-align: center; max-width: 440px; margin: 0 auto;">
                
                <p style="margin: 0 0 24px 0;">
                  Thanks for stepping in early.
                </p>
                
                <p style="margin: 0 0 24px 0;">
                  We’re building this in the open,<br>
                  and we’ll keep you close as it takes shape.<br>
                  You’ll hear from us with occasional updates<br>
                  as the system evolves into what it’s built to do.
                </p>
                
                <p style="margin: 0 0 24px 0;">
                  We’re also running a small pilot right now<br>
                  with a handful of companies who feel the gap<br>
                  and want to explore a different way of working.
                </p>
                
                <p style="margin: 0 0 32px 0;">
                  If that’s you, just reply here.<br>
                  We’ll walk you through it.
                </p>
                
                <p style="margin: 0;">
                  More soon.<br>
                  <strong style="font-weight: bold;">Team Slugline</strong>
                </p>

              </div>

              <div style="margin-top: 64px; color: #444444; font-size: 10px; letter-spacing: 0.05em; text-transform: uppercase;">
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
