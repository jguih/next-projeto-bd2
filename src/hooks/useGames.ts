import useSWR, { Fetcher } from 'swr'

export default function useGames() {
  const fetcher: Fetcher<next_api_data, string> = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/game', fetcher)

  return {
    games: data?.rows,
    isLoading,
    isError: error
  }
}