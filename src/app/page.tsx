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
          <GameForm className='w-80 mx-auto'/>
          <div className='mx-auto w-fit my-3'>Loading data...</div>
        </div>
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
        <div className='container'>
          <GameForm onSubmit={handleSubmit} className='w-80 mx-auto'></GameForm>
          <Table games={games} />
        </div>
      </>
    )
  }
}
