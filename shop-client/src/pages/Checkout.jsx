import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cart";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.phone) {
      alert("Заполните почту и номер телефона");
      return;
    }

    clearCart();
    navigate("/confirmation");
  };

  return (
    <section>
      <h1>Оформление заказа</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Почта
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </label>

        <label>
          Номер телефона
          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />
        </label>

        <div className="delivery-info">
          <p><strong>Доставка:</strong> только курьером.</p>
          <p><strong>Оплата:</strong> курьеру наличными или картой при получении.</p>
          <p>Предоплата на сайте не требуется.</p>
        </div>

        <button type="submit">
          Подтвердить заказ
        </button>
      </form>
    </section>
  );
}

export default Checkout;