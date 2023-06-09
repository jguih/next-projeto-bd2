'use client';

import Table from "@/components/ui/table";
import useGames from "../hooks/useGames";
import GameForm from "@/components/ui/gameForm";
import { handleSubmit } from "../services/gameFormService"

export default function Home() {
  const { games, isLoading, isError } = useGames();

  if (isLoading) {
    return (
      <>
        <div className='container mb-3'>
          <GameForm onSubmit={handleSubmit}></GameForm>
        </div>
        <h1>Loading...</h1>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <h1>An error has ocurred...</h1>
      </>
    )
  }

  if (games) {
    return (
      <>
        <div className='container mb-3'>
          <GameForm onSubmit={handleSubmit} className='w-80 mx-auto'></GameForm>
        </div>
        <div className='container display-table'>
          <Table
            games={games}
          ></Table>
          {/*<pre>
            {JSON.stringify(games, null, 2)}
          </pre>*/}
        </div>
      </>
    )
  }
}
