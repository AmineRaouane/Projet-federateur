import React, { useState, useEffect } from "react";
import "./Profile.css";
import api from "../../api";
import { toast } from "react-toastify";

const ProfileInfo = ({setName}) => {
  const [profileDetails, setProfileDetails] = useState({
    user: { username: "", email: "" },
    phone_number: "",
    location: "",
    firstname: "",
    lastname: "",
    age: 0,
    job: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    api
      .get("/api/ProfileDetail/")  // Ensure this is the correct endpoint
      .then((res) => {
        setProfileDetails(res.data);
      })
      .catch((err) => alert(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("user.")) {
      setProfileDetails((prevState) => ({
        ...prevState,
        user: { ...prevState.user, [name.split(".")[1]]: value },
      }));
    } else {
      setProfileDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await api.put("/api/ProfileUpdate/", profileDetails);
      setProfileDetails(response.data); // Update the state with the response data
      toggleEditMode();
      setName(profileDetails.user.username) 
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    toast.success("Profile updated successfully", {
        autoClose: 2000,
      });
  };
  

  return (
    <div className="Right-container">
      <form >
        <h1 className="top">Personal Information</h1>
        <div className="Elements-wrapper">
          <div className="left-Elements-wrapper">
            <div className="form-div">
              <h1>Username:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="user.username"
                  value={profileDetails.user.username}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.user.username}</div>
              )}
            </div>
            <div className="form-div">
              <h1>First name:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="firstname"
                  value={profileDetails.firstname}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.firstname}</div>
              )}
            </div>
            <div className="form-div">
              <h1>Last name:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="lastname"
                  value={profileDetails.lastname}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.lastname}</div>
              )}
            </div>
            <div className="form-div">
              <h1>Email:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="email"
                  name="user.email"
                  value={profileDetails.user.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.user.email}</div>
              )}
            </div>
          </div>
          <div className="right-Elements-wrapper">
            <div className="form-div">
              <h1>Location:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="location"
                  value={profileDetails.location}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.location}</div>
              )}
            </div>
            <div className="form-div">
              <h1>Phone:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="phone_number"
                  value={profileDetails.phone_number}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.phone_number}</div>
              )}
            </div>
            <div className="form-div">
              <h1>Age:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="number"
                  name="age"
                  value={profileDetails.age}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.age}</div>
              )}
            </div>
            <div className="form-div">
              <h1>Job:</h1>
              {isEditing ? (
                <input
                  className="input"
                  type="text"
                  name="job"
                  value={profileDetails.job}
                  onChange={handleChange}
                />
              ) : (
                <div className="input">{profileDetails.job}</div>
              )}
            </div>
          </div>
        </div>
        <div className="button-wrapper">
          {isEditing ? (
            <button
              className="ButtonForm py-2 px-10 bg-green-700 text-white font-semibold uppercase mb-4 hover:bg-green-500 duration-300"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          ) : (
            <button
              className="ButtonForm py-2 px-10 bg-blue-700 text-white font-semibold uppercase mb-4 hover:bg-blue-500 duration-300"
              type="button"
              onClick={toggleEditMode}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
