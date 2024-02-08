/* import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { subcat: string } }
) {
  const subcatId = params.subcat || "";
  
  try {
    const res = await fetch(
      `http://localhost:1337/api/sub-categorias/${subcatId}`
    );
    const { data } = await res.json();
  
    return Response.json({ data });
    
  } catch (error) {
    console.error(error);
    throw new Error('Error getting subcat');
  }
}
 */