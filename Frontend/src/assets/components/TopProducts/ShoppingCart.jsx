import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import emptyCart from "./Images/emptyCart.png"; // Ensure you provide the correct path to your image
import "./Products.css";
import ItemCard from "./ItemCard";
import api from "../../../api";
import Paiment from "../../../pages/Paiment/Paiment";

const ShoppingCart = () => {
  const [panierDetails, setPanierDetails] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    getPanierDetails();
  }, []);

  const increaseQuantity = (Id) => {
    api
      .post(`api/panier/increase/${Id}/`)
      .then(() => {
        setPanierDetails((prevItems) =>
          prevItems.map((item) =>
            item.id === Id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      })
      .catch((err) => alert(err));
  };

  const decreaseQuantity = (Id) => {
    api
      .post(`api/panier/decrease/${Id}/`)
      .then(() => {
        setPanierDetails((prevItems) =>
          prevItems
            .map((item) =>
              item.id === Id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        );
      })
      .catch((err) => alert(err));
  };

  const destroyproduct = (Id) => {
    api
      .delete(`api/panier/destroy/${Id}/`)
      .then(() => {
        setPanierDetails((prevItems) =>
          prevItems.filter((item) => item.id !== Id)
        );
      })
      .catch((err) => alert(err));
  };

  const clearPanier = () => {
    api
      .delete("api/panier/clear/")
      .then(() => {
        setPanierDetails([]);
      })
      .catch((err) => alert("Failed to clear panier", err));
  };

  const getPanierDetails = () => {
    api
      .get("/api/products/panierdetail/")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setPanierDetails(data);
      })
      .catch((err) => alert(err));
  };

  const shippingCharge = 30;

  const totalAmt = panierDetails.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div className="shopping-cart">
      <div className="Gap"></div>

      {panierDetails && panierDetails.length > 0 ? (
        <>
          <div className="Cartheader">Shopping Cart</div>
          <div className="product-header">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          {panierDetails.map((item) => (
            <div key={item.id}>
              <ItemCard
                item={item}
                onDecrease={() => decreaseQuantity(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onDestroy={() => destroyproduct(item.id)}
              />
            </div>
          ))}
          <div className="Total_section">
            <div className="buttons_wrapper">
              <button
                onClick={clearPanier}
                className="py-2 px-10 bg-red-700 text-white font-semibold uppercase mb-4 hover:bg-red-500 duration-300"
              >
                Reset cart
              </button>
            </div>

            <div className="buttons_wrapper">
              <button
                onClick={togglePopup}
                className="py-2 px-10 bg-green-700 text-white font-semibold uppercase mb-4 hover:bg-green-500 duration-300"
              >
                Proceed to Checkout
              </button>
              {isPopupVisible && (
                <div
                className="popup-overlay"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgb(255, 255, 255)",
                  position: "fixed",
                  borderRadius: "10px",
                  top: "115px",
                  left: "0",
                  right: "0",
                  margin: "0 auto",
                  width: "50%",
                  height: "420px",
                  zIndex: "1000",
                }}
              >
                  <Paiment
                    closePopup={togglePopup}
                    Clear={clearPanier}
                    Total_price={totalAmt}
                    panierDetails={panierDetails}
                    order={1}
                  />
                </div>
              )}
            </div>
            <div className="max-w-7xl gap-4 flex justify-end mt-4">
              <div className="w-96 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${totalAmt}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide font-titleFont">
                      ${shippingCharge}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg font-titleFont">
                      ${totalAmt + shippingCharge}
                    </span>
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link to="/paymentgateway">
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/TopProducts">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ShoppingCart;
