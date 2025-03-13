import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils";
import styles from "./start.module.scss";



const StartPage = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/menu"); 
  };

  return (
    <div className={styles.startPage} onClick={handleClick}>
      <img  src={getImageUrl("Union.svg")} alt="Yum Yum Gimme Sum Logo" className={styles.logo} />
    </div>
  );
};

export default StartPage;