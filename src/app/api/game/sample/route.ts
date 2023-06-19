import { InsertSample } from "@/services/dbService";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  return await InsertSample()
    .then((res) => {
      return NextResponse.json({}, { status: 200, statusText: 'ok' });
    }).catch((err) => {
      return NextResponse.json({}, {
        status: 500, statusText: 'Could not insert sample games'
      });
    })
}