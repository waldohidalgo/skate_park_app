import getAllDataParticipantesQuery from "../queries/getAllDataParticipantesQuery.js";
import path from "path";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY_JWT;
export default async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Faltan datos");
      return;
    }
    const participantes = await getAllDataParticipantesQuery();
    const participante = participantes.find(
      (participante) => participante.email === email
    );
    if (!participante) {
      res.status(400).send("El email no existe");
      return;
    }
    const isValidPassword = await bcrypt.hash(password, participante.password);
    if (!isValidPassword) {
      res.status(400).send("La contraseña es incorrecta");
      return;
    }

    jwt.sign(participante, secretKey, { expiresIn: 2 * 60 }, (err, token) => {
      if (err) {
        res.status(500).send("Ha ocurrido un error");
        return;
      }
      res.status(200).json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
