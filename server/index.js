const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const PORT = 3001;
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

let data = {
  blue: 0,
  orange: 0,
};

const socketIo = socket(server, {
  cors: {
    origin: "*",
  },
});

let running = false;

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on("disconnect", () => {
    data = { blue: 0, orange: 0 };
    console.log("Client disconnected");
  });
});
let clickTimeout = 0;
app.post("/click", function (req, res) {
  const input = req.body;
  clearTimeout(clickTimeout); 
  if (running) {
    if (input.color === "blue") {
      data.blue++;
    } else if (input.color === "orange") {
      data.orange++;
    }
  } else {
    running = true;
    data = {
      blue: 0,
      orange: 0,
    };
    if (input.color === "blue") {
      data.blue++;
    } else if (input.color === "orange") {
      data.orange++;
    }
  }
  
  // res.send('POST request to homepage')
  socketIo.emit("click", data);

  clickTimeout = setTimeout(() => handleTimeout(data), 5000);
});

const handleTimeout = (responseData) => {
  if (running) {
    running = false;
    const response = [];
    response.push({
      name: "Clicked Data",
      blue: responseData.blue,
      orange: responseData.orange,
    });
    socketIo.emit("chart", response);
  }
};
