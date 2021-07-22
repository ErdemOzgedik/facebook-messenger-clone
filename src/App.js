import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Message from "./components/message/Message";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const dbCollection = db.collection("messages");

  const sendMessage = (e) => {
    e.preventDefault();

    dbCollection
      .add({
        message,
        username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    setMessage("");
  };

  const handleUsername = () => {
    const name = prompt("enter your username!!!");
    setUsername(name);
  };

  useEffect(() => {
    const name = prompt("enter your username!!!");
    setUsername(name);

    dbCollection.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          message: doc.data().message,
          username: doc.data().username,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  }, []);

  return (
    <div className="App">
      <h1 className="app__header">FACEBOOK MESSENGER 🤟 </h1>
      <h2 className="app__header__secondary">Welcome {username}</h2>
      {username ? (
        <form>
          <FormControl className="app__message_form">
            <div className="app__message_form__input">
              <InputLabel htmlFor="message-input">Aa</InputLabel>
              <Input
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              className="app__message_form__btn"
              variant="outlined"
              color="primary"
              disabled={!message}
              type="submit"
              onClick={sendMessage}
            >
              SEND MESSAGE
            </Button>
          </FormControl>
        </form>
      ) : (
        <p className="app__warning" onClick={handleUsername}>
          Please Click To Set Your Username
        </p>
      )}

      <div className="messages">
        {messages?.map((item) => (
          <Message key={item.id} username={username} message={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
