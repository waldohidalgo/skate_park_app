import getAllDataParticipantesQuery from "../queries/getAllDataParticipantesQuery.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import putEditParticipanteQuery from "../queries/putEditParticipanteQuery.js";
import bcrypt from "bcrypt";

export default async function putEditParticipante(req, res) {
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
      const {
        email,
        nombre,
        anos_experiencia,
        especialidad,
        password,
        password2,
      } = req.body;

      if (
        !email ||
        !nombre ||
        !anos_experiencia ||
        !especialidad ||
        !password ||
        !password2
      ) {
        res.status(400).send("Faltan datos");
        return;
      }
      if (password !== password2) {
        res.status(400).send("Las contraseñas no coinciden");
        return;
      }
      const participantes = await getAllDataParticipantesQuery();
      const participante = participantes.find(
        (participante) => participante.email === email
      );
      if (!participante) {
        res.status(400).send("El participante no existe");
        return;
      }
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const rs = await putEditParticipanteQuery({
        email,
        nombre,
        anos_experiencia,
        especialidad,
        password: hash,
      });

      res.status(200).send("data editada");
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
