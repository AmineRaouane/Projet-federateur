import React, { useState, useEffect } from "react";
import api from "../../api";
import "./Profile.css";
import plans_description from "./const";
import Paiment from "../Paiment/Paiment";

const Plan_order = { "Free": 0, "Basic": 1, "Premium": 2, "Gold": 3 };

const SubscriptionInfo = () => {
  const [Tier, setTier] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    getTier();
  }, []);

  const getTier = () => {
    api
      .get("/api/subscription/") // Ensure this is the correct endpoint
      .then((res) => {
        setTier(res.data.subscription_type);
      })
      .catch((err) => alert(err));
  };

  const handleSend = (plan) => {
    if (Plan_order[plan.tier] > Plan_order[Tier]) {
      setSelectedPlan(plan);
      setPopupVisible(true);
    }
  };

  return (
    <div className="Subscription-container">
      <div className="Subscription-header">Subscription Plan</div>
      <div className="Subscription-content">
        {plans_description.map((plan, index) => {
          // Determine the background color based on the current tier
          let backgroundColor = "#cb801d";
          let Text = "Upgrade to this plan";
          if (Tier !== "Free") {
            const currentTierIndex = plans_description.findIndex(
              (p) => p.tier === Tier
            );
            if (index < currentTierIndex) {
              Text = "Included";
              backgroundColor = "gray";
            } else if (index === currentTierIndex) {
              Text = "Current Plan";
              backgroundColor = "gray";
            }
          }

          return (
            <div className="Plan" key={plan.tier}>
              <div className="Plan-header">
                {plan.tier}
                <p>${plan.price - 0.01}/month</p>
              </div>
              <div className="Plan-Button">
                <button
                  onClick={() => handleSend(plan)}
                  style={{ backgroundColor }}
                >
                  {Text}
                </button>
              </div>
              <div className="Plan-Content">
                {plan.descriptions.map((description, descIndex) => (
                  <p key={descIndex} style={{ marginLeft: "0.8rem" }}>
                    {description}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {isPopupVisible && selectedPlan && (
        <div className="popup-overlay">
          <Paiment
            closePopup={togglePopup}
            // Clear={clearPanier}
            Total_price={selectedPlan.price - 0.01}
            // panierDetails={panierDetails}
            order={2}
            Tier={selectedPlan.tier}
          />
        </div>
      )}
    </div>
  );
};

export default SubscriptionInfo;
