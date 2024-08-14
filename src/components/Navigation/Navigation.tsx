import { Link, NavLink } from "react-router-dom";
import header from "../Header/header.module.scss";
import CartComponent from "../Header/CartComponent";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";
import { INavigation } from "@src/interfaces/INavigation";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

interface IUserCart {
  carts: {
    carts: [];
    total: number;
    skip: number;
    limit: number;
  };
  status: string;
}

const initialState: IUserCart = {
  carts: {
    carts: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  status: "loading", // 'loading', 'error', 'ready'
};

const reducer = (state: IUserCart, action: { type: string; payload }) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, carts: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action");
  }
};

export default function Navigation({ mobile }: INavigation) {
  const [{ carts, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUserCartData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/carts/user/6`);

        if (!response.ok) throw new Error("No response from the server");

        const data = response
          .json()
          .then((data) => dispatch({ type: "dataReceived", payload: data }));
      } catch (error) {
        dispatch({ type: "dataFailed", payload: {} });
      }
    };

    getUserCartData();
  }, []);

  return (
    <nav className={header.navigation}>
      <ul
        className={
          mobile === "mobile" ? header.nav_list_mobile : header.nav_list
        }
      >
        <li>
          <Link
            to="/#catalog"
            className={header.nav_item}
            onClick={useHandleAnchorClick("#catalog")}
          >
            Catalog
          </Link>
        </li>
        <li>
          <Link
            to="/#faq"
            className={header.nav_item}
            onClick={useHandleAnchorClick("#faq")}
          >
            FAQ
          </Link>
        </li>
        <li>
          <NavLink to="/cart">
            <div className={header.cart_wrapper}>
              {status === "loading" && <CartComponent itemCount={0} />}
              {status === "ready" && (
                <CartComponent itemCount={carts.carts[0].totalQuantity} />
              )}
              {status === "error" && <CartComponent itemCount={0} /> &&
                toast.error("Error getting the cart contents")}
            </div>
          </NavLink>
        </li>
        <li>
          <Link to="#" className={header.nav_item}>
            Johnson Smith
          </Link>
        </li>
      </ul>
    </nav>
  );
}
