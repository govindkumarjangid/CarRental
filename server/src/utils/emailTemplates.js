const BRAND_NAME = "CarRental";
const BRAND_COLOR = "#2563EB";
const BRAND_LIGHT = "#FFFFFF";
const TEXT_MAIN = "#1F2937";
const TEXT_MUTED = "#6B7280";

const ICON_CAR = "https://img.icons8.com/material-rounded/100/2563EB/car.png";
const ICON_LOCATION = "https://img.icons8.com/material-rounded/100/6B7280/marker.png";
const ICON_FUEL = "https://img.icons8.com/material-rounded/100/6B7280/gas-station.png";
const ICON_TRANSMISSION = "https://img.icons8.com/material-rounded/100/6B7280/settings.png";
const ICON_SEATS = "https://img.icons8.com/material-rounded/100/6B7280/conference-call.png";
const ICON_CALENDAR = "https://img.icons8.com/material-rounded/100/6B7280/calendar.png";
const ICON_WALLET = "https://img.icons8.com/material-rounded/100/6B7280/wallet.png";
const ICON_CHECK_CIRCLE = "https://img.icons8.com/material-rounded/100/10B981/checkmark.png";
const ICON_CANCEL_CIRCLE = "https://img.icons8.com/material-rounded/100/EF4444/multiply.png";
const ICON_FINISH = "https://img.icons8.com/material-rounded/100/2563EB/trophy.png";
const ICON_RECEIPT = "https://img.icons8.com/material-rounded/100/2563EB/receipt.png";

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
<body style="margin:0; padding:0; background-color:#F9FAFB; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; width:100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F9FAFB;">
    <tr>
      <td align="center" class="email-wrapper" style="padding: 40px 12px;">

        <table role="presentation" class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; background-color:${BRAND_LIGHT}; border-radius:16px; overflow:hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td class="email-header" style="background-color: #FFFFFF; padding: 32px 40px; text-align:center; border-bottom: 1px solid #F3F4F6;">
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <img src="${ICON_CAR}" alt="${BRAND_NAME} Logo" width="40" style="width: 40px; height: auto; display: block;" />
                  </td>
                </tr>
              </table>
              <h1 style="margin:0; color:${BRAND_COLOR}; font-size:26px; font-weight:700; letter-spacing:1px; line-height:1;">
                ${BRAND_NAME}
              </h1>
              <p style="margin:8px 0 0; color:${TEXT_MUTED}; font-size:10px; letter-spacing:2px; text-transform:uppercase; font-weight: 600;">
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
            <td class="email-footer" style="background-color:#F9FAFB; padding: 24px 40px; text-align:center; border-top: 1px solid #E5E7EB;">
              <p style="margin:0 0 8px; color:${TEXT_MUTED}; font-size:12px;">
                © ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.
              </p>
              <p style="margin:0; color:#9CA3AF; font-size:11px;">
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

// Helper for Icon + Text Row in Table
const iconTextRow = (icon, text, color = TEXT_MAIN, size = 14) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="vertical-align: middle; padding-right: 8px;">
        <img src="${icon}" width="${size}" style="width: ${size}px; height: auto; display: block;" />
      </td>
      <td style="vertical-align: middle; color: ${color}; font-size: ${size}px; line-height: 1;">
        ${text}
      </td>
    </tr>
  </table>
`;

// Welcome / Registration Email
export const welcomeEmailTemplate = (name) => {
  const content = `
    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:600;">
      Welcome aboard, ${name}! 🎉
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 24px;">
      Your account has been created successfully. You're now part of the ${BRAND_NAME} family — where every journey begins with the perfect ride.
    </p>

    <!-- Features Box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td class="feature-box" style="background: #EFF6FF; border:1px solid #DBEAFE; border-radius:12px; padding:24px;">
          <p style="margin:0 0 16px; color:${BRAND_COLOR}; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
            What you can do now
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding: 6px 0;">${iconTextRow("https://img.icons8.com/ios-filled/50/10B981/ok.png", "Browse premium cars")}</td></tr>
            <tr><td style="padding: 6px 0;">${iconTextRow("https://img.icons8.com/ios-filled/50/10B981/ok.png", "Book instantly — online or offline")}</td></tr>
            <tr><td style="padding: 6px 0;">${iconTextRow("https://img.icons8.com/ios-filled/50/10B981/ok.png", "Chat directly with car owners")}</td></tr>
            <tr><td style="padding: 6px 0;">${iconTextRow("https://img.icons8.com/ios-filled/50/10B981/ok.png", "Leave reviews & share your experience")}</td></tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:${TEXT_MUTED}; font-size:13px; line-height:1.6; margin:0;">
      If you have any questions, feel free to reach out. We're always here to help!
    </p>
  `;
  return baseLayout(content);
};

// New Booking Email
export const bookingEmailTemplate = ({ userName, carName, pickupDate, returnDate, price, paymentMethod, location, carImage, fuelType, transmission, seatingCapacity }) => {
  const diffMs = new Date(returnDate) - new Date(pickupDate);
  const totalHours = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${ICON_RECEIPT}" width="64" style="width:64px; height:auto; display: block;" alt="Receipt" />
        </td>
      </tr>
    </table>

    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:600; text-align:center;">
      Booking Received!
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 24px; text-align:center;">
      Hi <strong style="color:${TEXT_MAIN};">${userName}</strong>, your booking request has been submitted.
    </p>

    <!-- Booking Details Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF; border:1px solid #E5E7EB; border-radius:12px; overflow:hidden; margin-bottom:28px;">
      ${carImage ? `
      <tr>
        <td style="padding:0;">
          <img src="${carImage}" alt="${carName}" style="width:100%; height:auto; display:block; border-bottom:1px solid #F3F4F6;" />
        </td>
      </tr>
      ` : ''}
      <tr>
        <td class="detail-card-cell" style="padding:20px 24px;">
          <p class="detail-label" style="margin:0; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Car Details</p>
          <p class="detail-value" style="margin:4px 0 0; color:${TEXT_MAIN}; font-size:18px; font-weight:700;">${carName}</p>

          ${location ? `
          <div style="margin:12px 0 0;">
            ${iconTextRow(ICON_LOCATION, `Location: <span style="font-weight:600;">${location}</span>`, TEXT_MUTED, 13)}
          </div>
          ` : ''}
        </td>
      </tr>

      <!-- Specs Row -->
      <tr>
        <td style="padding:0 24px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F9FAFB; border-radius:8px; padding:12px;">
            <tr>
              <td align="center" width="33%">${iconTextRow(ICON_FUEL, fuelType || 'Petrol', TEXT_MAIN, 12)}</td>
              <td align="center" width="33%">${iconTextRow(ICON_TRANSMISSION, transmission || 'Auto', TEXT_MAIN, 12)}</td>
              <td align="center" width="33%">${iconTextRow(ICON_SEATS, (seatingCapacity || '5') + " Seats", TEXT_MAIN, 12)}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:0 24px 24px; border-top:1px solid #F3F4F6;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Pickup</p>
                ${iconTextRow(ICON_CALENDAR, new Date(pickupDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), TEXT_MAIN, 13)}
              </td>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Return</p>
                ${iconTextRow(ICON_CALENDAR, new Date(returnDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), TEXT_MAIN, 13)}
              </td>
            </tr>
            <tr>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Duration</p>
                ${iconTextRow("https://img.icons8.com/material-rounded/100/6B7280/time.png", totalHours + " Hours", TEXT_MAIN, 13)}
              </td>
              <td class="col-half" width="50%" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Total Price</p>
                ${iconTextRow(ICON_WALLET, "₹" + price, BRAND_COLOR, 20)}
              </td>
            </tr>
            <tr>
              <td class="col-half" width="100%" colspan="2" style="padding:20px 0 0;">
                <p class="detail-label" style="margin:0 0 8px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Payment</p>
                <span style="display:inline-block; background:${paymentMethod === 'online' ? '#EFF6FF' : '#FFF7ED'}; color:${paymentMethod === 'online' ? BRAND_COLOR : '#EA580C'}; padding:4px 12px; border-radius:6px; font-size:12px; font-weight:700; text-transform:uppercase;">
                  ${paymentMethod}
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:${TEXT_MUTED}; font-size:13px; line-height:1.6; margin:0; text-align:center;">
      Your booking status is currently <strong style="color:#EA580C;">Pending</strong>. You will receive a confirmation email once the owner approves it.
    </p>
  `;
  return baseLayout(content);
};

// Booking Confirmation Email
export const bookingConfirmationTemplate = ({ userName, carName, pickupDate, returnDate, price, bookingId, location, carImage, fuelType, transmission, seatingCapacity }) => {
  const diffMs = new Date(returnDate) - new Date(pickupDate);
  const totalHours = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${ICON_CHECK_CIRCLE}" width="64" style="width:64px; height:auto; display: block;" alt="Confirmed" />
        </td>
      </tr>
    </table>

    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:600; text-align:center;">
      Booking Confirmed!
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 28px; text-align:center;">
      Great news, <strong style="color:${TEXT_MAIN};">${userName}</strong>! Your booking has been confirmed. Get ready for an amazing ride! 🚀
    </p>

    <!-- Confirmation Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF; border:1px solid #10B98140; border-radius:16px; overflow:hidden; margin-bottom:28px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);">
      ${carImage ? `
      <tr>
        <td style="padding:0;">
          <img src="${carImage}" alt="${carName}" style="width:100%; height:auto; display:block;" />
        </td>
      </tr>
      ` : ''}

      <tr>
        <td style="padding:24px;">
          <p class="detail-label" style="margin:0; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase; text-align:center;">Booking ID</p>
          <p style="margin:4px 0 20px; color:${BRAND_COLOR}; font-size:16px; font-weight:700; font-family:monospace; text-align:center;">${bookingId}</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #F3F4F6; padding-top:20px;">
            <tr>
              <td colspan="2" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Car</p>
                <p style="margin:4px 0 0; color:${TEXT_MAIN}; font-size:18px; font-weight:700;">${carName}</p>
                ${location ? `<div style="margin:8px 0 0;">${iconTextRow(ICON_LOCATION, location, TEXT_MUTED, 13)}</div>` : ''}
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Pickup</p>
                ${iconTextRow(ICON_CALENDAR, new Date(pickupDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), TEXT_MAIN, 13)}
              </td>
              <td width="50%" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Return</p>
                ${iconTextRow(ICON_CALENDAR, new Date(returnDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }), TEXT_MAIN, 13)}
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding-bottom:16px;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Duration</p>
                ${iconTextRow("https://img.icons8.com/material-rounded/100/6B7280/time.png", totalHours + " Hours", TEXT_MAIN, 13)}
              </td>
              <td width="50%" style="padding-bottom:16px; text-align:right;">
                <p class="detail-label" style="margin:0 0 4px; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Amount</p>
                <table role="presentation" align="right" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>${iconTextRow(ICON_WALLET, "₹" + price, BRAND_COLOR, 18)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <div style="background:#F0F9FF; border-radius:8px; padding:16px; margin-top:8px;">
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" width="33%">${iconTextRow(ICON_FUEL, fuelType || 'Petrol', TEXT_MAIN, 12)}</td>
                <td align="center" width="33%">${iconTextRow(ICON_TRANSMISSION, transmission || 'Auto', TEXT_MAIN, 12)}</td>
                <td align="center" width="33%">${iconTextRow(ICON_SEATS, (seatingCapacity || '5') + " Seats", TEXT_MAIN, 12)}</td>
              </tr>
             </table>
          </div>
        </td>
      </tr>

      <tr>
        <td style="padding:16px; background:#10B981; text-align:center;">
          <span style="color:#ffffff; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px;">
            ✓ Booking Confirmed
          </span>
        </td>
      </tr>
    </table>

    <p style="color:${TEXT_MUTED}; font-size:13px; line-height:1.6; margin:0; text-align:center;">
      Please make sure to be at the pickup location on time. Have a great trip! 🎉
    </p>
  `;
  return baseLayout(content);
};

// Booking Cancellation Template
export const bookingCancellationTemplate = ({ userName, carName, bookingId, reason }) => {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${ICON_CANCEL_CIRCLE}" width="64" style="width:64px; height:auto; display: block;" alt="Cancelled" />
        </td>
      </tr>
    </table>

    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:600; text-align:center;">
      Booking Cancelled
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 28px; text-align:center;">
      Hi <strong style="color:${TEXT_MAIN};">${userName}</strong>, we're sorry to inform you that your booking for <strong style="color:${TEXT_MAIN};">${carName}</strong> has been cancelled.
    </p>

    <div style="background:#F9FAFB; border:1px solid #E5E7EB; border-radius:12px; padding:20px; margin-bottom:24px;">
      <p style="margin:0; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Booking ID</p>
      <p style="margin:4px 0 12px; color:${TEXT_MAIN}; font-size:15px; font-weight:600; font-family:monospace;">${bookingId}</p>

      ${reason ? `
      <p style="margin:12px 0 0; color:${TEXT_MUTED}; font-size:11px; text-transform:uppercase;">Reason for cancellation</p>
      <p style="margin:4px 0 0; color:#EF4444; font-size:14px;">${reason}</p>
      ` : ''}
    </div>

    <p style="color:${TEXT_MUTED}; font-size:13px; line-height:1.6; margin:0; text-align:center;">
      If you've already paid, the refund process will be initiated according to our policy.
      Feel free to browse other cars for your trip!
    </p>
  `;
  return baseLayout(content);
};

// Booking Completion Template
export const bookingCompletedTemplate = ({ userName, carName, bookingId }) => {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${ICON_FINISH}" width="64" style="width:64px; height:auto; display: block;" alt="Finish" />
        </td>
      </tr>
    </table>

    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:600; text-align:center;">
      Trip Completed!
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 28px; text-align:center;">
      Hi <strong style="color:${TEXT_MAIN};">${userName}</strong>, we hope you enjoyed your ride in the <strong style="color:${TEXT_MAIN};">${carName}</strong>!
    </p>

    <div style="background:#F0F9FF; border:1px solid #DBEAFE; border-radius:12px; padding:24px; text-align:center; margin-bottom:24px;">
      <p style="margin:0 0 16px; color:${TEXT_MAIN}; font-size:16px; font-weight:600;">How was your experience?</p>
      <p style="margin:0; color:${TEXT_MUTED}; font-size:14px; line-height:1.5;">
        Sharing your feedback helps our owner community and other travelers. Please take a moment to leave a review!
      </p>
    </div>

    <p style="color:${TEXT_MUTED}; font-size:13px; line-height:1.6; margin:0; text-align:center;">
      Booking ID: <span style="font-family:monospace; color:${TEXT_MAIN}; font-weight:600;">${bookingId}</span>
    </p>
    <p style="margin-top:12px; color:${TEXT_MUTED}; font-size:13px; text-align:center;">
      Thank you for choosing ${BRAND_NAME}! We look forward to your next adventure. 🚗✨
    </p>
  `;
  return baseLayout(content);
};

// Subscription Welcome Template
export const subscriptionWelcomeTemplate = ({ email }) => {
  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
      <tr>
        <td align="center">
          <img src="${ICON_CHECK_CIRCLE}" width="64" style="width:64px; height:auto; display: block;" alt="Subscribed" />
        </td>
      </tr>
    </table>

    <h2 class="content-heading" style="margin:0 0 8px; color:${TEXT_MAIN}; font-size:24px; font-weight:700; text-align:center;">
      Welcome to ${BRAND_NAME} Newsletter! 🎉
    </h2>
    <p class="content-text" style="color:${TEXT_MUTED}; font-size:15px; line-height:1.7; margin:0 0 24px; text-align:center;">
      Thank you for subscribing with <strong style="color:${TEXT_MAIN};">${email}</strong>!
    </p>

    <div style="background-color:#F0F9FF; border:1px solid #BFDBFE; border-radius:12px; padding:24px; text-align:center; margin-bottom:24px;">
      <p style="margin:0 0 8px; color:${BRAND_COLOR}; font-size:18px; font-weight:700;">What to expect next:</p>
      <p style="margin:0 0 12px; color:${TEXT_MAIN}; font-size:14px; line-height:1.6;">
        ✨ Exclusive discounts & promotional offers<br/>
        🏎️ Early access to newly listed luxury & sport cars<br/>
        📍 Expert travel guides and road trip inspirations
      </p>
    </div>

    <p style="margin:0; color:${TEXT_MUTED}; font-size:13px; text-align:center; line-height:1.6;">
      If you ever wish to unsubscribe, you can do so anytime through our email settings.<br/>
      Safe travels and happy driving! 🚘
    </p>
  `;
  return baseLayout(content);
};