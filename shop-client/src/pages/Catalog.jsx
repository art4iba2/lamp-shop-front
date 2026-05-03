import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

function Catalog() {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 20;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice = maxPrice
      ? product.price <= Number(maxPrice)
      : true;

    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const startIndex = (page - 1) * perPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + perPage);

  return (
    <section>
      <h1>Каталог товаров</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по каталогу"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <input
          type="number"
          placeholder="Максимальная цена"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </section>
  );
}

export default Catalog;