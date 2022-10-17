const { Router } = require("express");
const Course = require("../models/course");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  let orders = await Order.find({
    "user.user_id": req.user._id.toString(),
  }).populate("user.user_id");
  const title = "Заказы";
  const isOrder = true;
  orders = orders.map((c) => {
    total_price = c.courses.reduce((total, e) => {
      return (total += e.count * e.course.price);
    }, 0);
    return { ...c._doc, total_price };
  });
  res.render("pages/order", { title, isOrder, orders });
});

router.post("/", async (req, res) => {
  const user = await req.user.populate("card.items.course_id");
  const courses = user.card.items.map((i) => ({
    count: i.count,
    course: { ...i.course_id._doc },
  }));
  const order = new Order({
    user: {
      name: req.user.name,
      user_id: req.user._id,
    },
    courses: courses,
  });
  await order.save();
  await req.user.clearCart();
  res.redirect("/order");
});

module.exports = router;
