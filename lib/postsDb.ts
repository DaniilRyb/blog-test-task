export type Post = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  title: string;
  text: string;
};

const posts: Post[] = [];

export function getAllPosts() {
  return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getPostById(id: string) {
  return posts.find((post) => post.id === id);
}

export function createPost(input: PostInput) {
  const now = new Date().toISOString();
  const newPost: Post = {
    id: crypto.randomUUID(),
    title: input.title,
    text: input.text,
    createdAt: now,
    updatedAt: now,
  };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id: string, input: PostInput) {
  const post = getPostById(id);
  if (!post) {
    return undefined;
  }
  post.title = input.title;
  post.text = input.text;
  post.updatedAt = new Date().toISOString();
  return post;
}
