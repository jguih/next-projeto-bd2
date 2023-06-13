import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id 
  return NextResponse.json({id: id}, {
    status: 200,
    statusText: `id: ${id}`
  })
}