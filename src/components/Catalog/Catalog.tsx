import DefaultButton from "@src/ui/Buttons/DefaultButton";
import catalog from "./catalog.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { IProducts, IProductsData } from "@src/interfaces/IProducts";
import Spinner from "@src/ui/Spinner/Spinner";

const initialState: IProducts = {
  products: {
    products: [],
    skip: 1,
    limit: 12,
    total: 0,
  },
  status: "loading",
};

type ProductsAction =
  | { type: "dataReceived"; payload: IProductsData }
  | { type: "dataFailed"; payload: object };

const reducer = (state: IProducts, action: ProductsAction): IProducts => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, products: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action");
  }
};

export default function Catalog() {
  const [{ products, status }, dispatch] = useReducer(reducer, initialState);

  const [input, setInput] = useState<string>("");

  const getItems = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${input}&limit=${initialState.products.limit}&skip=${initialState.products.skip}`
      );

      if (!response.ok) throw new Error("No response from the server");

      const data = await response.json();
      dispatch({ type: "dataReceived", payload: data });
    } catch (error) {
      toast.error("Error getting products, check your connection!");
      dispatch({ type: "dataFailed", payload: {} });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getItems();
    }, 1000);

    return () => clearTimeout(getItems);
  }, [input]);

  function handleSearch(query: string): void {
    setInput(query);
  }

  function handleLoadProducts(): void {
    getItems();
  }

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
        {status === "error" && products?.products.length === 0 && (
          <p>No items were found ❌</p>
        )}
        {products?.products.length === 0 && <p>No items were found ❌</p>}
        {status === "loading" && <Spinner />}
        {status === "ready" && (
          <div className={catalog.catalog_grid_container}>
            <div className={catalog.catalog_grid}>
              {products?.products.map((product, index: number) => (
                <React.Fragment key={index}>
                  <ItemCard
                    title={product?.title}
                    thumbnail={product?.thumbnail}
                    price={product?.price}
                  />
                </React.Fragment>
              ))}
            </div>
            <DefaultButton
              children={"Show more"}
              onClick={handleLoadProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
}
