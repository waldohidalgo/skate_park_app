import pool from "../config/db.js";

export default async function resetDataQuery() {
  try {
    const query = "DELETE FROM prueba_skate_park_skaters;";
    await pool.query(query);
    return "exito";
  } catch (error) {
    throw error;
  }
}
