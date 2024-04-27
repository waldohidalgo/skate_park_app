import pool from "../config/db.js";

export default async function getParticipantesQuery() {
  try {
    const query =
      "SELECT email,nombre,foto,anos_experiencia,especialidad,estado FROM prueba_skate_park_skaters";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    return error;
  }
}
