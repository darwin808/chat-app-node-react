import "./Home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Home(props) {
  const history = useHistory();
  const [collection, setcollection] = useState([]);
  const [name, setname] = useState("");
  const [msg, setmsg] = useState("");
  const [nameedit, setnameedit] = useState("");
  const [msgedit, setmsgedit] = useState("");
  const [modal, setmodal] = useState(false);
  const [idholde, setidholde] = useState(0);
  const userName = history.location.state.userName;
  useEffect(() => {
    fetdata();
  }, []);

  const fetdata = async () => {
    await axios
      .get("http://localhost:1234/gnote")
      .then((e) => {
        setcollection(e.data);
        console.log(collection[0]);
        console.log(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelChat = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:1234/gnote", {
        name: userName,
        message: msg,
      })
      .then((e) => {
        fetdata();
        console.log(e);
        setmsg("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deltodo = (id) => {
    fetdata();
    // setmodal(false);
    console.log("1231");
    axios
      .delete("http://localhost:1234/gnote/" + id)
      .then((e) => {
        fetdata();
        // setmodal(false);
        // setnameedit("");
        // setmsgedit("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openmodal = (id) => {
    setidholde(id);
    setmodal(true);
  };
  const handleedit = async (e) => {
    e.preventDefault();
    await axios
      .put("http://localhost:1234/gnote/" + idholde, {
        name: userName,
        message: msgedit,
      })
      .then((e) => {
        // console.log(globalmsg);
        fetdata();
        setmodal(false);

        setmsgedit("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Home">
      <h1>chat app - hello - {userName}</h1>
      {collection.map((e) => (
        <div key={e._id} className="showdata">
          {e.message}
          <button
            onClick={() => {
              deltodo(e._id);
            }}>
            X
          </button>

          <button
            onClick={() => {
              openmodal(e._id);
            }}>
            edit
          </button>
        </div>
      ))}
      <form action="submit" onSubmit={handelChat}>
        <input
          placeholder={userName}
          type="text"
          value={userName}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="message..."
          value={msg}
          onChange={(e) => {
            setmsg(e.target.value);
          }}
        />
      </form>

      {modal && (
        <div>
          <form action="submit" onSubmit={handleedit}>
            <input
              placeholder="edit ...."
              type="text"
              value={userName}
              onChange={(e) => {
                setnameedit(e.target.value);
              }}
            />
            <input
              placeholder="edit ...."
              type="text"
              value={msgedit}
              onChange={(e) => {
                setmsgedit(e.target.value);
              }}
            />
          </form>{" "}
          <button onClick={handleedit}>submit EDIT</button>
        </div>
      )}
      <button onClick={handelChat}>submit</button>
    </div>
  );
}

export default Home;
