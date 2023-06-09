import { getPlatforms } from "@/services/dbService";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  return await getPlatforms()
    .then((res) => {
      const data: next_api_data = {
        rows: res.rows
      }
      return NextResponse.json(data, { status: 200, statusText: 'ok' });
    })
    .catch((err) => {
      return NextResponse.json({}, {
        status: 500, statusText: 'Could not get platforms'
      });
    })
}