import useSWR, { Fetcher } from 'swr'

export default function usePlatform() {
  const fetcher: Fetcher<next_api_data, string> = (url) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/platform', fetcher, { refreshInterval: 1000 })
  
  return {
    platforms: data?.rows as Platform[],
    isPlatformsLoading: isLoading,
    isPlatformsError: error
  }
}