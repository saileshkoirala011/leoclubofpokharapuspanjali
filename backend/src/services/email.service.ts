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
       <p><a href="${url}" style="background:#c9a84c;color:#0a1628;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:700;">Verify Email</a></p>
       <p>If you didn't create an account, you can ignore this email.</p>`,
    );
  }

  async sendPasswordReset(to: string, token: string, name: string): Promise<void> {
    const url = `${env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.send(
      to,
      "Reset your password — Leo Club Puspanjali",
      `<p>Hi ${name},</p>
       <p>You requested a password reset. Click below — the link expires in ${env.RESET_TOKEN_EXPIRES_MINUTES} minutes.</p>
       <p><a href="${url}" style="background:#c9a84c;color:#0a1628;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:700;">Reset Password</a></p>
       <p>If you didn't request this, please ignore and your password will remain unchanged.</p>`,
    );
  }

  async sendPasswordChanged(to: string, name: string): Promise<void> {
    await this.send(
      to,
      "Your password was changed — Leo Club Puspanjali",
      `<p>Hi ${name},</p>
       <p>Your password was successfully changed. If this wasn't you, please contact us immediately.</p>`,
    );
  }
}

export const emailService = new EmailService();
