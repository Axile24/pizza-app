import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils";
import { selectOrderNumber, selectCartItems, selectCartTotal } from "../redux/selectors"; // Import optimized selectors
import styles from "./kvitot.module.scss";

const Kvitot = () => {
    const navigate = useNavigate();

    // Use memoized selectors to prevent unnecessary re-renders
    const orderNumber = useSelector(selectOrderNumber);
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const handleNewOrder = () => {
        navigate("/menu");
    };

    return (
        <div className={styles.receiptPage}>
            <img src={getImageUrl("logo.png")} alt="YYGS Logo" className={styles.receiptLogo} />
            <div className={styles.receiptContainer}>
                <h1>KVITTO</h1>
                <p className={styles.receiptOrderNumber}>#{ orderNumber || "N/A"}</p>

                {items.length > 0 ? (
                    <ul className={styles.receiptItems}>
                        {items.map(({ id, name, price, quantity }) => (
                            <li key={id} className={styles.receiptItem}>
                                <div className={styles.receiptItemHeader}>
                                    <span className={styles.receiptItemName}>{name.toUpperCase()}</span>
                                    <span className={styles.receiptLine}></span>
                                    <span className={styles.receiptItemPrice}>
                                        {(price * quantity).toLocaleString()} SEK
                                    </span>
                                </div>
                                <div className={styles.receiptItemQuantity}>{quantity} stycken</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.emptyMessage}>Inga varor i beställningen.</p>
                )}

                <div className={styles.receiptTotalBox}>
                    <span className={styles.totalText}>TOTAL</span>
                    <span className={styles.totalPrice}>{total.toLocaleString()} SEK</span>
                </div>
            </div>

            <button className={styles.newOrderBtn} onClick={handleNewOrder}>
                Gör en ny beställning
            </button>
        </div>
    );
};

export default Kvitot;
