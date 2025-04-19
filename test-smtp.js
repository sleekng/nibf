require('dotenv').config();
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 2525, // Use port 2525 as alternative
  secure: false, // TLS for port 2525
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  },
  debug: true // Enable debug logging
});

async function testSMTP() {
  try {
    console.log('Testing SMTP connection...');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port: 2525');
    console.log('SMTP User:', process.env.SMTP_USER);
    console.log('SMTP From:', process.env.SMTP_FROM);
    
    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified successfully!');
    
    // Try sending a test email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'test@example.com',
      subject: 'SMTP Test',
      text: 'This is a test email to verify SMTP configuration',
      headers: {
        'X-Mailer': 'NIBF Test'
      }
    });
    
    console.log('Test email sent successfully:', info.messageId);
  } catch (error) {
    console.error('SMTP test failed:', error);
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
  }
}

testSMTP(); 