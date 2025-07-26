const express=require("express")
const passport=require("passport")

const authRouter=express.Router()

//initiate google login
authRouter.get("/google" , passport.authenticate("google", {scope : ["profile", "email"]}))

//callbackURL
authRouter.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;

    const html = `
      <html>
        <body>
          <script>
            // Send token to opener window
            window.opener.postMessage({ token: "${token}" }, "https://chwiggy.netlify.app");
            // window.opener.postMessage({ token: "${token}" }, "http://localhost:");

            window.close();
          </script>
          <p>Logging you in...</p>
        </body>
      </html>
    `;

    res.send(html);
  }
);


module.exports={authRouter}