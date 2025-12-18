import "./tranzaction.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useTelegramBack from "../../hooks/useTelegramBack";

const Tranzaction = () => {

    useTelegramBack("/");
    const navigate = useNavigate();
    
    const [selected, setSelected] = useState("payme");

    return (
        <div className="tranzaction">
            <nav>
                {/* <button onClick={() => navigate("/")} className="back-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg></button> */}
                <div className="left">
                    <h2>Checkout</h2>
                </div>
            </nav>
   
            <div className="plans">
                <h3>Choose Payment Method</h3>
                <label
                    key="payme"
                    className={`glass-card plan ${selected === "payme" ? "active" : ""}`}>
                    <div className="contents">
                        <div className="content">
                            <div className="card-img">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                            </div>
                            <div className="top">
                                <h3>Payme</h3>
                                <p className="per-month">Uzcard, Humo</p>
                            </div>
                        </div>
                    </div>
                    <input
                        type="radio"
                        value="payme"
                        checked={selected === "payme"}
                        onChange={() => setSelected("payme")}
                    />
                </label>
                <label
                    key="click"
                    className={`glass-card plan ${selected === "click" ? "active" : ""}`}>
                    <div className="contents">
                        <div className="content">
                            <div className="card-img">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                            </div>
                            <div className="top">
                                <h3>Click</h3>
                                <p className="per-month">One-click payment</p>
                            </div>
                        </div>
                    </div>
                    <input
                        type="radio"
                        value="click"
                        checked={selected === "click"}
                        onChange={() => setSelected("click")}
                    />
                </label>
            </div>

            <div className="quato">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                    Payments are secure and encrypted.
                </p>
            </div>

            <footer>
                <div className="right">
                    <p>Total price</p>
                    <h2>USD 39.99</h2>
                </div>
                <button onClick={() => navigate("/")} className="pay-btn premium-gradient neon-glow">Pay now</button>
            </footer>
        </div>
    )
}

export default Tranzaction