import { Client } from 'pg';

const client = new Client();
client.connect();

async function getAll() {
  const data = await client.query("SELECT * FROM game");
  return data;
}

export default getAll;