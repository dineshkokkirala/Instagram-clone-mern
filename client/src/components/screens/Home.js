import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/api/post/allposts", {
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, [data]);

  const likePost = (id) => {
    fetch("/api/post/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const unlikePost = (id) => {
    fetch("/api/post/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (text, postId) => {
    fetch("/api/post/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    fetch(`/api/post/delete/${id}`, {
      method: "delete",
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        M.toast({ html: result.message, classes: "#43a047 green darken-1" });
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (id) => {
    // console.log("deleted");
    fetch(`/api/post/delete/comment/${id}`, {
      method: "delete",
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.comments.filter((item) => {
          return item.comments._id !== result._id;
        });
        setData(newData);
        M.toast({ html: "Deleted", classes: "#43a047 green darken-1" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      {data.map((item) => {
        // console.log(item);
        return (
          <div className="card home-card" key={item._id}>
            <h5>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {" "}
                {item.postedBy.name}
              </Link>
            </h5>{" "}
            {item.postedBy._id === state._id && (
              <button onClick={() => deletePost(item._id)}>
                <i className="material-icons" style={{ float: "right" }}>
                  delete
                </i>
              </button>
            )}
            <div className="card-image">
              <img src={item.photo} alt={item._id} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  style={{ cursor: "pointer" }}
                  className="material-icons"
                  onClick={() => unlikePost(item._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    {" "}
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    : {record.text}{" "}
                    {/* {record.postedBy._id === state._id && (
                      <i
                        className="material-icons"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => deleteComment(record._id)}
                      >
                        delete
                      </i>
                    )} */}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                  e.target[0].value = "";
                }}
              >
                <input type="text" placeholder="Add a Comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
