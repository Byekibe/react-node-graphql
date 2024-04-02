import pool from "./db.js";

export async function executeQuery(sql, params = []) {
  try {
    const [rows, fields] = await pool.execute(sql, params);
    // console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database error"); // Throw a more informative error
  }
}
