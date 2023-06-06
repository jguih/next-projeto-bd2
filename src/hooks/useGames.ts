import useSWR, { Fetcher } from 'swr'

export default function useGames() {
  const fetcher: Fetcher<{ data: [] }, string> = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/game', fetcher)

  return {
    games: data?.data as Game[],
    isLoading,
    isError: error
  }
}