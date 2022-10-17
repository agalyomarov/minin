const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const title = "Главная";
  const isHome = true;
  res.render("pages/index", { title, isHome });
});

module.exports = router;
