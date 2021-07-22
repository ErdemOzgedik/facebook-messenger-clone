import { useEffect, useState } from "react";
import "./App.css";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dbCollection = db.collection("messages");

  const sendMessage = (e) => {
    e.preventDefault();

    dbCollection
      .add({
        message,
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
    dbCollection.orderBy("timestamp", "desc").onSnapshot((snap) => {
      snap.docs.map((doc) => {
        return setMessages((preMessages) => [
          ...preMessages,
          {
            id: doc.id,
            message: doc.data().message,
          },
        ]);
      });
    });
  }, []);

  return (
    <div className="App">
      <h1>FACEBOOK MESSENGER 🐭 </h1>
      <form>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit" onClick={sendMessage}>
          SEND MESSAGE
        </button>
      </form>

      {messages?.map((item) => (
        <p>{item.message}</p>
      ))}
    </div>
  );
}

export default App;
