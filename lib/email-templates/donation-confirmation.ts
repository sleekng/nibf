interface DonationConfirmationEmailProps {
  donorName: string;
  reference: string;
  amount: number;
  items: Array<{
    title: string;
    quantity: number;
    price: number;
  }>;
}

export function generateDonationConfirmationEmail({
  donorName,
  reference,
  amount,
  items,
}: DonationConfirmationEmailProps) {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Donation Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 8px 8px;
          }
          .section {
            margin-bottom: 20px;
            padding: 15px;
            background: #f9fafb;
            border-radius: 6px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          .total {
            font-weight: bold;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #e5e7eb;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You for Your Donation!</h1>
        </div>
        <div class="content">
          <p>Dear ${donorName},</p>
          <p>Thank you for your generous donation to the Nigerian International Book Fair. Your support helps us promote literacy and education in Nigeria.</p>
          
          <div class="section">
            <h2>Donation Details</h2>
            <p><strong>Reference Number:</strong> ${reference}</p>
            <p><strong>Total Amount:</strong> ₦${totalAmount.toLocaleString()}</p>
          </div>

          <div class="section">
            <h2>Donated Items</h2>
            ${items
              .map(
                (item) => `
              <div class="item">
                <span>${item.title} (x${item.quantity})</span>
                <span>₦${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            `
              )
              .join('')}
            <div class="total">
              <span>Total Amount</span>
              <span>₦${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p>If you have any questions about your donation, please contact our support team with your reference number.</p>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Nigerian International Book Fair. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
} 