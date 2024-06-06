import React from "react";
import { ImCross } from "react-icons/im";
import "./Itemcard.css";

const ItemCard = ({ item, onDecrease, onIncrease, onDestroy }) => {
  return (
    <div className="item-card">
      <div className="item-details">
        <button onClick={onDestroy}>
          <ImCross className="delete-icon" />
        </button>

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
          <button className="quantity-btn" onClick={onDecrease}>
            -
          </button>
          <p>{item.quantity}</p>
          <button className="quantity-btn" onClick={onIncrease}>
            +
          </button>
        </div>
        <div className="item-total">
          <p>${item.quantity * item.product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;