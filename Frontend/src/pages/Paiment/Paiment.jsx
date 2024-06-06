import React from "react";
import Card from "./images/card_img.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function Paiment({ closePopup, Clear, Total_price, panierDetails, Tier,order }) {
  const [name, setname] = useState("");
  const [Location, setLocation] = useState("");
  const [Phone_number, setPhone_number] = useState("");

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const navigate = useNavigate();

  const handleSubmitProducts = () => {
    const random_number = generateRandomString(10);
    for (let i = 0; i < panierDetails.length; i++) {
      var commandeData = {
        commande_number: random_number,
        total_price: Total_price,
        name: name,
        location: Location,
        phone_number: Phone_number,
        product_id: panierDetails[i].product.id,
        quantity: panierDetails[i].quantity,
      };
      api
        .post(`api/commandecreate/`, commandeData)
        .then(() => {
          console.log("Commande created");
        })
        .catch((err) => alert(err));
    }
    Clear();
    navigate("/Commandes");
  };
  const handleSubmitPlan = () => {
  api
    .put(`api/subscription/update/`, { subscription_type: Tier, subscription_price: Total_price })
    .then(() => {
      console.log("Subscription updated");
      navigate("/Profile");
    })
    .catch((err) => alert(err));
};

  const handleorder = (e) => {
    if (order === 1) {
      e.preventDefault();
      handleSubmitProducts();
      if (!name || !Location || !Phone_number) {
        alert("Please fill in all required fields.");
        return;
      }
    }
    else{
      handleSubmitPlan();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25px",
        minHeight: "100vh",
      }}
    >
      <form
        style={{
          padding: "20px",
          width: "700px",
          background: "#fff",
          boxShadow: "2px 5px 10px rgba(0,0,0,.3)",
        }}
        action=""
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
          className="row"
        >
          <div style={{ flex: "1 1 250px" }} className="col">
            <h3
              style={{
                fontSize: "20px",
                color: "#333",
                paddingBottom: "5px",
                textTransform: "uppercase",
              }}
              className="title"
            >
              billing address
            </h3>

            <div className="inputBox">
              <span>full name :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="john deo"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <span>Phone number :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="012-345-6789"
                value={Phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <span>address :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="room - street - locality"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="inputBox">
              <span>city :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="mumbai"
              />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>state :</span>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "10px 15px",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  type="text"
                  placeholder="Maroc"
                />
              </div>
              <div className="inputBox">
                <span>zip code :</span>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "10px 15px",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  type="text"
                  placeholder="123 456"
                />
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 250px" }} className="col">
            <h3
              style={{
                fontSize: "20px",
                color: "#333",
                paddingBottom: "5px",
                textTransform: "uppercase",
              }}
              className="title"
            >
              payment
            </h3>

            <div className="inputBox">
              <span>cards accepted :</span>
              <img
                style={{
                  height: "34px",
                  marginTop: "5px",
                  filter: "drop-shadow(0 0 1px #000)",
                }}
                src={Card}
                alt=""
              />
            </div>
            <div className="inputBox">
              <span>name on card :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="Amine"
              />
            </div>
            <div className="inputBox">
              <span>credit card number :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="number"
                placeholder="1111-2222-3333-4444"
              />
            </div>
            <div className="inputBox">
              <span>exp month :</span>
              <input
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  padding: "10px 15px",
                  fontSize: "15px",
                  textTransform: "none",
                }}
                type="text"
                placeholder="january"
              />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>exp year :</span>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "10px 15px",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  type="number"
                  placeholder="2022"
                />
              </div>
              <div className="inputBox">
                <span>CVV :</span>
                <input
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    padding: "10px 15px",
                    fontSize: "15px",
                    textTransform: "none",
                  }}
                  type="text"
                  placeholder="1234"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <button
            style={{
              width: "50%",
              padding: "12px",
              fontSize: "17px",
              background: "red",
              color: "#fff",
              marginTop: "5px",
              cursor: "pointer",
            }}
            className="submit-btn"
            onClick={closePopup}
          >
            Close
          </button>
          <button
            style={{
              width: "50%",
              padding: "12px",
              fontSize: "17px",
              background: "#27ae60",
              color: "#fff",
              marginTop: "5px",
              cursor: "pointer",
            }}
            className="submit-btn"
            onClick={handleorder}
          >
            proceed to checkout
          </button>
        </div>
      </form>
    </div>
  );
}

export default Paiment;

// // App.js or index.js
// import React from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from './CheckoutForm';

// const stripePromise = loadStripe('publishable-key');

// function Payment() {
//   return (
//     <>
//     <div style={{height:'77px'}}></div>
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//     </>
//   );
// }

// export default Payment;
