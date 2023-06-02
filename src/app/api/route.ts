import getClient from "@/services/db_service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await getClient().connect();

  return NextResponse.json({
    data: ""
  });
}