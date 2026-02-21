const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send Contact Form Email to Admin
const sendContactEmail = async (contactData) => {
  const transporter = createTransporter();

  const adminMailOptions = {
    from: `"SK Printers Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `📬 New Contact Message: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">SK Printers</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">New Contact Message Received</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #1d4ed8; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151; width: 35%;">Name</td>
              <td style="padding: 12px; color: #111827;">${contactData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px; color: #111827;"><a href="mailto:${contactData.email}" style="color: #2563eb;">${contactData.email}</a></td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151;">Phone</td>
              <td style="padding: 12px; color: #111827;">${contactData.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Subject</td>
              <td style="padding: 12px; color: #111827;">${contactData.subject}</td>
            </tr>
          </table>
          
          <h3 style="color: #374151; margin-top: 20px;">Message:</h3>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">${contactData.message}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="mailto:${contactData.email}" style="background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reply to ${contactData.name}
          </a>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          This email was sent from your SK Printers website contact form.<br>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts" style="color: #2563eb;">View in Admin Panel</a>
        </p>
      </div>
    `,
  };

  // Auto-reply to customer
  const customerMailOptions = {
    from: `"SK Printers" <${process.env.EMAIL_USER}>`,
    to: contactData.email,
    subject: `Thank you for contacting SK Printers!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">SK Printers</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Thank You for Reaching Out!</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #111827;">Dear ${contactData.name},</h2>
          <p style="color: #374151; line-height: 1.6;">Thank you for contacting SK Printers. We have received your message and will get back to you within <strong>24 hours</strong>.</p>
          
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1d4ed8; margin-top: 0;">Your Message Summary:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Subject:</strong> ${contactData.subject}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Message:</strong> ${contactData.message}</p>
          </div>
          
          <p style="color: #374151;">For urgent inquiries, please call us directly:</p>
          <p style="font-size: 20px; font-weight: bold; color: #2563eb;">+91 98765-43210</p>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          © 2024 SK Printers. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(customerMailOptions);
};

// Send Quote Request Email to Admin
const sendQuoteEmail = async (quoteData) => {
  const transporter = createTransporter();

  const adminMailOptions = {
    from: `"SK Printers Website" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `💼 New Quote Request from ${quoteData.name} - ${quoteData.company || 'Individual'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">SK Printers</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">🎯 New Quote Request!</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #1d4ed8; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151; width: 35%;">Name</td>
              <td style="padding: 12px; color: #111827;">${quoteData.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px;"><a href="mailto:${quoteData.email}" style="color: #2563eb;">${quoteData.email}</a></td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151;">Phone</td>
              <td style="padding: 12px; color: #111827;">${quoteData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Company</td>
              <td style="padding: 12px; color: #111827;">${quoteData.company || 'Not provided'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #1d4ed8; margin-top: 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Box Requirements</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151; width: 35%;">Box Type</td>
              <td style="padding: 12px; color: #111827; font-weight: bold; color: #2563eb;">${quoteData.boxType}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Quantity</td>
              <td style="padding: 12px; color: #111827; font-weight: bold;">${quoteData.quantity} units</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151;">Dimensions</td>
              <td style="padding: 12px; color: #111827;">${quoteData.length || '-'} × ${quoteData.width || '-'} × ${quoteData.height || '-'} cm</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: bold; color: #374151;">Printing</td>
              <td style="padding: 12px; color: #111827;">${quoteData.printing ? `Yes - ${quoteData.printColors} colors` : 'No printing'}</td>
            </tr>
            ${quoteData.specialRequirements ? `
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; font-weight: bold; color: #374151;">Special Requirements</td>
              <td style="padding: 12px; color: #111827;">${quoteData.specialRequirements}</td>
            </tr>` : ''}
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
          <a href="mailto:${quoteData.email}" style="background: #2563eb; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin: 5px;">
            Reply to Customer
          </a>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes" style="background: #059669; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin: 5px;">
            View in Admin Panel
          </a>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          This quote request was submitted on ${new Date().toLocaleString('en-IN')}
        </p>
      </div>
    `,
  };

  // Auto-reply to customer
  const customerMailOptions = {
    from: `"SK Printers" <${process.env.EMAIL_USER}>`,
    to: quoteData.email,
    subject: `Your Quote Request Received - SK Printers`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0;">SK Printers</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0;">Quote Request Received!</p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <h2 style="color: #111827;">Dear ${quoteData.name},</h2>
          <p style="color: #374151; line-height: 1.6;">Thank you for your quote request! We have received your requirements and our team will prepare a customized quote for you within <strong>24-48 hours</strong>.</p>
          
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1d4ed8; margin-top: 0;">Your Requirements Summary:</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Box Type:</strong> ${quoteData.boxType}</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Quantity:</strong> ${quoteData.quantity} units</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Printing:</strong> ${quoteData.printing ? 'Yes' : 'No'}</p>
          </div>
          
          <p style="color: #374151;">For urgent requirements, contact us directly:</p>
          <p style="font-size: 20px; font-weight: bold; color: #2563eb;">+91 98765-43210</p>
          <p style="color: #374151;">Email: <a href="mailto:info@skprinters.com" style="color: #2563eb;">info@skprinters.com</a></p>
        </div>
        
        <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
          © 2024 SK Printers. All rights reserved.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(adminMailOptions);
  await transporter.sendMail(customerMailOptions);
};

module.exports = { sendContactEmail, sendQuoteEmail };
