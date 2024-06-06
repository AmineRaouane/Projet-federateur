import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import emptyCart from "./Images/emptyCart.png"; // Ensure the path is correct
import "./Products.css";
import CommandeCard from "./CommandeCard";
import api from "../../../api"; // Ensure your api configuration is correct
import { IoIosArrowDropdownCircle,IoIosArrowDroprightCircle } from "react-icons/io";

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    getCommandes();
  }, []);

  const getCommandes = () => {
    api
      .get("/api/commandes/list/")
      .then((res) => {
        setCommandes(res.data.reverse());
      })
      .catch((err) => alert(err));
  };
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFaq = (index) => {
    if (faqOpen === index) {
      setFaqOpen(null);
    } else {
      setFaqOpen(index);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const optionsMonth = { month: "long" };
    const optionsYear = { year: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit" };

    const day = dateString.slice(8,10) ;
    const month = date.toLocaleDateString("en-US", optionsMonth);
    const year = date.toLocaleDateString("en-US", optionsYear);
    const time = date.toLocaleTimeString("en-US", optionsTime);

    return `${day}/${month}/${year} at ${time}`;
  }

  return (
    <div className="commandes-cart">
      <div className="Gap"></div>
      {commandes && commandes.length > 0 ? (
        <>
          <div className="Cartheader">Commandes</div>
          <div className="commande-header">
            <div className="flex-item">Commande_number</div>
            <div className="flex-item">name</div>
            <div className="flex-item">date</div>
            <div className="flex-item">Total</div>
            <div className="flex-item"></div>
          </div>
          {commandes.map((item, index) => (
            <div key={index} className="faq-item">
              <div
                className="commande-smallheader "
                onClick={() => toggleFaq(index)}
              >
                <h2 className="flex-item">{item.commande_number}</h2>
                <h2 className="flex-item">{item.items[0].name}</h2>
                <h2 className="flex-item">{formatDate(item.items[0].date)}</h2>
                <h2 className="flex-item">${item.items[0].total_price}</h2>
                <button className="faq-toggle flex-item">
                  {faqOpen === index ? <IoIosArrowDropdownCircle/> : <IoIosArrowDroprightCircle/>}
                </button>
              </div>
              {faqOpen === index && (
                <div className="faq-answer">
                  <CommandeCard items={item.items} />
                </div>
              )}
            </div>
          ))}
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

export default Commandes;
