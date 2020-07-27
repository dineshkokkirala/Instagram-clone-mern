import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [mypics, setMypics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/post/myposts", {
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMypics(result.myposts);
      });
  }, []);

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
          <h4>{state ? state.name : "Loading..."}</h4>
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
        {mypics.map((pic) => {
          return (
            <img
              src={pic.photo}
              alt={pic.title}
              key={pic._id}
              className="item"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
