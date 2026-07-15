export function generateArticleEmailHtml(title: string, excerpt: string, url: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 2px;">QARATECH</h1>
              <p style="margin: 5px 0 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Nouvel Article</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #f8fafc; font-size: 24px; font-weight: 700; line-height: 1.3;">
                ${title}
              </h2>
              
              <div style="width: 40px; height: 4px; background-color: #a855f7; border-radius: 2px; margin-bottom: 25px;"></div>
              
              <p style="margin: 0 0 30px 0; color: #94a3b8; font-size: 16px; line-height: 1.6;">
                ${excerpt}
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #a855f7; background-image: linear-gradient(to right, #9333ea, #c084fc); color: #ffffff; text-decoration: none; border-radius: 9999px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 14px 0 rgba(168, 85, 247, 0.39);">
                      Lire l'article complet
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #162032; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 13px;">
                Cet email a été envoyé par <strong>QaraTech</strong>.
                <br>Vous recevez cet email suite à un partage manuel ou automatisé.
              </p>
            </td>
          </tr>
          
        </table>
        
        <!-- Space at bottom -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td height="40"></td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
