import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, subject, message, plain } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ ok: false, error: "Missing required fields" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res
      .status(500)
      .json({
        ok: false,
        error: "Server misconfiguration: BOT_TOKEN/CHAT_ID missing",
      });
  }

  const telegramAPI = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  // Build message
  const text = plain
    ? `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nReceived: ${new Date().toLocaleString()}`
    : `🌟 *New Contact Form Submission* 🌟\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📝 *Subject:* ${subject}\n\n💬 *Message:*\n${message}\n\n---\n📅 *Received:* ${new Date().toLocaleString()}`;

  try {
    const payload: any = {
      chat_id: CHAT_ID,
      text,
    };

    if (!plain) payload.parse_mode = "Markdown";

    const response = await fetch(telegramAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.ok) {
      return res.status(200).json({ ok: true });
    }

    console.error("Telegram API Error:", result);
    return res.status(502).json({ ok: false, error: "Telegram API error" });
  } catch (err) {
    console.error("Error sending to Telegram:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
