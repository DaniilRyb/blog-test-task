import PostList from "@/components/PostList";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Посты</h1>
      <PostList />
    </div>
  );
}
