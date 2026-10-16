import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Новый пост</h1>
      <PostForm />
    </div>
  );
}
