import { Pool, QueryResult } from 'pg';
import format from 'pg-format'

const pool = new Pool();

const sql = {
  games: 'SELECT * FROM "game_data"',
  insertGame: 'INSERT INTO "game_data" ("name", "enUS_description", "price", "discount", "isDiscountActive", "platforms") VALUES ($1, $2, $3, $4, $5, $6)',
  updateGame: 'UPDATE game_data SET %I = $1 WHERE "id" = $2',
  deleteGame: 'DELETE FROM game WHERE id = $1',
  platforms: 'SELECT * FROM platform',
  insertSample: 'CALL "insert_sample"()'
}

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export async function getGames(): Promise<QueryResult<any>> {
  return pool.connect()
    .then(client => {
      return client.query(sql.games)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function getPlatforms(): Promise<QueryResult<any>> {
  return pool.connect()
    .then(client => {
      return client.query(sql.platforms)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function addGame(newGame: Game): Promise<QueryResult<any>> {
  const values = [newGame.name, newGame.enUS_description, newGame.price,
  newGame.discount, newGame.isDiscountActive,`{${newGame.platforms}}`]
  return pool.connect()
    .then(client => {
      return client.query(sql.insertGame, values)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function updateGame(id: number, column: string, value: string | string[]) {
  return pool.connect()
    .then(async client => {
      const query = format(sql.updateGame, column)
      return client.query(query, [value, id])
      .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function deleteGame(id: number) {
  return pool.connect()
    .then(async client => {
      return client.query(sql.deleteGame, [id])
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export async function InsertSample() {
  return pool.connect()
    .then(async client => {
      return client.query(sql.insertSample)
        .then(res => {
          client.release()
          return res
        })
        .catch(err => {
          client.release()
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}