import './App.css';
import { io } from "socket.io-client";
import { useEffect } from 'react';
const ENDPOINT = "http://127.0.0.1:3000";
const socket = io(ENDPOINT);

function subscribeToTimer(cb: any) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function App() {
  
  useEffect(() => {
    socket.on("concurrent-connections", data => {
      console.log(data);
    });
    subscribeToTimer(()=> {})
  });

  

  const emitSocketMessage = () => {
    console.log("emitting socket connection")
    socket.send("hi")
    socket.emit("message","hello")
    socket.emit("message")
    socket.disconnect()
    socket.close()
  }

  return (
    <div className="App">
      <button onClick={emitSocketMessage}>Emit Socket Message</button>
    </div>
  );
}

export default App;
