import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { TbBrandShopee } from "react-icons/tb";
import ProductModal from "./ProductModal";
import "./Products.css";
import { toast } from "react-toastify";
import api from "../../../api";
import { ACCESS_TOKEN } from "../../../constants";

const TABS = ["Clothes", "Supplements", "Weights"];

const TopProducts = ({ handleOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {//? get all products from the database
    api
      .get("/api/products/")
      .then((res) => res.data)
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const filteredProducts = () => {
    return products.filter((product) => product.categorie == activeTab);
  };

  const handleOrderClick = (productId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      //? If the user is not logged in, redirect them to the login page
      navigate("/login");
      return;
    }

    api
      .post("api/products/panieraddproduct/", {//? add product to the cart
        product: productId,
        quantity: 1,
      })
      .then((response) => {
        toast.success("Product added to cart", {
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error("Error adding product to panier:", error);
      });
  };

  const handleDetailsClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="container">
        <div className="Gap"></div>
        {/* Tabs */}
        <div className="TabsWrapper">
          <div className="Tabs mb-8 flex ">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 mx-2 ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-full`}
              >
                {tab}
              </button>
            ))}

            <div
              style={{
                position: "fixed",
                left: 10,
                top: "20%",
                transform: "translateY(-30%)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                zIndex: 1000,
              }}
            >
              <div
                className="CartButtonwrapper py-2 px-4 mx-2 bg-gray-200 text-gray-800 rounded-full hover:bg-green-500 hover:text-white display:flex gap-2"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                  Cart <FaShoppingCart />
              </div>
              <div
                className="CartButtonwrapper py-2 px-4 mx-2 bg-gray-200 text-gray-800 rounded-full hover:bg-green-500 hover:text-white"
                onClick={() => {
                  navigate("/Commandes");
                }}
              >
                Orders <TbBrandShopee />
              </div>
            </div>
          </div>
        </div>

        <div className="Gap"></div>
        {/* Products */}
        <div className="grid grid-cols-3 gap-x-12 gap-y-14">
          {filteredProducts().map((data) => (
            <div
              key={data.id}
              data-aos="zoom-in"
              className="rounded-2xl bg-white hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group"
              style={{ margin: "20px" }}
            >
              <div className="h-[100px]">
                <img
                  src={data.img_url}
                  alt=""
                  className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300  background-color: transparent;"
                />
              </div>
              <div className="p-4 text-center">
                <div className="w-full flex items-center justify-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <h1 className="text-xl font-bold">{data.title}</h1>
                <h3 className="text-xl font-bold">{data.price - 0.01} $</h3>
                <button
                  style={{ backgroundColor: "#ff4500" }}
                  className="hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                  onClick={() => handleOrderClick(data.id)}
                >
                  Add to cart
                </button>
                <button
                  className="hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 bg-blue-500 ml-2"
                  onClick={() => handleDetailsClick(data)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TopProducts;
