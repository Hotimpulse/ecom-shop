import DefaultButton from "@src/ui/Buttons/DefaultButton";
import catalog from "./catalog.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@src/ui/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store/store";
import { getData } from "@src/store/products/productsSlice";
import { IProduct } from "@src/interfaces/IProducts";

export default function Catalog() {
  const { products, status } = useSelector(
    (store: RootState) => store.products
  );
  console.log("🚀 ~ REDUX ~ products:", products);

  const dispatch = useDispatch();

  const [input, setInput] = useState<string>("");

  const loadItems = async (append = false) => {
    try {
      dispatch(getData(input, append));
    } catch (error) {
      toast.error("Error getting products, check your connection!");
      dispatch({ type: "dataFailed", payload: {} });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadItems(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  function handleSearch(query: string): void {
    setInput(query);
  }

  function handleLoadProducts(): void {
    loadItems(true);
  }

  const allProductsLoaded = products.products.length >= products.total;

  return (
    <div className={catalog.catalog_wrapper}>
      <div className={catalog.catalog_container}>
        <a href="#catalog" className={catalog.catalog_header}>
          <span>Catalog</span>
        </a>
        <input
          type="text"
          placeholder="Search by title"
          className={catalog.catalog_search}
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
        {status === "error" && products.products.length === 0 && (
          <p>No items were found ❌</p>
        )}
        {products.products.length === 0 && <p>No items were found ❌</p>}
        {status === "loading" && <Spinner />}
        {status === "ready" && (
          <div className={catalog.catalog_grid_container}>
            <div className={catalog.catalog_grid}>
              {products.products.map((product: IProduct, index: number) => (
                <React.Fragment key={index}>
                  <ItemCard
                    title={product?.title}
                    thumbnail={product?.thumbnail}
                    price={product?.price}
                  />
                </React.Fragment>
              ))}
            </div>
            {!allProductsLoaded && (
              <DefaultButton
                children={"Show more"}
                onClick={handleLoadProducts}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
