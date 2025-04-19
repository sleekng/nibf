import nodemailer from "nodemailer";

// Configure email transporter
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
    rejectUnauthorized: false
  }
});

// Interface for registration data
interface RegistrationData {
  registrationId: string;
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  ticketType: string;
}



// Function to send registration confirmation email
export const sendForeignTradeRegistrationConfirmationEmail = async (registration: RegistrationData): Promise<void> => {
  try {

    // Email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>NIBF 2026 Registration Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #1a365d;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .header-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 15px;
          }
          .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .qr-code {
            text-align: center;
            margin: 20px 0;
          }
          .qr-code img {
            max-width: 200px;
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 5px;
          }
          .details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .details p {
            margin: 5px 0;
          }
          .button {
            display: inline-block;
            background-color: #c53030;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .signature {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <!-- Logo with fallback -->
             
              <h1>NIBF 2026 Registration Confirmation</h1>
            </div>
          </div>
          
          <div class="content">
            <p>Dear <strong>${registration.firstName} ${registration.lastName}</strong>,</p>
            <p>Thank you for registering for the Nigeria International Book Fair 2026. Your registration has been confirmed.</p>
            
            <div class="details">
              <h3>Registration Details</h3>
              <p><strong>Registration ID:</strong> ${registration.registrationId}</p>
              <p><strong>Name:</strong> ${registration.firstName} ${registration.lastName}</p>
              ${registration.organization ? `<p><strong>Organization:</strong> ${registration.organization}</p>` : ''}
              <p><strong>Ticket Type:</strong> ${registration.ticketType}</p>
              <p><strong>Event Date:</strong> May 7-9, 2026</p>
              <p><strong>Venue:</strong> Balmoral Convention Centre, Lagos</p>
            </div>
            
            <p>If you haven't made your payment yet, please click the button below to complete your payment. If you have already paid, you can ignore this message.</p>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/registration-tag?registrationId=${registration.registrationId}" style="background-color: #c53030; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Complete Payment</a>
            </div>
            
            <p>Once your payment is confirmed, you can print your registration tag by visiting our website:</p>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/registration-tag?registrationId=${registration.registrationId}" style="background-color: #c53030; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Print Registration Tag</a>
            </div>
            
            <div class="signature">
              <p>If you have any questions, please contact us at <a href="mailto:support@nibfng.org">support@nibfng.org</a>.</p>
              <p>Best regards,<br>
              <strong>The NIBF Team</strong></p>
            </div>
          </div>
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} Nigeria International Book Fair. All rights reserved.</p>
            <p>This is an automated email, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Verify SMTP configuration before sending
    console.log('Verifying SMTP configuration...');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('SMTP User:', process.env.SMTP_USER);
    console.log('SMTP From:', process.env.SMTP_FROM);
    
    // Verify transporter connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP connection verification failed:', verifyError);
      throw new Error(`SMTP connection failed: ${verifyError instanceof Error ? verifyError.message : 'Unknown error'}`);
    }
    
    // Send email
    console.log(`Attempting to send email to ${registration.email}...`);
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: registration.email,
      subject: "NIBF 2026 Registration Confirmation",
      html: emailContent,
    });
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: registration.email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending confirmation email:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      registrationId: registration.registrationId,
      email: registration.email,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
};