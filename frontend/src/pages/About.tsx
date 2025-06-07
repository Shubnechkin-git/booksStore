import { useEffect } from "react";
import "../styles/About.css";

export default function About() {
  useEffect(() => {
    document.title = "О Нас — Книжный магазин";
  }, []);

  return (
    <div className="about">
      <h1>О нашем магазине</h1>
      <p className="intro">
        «Книжный дом» — это уютное пространство для всех, кто любит книги. Мы
        работаем с 2020 года и собрали коллекцию из более чем 10 000
        наименований художественной, научной и образовательной литературы.
      </p>

      <div className="about-section two-column">
        <div className="about-text">
          <h2>📚 Наша миссия</h2>
          <p>
            Мы верим, что чтение — это путь к личностному росту, свободе мысли и
            внутренней гармонии. Наша цель — сделать хорошие книги доступными
            каждому.
          </p>
        </div>
        <div className="about-images">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
            alt="Книги на полке"
            className="about-image"
          />
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80"
            alt="Читающий человек"
            className="about-image"
          />
        </div>
      </div>

      <div className="about-section two-column">
        <div className="about-text">
          <h2>👥 Наша команда</h2>
          <p>
            У нас работает небольшая, но сплочённая команда книголюбов: от
            опытных редакторов до увлечённых менеджеров, которые с радостью
            помогут с выбором.
          </p>
        </div>
        <div className="about-images">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
            alt="Команда книжного магазина"
            className="about-image"
          />
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80"
            alt="Рабочее место"
            className="about-image"
          />
        </div>
      </div>

      <div className="about-section">
        <h2>🤝 Сотрудничество</h2>
        <p>
          Мы открыты к сотрудничеству с издательствами, авторами и библиотеками.
          Напишите нам на{" "}
          <a href="mailto:partners@bookstore.ru">partners@bookstore.ru</a>.
        </p>
      </div>

      <div className="about-section">
        <h2>🌍 Наши ценности</h2>
        <ul>
          <li>Честность и прозрачность в работе с клиентами и партнёрами</li>
          <li>Постоянное развитие и улучшение сервиса</li>
          <li>Поддержка местных авторов и издательств</li>
          <li>Экологичная упаковка и доставка</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>📅 История</h2>
        <p>
          Мы начали с маленького книжного стенда на городском фестивале, а
          сегодня — это полноценный интернет-магазин и уютный офлайн-магазин в
          центре города.
        </p>
      </div>
    </div>
  );
}
