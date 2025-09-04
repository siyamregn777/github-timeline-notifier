import { supabase } from "../models/supabaseClient.js";
import axios from "axios";
import nodemailer from "nodemailer";
import { parseStringPromise } from "xml2js";

// 1️⃣ Save subscriber email
export const addSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const { error } = await supabase.from("subscribers").insert([{ email }]);
    if (error) throw error;

    res.status(201).json({ message: "Subscriber added successfully" });
  } catch (err) {
    next(err);
  }
};

// 2️⃣ Fetch GitHub timeline and send updates
export const sendUpdates = async (req, res, next) => {
  try {
    // Get all subscribers
    const { data: subscribers, error } = await supabase
      .from("subscribers")
      .select("*");
    if (error) throw error;
    if (!subscribers.length) {
      return res.status(200).json({ message: "No subscribers" });
    }

    // Fetch GitHub timeline (Atom feed XML)
    const githubRes = await axios.get("https://github.com/timeline", {
      headers: { Accept: "application/atom+xml" },
    });

    // Parse XML to JSON
    const parsed = await parseStringPromise(githubRes.data);

    // Take 3–5 latest updates
    const entries = parsed.feed.entry.slice(0, 5);

    // Prepare a short update message
    let message = "🚀 Latest GitHub Timeline Updates:\n\n";
    entries.forEach((entry, i) => {
      message += `${i + 1}. ${entry.title[0]} — by ${entry.author[0].name[0]}\n`;
    });

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // Gmail
        pass: process.env.SMTP_PASS, // App Password
      },
    });

    // Send to each subscriber
    for (const s of subscribers) {
      await transporter.sendMail({
        from: `"GitHub Updates" <${process.env.SMTP_USER}>`,
        to: s.email,
        subject: "Your GitHub Timeline Updates",
        text: message,
      });
    }

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error("❌ Error in sendUpdates:", err);
    next(err);
  }
};
