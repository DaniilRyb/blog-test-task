"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { useAppDispatch } from "@/store/hooks";
import { addPost, editPost } from "@/store/postsSlice";
import type { Post } from "@/lib/postsDb";

type FormState = {
  title: string;
  text: string;
  errorMessage: string;
};

export default function PostForm({ post }: { post?: Post }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function savePost(_previousState: FormState, formData: FormData): Promise<FormState> {
    const title = String(formData.get("title"));
    const text = String(formData.get("text"));
    try {
      const savedPost = post
        ? await dispatch(editPost({ id: post.id, title, text })).unwrap()
        : await dispatch(addPost({ title, text })).unwrap();
      router.push(`/posts/${savedPost.id}`);
      return { title, text, errorMessage: "" };
    } catch {
      return { title, text, errorMessage: "Не удалось сохранить пост" };
    }
  }

  const [formState, formAction, isSaving] = useActionState(savePost, {
    title: post?.title ?? "",
    text: post?.text ?? "",
    errorMessage: "",
  });

  return (
    <Form action={formAction} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        Заголовок
        <input name="title" defaultValue={formState.title} required className="border p-2" />
      </label>
      <label className="flex flex-col gap-1">
        Текст
        <textarea
          name="text"
          defaultValue={formState.text}
          required
          rows={10}
          className="border p-2"
        />
      </label>
      {formState.errorMessage && <p className="text-red-600">{formState.errorMessage}</p>}
      <button type="submit" disabled={isSaving} className="self-start border px-4 py-2">
        {isSaving ? "Сохранение..." : "Сохранить"}
      </button>
    </Form>
  );
}
