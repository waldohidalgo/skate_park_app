import pool from "../config/db.js";

export default async function getAllDataParticipantesQuery() {
  try {
    const query = "SELECT * FROM prueba_skate_park_skaters";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    return error;
  }
}
