import getAll from "@/services/db_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return await getAll().then((result) => {
    const data = result.rows;
    return NextResponse.json({ data }, { status: 200, statusText: 'ok' });
  }).catch((err) => {
    console.log(err);
    return NextResponse.json({}, { 
      status: 500, statusText: "Internal Server Error" 
    });
  })
}