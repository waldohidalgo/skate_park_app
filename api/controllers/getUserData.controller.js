import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";
export default async function getUserData(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          res.render(path.resolve("api", "views", "pages", "expirado.hbs"));
          return;
        }
        res.render(path.resolve("api", "views", "pages", "prohibido.hbs"));
        return;
      }
      res.render(path.resolve("api", "views", "pages", "user_data.hbs"), {
        user: decoded,
      });
    });
  } catch (error) {
    res.render(path.resolve("api", "views", "pages", "prohibido.hbs"));
  }
}
