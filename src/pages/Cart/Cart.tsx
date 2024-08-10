import cart from "./cart.module.scss";
import CartInfo from "@src/components/Cart/CartInfo/CartInfo";
import CartItems from "@src/components/Cart/CartItems/CartItems";
import PlusMinusItem from "@src/components/Cart/PlusMinusItem/PlusMinusItem";
import cartItems from "../../components/Cart/CartItems/cartItems.module.scss";
import DefaultButton from "@src/ui/Buttons/DefaultButton";

export default function Cart() {
  return (
    <div className={cart.cart_wrapper}>
      <h1 className={cart.cart_header}>My cart</h1>

      <div className={cart.cart_main_container}>
        <div className={cart.cart_items_container}>
          <div className={cart.cart_contents}>
            <CartItems
              image={
                <picture>
                  <source
                    srcSet="./src/assets/pics/gallery_shoe_pic.avif"
                    type="image/avif"
                  />
                  <img
                    className={cartItems.cart_item_pic}
                    src="./src/assets/pics/gallery_shoe_pic.avif"
                    alt="picture of the item"
                    loading="lazy"
                  />
                </picture>
              }
            >
              <div className={cartItems.cart_right_container}>
                <div className={cartItems.cart_btn_container}>
                  <PlusMinusItem count="1" />
                </div>
                <span className={cartItems.cart_item_del_text}>Delete</span>
              </div>
            </CartItems>
            <CartItems
              image={
                <picture>
                  <source
                    srcSet="./src/assets/pics/gallery_shoe_pic.avif"
                    type="image/avif"
                  />
                  <img
                    className={cartItems.cart_item_pic}
                    src="./src/assets/pics/gallery_shoe_pic.avif"
                    alt="picture of the item"
                    loading="lazy"
                  />
                </picture>
              }
            >
              <div className={cartItems.cart_right_container}>
                <div className={cartItems.cart_btn_container}>
                  <PlusMinusItem count="1" />
                </div>
                <span className={cartItems.cart_item_del_text}>Delete</span>
              </div>
            </CartItems>
            <CartItems
              image={
                <img
                  className={cartItems.cart_item_pic}
                  src="./src/assets/pics/gallery_shoe_pic.avif"
                  alt="picture of the item"
                />
              }
            >
              <div className={cartItems.cart_right_container}>
                <div className={cartItems.cart_btn_container}>
                  <PlusMinusItem count="5" />
                </div>
                <span className={cartItems.cart_item_del_text}>Delete</span>
              </div>
            </CartItems>
            <CartItems
              image={
                <picture>
                  <source
                    srcSet="./src/assets/pics/gallery_shoe_pic.avif"
                    type="image/avif"
                  />
                  <img
                    className={cartItems.cart_item_pic}
                    src="./src/assets/pics/gallery_shoe_pic.avif"
                    alt="picture of the item"
                    loading="lazy"
                  />
                </picture>
              }
            >
              <div className={cartItems.cart_right_delcontainer}>
                <DefaultButton ariaLabel="Delete Button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7.14286H16.6038L13.0359 0.34668C12.8589 0.00908289 12.475 -0.101141 12.1784 0.10185C11.8823 0.304841 11.7865 0.743572 11.9641 1.08189L15.1461 7.14286H4.85388L8.03587 1.08184C8.21348 0.743524 8.11767 0.304793 7.82164 0.101802C7.5244 -0.101189 7.14173 0.00903482 6.96411 0.346631L3.39617 7.14281H0V8.57139H1.35651L2.94432 18.2512C3.11033 19.2648 3.88547 20 4.78761 20H15.2124C16.1145 20 16.8896 19.2648 17.055 18.252L18.6434 8.57139H20C20 8.57139 20 7.14286 20 7.14286V7.14286ZM15.8264 17.989C15.7715 18.3266 15.5133 18.5715 15.2124 18.5715H4.78761C4.4867 18.5715 4.22854 18.3266 4.173 17.9883L2.62789 8.57139H17.3721L15.8264 17.989V17.989Z"
                      fill="white"
                    />
                  </svg>
                </DefaultButton>
              </div>
            </CartItems>
          </div>
        </div>
        <CartInfo />
      </div>
    </div>
  );
}
