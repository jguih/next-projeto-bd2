import { getAllGames, addGame } from "@/services/dbService";
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
        status: 500, statusText: "Internal Server Error"
      });
    })
}

export async function POST(request: Request) {
  const req = await request.json()
  const reqBody = req.body
  if (!reqBody)
    return NextResponse.json({}, {
      status: 400,
      statusText: 'Request with empty body!'
    })
  return await addGame(reqBody as Game)
    .then((res) => {
      return NextResponse.json({}, {
        status: 200,
        statusText: 'New game inserted succesfully!'
      })
    })
    .catch((err) => {
      return NextResponse.json({}, {
        status: 400, 
        statusText: 'Game could not be inserted'
      });
    })
}