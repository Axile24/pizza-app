import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils";
import styles from "./cart.module.scss";
import { placeOrder } from "../redux/orderSlice";


import {
  decreaseQuantity,
  addToCart,
  removeFromCart,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const [clickedItem, setClickedItem] = useState(null);

  // Compute total dynamically
  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  // Handle checkout process with error handling
  const handleCheckout = useCallback(async () => {
    try {
      const tenantID = localStorage.getItem("tenantID");
      const orderData = { tenant: tenantID, items, total };
      await dispatch(placeOrder(orderData));
      navigate("/order");
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  }, [dispatch, items, total, navigate]);

  // Handle quantity change with animation
  const handleQuantityChange = (item, type) => {
    setClickedItem(item.id);
    setTimeout(() => setClickedItem(null), 200);

    type === "increase"
      ? dispatch(addToCart(item))
      : dispatch(decreaseQuantity(item));
  };

  // Handle item removal
  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <img
          src={getImageUrl("Union.svg")}
          alt="Cart Icon"
          className={styles.cartIconCart}
          onClick={() => navigate("/menu")}
        />
        <p className={styles.emptyCart}>Varukorgen är tom</p>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <img
        src={getImageUrl("Union.svg")}
        alt="Cart Icon"
        className={styles.cartIconCart}
        onClick={() => navigate("/menu")}
      />

      <ul className={styles.cartItems}>
        {items.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.cartHeader}>
              <span className={styles.cartName}>{item.name.toUpperCase()}</span>
              <span className={styles.cartLine}></span>
              <span className={styles.cartPrice}>
                {item.price * item.quantity}SEK
              </span>
            </div>

            <div className={styles.cartControls}>
              <button
                className={`${styles.controlBtn} ${
                  clickedItem === item.id ? styles.btnClicked : ""
                }`}
                onClick={() => handleQuantityChange(item, "decrease")}
              >
                {" "}
                -{" "}
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                className={`${styles.controlBtn} ${
                  clickedItem === item.id ? styles.btnClicked : ""
                }`}
                onClick={() => handleQuantityChange(item, "increase")}
              >
                +
              </button>
        
              <button
                className={styles.trashBtn} onClick={() => handleRemove(item)}></button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.cartBottomContainer}>
        <div className={styles.cartTotalBox}>
          <span className={styles.cartTotalLabel}>TOTAL</span>
          <span className={styles.cartTotalValue}>{total} SEK</span>
        </div>

        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          TAKE MY MONEY
        </button>
      </div>
    </div>
  );
};

export default Cart;
