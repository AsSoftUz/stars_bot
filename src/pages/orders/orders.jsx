import './orders.scss'
import { useNavigate } from 'react-router-dom';
import useTelegramBack from "../../hooks/useTelegramBack";

const Stars = () => {
    useTelegramBack("/");

    const navigate = useNavigate();

    return (
        <div className="orders">
            <div className="img">
                <p>📦</p>
            </div>
            <div className="text">
                <h3>Order Successful!</h3>
                <p>Your items have been added to your account.</p>
            </div>
            <button onClick={() => navigate("/")}>Return Home</button>
        </div>
    )
}
export default Stars;