const BRAND_NAME = "CarRental";
const BRAND_COLOR = "#6C63FF";
const BRAND_DARK = "#1a1a2e";
const ACCENT_COLOR = "#00D4AA";

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${BRAND_NAME}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
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
      .email-header p { font-size: 11px !important; }
      .email-content { padding: 24px 20px !important; }
      .email-footer { padding: 20px !important; }
      .content-heading { font-size: 20px !important; }
      .content-text { font-size: 14px !important; }
      .feature-box { padding: 16px !important; }
      .feature-item { font-size: 13px !important; }
      .detail-card-cell { padding: 14px 16px !important; }
      .detail-label { font-size: 11px !important; }
      .detail-value { font-size: 13px !important; }
      .price-value { font-size: 18px !important; }
      .big-price { font-size: 20px !important; }
      .col-half { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
      .col-half-last { padding-bottom: 0 !important; }
      .badge { font-size: 12px !important; padding: 3px 10px !important; }
      .confirm-icon { width: 52px !important; height: 52px !important; line-height: 52px !important; font-size: 24px !important; }
      .booking-id { font-size: 13px !important; word-break: break-all !important; }
      .status-badge { font-size: 12px !important; padding: 5px 16px !important; }
    }

    @media only screen and (max-width: 400px) {
      .email-content { padding: 20px 16px !important; }
      .content-heading { font-size: 18px !important; }
      .detail-card-cell { padding: 12px 14px !important; }
      .price-value { font-size: 16px !important; }
      .big-price { font-size: 18px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#0f0f1a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width:100%; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f1a;">
    <tr>
      <td align="center" class="email-wrapper" style="padding: 40px 12px;">

        <!--[if mso]>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" align="center"><tr><td>
        <![endif]-->

        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:${BRAND_DARK}; border-radius:16px; overflow:hidden; box-shadow: 0 20px 60px rgba(108,99,255,0.15);">

          <!-- Header -->
          <tr>
            <td class="email-header" style="background: linear-gradient(135deg, ${BRAND_COLOR}, #8b5cf6); padding: 32px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700; letter-spacing:1px;">
                🚗 ${BRAND_NAME}
              </h1>
              <p style="margin:6px 0 0; color:rgba(255,255,255,0.85); font-size:13px; letter-spacing:2px; text-transform:uppercase;">
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
            <td class="email-footer" style="background-color:#12121f; padding: 24px 40px; text-align:center; border-top: 1px solid rgba(108,99,255,0.2);">
              <p style="margin:0 0 8px; color:rgba(255,255,255,0.4); font-size:12px;">
                © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
              </p>
              <p style="margin:0; color:rgba(255,255,255,0.3); font-size:11px;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>

        <!--[if mso]>
        </td></tr></table>
        <![endif]-->

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
        <td class="feature-box" style="background: linear-gradient(135deg, rgba(108,99,255,0.12), rgba(0,212,170,0.08)); border:1px solid rgba(108,99,255,0.2); border-radius:12px; padding:24px;">
          <p style="margin:0 0 12px; color:${ACCENT_COLOR}; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
            What you can do now
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="feature-item" style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Browse premium cars</td>
            </tr>
            <tr>
              <td class="feature-item" style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Book instantly — online or offline</td>
            </tr>
            <tr>
              <td class="feature-item" style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Chat directly with car owners</td>
            </tr>
            <tr>
              <td class="feature-item" style="padding:6px 0; color:rgba(255,255,255,0.8); font-size:14px;">✅ Leave reviews & share your experience</td>
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

// New Booking Email (sent to user on booking creation)
export const bookingEmailTemplate = ({ userName, carName, pickupDate, returnDate, price, paymentMethod }) => {
  const content = `
    <h2 class="content-heading" style="margin:0 0 8px; color:#ffffff; font-size:24px; font-weight:600;">
      Booking Received! 📋
    </h2>
    <p class="content-text" style="color:rgba(255,255,255,0.6); font-size:15px; line-height:1.7; margin:0 0 24px;">
      Hi <strong style="color:#fff;">${userName}</strong>, your booking request has been submitted. Here are the details:
    </p>

    <!-- Booking Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:12px; overflow:hidden; margin-bottom:28px;">
      <!-- Car Name -->
      <tr>
        <td class="detail-card-cell" style="padding:20px 24px; border-bottom:1px solid rgba(108,99,255,0.15);">
          <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Car</p>
          <p class="detail-value" style="margin:4px 0 0; color:#ffffff; font-size:16px; font-weight:600;">${carName}</p>
        </td>
      </tr>
      <!-- Dates -->
      <tr>
        <td class="detail-card-cell" style="padding:16px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="col-half" width="50%" style="padding:8px 0; vertical-align:top;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Pickup</p>
                <p class="detail-value" style="margin:4px 0 0; color:#ffffff; font-size:14px; font-weight:500;">${new Date(pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </td>
              <td class="col-half col-half-last" width="50%" style="padding:8px 0; vertical-align:top;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Return</p>
                <p class="detail-value" style="margin:4px 0 0; color:#ffffff; font-size:14px; font-weight:500;">${new Date(returnDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Price & Payment -->
      <tr>
        <td class="detail-card-cell" style="padding:16px 24px; border-top:1px solid rgba(108,99,255,0.15);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="col-half" width="50%" style="vertical-align:middle;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Total Price</p>
                <p class="price-value" style="margin:4px 0 0; color:${ACCENT_COLOR}; font-size:20px; font-weight:700;">₹${price}</p>
              </td>
              <td class="col-half col-half-last" width="50%" style="text-align:right; vertical-align:middle;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Payment</p>
                <span class="badge" style="display:inline-block; margin-top:4px; background:${paymentMethod === 'online' ? 'rgba(0,212,170,0.15)' : 'rgba(255,183,77,0.15)'}; color:${paymentMethod === 'online' ? ACCENT_COLOR : '#FFB74D'}; padding:4px 12px; border-radius:20px; font-size:13px; font-weight:600; text-transform:capitalize;">
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
export const bookingConfirmationTemplate = ({ userName, carName, pickupDate, returnDate, price, bookingId }) => {
  const content = `
    <div style="text-align:center; margin-bottom:24px;">
      <div class="confirm-icon" style="display:inline-block; background:rgba(0,212,170,0.12); border:2px solid ${ACCENT_COLOR}; border-radius:50%; width:64px; height:64px; line-height:64px; text-align:center; font-size:28px;">
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
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, rgba(0,212,170,0.08), rgba(108,99,255,0.08)); border:1px solid rgba(0,212,170,0.25); border-radius:12px; overflow:hidden; margin-bottom:28px;">
      <!-- Booking ID -->
      <tr>
        <td class="detail-card-cell" style="padding:20px 24px; text-align:center; border-bottom:1px solid rgba(0,212,170,0.15);">
          <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px; text-transform:uppercase; letter-spacing:1px;">Booking ID</p>
          <p class="booking-id" style="margin:6px 0 0; color:${BRAND_COLOR}; font-size:16px; font-weight:700; font-family:monospace; letter-spacing:1px;">${bookingId}</p>
        </td>
      </tr>
      <!-- Details -->
      <tr>
        <td class="detail-card-cell" style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <!-- Car -->
            <tr>
              <td style="padding:8px 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px;">🚗 Car</p>
                <p class="detail-value" style="margin:2px 0 0; color:#fff; font-size:15px; font-weight:600;">${carName}</p>
              </td>
            </tr>
            <!-- Dates -->
            <tr>
              <td style="padding:8px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td class="col-half" width="50%" style="vertical-align:top;">
                      <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px;">📅 Pickup</p>
                      <p class="detail-value" style="margin:2px 0 0; color:#fff; font-size:14px;">${new Date(pickupDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td class="col-half col-half-last" width="50%" style="vertical-align:top;">
                      <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px;">📅 Return</p>
                      <p class="detail-value" style="margin:2px 0 0; color:#fff; font-size:14px;">${new Date(returnDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Price -->
            <tr>
              <td style="padding:12px 0 0;">
                <p class="detail-label" style="margin:0; color:rgba(255,255,255,0.5); font-size:12px;">💰 Total Amount</p>
                <p class="big-price" style="margin:4px 0 0; color:${ACCENT_COLOR}; font-size:22px; font-weight:700;">₹${price}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- Confirmed Badge -->
      <tr>
        <td class="detail-card-cell" style="padding:16px 24px; text-align:center; background:rgba(0,212,170,0.06); border-top:1px solid rgba(0,212,170,0.15);">
          <span class="status-badge" style="display:inline-block; background:${ACCENT_COLOR}; color:#0f0f1a; padding:6px 20px; border-radius:20px; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">
            ✓ Confirmed
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