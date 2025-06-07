import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Product.css";

const placeholderImage = "https://placehold.co/300x450?text=Нет+изображения";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image?: string;
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Товар не найден");
        return res.json();
      })
      .then((data: Book) => {
        setBook(data);
      })
      .catch((e) => {
        setError(e.message);
        setBook(null);
      })
      .finally(() => setTimeout(() => setLoading(false), 300));
  }, [id]);

  useEffect(() => {
    if (book) {
      document.title = `${book.title} — Книжный магазин`;
    } else {
      document.title = "Товар не найден — Книжный магазин";
    }
    return () => {
      document.title = "Книжный магазин";
    };
  }, [book]);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = placeholderImage;
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="skeleton-image" />
        <div className="skeleton-text product-info">
          <h2>
            <div className="skeleton-line long" />
          </h2>
          <p>
            <div className="skeleton-line medium" />
          </p>
          <p>
            <div className="skeleton-line short" />
          </p>
          <p>
            <div className="skeleton-line long" />
          </p>
            <div className="skeleton-line short" />
        </div>
      </div>
    );
  }

  if (error || !book) {
    return <div className="not-found">{error || "Товар не найден"}</div>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img
          src={book.image || placeholderImage}
          alt={`Обложка книги ${book.title}`}
          onError={handleImgError}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h2>{book.title}</h2>
        <p>
          <strong>Автор:</strong> {book.author}
        </p>
        <p>
          <strong>Цена:</strong> {book.price}₽
        </p>
        <p>
          <strong>Описание:</strong> {book.description}
        </p>
        <Link to="/" className="back-link">
          ← Назад
        </Link>
      </div>
    </div>
  );
}
