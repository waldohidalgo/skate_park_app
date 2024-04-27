import path from "path";
import { v4 as uuidv4 } from "uuid";
import postParticipantesQuery from "../queries/postParticipantesQuery.js";
import getAllDataParticipantesQuery from "../queries/getAllDataParticipantesQuery.js";
const maxSize = 1 * 1024 * 1024;
export default async function postParticipante(req, res) {
  try {
    const {
      email,
      nombre,
      anos_experiencia,
      especialidad,
      password,
      password2,
    } = req.body;
    const participantes = await getAllDataParticipantesQuery();
    if (participantes.find((participante) => participante.email === email)) {
      res.status(400).send("El email ya existe");
      return;
    }
    const {
      foto: { size, mimetype, mv: moveFile },
    } = req.files;
    if (password !== password2) {
      res.status(400).send("Las contraseñas no coinciden");
      return;
    }
    if (size > maxSize) {
      res.status(413).send("El tamaño del archivo es demasiado grande");
      return;
    }
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpg" &&
      mimetype !== "image/gif" &&
      mimetype !== "image/webp"
    ) {
      res.status(415).send("El formato del archivo no es válido");
      return;
    }
    const nombreFoto = `${uuidv4().slice(0, 8)}.jpg`;
    moveFile(path.resolve("public", "imagenes", nombreFoto), async (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      try {
        const data = await postParticipantesQuery({
          email,
          nombre,
          password,
          anos_experiencia,
          especialidad,
          foto: nombreFoto,
          estado: false,
        });

        res.status(200).send("exito");
      } catch (error) {
        res.status(500).send(error);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
