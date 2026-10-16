import type { PostInput } from "./postsDb";

export async function readPostInput(request: Request): Promise<PostInput | null> {
  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!title || !text) {
    return null;
  }
  return { title, text };
}
