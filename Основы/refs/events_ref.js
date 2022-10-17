const EventEmitter = require("events");

// class Logger extends EventEmitter {
//   log(message) {
//     return this.emit("test", "This test emitter");
//   }
// }

// const logger = new Logger();
// logger.on("test", (data) => {
//   console.log(data);
// });

// logger.log("Hello");

// EventEmitter.on("test", (data) => {
//   console.log(data);
// });

// EventEmitter.emit("test", "This test emitter");

const on_emit = new EventEmitter();

on_emit.on("test", (data) => {
  console.log(data);
});

on_emit.emit("test", "test");
on_emit.emit("test", "am");
on_emit.emit("test", "sik");
