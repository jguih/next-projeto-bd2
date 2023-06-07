import useSWR, { Fetcher } from 'swr'

type data = {
  rows: []
}

export default function useGames() {
  const fetcher: Fetcher<data, string> = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/game', fetcher)

  return {
    games: data?.rows,
    isLoading,
    isError: error
  }
}