import { Card, CardContent, Typography } from "@material-ui/core";
import "./message.css";

export default function Message({ username, message }) {
  const isUser = username === message.username;
  return (
    <div className={`message ${isUser && "message__user"}`}>
      {!isUser && <span>{message.username}</span>}
      <Card
        variant="outlined"
        className={isUser ? "message__userCard" : "message__guestCard"}
      >
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {message.message}
            <br />
            {message.timestamp &&
              new Date(message.timestamp.seconds * 1000).toDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
