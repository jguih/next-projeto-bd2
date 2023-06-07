import { Pool, QueryResult } from 'pg';

const pool = new Pool();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  process.exit(-1)
})

export default async function getAllGames(): Promise<QueryResult<any>> {
  return pool.connect()
    .then(client => {
      return client.query("SELECT * FROM game")
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          console.log(err)
          return err
        })
    })
    .catch(err => {
      console.log(err)
      return err
    })
}