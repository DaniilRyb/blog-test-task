"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { fetchPosts } from "@/store/postsSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    store.dispatch(fetchPosts());
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
