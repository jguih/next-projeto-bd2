import getAllGames from "@/services/db_service";
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