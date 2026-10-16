import { updatePost } from "@/lib/postsDb";
import { readPostInput } from "@/lib/readPostInput";

export async function PUT(request: Request, { params }: RouteContext<"/api/posts/[id]">) {
  const { id } = await params;
  const input = await readPostInput(request);
  if (!input) {
    return Response.json({ error: "Заголовок и текст обязательны" }, { status: 400 });
  }
  const post = updatePost(id, input);
  if (!post) {
    return Response.json({ error: "Пост не найден" }, { status: 404 });
  }
  return Response.json(post);
}
