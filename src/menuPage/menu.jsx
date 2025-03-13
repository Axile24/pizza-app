import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMenuData } from "../redux/menuSlice"; // Import action
import { addToCart } from "../redux/cartSlice";
import { getImageUrl } from "../utils";
import styles from "./menu.module.scss";

const Menu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Dispatching fetchMenuData...");
        dispatch(fetchMenuData()); // Fetch menu when component mounts
    }, [dispatch]);

    const menu = useSelector((state) => state.menu.items) || [];
    const status = useSelector((state) => state.menu.status);
    const cartItems = useSelector((state) => state.cart.items);
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    console.log("Menu state from Redux:", menu);

    const dips = menu.filter((item) => item.type === "dip");
    const otherItems = menu.filter((item) => item.type !== "dip");

    if (status === "loading") return <p>Laddar MENY chill...</p>;
    if (status === "failed") return <p>Det gick inte att ladda menyn.</p>;

    return (
        <div className={styles.menuPage}>
            <img src={getImageUrl("logo2.svg")}
             alt="Yum Yum Gimme Sum Logo"
              className={styles.logo2} />

            <div className={styles.cartContainer}>
                <div className={styles.cartBox} onClick={() => navigate("/cart")}>
                <img src={getImageUrl("Union.svg")}
             alt="Bag Logo"
              className={styles.cartContainerBag} />

                    <span className={styles.cartBadge}>{cartItemCount}</span>
                </div>
            </div>

            <div className={styles.menuBox}>
                <h1>Meny</h1>
                <ul>
                    {otherItems.length > 0 ? (
                        otherItems.map((item) => (
                            <li key={item.id} className={styles.menuItem} onClick={() => dispatch(addToCart(item))}>
                                <div className={styles.menuHeaderx}>
                                    <span className={styles.menuName}>{item.name.toUpperCase()}</span>
                                    <span className={styles.menuLine}></span>
                                    <span className={styles.menuPrice}>{item.price} SEK</span>
                                </div>
                                {item.ingredients && (
                                    <p className={styles.menuIngredients}>{item.ingredients.join(", ")}</p>
                                )}
                            </li>
                        ))
                    ) : (
                        <p>Menu är tom </p>
                    )}
                </ul>

                {dips.length > 0 && (
                    <>
                        <div className={styles.menuHeader}>
                            <span className={styles.menuName}>DIPSÅS</span>
                            <span className={styles.menuLine}></span>
                            <span className={styles.menuPrice}>19 SEK</span>
                        </div>
                        <div className={styles.dipContainer}>
                            {dips.map((dip) => (
                                <span key={dip.id} className={styles.dipItem} onClick={() => dispatch(addToCart(dip))}>
                                    {dip.name}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Menu;