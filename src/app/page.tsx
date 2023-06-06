'use client';

import Table from "@/components/ui/table";
import useGames from "../hooks/useGames";

export default function Home() {
  const { games, isLoading, isError } = useGames();

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (isError) {
    return (
      <>
        <h1>An error has ocurred...</h1>
      </>
    )
  }

  return (
    <>
      <Table games={games}></Table>
      <pre>
        {JSON.stringify(games, null, 2)}
      </pre>
    </>
  )
}
