import React from "react";
import "./Popup.css"; // Import the CSS file for styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api"; 

const Popup = ({ closePopup, Clear, Total_price, panierDetails }) => {
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

  const handleSubmit = () => {
    const random_number = generateRandomString(10);
    for (let i = 0; i < panierDetails.length; i++) {
      var commandeData = {
        commande_number: random_number,
        total_price: Total_price, // Example total price
        name: name, // Example date format
        location: Location,
        phone_number: Phone_number,
        product_id: panierDetails[i].product.id,
        quantity : panierDetails[i].quantity
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

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <form className="form-container">
          <input
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="name"
          />

          <input
            className="form-input"
            type="text"
            value={Phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            placeholder="Phone_number"
          />
          <input
            className="form-input"
            type="text"
            value={Location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <button className="form-button" onClick={() => handleSubmit()}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
