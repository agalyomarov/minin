const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  const title = "Курсы";
  const isCourses = true;
  res.render("pages/courses", { title, isCourses, courses });
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  const title = "Курс " + course.title;
  const layout = "empty";
  res.render("pages/course", { course, title, layout });
});

router.get("/:id/edit", auth, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const course = await Course.findById(req.params.id);
  const title = "Курс " + course.title;
  res.render("pages/course-edit", { course, title });
});

router.post("/edit", auth, async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect("/courses");
});

router.post("/remove", auth, async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect("/courses");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
