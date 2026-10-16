import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import StoreProvider from "@/components/StoreProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Блог",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>
        <div className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
          <header className="flex gap-4 border-b pb-3">
            <Link href="/" className="font-bold">
              Блог
            </Link>
            <Link href="/posts/new" className="underline">
              Новый пост
            </Link>
          </header>
          <main>
            <Suspense fallback={<p>Загрузка...</p>}>
              <StoreProvider>{children}</StoreProvider>
            </Suspense>
          </main>
        </div>
      </body>
    </html>
  );
}
