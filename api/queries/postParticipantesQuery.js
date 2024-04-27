import pool from "../config/db.js";
export default async function postParticipantesQuery({
  email,
  nombre,
  password,
  anos_experiencia,
  especialidad,
  foto,
  estado,
}) {
  try {
    const query = `INSERT INTO prueba_skate_park_skaters (email,nombre,password, anos_experiencia, especialidad,foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const values = [
      email,
      nombre,
      password,
      anos_experiencia,
      especialidad,
      foto,
      estado,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
