import { Card, CardContent, Typography } from "@material-ui/core";
import "./message.css";

export default function Message({ username, message }) {
  const isUser = username === message.username;
  return (
    <Card variant="outlined" className={`message ${isUser && "message__user"}`}>
      <CardContent>
        <Typography color="" gutterBottom>
          {message.username}:{message.message}
          <br />
          {new Date(message.timestamp.seconds * 1000).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}
