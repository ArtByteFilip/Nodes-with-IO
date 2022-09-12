const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { exec } = require("child_process");
const { Server } = require("socket.io");
const io = new Server(server);

var today, date, time, datetime;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

function getTime() {
  today = new Date();
  date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  dateTime = date+' '+time;
}

io.on("connection", (socket) => {
  getTime()
  console.log(dateTime + " Používatel sa pripojil!");
  socket.on("disconnect", () => {
    console.log(dateTime + " Používatel sa odpojil!");
  });
});

io.on("connection", (socket, req, res) => {
  socket.on("", (msg) => {
    getTime()

    console.log(dateTime + " Príkaz: " + msg);

    if (msg == msg) {
      exec(msg, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    } else {
    }
  });
});

server.listen(3000, () => { // Zapne server
  console.log("listening on *:3000"); 
});
