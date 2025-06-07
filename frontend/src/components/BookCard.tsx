import { Link } from "react-router-dom";
import "../styles/BookCard.css";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: number;
  image?: string | null;
}

const placeholderImage = "https://placehold.co/150x220?text=Нет+изображения";

export default function BookCard({
  id,
  title,
  author,
  price,
  image,
}: BookCardProps) {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // чтобы не было бесконечной рекурсии
    e.currentTarget.src = placeholderImage;
  };

  return (
    <Link to={`/product/${id}`} className="book-card">
      <div className="image-wrapper">
        <img
          src={image || placeholderImage}
          alt={`Обложка книги ${title}`}
          onError={handleImgError}
          loading="lazy"
        />
      </div>
      <h3>{title}</h3>
      <p className="author">{author}</p>
      <p className="price">{price}₽</p>
    </Link>
  );
}
