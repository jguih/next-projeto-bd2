import { Client } from 'pg';

function getClient(): Client {
  return new Client()
}

export default getClient;