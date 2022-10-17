const path = require("path");
const keys = require("./keys/index");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
const csrf = require("csurf");
const flash = require("connect-flash");

const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: keys.SESSION_SECRET,
    resave: true,
    name: "tets",
    saveUninitialized: false,
  })
);
app.use(csrf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);
app.use("/order", orderRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(keys.MONGPDB_URL, {
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log("Server running");
    });
  } catch (err) {
    console.log(err);
  }
}

start();
