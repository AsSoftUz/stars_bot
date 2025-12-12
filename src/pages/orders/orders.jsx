import './orders.css'
import { useNavigate } from 'react-router-dom';

const Stars = () => {

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