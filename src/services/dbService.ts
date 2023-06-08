import { Pool, QueryResult } from 'pg';

const pool = new Pool();

const sql = {
  allGames: 'SELECT * FROM "game"',
  insertGame: 'INSERT INTO game ("name", "description", "price", "discount", "isDiscountActive") VALUES ($1, $2, $3, $4, $5)'
}

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export async function getAllGames(): Promise<QueryResult<any>> {
  return pool.connect()
    .then(client => {
      return client.query(sql.allGames)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          console.log(err)
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function addGame(newGame: Game): Promise<QueryResult<any>> {
  const values = [newGame.name, newGame.description, newGame.price, newGame.discount, newGame.isDiscountActive]
  return pool.connect()
    .then(client => {
      return client.query(sql.insertGame, values)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          console.log(err)
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}