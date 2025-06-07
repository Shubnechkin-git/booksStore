import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import BookCard from "../components/BookCard";
import "../styles/Home.css";
import { BooksContext } from "../context/BooksContext";

type SortOption = "title-asc" | "title-desc" | "price-asc" | "price-desc" | "";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image?: string | null;
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";
  const initialSort = (params.get("sort") || "") as SortOption;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  const { books, loading, error, fetchBooks } = useContext(BooksContext);

  useEffect(() => {
    document.title = "Главная — Книжный магазин";
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Обновляем локальный стейт при изменении URL вручную
  useEffect(() => {
    setSearchTerm(initialSearch);
    setSortOption(initialSort);
  }, [initialSearch, initialSort]);

  // Фильтрация
  let filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка
  if (sortOption) {
    filteredBooks = [...filteredBooks].sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }

  const updateUrlParams = (search: string, sort: SortOption) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);
    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateUrlParams(value, sortOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    setSortOption(value);
    updateUrlParams(searchTerm, value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSortOption("");
    navigate({ pathname: location.pathname, search: "" }, { replace: true });
  };

  const renderSkeletons = () => {
    return Array.from({ length: 15 }).map((_, idx) => (
      <div className="book-card" key={idx}>
        <div className="image-wrapper">
          <div className="skeleton-image" />
        </div>
        <h3>
          <div className="skeleton-line long" />
        </h3>
        <p className="author">
          <div className="skeleton-line medium" />
        </p>
        <p className="price">
          <div className="skeleton-line short" />
        </p>
      </div>
    ));
  };

  return (
    <div>
      <h1>Книжный магазин</h1>

      <div className="filter-panel">
        <input
          type="text"
          placeholder="Поиск по названию или автору..."
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={loading}
        />

        <select
          value={sortOption}
          onChange={handleSortChange}
          disabled={loading}
        >
          <option value="">Сортировка</option>
          <option value="title-asc">Название ↑</option>
          <option value="title-desc">Название ↓</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
        </select>

        {(searchTerm || sortOption) && !loading && (
          <button onClick={resetFilters}>Сбросить</button>
        )}
      </div>

      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      {searchTerm && !loading && (
        <p>
          Результаты поиска по запросу: <b>{searchTerm}</b> (
          {filteredBooks.length} найдено)
        </p>
      )}

      <div className="card-grid">
        {loading ? (
          renderSkeletons()
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} {...book} />)
        ) : (
          <p>Книги не найдены.</p>
        )}
      </div>
    </div>
  );
}
