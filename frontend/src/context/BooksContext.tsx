import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image?: string | null;
}

interface BooksContextValue {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}

export const BooksContext = createContext<BooksContextValue>({
  books: [],
  loading: false,
  error: null,
  fetchBooks: async () => {},
});

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    if (books.length > 0) return; // Уже загружены — не грузим снова

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/books");
      if (!res.ok) throw new Error(`Ошибка загрузки: ${res.statusText}`);
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (e: any) {
      setError(e.message || "Ошибка при загрузке книг");
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  return (
    <BooksContext.Provider value={{ books, loading, error, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
}
