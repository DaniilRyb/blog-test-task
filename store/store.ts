import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";
import postsReducer, { addPost, editPost } from "./postsSlice";

const syncedActionTypes = [addPost.fulfilled.type, editPost.fulfilled.type];

export function makeStore() {
  const isBrowser = typeof window !== "undefined";
  const extraMiddleware: Middleware[] = isBrowser
    ? [createStateSyncMiddleware({ channel: "blog", whitelist: syncedActionTypes }) as Middleware]
    : [];

  const store = configureStore({
    reducer: {
      posts: postsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(extraMiddleware),
  });

  if (isBrowser) {
    initMessageListener(store);
  }

  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
