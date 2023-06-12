
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
  }
}