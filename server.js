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
  console.log(dateTime + " Používatel sa práve pripojil na stránku!");
  socket.on("disconnect", () => {
    console.log(dateTime + " Používatel sa práve odpojil z stránky!");
  });
});

io.on("connection", (socket, req, res) => {
  socket.on("", (msg) => {
    getTime()

    //console.log("password: " + msg);
    console.log(dateTime + " Príkaz: " + msg);

    if (msg == msg) {
      //console.log("Zadané heslo je správne!");
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
      console.log("Zadané heslo nie je správne!");
    }
  });
});

server.listen(3000, () => {
  //
  console.log("listening on *:3000"); // Zapne server
}); //
