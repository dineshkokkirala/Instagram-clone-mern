import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/api/post/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: data.message,
              classes: "#43a047 green darken-1",
            });
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dinesh369");
    fetch("https://api.cloudinary.com/v1_1/dinesh369/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        // console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn #1976d2 blue lighten-2">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #1976d2 blue darken-2"
        onClick={() => postDetails()}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
