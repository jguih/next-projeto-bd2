import getAllGames from "@/services/db_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await getAllGames()
    .then((result) => {
      return NextResponse.json({ rows: result.rows }, { status: 200, statusText: 'ok' });
    }).catch((err) => {
      return NextResponse.json({}, {
        status: 500, statusText: "Internal Server Error"
      });
    })
}