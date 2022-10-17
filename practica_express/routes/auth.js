const UniSender = require("unisender");
const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const keys = require("../keys/index");
const router = Router();

const uniSender = new UniSender({
  api_key: "65y9zq7iowf3hrk8f4f5rfyhazfw6diu8xu9u7ka",
  lang: "ru",
});

router.get("/login", (req, res) => {
  const title = "Войти";
  const isLogin = true;
  res.render("auth/login", { title, isLogin });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/auth/login");
  }
  check_password = await bcryptjs.compare(password, user.password);
  if (!check_password) {
    return res.redirect("/auth/login");
  }
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) throw new Error(err);
  });
  res.redirect("/");
});

router.get("/register", (req, res) => {
  const title = "Регистрация";
  const isRegister = true;
  const errors = req.flash("error");
  res.render("auth/register", { title, isRegister, errors });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    req.flash("error", "Email уже сушествуть");
    return res.redirect("/auth/register");
  }
  hash_password = await bcryptjs.hash(password, 10);
  const user = new User({
    email,
    password: hash_password,
    card: { items: [] },
  });
  await user.save();
  res.redirect("login");
  uniSender
    .sendEmail({
      sender_name: "Test site",
      sender_email: "omaraly971215@gmail.com",
      subject: "Аккаунт создан",
      body: `<h1>Hello world!</h1><p>Вы успешно создали аккаунт с email - ${email}</p>`,
      email: email,
      list_id: 1,
      format: "json",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
