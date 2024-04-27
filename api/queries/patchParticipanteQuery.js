import pool from "../config/db.js";

export default async function patchEditParticipanteQuery(email, estado) {
  try {
    const query = `UPDATE prueba_skate_park_skaters SET estado = $2 WHERE email = $1 RETURNING *`;
    const values = [email, estado];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
