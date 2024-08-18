import { Link, NavLink } from "react-router-dom";
import header from "../Header/header.module.scss";
import CartComponent from "../Header/CartComponent";
import useHandleAnchorClick from "@src/util/useHandleAnchorClick";
import { INavigation } from "@src/interfaces/INavigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@src/store/store";
import { fetchCart } from "@src/store/cart/cartSlice";

export default function Navigation({ mobile }: INavigation) {
  const { carts, status } = useSelector((store: RootState) => store.carts);
  const dispatch = useDispatch<AppDispatch>();
  const userId = 6;

  useEffect(() => {
    const loadCarts = async () => {
      try {
        await dispatch(fetchCart(userId)).unwrap();
      } catch (error) {
        toast.error("Error getting carts!");
      }
    };

    loadCarts();
  }, [dispatch]);

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
              {status === "ready" && carts.carts[0] !== undefined ? (
                <CartComponent itemCount={carts.carts[0].totalQuantity} />
              ) : (
                <CartComponent itemCount={0} />
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
