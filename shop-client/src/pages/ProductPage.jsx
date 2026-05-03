import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { addToCart } from "../utils/cart";

function ProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    text: ""
  });

  useEffect(() => {
    if (product) {
      const savedReviews =
        JSON.parse(localStorage.getItem(`reviews-${product.id}`)) || product.reviews || [];

      setReviews(savedReviews);
    }
  }, [product]);

  if (!product) {
    return <h1>Товар не найден</h1>;
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      alert("Заполните имя и текст отзыва");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewForm.name,
      text: reviewForm.text,
      createdAt: new Date().toLocaleDateString("ru-RU")
    };

    const updatedReviews = [...reviews, newReview];

    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${product.id}`, JSON.stringify(updatedReviews));

    setReviewForm({
      name: "",
      text: ""
    });
  };

  return (
    <section>
      <div className="product-page">
        <img src={product.image} alt={product.title} />

        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <h2>{product.price} ₽</h2>

          <ul>
            <li>Яркость: {product.brightness} лм</li>
            <li>Цоколь: {product.base}</li>
            <li>Размеры: {product.size}</li>
            <li>Тип: {product.type}</li>
            <li>Форма: {product.shape}</li>
          </ul>

          <button onClick={() => addToCart(product)}>
            Добавить в корзину
          </button>
        </div>
      </div>

      <section className="reviews-section">
        <h2>Отзывы покупателей</h2>
        <p className="section-description">
          Здесь покупатели могут оставить отзыв о товаре.
        </p>

        <form className="review-form" onSubmit={handleReviewSubmit}>
          <label>
            Ваше имя
            <input
              type="text"
              value={reviewForm.name}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, name: e.target.value })
              }
              placeholder="Введите имя"
            />
          </label>

          <label>
            Отзыв
            <textarea
              value={reviewForm.text}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, text: e.target.value })
              }
              placeholder="Напишите отзыв о товаре"
              rows="4"
            />
          </label>

          <button type="submit">
            Оставить отзыв
          </button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p>Пока отзывов нет. Станьте первым покупателем, который оставит отзыв.</p>
          ) : (
            reviews.map((review) => {
              if (typeof review === "string") {
                return (
                  <div className="review-card" key={review}>
                    <p>{review}</p>
                  </div>
                );
              }

              return (
                <div className="review-card" key={review.id}>
                  <div className="review-header">
                    <strong>{review.name}</strong>
                    <span>{review.createdAt}</span>
                  </div>
                  <p>{review.text}</p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}

export default ProductPage;