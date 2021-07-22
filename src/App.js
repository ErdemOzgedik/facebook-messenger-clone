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
      <h1>FACEBOOK MESSENGER 🐭 </h1>
      <h2>Welcome {username}</h2>
      {username ? (
        <form>
          <FormControl>
            <InputLabel htmlFor="message-input">Aa</InputLabel>
            <Input
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
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
        <p>Please Enter Your Username To Send Message</p>
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
