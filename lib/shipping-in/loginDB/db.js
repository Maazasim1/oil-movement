import mysql from 'serverless-mysql';

const db = mysql({
    config: {
      host: "us-cdbr-east-06.cleardb.net",
      database: "heroku_684b6f6454b034d",
      user: "b1e8b31636d4a2",
      password: "7bb7087a"
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

