import { Link } from "react-router-dom";

function Confirmation() {
  return (
    <section className="confirmation">
      <h1>Заказ оформлен</h1>
      <p>Спасибо за покупку! Мы свяжемся с вами для подтверждения доставки.</p>

      <Link to="/catalog" className="button">
        Вернуться в каталог
      </Link>
    </section>
  );
}

export default Confirmation;