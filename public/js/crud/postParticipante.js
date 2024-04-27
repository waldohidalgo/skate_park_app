export async function postParticipante(participante) {
  try {
    return await axios.post("/participante", participante, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    return error;
  }
}
