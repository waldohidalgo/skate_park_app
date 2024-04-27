import pool from "../config/db.js";

export default async function putEditParticipanteQuery({
  email,
  nombre,
  anos_experiencia,
  especialidad,
  password,
}) {
  try {
    const query = `UPDATE prueba_skate_park_skaters SET  nombre = $2, password = $3, anos_experiencia = $4, especialidad = $5 WHERE email = $1 RETURNING *`;
    const values = [email, nombre, password, anos_experiencia, especialidad];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
