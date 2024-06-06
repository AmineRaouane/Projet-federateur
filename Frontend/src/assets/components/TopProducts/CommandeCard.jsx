import "./ItemCard.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const CommandeCard = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <div className="item-card">
          <div className="item-details">
            <img
              className="product-image"
              src={item.product.img_url}
              alt="productImage"
            />
            <h1 className="product-name">{item.product.name}</h1>
          </div>
          <div className="item-info">
            <div className="item-price">${item.product.price}</div>
            <div className="item-quantity">
              <p>{item.quantity}</p>
            </div>
            <div className="item-total">
              <p>${item.quantity * item.product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommandeCard;
