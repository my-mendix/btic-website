// pages/api/verify-recaptcha.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { token } = req.body;
  if (!token) return res.status(400).json({ success: false, message: "No token" });

  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const captchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: "POST" }
    );
    const data = await captchaRes.json();
    if (!data.success) {
      return res.status(400).json({ success: false, message: "reCAPTCHA failed" });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return res.status(500).json({ success: false, message: "Server error" });

  }
}
