import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImageUrl } from "../utils";
import styles from "./orderConfirm.module.scss";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const { orderNumber, eta, status, error } = useSelector((state) => state.order);
  
    // Beräkna minuter från ETA
    const calculateEtaMinutes = (eta) => {
      const etaDate = new Date(eta);
      const now = new Date();
      const diffInMinutes = Math.round((etaDate - now) / 60000);
      return diffInMinutes;
    };
  
    const handleProceed = () => {
      navigate("/menu");
    };
    const handleReceipt = () => {
      navigate("/receipt");
    }
  
    return (
      <div className={styles.orderConfirmationPage}>
        <img src={getImageUrl("logo2.svg")}alt="Logo" className={styles.orderLogo} />
  
        {status === "loading" && <p>Lägger order...</p>}
        {status === "failed" && <p>Fel: {error}</p>}
        {status === "succeeded" && (
          <>
            <div className={styles.orderImageContainer}>
              <img src={getImageUrl("boxtop.png")}  alt="Lunchbox" className={styles.orderLunchbox} />
            </div>
            <h1>Dina Wontons Tillagas!</h1>
            <p>
              ETA <span>{calculateEtaMinutes(eta)} MIN</span>
            </p>
            <p>
              <span>#{orderNumber}</span>
            </p>
            <div className={styles.buttonContainer}>
            <button onClick={handleProceed} className={styles.proceedBtn}>
              Gör en ny beställning
            </button>
            <button onClick={handleReceipt} className={styles.receiptBtn}>
              Se Kvitto
            </button>
            </div>
          </>
          
        )}
  
        {status === "idle" && <p>Ingen order finns att visa.</p>}
      </div>
    );
  };
  
  export default OrderConfirmation;