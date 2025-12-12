import "./tranzaction.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Tranzaction = () => {

    const navigate = useNavigate();
    
    const [selected, setSelected] = useState("payme");

    return (
        <div className="tranzaction">
            <nav>
                <button onClick={() => navigate("/")} className="back-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg></button>
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

            <footer></footer>
        </div>
    )
}

export default Tranzaction