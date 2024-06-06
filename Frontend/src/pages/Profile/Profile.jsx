import "./Profile.css";
import { MdSubscriptions } from "react-icons/md";
import { TbLogout2, TbBrandShopee } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import SubscriptionInfo from "./SubscriptionInfo";
import { ACCESS_TOKEN } from "../../constants";
import { CiEdit } from "react-icons/ci";
import React, { useState, useEffect } from "react";
import Images from "./Avatars/Images";
import api from "../../api"
import { toast } from "react-toastify";

const Profile = () => {
  // Initial user data
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [saved, setsaved] = useState(null);
  const [Editing, setEditing] = useState(false);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const handleSubmitData = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await api.put("/api/ProfileUpdate/", {avatar: selected});
      EditMode(); // Toggle edit mode after successful update
      setsaved(selected); 
    } catch (error) {
    }

    toast.success("Image updated successfully", {
        autoClose: 2000,
      });
  };

  const getProfileDetails = () => {
    api
      .get("/api/ProfileDetail/")  // Ensure this is the correct endpoint
      .then((res) => {
        setSelected(res.data.avatar);
        setsaved(res.data.avatar);
        setName(res.data.user.username);
      })
      .catch((err) => alert(err));
  };

  const EditMode = () => {
    setEditing(!Editing);
  };

  const handleRadioChange = (index) => {
    setSelected(index);
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const [selectedDiv, setSelectedDiv] = useState("div1");
  const renderContent = () => {
    if (selectedDiv === "div1") {
      return <ProfileInfo />;
    } else if (selectedDiv === "div2") {
      return <SubscriptionInfo />;
    } else {
      return <div>Please select a div</div>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <div style={{ height: "77px" }}></div>
      <div className="Profile-container">
        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="flex-container">
              {Images.map((image, index) => (
                <div className="flex-item" key={index}>
                  <div>
                    <img src={image} alt={`Image ${index}`} />
                    <input
                      type="radio"
                      name="image"
                      checked={selected === index}
                      onChange={() => handleRadioChange(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="Containerforbuttons">
              <button
                onClick={togglePopup}
                className="ButtonForm py-2 px-10 bg-red-700 text-white font-semibold uppercase mb-4 hover:bg-red-500 duration-300"
              >
                Cancel
              </button>
                <button
                  className="ButtonForm py-2 px-10 bg-green-700 text-white font-semibold uppercase mb-4 hover:bg-green-500 duration-300"
                  type="button"
                  onClick={handleSubmitData}
                >
                  Save
                </button>
            </div>
          </div>
        )}

        <div className="Left-container">
          <div className="img-container">
            <img src={Images[saved]} alt="" />
            <button onClick={togglePopup}>
              <CiEdit />
            </button>
            <h1>{name}</h1>
          </div>
          <div className="Under-img">
            <div
              className="div-container"
              onClick={() => {
                setSelectedDiv("div1");
              }}
            >
              <CgProfile />
              Profile
            </div>
            <div
              className="div-container"
              onClick={() => {
                setSelectedDiv("div2");
              }}
            >
              <MdSubscriptions />
              Subscription
            </div>
            <div
              className="div-container"
              onClick={() => {
                navigate("/Commandes");
              }}
            >
              <TbBrandShopee />
              Orders
            </div>
            <div className="div-container" onClick={handleLogout}>
              <TbLogout2 />
              Logout
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </>
  );
};

export default Profile;
