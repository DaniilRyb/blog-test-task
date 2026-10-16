"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { formatDate } from "@/lib/formatDate";

export default function PostList() {
  const { items: posts, isLoaded } = useAppSelector((state) => state.posts);

  if (!isLoaded) {
    return <p>Загрузка...</p>;
  }

  if (posts.length === 0) {
    return <p>Постов пока нет.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li key={post.id} className="border p-3">
          <Link href={`/posts/${post.id}`} className="text-lg font-semibold underline">
            {post.title}
          </Link>
          <p className="text-sm text-gray-600">Создан: {formatDate(post.createdAt)}</p>
          <p className="text-sm text-gray-600">Изменён: {formatDate(post.updatedAt)}</p>
        </li>
      ))}
    </ul>
  );
}
