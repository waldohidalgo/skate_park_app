import getParticipantesQuery from "../queries/getParticipantesQuery.js";

export default async function getParticipantes(req, res) {
  try {
    const data = await getParticipantesQuery();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}
