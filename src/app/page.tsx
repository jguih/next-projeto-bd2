'use client';

import Table from "@/components/ui/table";
import useGames from "../hooks/useGames";
import { useEffect, useState } from 'react';
import Button from "@/components/ui/button";
import GameForm from "@/components/ui/gameForm";
import handleSubmit from "../services/gameFormService"

export default function Home() {
  const { games, isLoading, isError } = useGames();
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    console.log(rowSelection)
  }, [rowSelection])

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

  if (games) {
    return (
      <>
        <div className='container mb-3'>
          <GameForm onSubmit={handleSubmit}></GameForm>
        </div>
        {Object.keys(rowSelection).length > 0 ? 
          <Button className='fixed bottom-1 right-1'>
            Excluir
          </Button> : null}
        <Table
          games={games as Game[]}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        ></Table>
        <pre>
          {JSON.stringify(games, null, 2)}
        </pre>
      </>
    )
  }
}
