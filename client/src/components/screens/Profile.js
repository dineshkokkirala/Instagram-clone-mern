import React from "react";

const Profile = () => {
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid gray",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
            alt="profile_pic"
          />
        </div>
        <div>
          <h4>Random Person</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>33 Posts</h6>
            <h6>33 Followers</h6>
            <h6>33 Following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
        <img
          src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__340.jpg"
          alt="profile_pic"
          className="item"
        />
      </div>
    </div>
  );
};

export default Profile;
