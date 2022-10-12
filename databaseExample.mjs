import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

// console.log(
//   await sql`
//    SELECT * FROM woods;
//    `,
// );

// Just for testing, we want persistent connection to the database
await sql.end();
