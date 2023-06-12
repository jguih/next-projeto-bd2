
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id 
  console.log(id)
}