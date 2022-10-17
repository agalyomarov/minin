const { Schema, model } = require("mongoose");

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  card: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        course_id: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
});

user.methods.addToCart = function (course) {
  const items = [...this.card.items];
  const idx = items.findIndex(
    (c) => c.course_id.toString() === course._id.toString()
  );

  if (idx >= 0) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      course_id: course._id,
      count: 1,
    });
  }

  this.card = { items };

  this.save();
};

user.methods.removeFromCart = async function (id) {
  let courses = await this.populate("card.items.course_id");
  courses = courses.card.items;
  const idx = courses.findIndex((c) => c.course_id._id.toString() == id);
  if (idx >= 0) {
    course_delete = courses[idx];
    if (course_delete.count == 1) {
      courses = courses.filter(
        (c) =>
          c.course_id._id.toString() !== course_delete.course_id._id.toString()
      );
    } else courses[idx].count--;

    this.card = { items: courses };
    total_price = courses.reduce((total, item) => {
      return (total += item.course_id.price * item.count);
    }, 0);
    await this.save();
    return { courses, total_price };
  }
};

user.methods.clearCart = function () {
  this.card = { itens: [] };
  this.save();
};
module.exports = model("User", user);
