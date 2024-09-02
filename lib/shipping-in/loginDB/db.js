import mysql from 'serverless-mysql';

const db = mysql({
    config: {
      host: "sql12.freemysqlhosting.net",
      database: "sql12729144",
      user: "sql12729144",
      password: "JGP15VwDJq"
    }
  });

  export default async function executeQuery(query) {
    try {
      const results = await db.query(query);
      await db.end();
      return results;
    } catch (error) {
      return { error };
    }
  }

