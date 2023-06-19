
export const game = {
  add: async (newGame: Game): Promise<Response> => {
    return await fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify(newGame)
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
  },
  delete: async(id: number): Promise<Response> => {
    return await fetch(`/api/game?id=${id}`, {
      method: 'DELETE',
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      throw err
    }) 
  },
  update: async(id: number, column: string, value: string | string[]): Promise<Response> => {
    return await fetch(`/api/game?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        column, value
      }),
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
  },
  insertSample: async(): Promise<Response> => {
    return await fetch('/api/game/sample', {
      method: 'POST'
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
  }
}