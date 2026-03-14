export default async function handler(req, res) {
    try {
      const { tokenV3, tokenV2 } = req.body;
  
      // -------------------------
      // 1️⃣ VERIFICAR RECAPTCHA V3
      // -------------------------
      if (tokenV3) {
        const response = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.RECAPTCHA_V3_SECRET}&response=${tokenV3}`,
          }
        );
  
        const data = await response.json();
  
        // Validación básica
        if (!data.success) {
          return res.status(403).json({
            success: false,
            message: "Captcha v3 failed",
          });
        }
  
        // Score bajo → pedir v2
        if (data.score < 0.5) {
          return res.json({
            success: false,
            requireV2: true,
          });
        }
  
        // Score bueno
        return res.json({
          success: true,
          method: "v3",
        });
      }
  
      // -------------------------
      // 2️⃣ VERIFICAR RECAPTCHA V2
      // -------------------------
      if (tokenV2) {
        const response = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.RECAPTCHA_V2_SECRET}&response=${tokenV2}`,
          }
        );
  
        const data = await response.json();
  
        if (!data.success) {
          return res.status(403).json({
            success: false,
            message: "Captcha v2 failed",
          });
        }
  
        return res.json({
          success: true,
          method: "v2",
        });
      }
  
      // -------------------------
      // 3️⃣ SI NO HAY TOKEN
      // -------------------------
      return res.status(400).json({
        success: false,
        message: "No captcha token provided",
      });
    } catch (error) {
      console.error("Captcha error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Captcha verification error",
      });
    }
  }