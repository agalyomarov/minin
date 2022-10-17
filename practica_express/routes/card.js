const { Router } = require("express");
const Course = require("../models/course");
const auth = require("../middleware/auth");
const router = Router();

router.post("/add", auth, async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course);
  return res.redirect("/card");
});

router.get("/", auth, async (req, res) => {
  const user = await req.user.populate("card.items.course_id");
  const title = "Корзина";
  const isCard = true;
  const courses = user.card.items;
  let total_price = courses.reduce((total, item) => {
    return (total += item.course_id.price * item.count);
  }, 0);
  return res.render("pages/card", { title, isCard, courses, total_price });
});

router.delete("/remove/:id", auth, async (req, res) => {
  const data = await req.user.removeFromCart(req.params.id);
  data.csrf = req.csrfToken();
  res.json(data);
});
module.exports = router;
