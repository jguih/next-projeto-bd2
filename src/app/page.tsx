'use client';

import Table from "@/components/ui/table";
import useGames from "../hooks/useGames";
import GameForm from "@/components/ui/gameForm";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function Home() {
  const { games, isLoading: isGameLoading, isError: isGameError } = useGames();
  const [showGameForm, setShowGameForm] = useState(false);

  if (isGameLoading) {
    return (
      <>
        <div className='mb-3'>
          {showGameForm &&
            <GameForm className='w-80 mx-auto border-2 border-slate-800 rounded p-3'/>}
          <div className='mx-auto w-fit mt-3'>
          <Button onClick={() => setShowGameForm(prev => !prev)}
            className='bg-sky-700 hover:bg-sky-600'
          >
            {`${showGameForm ? 'Hide' : 'Show'} forms`}
          </Button>
        </div>
          <div className='mx-auto w-fit my-3'>Loading data...</div>
        </div>
      </>
    )
  }

  if (isGameError) {
    return (
      <>
        <h1>An error has ocurred...</h1>
      </>
    )
  }

  if (games) {
    return (
      <div>
        {showGameForm &&
          <GameForm className='w-80 mx-auto border-2 border-slate-800 rounded p-3'/>}
        <div className='w-fit mx-auto mt-3'>
          <Button onClick={() => setShowGameForm(prev => !prev)}
            className='bg-sky-800 hover:bg-sky-600'
          >
            {`${showGameForm ? 'Hide' : 'Show'} forms`}
          </Button>
        </div>
        <div className='mx-auto w-fit'>
          <Table games={games} />
        </div>
      </div>
    )
  }
}
