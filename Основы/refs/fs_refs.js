const fs = require("fs");
const path = require("path");

fs.mkdir(path.join(__dirname, "notes"), (err) => {
  //   if (err) throw new Error(err);
  //   console.log("Dir maked");
});

// fs.writeFile(
//   path.join(__dirname, "notes", "mynotes.js"),
//   "Hello world",
//   (err) => {
//     if (err) throw new Error(err);
//     console.log("File maked");
//     fs.appendFile(
//       path.join(__dirname, "notes", "mynotes.js"),
//       " from append function",
//       (err) => {
//         if (err) throw new Error(err);
//         console.log("File appended");
//         fs.readFile(
//           path.join(__dirname, "notes", "mynotes.js"),
//           "utf-8",
//           (err, data) => {
//             if (err) throw new Error(err);
//             console.log(data);
//           }
//         );
//       }
//     );
//   }
// );

fs.rename(
  path.join(__dirname, "notes", "mynotes.js"),
  path.join(__dirname, "notes", "notes.txt"),
  (err) => {
    if (err) throw new Error(err);
    console.log("file renamed");
  }
);
