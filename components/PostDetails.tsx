"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { formatDate } from "@/lib/formatDate";

export default function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const { items: posts, isLoaded } = useAppSelector((state) => state.posts);
  const post = posts.find((item) => item.id === id);

  if (!isLoaded) {
    return <p>Загрузка...</p>;
  }

  if (!post) {
    return <p>Пост не найден.</p>;
  }

  return (
    <article className="flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">Создан: {formatDate(post.createdAt)}</p>
      <p className="text-sm text-gray-600">Изменён: {formatDate(post.updatedAt)}</p>
      <p className="whitespace-pre-wrap">{post.text}</p>
      <Link href={`/posts/${post.id}/edit`} className="self-start underline">
        Редактировать
      </Link>
    </article>
  );
}
