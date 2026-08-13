import nodemailer, { type Transporter } from "nodemailer";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:   env.SMTP_HOST,
      port:   env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth:   env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    });
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: env.SMTP_FROM,
        to,
        subject,
        html,
      });
      logger.info({ messageId: info.messageId, to }, "Email sent");
    } catch (err) {
      logger.error({ err, to, subject }, "Failed to send email");
      // Non-fatal — don't throw; log and continue
    }
  }

  async sendVerification(to: string, token: string, name: string): Promise<void> {
    const url = `${env.FRONTEND_URL}/verify-email?token=${token}`;
    await this.send(
      to,
      "Verify your email — Leo Club Puspanjali",
      `<p>Hi ${name},</p>
       <p>Please verify your email by clicking the link below. It expires in 24 hours.</p>
       <p><a href="${url}" style="background:#1B3A6B;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Verify Email</a></p>
       <p style="color:#64748B;font-size:14px;">If you didn't create an account, you can safely ignore this email.</p>`,
    );
  }

  async sendPasswordReset(to: string, token: string, name: string): Promise<void> {
    const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.send(
      to,
      "Reset your password — Leo Club Puspanjali",
      `<p>Hi ${name},</p>
       <p>You requested a password reset. Click below — the link expires in ${env.RESET_TOKEN_EXPIRES_MINUTES} minutes.</p>
       <p><a href="${url}" style="background:#C8102E;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Reset Password</a></p>
       <p style="color:#64748B;font-size:14px;">If you didn't request this, your password will remain unchanged.</p>`,
    );
  }

  async sendPasswordChanged(to: string, name: string): Promise<void> {
    await this.send(
      to,
      "Your password was changed — Leo Club Puspanjali",
      `<p>Hi ${name},</p>
       <p>Your password was successfully changed.</p>
       <p style="color:#C8102E;font-weight:600;">If this wasn't you, please contact us immediately.</p>`,
    );
  }

  async sendContactNotification(
    to: string,
    senderName: string,
    senderEmail: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.send(
      to,
      `New Contact Form: ${subject}`,
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,64,175,0.10);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0D2146 0%,#1B3A6B 100%);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
              📬 New Contact Message
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">
              Leo Club of Pokhara Puspanjali
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <!-- Sender details -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#EBF3FF;border-radius:12px;margin-bottom:24px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.2px;">From</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#1B3A6B;">${senderName}</p>
                  <p style="margin:4px 0 0;font-size:14px;color:#64748B;">
                    <a href="mailto:${senderEmail}" style="color:#4A7FD4;text-decoration:none;">${senderEmail}</a>
                  </p>
                </td>
              </tr>
            </table>
            <!-- Subject -->
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.2px;">Subject</p>
            <p style="margin:0 0 24px;font-size:17px;font-weight:700;color:#1E293B;">${subject}</p>
            <!-- Message -->
            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:1.2px;">Message</p>
            <div style="background:#F8FAFC;border:1px solid #D6EAF8;border-radius:12px;padding:20px 24px;">
              <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>
            <!-- Reply CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td align="center">
                  <a href="mailto:${senderEmail}?subject=Re: ${encodeURIComponent(subject)}"
                     style="display:inline-block;background:#1B3A6B;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;">
                    Reply to ${senderName} →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #D6EAF8;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94A3B8;">
              This notification was sent from the contact form at leoclubpokharapuspanjali.org
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    );
  }

  async sendContactAutoReply(
    to: string,
    senderName: string,
    subject: string,
  ): Promise<void> {
    await this.send(
      to,
      `We received your message — Leo Club Puspanjali`,
      `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,64,175,0.10);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0D2146 0%,#1B3A6B 100%);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
              Thank You, ${senderName}!
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">
              We've received your message
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
              Hi <strong>${senderName}</strong>,
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
              Thank you for reaching out to the <strong>Leo Club of Pokhara Puspanjali</strong>.
              We've received your message regarding "<strong>${subject}</strong>" and a member
              of our team will get back to you as soon as possible.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
              In the meantime, feel free to follow us on social media or visit our website
              to learn more about our work and upcoming events.
            </p>
            <!-- Divider -->
            <hr style="border:none;border-top:1px solid #D6EAF8;margin:0 0 28px;">
            <!-- Values row -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="padding:0 8px 0 0;text-align:center;">
                  <div style="background:#EBF3FF;border-radius:12px;padding:16px 12px;">
                    <p style="margin:0;font-size:22px;">🤝</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#1B3A6B;">Service</p>
                  </div>
                </td>
                <td width="33%" style="padding:0 4px;text-align:center;">
                  <div style="background:#EBF3FF;border-radius:12px;padding:16px 12px;">
                    <p style="margin:0;font-size:22px;">💡</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#1B3A6B;">Leadership</p>
                  </div>
                </td>
                <td width="33%" style="padding:0 0 0 8px;text-align:center;">
                  <div style="background:#EBF3FF;border-radius:12px;padding:16px 12px;">
                    <p style="margin:0;font-size:22px;">🌍</p>
                    <p style="margin:8px 0 0;font-size:12px;font-weight:700;color:#1B3A6B;">Impact</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F8FAFC;border-top:1px solid #D6EAF8;padding:20px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#1B3A6B;">Leo Club of Pokhara Puspanjali</p>
            <p style="margin:0;font-size:12px;color:#94A3B8;">Pokhara, Kaski, Nepal &nbsp;·&nbsp; Lead. Serve. Inspire.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    );
  }
}

export const emailService = new EmailService();
