import { getAllGames, addGame, deleteGame } from "@/services/dbService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await getAllGames()
    .then((result) => {
      const data: next_api_data = {
        rows: result.rows
      }
      return NextResponse.json(data, { status: 200, statusText: 'ok' });
    }).catch((err) => {
      return NextResponse.json({}, {
        status: 500, statusText: "Could not get all games"
      });
    })
}

export async function POST(request: Request) {
  const req = await request.json()
  if (!req)
    return NextResponse.json({}, {
      status: 400,
      statusText: 'Request with empty body!'
    })
  return await addGame(req as Game)
    .then((res) => {
      return NextResponse.json({}, {
        status: 200,
        statusText: 'New game inserted succesfully!'
      })
    })
    .catch((err) => {
      return NextResponse.json({}, {
        status: 500, 
        statusText: 'Game could not be inserted'
      });
    })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id)
    return NextResponse.json({}, {
      status: 400,
      statusText: 'No id param passed to url'
    })
  return await deleteGame(Number.parseInt(id))
    .then((res) => {
      return NextResponse.json({}, {
        status: 200,
        statusText: 'Game with id '+id+' deleted succesfully!'
      })
    })
    .catch((err) => {
      return NextResponse.json({}, {
        status: 500,
        statusText: 'Game could not be deleted'
      })
    })
}