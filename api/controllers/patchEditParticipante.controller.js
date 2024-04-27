import patchEditParticipanteQuery from "../queries/patchParticipanteQuery.js";

export default async function patchEditParticipante(req, res) {
  try {
    const { email, estado } = req.body;

    const participante = await patchEditParticipanteQuery(email, estado);
    if (participante) {
      res.status(200).send("participante editado");
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
