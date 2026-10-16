"use client";

import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import PostForm from "./PostForm";

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const { items: posts, isLoaded } = useAppSelector((state) => state.posts);
  const post = posts.find((item) => item.id === id);

  if (!isLoaded) {
    return <p>Загрузка...</p>;
  }

  if (!post) {
    return <p>Пост не найден.</p>;
  }

  return <PostForm post={post} />;
}
