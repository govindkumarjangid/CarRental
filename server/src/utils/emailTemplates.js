const BRAND_NAME = "CarRental";
const BRAND_COLOR = "#2563EB"; // Blue from frontend
const BRAND_DARK = "#131414"; // Main bg from frontend
const ACCENT_COLOR = "#3B82F6"; // Lighter blue for accents
const SECONDARY_DARK = "#1E1E1E";
const BRAND_LOGO = "https://img.icons8.com/ios-filled/50/ffffff/car.png"; // Professional car icon

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${BRAND_NAME}</title>
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    /* Mobile Responsive */
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 16px 0 !important; }
      .email-container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
      .email-header { padding: 24px 20px !important; }
      .email-header h1 { font-size: 22px !important; }
      .email-content { padding: 24px 20px !important; }
      .email-footer { padding: 20px !important; }
      .content-heading { font-size: 20px !important; }
      .content-text { font-size: 14px !important; }
      .feature-box { padding: 16px !important; }
      .detail-card-cell { padding: 14px 16px !important; }
      .price-value { font-size: 18px !important; }
      .col-half { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
      .col-half-last { padding-bottom: 0 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family: 'Outfit', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" class="email-wrapper" style="padding: 40px 12px;">

        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:${BRAND_DARK}; border-radius:16px; overflow:hidden; border: 1px solid rgba(37, 99, 235, 0.15);">

          <!-- Header -->
          <tr>
            <td class="email-header" style="background: linear-gradient(135deg, ${BRAND_COLOR}, #1D4ED8); padding: 32px 40px; text-align:center;">
              <img src="${BRAND_LOGO}" alt="${BRAND_NAME} Logo" width="40" height="40" style="margin-bottom: 12px;" />
              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700; letter-spacing:1px; line-height:1;">
                ${BRAND_NAME}
              </h1>
              <p style="margin:8px 0 0; color:rgba(255,255,255,0.8); font-size:10px; letter-spacing:2px; text-transform:uppercase;">
                Premium Car Rental Service
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="email-content" style="padding: 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer" style="background-color:#0d0d0d; padding: 24px 40px; text-align:center; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin:0 0 8px; color:rgba(255,255,255,0.4); font-size:12px;">
                © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
              </p>
              <p style="margin:0; color:rgba(255,255,255,0.2); font-size:11px;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

// Welcome / Registration Email
export const welcomeEmailTemplate = (name) => {
  const content = `
    <h2 class="content-heading" style="margin:0 0 8px; color:#ffffff; font-size:24px; font-weight:600;">
      Welcome aboard, ${name}! 🎉
    </h2>
    <p class="content-text" style="color:rgba(255,255,255,0.6); font-size:15px; line-height:1.7; margin:0 0 24px;">
      Your account has been created successfully. You're now part of the ${BRAND_NAME} family — where every journey begins with the perfect ride.
    </p>

    <!-- Features Box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td class="feature-box" style="background: rgba(37, 99, 235, 0.05); border:1px solid rgba(37, 99, 235, 0.2); border-radius:12px; padding:24px;">
          <p style="margin:0 0 12px; color:${ACCENT_COLOR}; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
            What you can do now
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Browse premium cars</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Book instantly — online or offline</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Chat directly with car owners</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Leave reviews & share your experience</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:rgba(255,255,255,0.5); font-size:13px; line-height:1.6; margin:0;">
      If you have any questions, feel free to reach out. We're always here to help!
    </p>
  `;
  return baseLayout(content);
};

// New Booking Email
export const bookingEmailTemplate = ({ userName, carName, pickupDate, returnDate, price, paymentMethod, location, carImage, fuelType, transmission, seatingCapacity }) => {
  const content = `
    <h2 class="content-heading" style="margin:0 0 8px; color:#ffffff; font-size:24px; font-weight:600;">
      Booking Received! 📋
    </h2>
    <p class="content-text" style="color:rgba(255,255,255,0.6); font-size:15px; line-height:1.7; margin:0 0 24px;">
      Hi <strong style="color:#fff;">${userName}</strong>, your booking request has been submitted.
    </p>

    <!-- Booking Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; margin-bottom:28px;">
      ${carImage ? `
      <tr>
        <td style="padding:0;">
          <img src="${carImage}" alt="${carName}" style="width:100%; height:auto; display:block; border-bottom:1px solid rgba(255,255,255,0.08);" />
        </td>
      </tr>
      ` : ''}
      <tr>
        <td class="detail-card-cell" style="padding:20px 24px;">
          <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase; letter-spacing:1px;">Car Details</p>
          <p class="detail-value" style="margin:4px 0 0; color:#ffffff; font-size:18px; font-weight:700;">${carName}</p>
          
          ${location ? `
          <p style="margin:8px 0 0; color:rgba(255,255,255,0.6); font-size:13px;">
            📍 Location: <span style="color:#fff;">${location}</span>
          </p>
          ` : ''}
        </td>
      </tr>

      <!-- Specs Row -->
      <tr>
        <td style="padding:0 24px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03); border-radius:8px; padding:12px;">
            <tr>
              <td align="center" style="color:rgba(255,255,255,0.7); font-size:12px;">
                ⛽ ${fuelType || 'Petrol/Diesel'}
              </td>
              <td align="center" style="color:rgba(255,255,255,0.7); font-size:12px;">
                ⚙️ ${transmission || 'Manual'}
              </td>
              <td align="center" style="color:rgba(255,255,255,0.7); font-size:12px;">
                👥 ${seatingCapacity || '5'} Seater
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 24px; border-top:1px solid rgba(255,255,255,0.05);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Pickup</p>
                <p style="margin:4px 0 0; color:#ffffff; font-size:14px;">${new Date(pickupDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </td>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Return</p>
                <p style="margin:4px 0 0; color:#ffffff; font-size:14px;">${new Date(returnDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </td>
            </tr>
            <tr>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Total Price</p>
                <p style="margin:4px 0 0; color:${BRAND_COLOR}; font-size:22px; font-weight:800;">₹${price}</p>
              </td>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Payment</p>
                <span style="display:inline-block; margin-top:4px; background:${paymentMethod === 'online' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255,183,77,0.15)'}; color:${paymentMethod === 'online' ? BRAND_COLOR : '#FFB74D'}; padding:4px 12px; border-radius:6px; font-size:12px; font-weight:700; text-transform:uppercase;">
                  ${paymentMethod}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:rgba(255,255,255,0.5); font-size:13px; line-height:1.6; margin:0;">
      Your booking status is currently <strong style="color:#FFB74D;">Pending</strong>. You will receive a confirmation email once the owner approves it.
    </p>
  `;
  return baseLayout(content);
};

// Booking Confirmation Email
export const bookingConfirmationTemplate = ({ userName, carName, pickupDate, returnDate, price, bookingId, location, carImage, fuelType, transmission, seatingCapacity }) => {
  const content = `
    <div style="text-align:center; margin-bottom:24px;">
      <div style="display:inline-block; background:rgba(37, 99, 235, 0.1); border:2px solid ${BRAND_COLOR}; border-radius:50%; width:64px; height:64px; line-height:64px; text-align:center; font-size:28px;">
        ✅
      </div>
    </div>

    <h2 class="content-heading" style="margin:0 0 8px; color:#ffffff; font-size:24px; font-weight:600; text-align:center;">
      Booking Confirmed!
    </h2>
    <p class="content-text" style="color:rgba(255,255,255,0.6); font-size:15px; line-height:1.7; margin:0 0 28px; text-align:center;">
      Great news, <strong style="color:#fff;">${userName}</strong>! Your booking has been confirmed. Get ready for an amazing ride! 🚀
    </p>

    <!-- Confirmation Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(255,255,255,0.03); border:1px solid ${BRAND_COLOR}40; border-radius:16px; overflow:hidden; margin-bottom:28px;">
      ${carImage ? `
      <tr>
        <td style="padding:0;">
          <img src="${carImage}" alt="${carName}" style="width:100%; height:auto; display:block;" />
        </td>
      </tr>
      ` : ''}
      
      <tr>
        <td style="padding:24px;">
          <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase; text-align:center;">Booking ID</p>
          <p style="margin:4px 0 20px; color:${BRAND_COLOR}; font-size:16px; font-weight:700; font-family:monospace; text-align:center;">${bookingId}</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(255,255,255,0.05); padding-top:20px;">
            <tr>
              <td colspan="2" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Car</p>
                <p style="margin:4px 0 0; color:#ffffff; font-size:18px; font-weight:700;">${carName}</p>
                ${location ? `<p style="margin:4px 0 0; color:rgba(255,255,255,0.6); font-size:13px;">📍 ${location}</p>` : ''}
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Dates</p>
                <p style="margin:4px 0 0; color:#ffffff; font-size:14px;">${new Date(pickupDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} - ${new Date(returnDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              </td>
              <td width="50%" style="padding-bottom:16px; text-align:right;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase;">Amount Paid</p>
                <p style="margin:4px 0 0; color:${BRAND_COLOR}; font-size:20px; font-weight:800;">₹${price}</p>
              </td>
            </tr>
          </table>

          <div style="background:rgba(37, 99, 235, 0.05); border-radius:8px; padding:16px; margin-top:8px;">
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="color:rgba(255,255,255,0.7); font-size:13px;">⛽ ${fuelType || 'Petrol'}</td>
                <td style="color:rgba(255,255,255,0.7); font-size:13px; text-align:center;">⚙️ ${transmission || 'Auto'}</td>
                <td style="color:rgba(255,255,255,0.7); font-size:13px; text-align:right;">👥 ${seatingCapacity || '5'} Seats</td>
              </tr>
             </table>
          </div>
        </td>
      </tr>
      
      <tr>
        <td style="padding:16px; background:${BRAND_COLOR}; text-align:center;">
          <span style="color:#ffffff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">
            ✓ Booking Confirmed
          </span>
        </td>
      </tr>
    </table>

    <p style="color:rgba(255,255,255,0.5); font-size:13px; line-height:1.6; margin:0; text-align:center;">
      Please make sure to be at the pickup location on time. Have a great trip! 🎉
    </p>
  `;
  return baseLayout(content);
};