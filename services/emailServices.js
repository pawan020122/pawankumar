import { transporter } from "../config/emailConfig.js";
import dotenv from "dotenv";
dotenv.config();

export const registerEmail = async (name, email) => {
    try {
        const mailOptions = {
            subject: "registeration successfull",
            to: email,
            from: process.env.EMAIL_USER,
             html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>{{subject}}</title>
  <style>
    @media only screen and (max-width:600px) {
      .container { width: 100% !important; }
      .stack { display:block !important; width:100% !important; }
      .pad { padding:20px !important; }
      .h1 { font-size:24px !important; line-height:30px !important; }
    }
    body { margin:0; padding:0; background:#f0f2f5; }
    table { border-collapse:collapse; }
    img { border:0; max-width:100%; height:auto; }
    a { text-decoration:none; }
  </style>
</head>
<body style="margin:0; padding:0; background:#f0f2f5;">

  <!-- Preheader -->
  <div style="display:none; max-height:0; overflow:hidden; font-size:1px; line-height:1px; color:#fff;">
    {{preheader_text}}
  </div>

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;">
    <tr>
      <td align="center" style="padding:30px 10px;">

        <!-- Card -->
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:#1a82e2; padding:24px; text-align:center;">
              <img src="{{logo_url}}" alt="{{company_name}}" width="140" style="display:block; margin:0 auto 12px;">
              <h1 style="margin:0; font-family:Arial, sans-serif; font-size:28px; font-weight:bold; color:#ffffff;">
                {{main_heading}}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px; font-family:Arial, sans-serif; font-size:16px; line-height:24px; color:#333;">
              <p style="margin-top:0;">Hello <strong>${name}</strong>,</p>
              <p>{{body_text}}</p>
              
              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td>
                    <a href="{{cta_url}}" target="_blank" style="display:inline-block; background:#1a82e2; color:#ffffff; padding:14px 28px; border-radius:6px; font-size:16px; font-weight:bold;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Image section -->
          <tr>
            <td style="padding:0 24px 24px 24px;">
              <img src="{{feature_img}}" alt="Feature image" style="border-radius:8px; display:block;">
              <p style="font-family:Arial, sans-serif; font-size:14px; color:#555; margin-top:12px;">
                {{feature_text}}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9; padding:20px; font-family:Arial, sans-serif; font-size:12px; color:#777; text-align:center;">
              <p style="margin:0;">{{company_name}} • {{company_address}}</p>
              <p style="margin:4px 0;">
                <a href="{{unsubscribe_url}}" style="color:#1a82e2;">Unsubscribe</a>
              </p>
              <p style="margin:0;">© {{year}} {{company_name}}. All rights reserved.</p>
            </td>
          </tr>

        </table>
        <!-- End card -->

      </td>
    </tr>
  </table>
</body>
</html>
`
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Something went wrong in registerEmail: ", error)
    }
}
    