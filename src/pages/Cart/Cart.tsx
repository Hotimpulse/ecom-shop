import cart from "./cart.module.scss";

export default function Cart() {
  return (
    <div className={cart.cart_wrapper}>
      <div className={cart.cart_container}>
        <h1>My cart</h1>
        <div className={cart.cart_content_box}>
          <div className={cart.cart_contents}>
            <div className="component_cart_item">
              <img src="./" alt="picture of the item" />
              <h3>Essence Mascara Lash Princess</h3>
              <span>$110</span>

              <button>-</button>
              <span>1 item</span>
              <button>+</button>
              <span>Delete</span>
            </div>
          </div>

          <div className={cart.cart_info}>
            <div>
              <p>Total count</p>
              <p>3 items</p>
            </div>

            <div>
              <p>Price without discount</p>
              <p>$700</p>
            </div>

            <div>
              <p>Total price</p>
              <p>$590</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
