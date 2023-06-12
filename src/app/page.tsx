'use client';

import Table from "@/components/ui/table";
import useGames from "../hooks/useGames";
import GameForm from "@/components/ui/gameForm";
import { handleSubmit } from "../services/gameFormService"
import usePlatform from "@/hooks/usePlatform";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

export default function Home() {
  const { games, isLoading: isGameLoading, isError: isGameError } = useGames();
  const { platforms, isPlatformsLoading, isPlatformsError } = usePlatform();
  const [showGameForm, setShowGameForm] = useState(false);

  if (isGameLoading) {
    return (
      <>
        <div className='container mb-3'>
          {showGameForm &&
            <GameForm
              platforms={platforms}
              className='w-80 mx-auto border-2 border-slate-800 rounded p-3'
            ></GameForm>}
          <div className='mx-auto w-fit mt-3'>
            <Button onClick={() => setShowGameForm(prev => !prev)}
              className='bg-sky-800 hover:bg-sky-600'
            >
              Mostrar formulário de jogo
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
      <>
        <div className='container'>
          {showGameForm &&
            <GameForm
              platforms={platforms}
              className='w-80 mx-auto border-2 border-slate-800 rounded p-3'
            ></GameForm>}
          <div className='mx-auto w-fit mt-3'>
            <Button onClick={() => setShowGameForm(prev => !prev)}
              className='bg-sky-800 hover:bg-sky-600'
            >
              {`${showGameForm ? 'Esconder' : 'Mostrar'} formulário de jogo`}
            </Button>
          </div>
          <Table games={games} />
        </div>
      </>
    )
  }
}
