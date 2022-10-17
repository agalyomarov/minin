const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", auth, (req, res) => {
  const title = "Добавить курсы";
  const isAdd = true;
  res.render("pages/add", { title, isAdd });
});

router.post("/", auth, async (req, res) => {
  const course = new Course({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    user_id: req.user._id,
  });
  try {
    await course.save();
    res.redirect("/courses");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
