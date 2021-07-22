import { Card, CardContent, Typography } from "@material-ui/core";
import { forwardRef } from "react";
import "./message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      {!isUser && <span>{message.username}</span>}
      <Card
        variant="outlined"
        className={isUser ? "message__userCard" : "message__guestCard"}
      >
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {message.message}
            <br />
            {/* {message.timestamp &&
              new Date(message.timestamp.seconds * 1000).toDateString()} */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
