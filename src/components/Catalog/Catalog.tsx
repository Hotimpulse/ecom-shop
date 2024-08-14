import DefaultButton from "@src/ui/Buttons/DefaultButton";
import catalog from "./catalog.module.scss";
import ItemCard from "../ItemCard/ItemCard";
import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

interface IProducts {
  products: {
    products: [];
    total?: number;
    skip: number;
    limit: number;
  };
  status: string;
}

const initialState: IProducts = {
  products: {
    products: [],
    skip: 1,
    limit: 12,
  },
  status: "loading",
};

const reducer = (state: IProducts, action: { type: string; payload }) => {
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
  const [{ products: products }, dispatch] = useReducer(reducer, initialState);
  console.log("🚀 ~ Catalog ~ products:", products)
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=&limit=${initialState.products.limit}&skip=${initialState.products.skip}`
        );

        if (!response.ok) throw new Error("No response from the server");

        const data = response
          .json()
          .then((data) => dispatch({ type: "dataReceived", payload: data }));
      } catch (error) {
        toast.error("Error getting products, check your connection!");
      }
    };

    getItems();
  }, [input]);

  function handleSearch(query: string): void {
    setInput(query);
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

        <div className={catalog.catalog_grid_container}>
          <div className={catalog.catalog_grid}>
            {Array.from({ length: 12 }, (_, index) => (
              <React.Fragment key={index}>
                <ItemCard
                  title={products?.products[index]?.title}
                  thumbnail={products?.products[index]?.thumbnail}
                  price={products?.products[index]?.price}
                />
              </React.Fragment>
            ))}
          </div>
          <DefaultButton children={"Show more"} />
        </div>
      </div>
    </div>
  );
}
