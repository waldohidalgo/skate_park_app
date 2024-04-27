import deleteParticipanteQuery from "../queries/deleteParticipanteQuery.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function deleteParticipante(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          res.status(401).send("El token ha expirado");
          return;
        }
        res.status(401).send("Token inválido");
        return;
      }
      const email = decoded.email;
      const data = await deleteParticipanteQuery(email);
      console.log(!data);
      if (!data) {
        res.status(404).send("Participante no encontrado");
        return;
      }
      console.log(path.resolve("public", "imagenes", data.foto));
      fs.unlink(path.resolve("public", "imagenes", data.foto), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al borrar la imagen");
          return;
        }
        res.status(200).send("Participante eliminado");
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
}
