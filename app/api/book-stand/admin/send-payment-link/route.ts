import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import nodemailer from "nodemailer";
import fs from 'fs';
import path from 'path';
import https from 'https';

const prisma = new PrismaClient();

// Function to get image as base64
async function getImageAsBase64(imagePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if the path is a URL or a local file
    if (imagePath.startsWith('http')) {
      https.get(imagePath, (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');
          const mimeType = response.headers['content-type'] || 'image/png';
          resolve(`data:${mimeType};base64,${base64}`);
        });
        response.on('error', reject);
      }).on('error', reject);
    } else {
      // Local file
      fs.readFile(imagePath, (err, data) => {
        if (err) reject(err);
        else {
          const base64 = data.toString('base64');
          const ext = path.extname(imagePath).substring(1);
          const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
          resolve(`data:${mimeType};base64,${base64}`);
        }
      });
    }
  });
}

// Configure email transporter for MailerSend
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export async function POST(request: Request) {
  try {
    console.log("Starting payment link sending process");

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { referenceId } = body;
    console.log("Received reference ID:", referenceId);

    // Validate required fields
    if (!referenceId) {
      console.log("Missing reference ID");
      return NextResponse.json(
        { error: "Missing reference ID" },
        { status: 400 }
      );
    }

    // Find the book stand record
    console.log("Looking up book stand with reference ID:", referenceId);
    const bookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    if (!bookStand) {
      console.log("Book stand not found for reference ID:", referenceId);
      return NextResponse.json(
        { error: "Book stand not found" },
        { status: 404 }
      );
    }

    console.log("Found book stand:", bookStand);

    if (!bookStand.admin_confirmed) {
      console.log("Book stand not confirmed by admin");
      return NextResponse.json(
        { error: "Book stand must be confirmed by admin first" },
        { status: 400 }
      );
    }

    // Generate payment link (you should replace this with your actual payment link generation logic)
    const paymentLink = `${process.env.NEXT_PUBLIC_APP_URL}/payment/${referenceId}`;
    console.log("Generated payment link:", paymentLink);

    try {
      // Send email with payment link
      console.log("Attempting to send email to:", bookStand.email);
      console.log("Using SMTP configuration:", {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        from: process.env.SMTP_FROM
      });
      
      // Create a simplified HTML email without complex styling
      const htmlContent = `
     <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NIBF Stand Booking Payment</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1d2054;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      background-image: url('https://www.easyrecharge.com.ng/pattern-bg.png');
      background-repeat: repeat;
      background-size: 200px;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #1d2054 0%, #2a2d6a 100%);
      border-radius: 8px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px rgba(29, 32, 84, 0.15);
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('https://www.easyrecharge.com.ng/past-highlight/NIBF-2021-pic.webp');
      background-size: cover;
      background-position: center;
      opacity: 0.15;
      z-index: 0;
    }
    .header-content {
      position: relative;
      z-index: 1;
    }
    .logo {
      max-width: 220px;
      height: auto;
      margin-bottom: 20px;
      filter: brightness(0) invert(1);
    }
    .content {
      background-color: #ffffff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(29, 32, 84, 0.08);
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #d63131 0%, #c62828 100%);
      color: white;
      text-decoration: none;
      padding: 15px 35px;
      border-radius: 6px;
      font-weight: 500;
      margin: 25px 0;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 14px;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(214, 49, 49, 0.2);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #edf2f7;
      font-size: 13px;
      color: #718096;
    }
    .highlight {
      background-color: #f8fafc;
      padding: 25px;
      border-left: 4px solid #d63131;
      margin: 30px 0;
      border-radius: 0 6px 6px 0;
    }
    h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    p {
      margin: 0 0 20px 0;
      font-size: 15px;
      line-height: 1.7;
    }
    .highlight p {
      margin: 8px 0;
    }
    .highlight strong {
      color: #1d2054;
    }
    .payment-link {
      background-color: #f8fafc;
      padding: 15px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 13px;
      color: #1d2054;
      word-break: break-all;
      margin: 20px 0;
      border: 1px solid rgba(29, 32, 84, 0.1);
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #edf2f7;
    }
    .signature p {
      margin: 5px 0;
    }
    strong {
      color: #1d2054;
    }
    .past-highlights {
      margin: 30px 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .highlight-image {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(29, 32, 84, 0.1);
    }
    .highlight-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .highlight-image:hover img {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-content">
   
        <h1>NIBF Stand Booking Confirmation</h1>
      </div>
    </div>
    
    <div class="content">
      <p>Dear <strong>${bookStand.contact_name}</strong>,</p>
      
      <p>We are delighted to confirm your approved stand booking for the National Book Fair. Your participation will contribute significantly to this prestigious event.</p>
      
      <div class="highlight">
        <p><strong>Booking Details:</strong></p>
        <p>Reference ID: <strong>${bookStand.reference_id}</strong></p>
        <p>Company: <strong>${bookStand.company_name}</strong></p>
        <p>Stand Type: <strong>${bookStand.stand_type}</strong></p>
      </div>
      
      <p>To finalize your booking, please complete the payment process using our secure payment portal:</p>
      
      <div style="text-align: center;  color: #ffffff;">
        <a href="${paymentLink}" class="button">Proceed to Payment</a>
      </div>
      
      <p>For your convenience, you may also use this secure payment link:</p>
      <div class="payment-link">${paymentLink}</div>
      
      <p>Our dedicated support team is available to assist you with any inquiries or requirements you may have.</p>
      
      <div class="signature">
        <p>We look forward to your distinguished presence at the National Book Fair.</p>
        <p>Best regards,<br>
        <strong>The NIBF Team</strong></p>
      </div>
    </div>
    
    <div class="footer">
      <p>This is an automated message. Please do not reply directly to this email.</p>
      <p>&copy; ${new Date().getFullYear()} National Book Fair. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `;

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: bookStand.email,
        subject: "Payment Link for NIBF Stand Booking",
        html: htmlContent,
      });
      
      console.log("Email sent successfully to:", bookStand.email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      console.error("Email error details:", {
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
        stack: emailError instanceof Error ? emailError.stack : undefined,
        code: emailError && typeof emailError === 'object' && 'code' in emailError 
          ? (emailError as { code: string }).code 
          : undefined
      });
      // Continue with the process even if email fails
    }

    // Update the book stand status
    console.log("Updating book stand status to payment_pending");
    await prisma.bookStand.update({
      where: { reference_id: referenceId },
      data: {
        status: "payment_pending",
      },
    });
    console.log("Book stand status updated successfully");

    return NextResponse.json(
      {
        message: "Payment link sent successfully",
        bookStand: {
          id: bookStand.id,
          referenceId: bookStand.reference_id,
          companyName: bookStand.company_name,
          contactName: bookStand.contact_name,
          email: bookStand.email,
          phone: bookStand.phone,
          standType: bookStand.stand_type,
          paymentMethod: bookStand.payment_method,
          additionalRequirements: bookStand.additional_requirements,
          status: "payment_pending",
          adminConfirmed: bookStand.admin_confirmed,
          createdAt: bookStand.created_at,
          updatedAt: new Date(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending payment link:", error);
    return NextResponse.json(
      {
        error: "Failed to send payment link",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma connection is closed
    await prisma.$disconnect();
  }
}
