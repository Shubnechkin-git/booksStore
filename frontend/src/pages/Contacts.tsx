import { useEffect, useState } from "react";
import "../styles/Contacts.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function Contact() {
  useEffect(() => {
    document.title = "Контакты — Книжный магазин";
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // состояние загрузки

  const validate = (fieldValues = formData): FormErrors => {
    const temp: FormErrors = {};

    if (!fieldValues.name.trim()) {
      temp.name = "Имя обязательно";
    } else if (fieldValues.name.trim().length < 2) {
      temp.name = "Имя должно быть минимум 2 символа";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fieldValues.email.trim()) {
      temp.email = "Email обязателен";
    } else if (!emailRegex.test(fieldValues.email.trim())) {
      temp.email = "Неверный формат email";
    }

    if (!fieldValues.message.trim()) {
      temp.message = "Сообщение обязательно";
    } else if (fieldValues.message.trim().length < 10) {
      temp.message = "Сообщение должно быть минимум 10 символов";
    }

    return temp;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
    setErrors(validate(newFormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // включаем загрузку
      try {
        const response = await fetch("http://localhost:3000/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.success) {
          setSuccessMessage(data.message || "Сообщение успешно отправлено!");
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
          setTimeout(() => setSuccessMessage(""), 5000);
        } else {
          setErrorMessage(data.message || "Ошибка отправки сообщения.");
        }
      } catch (error) {
        setErrorMessage(`Ошибка: ${(error as Error).message}`);
      } finally {
        setIsLoading(false); // отключаем загрузку
      }
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <div className="contact-page">
      <h1>Свяжитесь с нами</h1>
      <p className="intro">
        Если у вас есть вопросы или предложения, мы всегда рады общению!
        Заполните форму ниже или используйте контактные данные.
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Контактная информация</h2>
          <p>
            <strong>Адрес:</strong> г. Москва, ул. Книжная, 15
          </p>
          <p>
            <strong>Телефон:</strong> +7 (495) 123-45-67
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@bookstore.ru">info@bookstore.ru</a>
          </p>
          <p>
            <strong>Время работы:</strong> Пн-Пт 10:00 – 19:00
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <h2>Обратная связь</h2>
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              aria-describedby="name-error"
              aria-invalid={!!errors.name}
              disabled={isLoading} // отключаем поле при загрузке
            />
            {errors.name && (
              <span className="error" id="name-error">
                {errors.name}
              </span>
            )}
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.ru"
              aria-describedby="email-error"
              aria-invalid={!!errors.email}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error" id="email-error">
                {errors.email}
              </span>
            )}
          </label>

          <label>
            Сообщение:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Напишите ваше сообщение"
              rows={5}
              aria-describedby="message-error"
              aria-invalid={!!errors.message}
              disabled={isLoading}
            />
            {errors.message && (
              <span className="error" id="message-error">
                {errors.message}
              </span>
            )}
          </label>
          {successMessage && (
            <div className="success-message" role="alert" aria-live="polite">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="error" role="alert" aria-live="polite">
              {errorMessage}
            </div>
          )}
          <button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>

      <div className="map-container">
        <iframe
          title="Карта магазина"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.5280363509027!2d37.62039371609558!3d55.75582698055226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414ab9b1a9655b19%3A0xb5e35eecfcf7d9ec!2z0JrQsNC60LDQvdC40Lkg0LrQsNC90LjQtSDQv9C40YHRgtC-0LHRgNCw0Y8!5e0!3m2!1sru!2sru!4v1686540213701!5m2!1sru!2sru"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "8px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
