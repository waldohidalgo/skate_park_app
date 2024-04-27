import pool from "../config/db.js";

export default async function deleteParticipanteQuery(email) {
  try {
    const query = `DELETE FROM prueba_skate_park_skaters WHERE email = $1 RETURNING *;`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
