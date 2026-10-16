import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Post, PostInput } from "@/lib/postsDb";

type PostsState = {
  items: Post[];
  isLoaded: boolean;
};

const initialState: PostsState = {
  items: [],
  isLoaded: false,
};

async function sendRequest<T>(url: string, options?: RequestInit): Promise<T> {
  
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }
  return response.json();
}

export const fetchPosts = createAsyncThunk("posts/fetchAll", () =>
  sendRequest<Post[]>("/api/posts"),
);

export const addPost = createAsyncThunk("posts/add", (input: PostInput) =>
  sendRequest<Post>("/api/posts", {
    method: "POST",
    body: JSON.stringify(input),
  }),
);

export const editPost = createAsyncThunk(
  "posts/edit",
  ({ id, ...input }: PostInput & { id: string }) =>
    sendRequest<Post>(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    }),
);

function savePost(state: PostsState, post: Post) {
  const index = state.items.findIndex((item) => item.id === post.id);
  if (index === -1) {
    state.items.unshift(post);
  } else {
    state.items[index] = post;
  }
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoaded = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        savePost(state, action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        savePost(state, action.payload);
      });
  },
});

export default postsSlice.reducer;
