import DefaultButton from "@src/ui/Buttons/DefaultButton";
import catalog from "./catalog.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "@src/ui/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { IProduct } from "@src/interfaces/IProducts";
import { fetchProducts } from "@src/store/products/productsSlice";
import SearchBar from "../SearchBar/SearchBar";

export default function Catalog() {
  const { products, status, input } = useSelector(
    (store: RootState) => store.products
  );
  const dispatch = useDispatch<AppDispatch>();

  const loadItems = async (append = false) => {
    try {
      await dispatch(fetchProducts({ input, append })).unwrap();
    } catch (error) {
      toast.error("Error getting products, check your connection!");
      console.error(error);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadItems(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

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
        <SearchBar />
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
                    id={product?.id}
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

