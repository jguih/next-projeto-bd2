'use client';

import Table from "@/components/ui/table/table";
import useGames from "../hooks/useGames";
import GameForm from "@/components/ui/gameForm";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { game } from "@/services/httpService";

export default function Home() {
  const { games, isLoading: isGameLoading, isError: isGameError } = useGames();
  const [showGameForm, setShowGameForm] = useState(false);
  const [sampleLoading, setIsSampleLoading] = useState(false);

  useEffect(() => {
    setIsSampleLoading(false)
  }, [games])

  const handleInsertSample = (e: React.MouseEvent) => {
    setIsSampleLoading(true)
    game.insertSample()
      .then((res) => {
        if (!res.ok) setIsSampleLoading(false)
      })
      .catch((err) => setIsSampleLoading(false))
  }

  if (isGameLoading) {
    return (
      <>
        <div className='mb-3'>
          {showGameForm &&
            <GameForm className='w-80 mx-auto border-2 border-slate-800 rounded p-3' />}
          <div className='mx-auto w-fit mt-3'>
            <Button onClick={() => setShowGameForm(prev => !prev)}
              className='bg-sky-700 hover:bg-sky-600'
            >
              {`${showGameForm ? 'Hide' : 'Show'} forms`}
            </Button>
          </div>
          <div className='mx-auto w-fit mt-6'>
            <Loading text='Loading table data...' />
          </div>
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
          <GameForm className='w-80 mx-auto border-2 border-slate-800 rounded p-3' />}
        <div className='w-fit mx-auto mt-3'>
          {!sampleLoading ?
            <div>
              <Button onClick={() => setShowGameForm(prev => !prev)}
                className='bg-sky-800 hover:bg-sky-600'
              >
                {`${showGameForm ? 'Hide' : 'Show'} forms`}
              </Button>
              <Button onClick={handleInsertSample}
                className='ml-2 bg-amber-800 hover:bg-amber-600'
              >
                Insert Sample
              </Button>
            </div>
            : <Loading text='Loading Sample...' />}
        </div>
        <div className='mx-auto w-fit'>
          <Table games={games} />
        </div>
      </div>
    )
  }
}
