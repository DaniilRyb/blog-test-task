import { connection } from "next/server";
import { createPost, getAllPosts } from "@/lib/postsDb";
import { readPostInput } from "@/lib/readPostInput";

export async function GET() {
  await connection();
  return Response.json(getAllPosts());
}

export async function POST(request: Request) {
  const input = await readPostInput(request);
  if (!input) {
    return Response.json({ error: "Заголовок и текст обязательны" }, { status: 400 });
  }
  return Response.json(createPost(input), { status: 201 });
}
