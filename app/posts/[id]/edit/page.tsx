import EditPost from "@/components/EditPost";

export default function EditPostPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Редактирование</h1>
      <EditPost />
    </div>
  );
}
