const list_courses = document.querySelector("#list_courses");
const total_amount = document.querySelector("#total_amount");

document.querySelectorAll(".price_course").forEach(function (node) {
  node.textContent = new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(node.textContent);
});

document.querySelectorAll(".date").forEach(function (node) {
  node.textContent =
    "Дата: " +
    new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(node.textContent));
});

if (list_courses) {
  list_courses.addEventListener("click", function (event) {
    if (event.target.classList.contains("course_delete_from_card")) {
      const id = event.target.dataset.id;
      fetch("/card/remove/" + id, {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": event.target.dataset.csrf,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.courses.length) {
            if (data.courses[0] !== null) {
              total_amount.querySelector("span").textContent = data.total_price;
              list_courses.querySelector("tbody").innerText = "";
              data.courses.forEach((course, index) => {
                const tr = `
                     <tr>
                        <th scope="row">${index}</th>
                        <td>${course.course_id.title}</td>
                        <td>${course.count}</td>
                        <td class="price_course">${course.course_id.price}</td>
                        <td><button type="button" class="btn btn-success btn-sm course_delete_from_card" data-id="${course.course_id._id}" data-csrf="${data.csrf}">Удалить</button></td>
                    </tr>
              `;
                list_courses
                  .querySelector("tbody")
                  .insertAdjacentHTML("beforeend", tr);
              });
              document
                .querySelectorAll(".price_course")
                .forEach(function (node) {
                  node.textContent = new Intl.NumberFormat("ru-RU", {
                    currency: "rub",
                    style: "currency",
                  }).format(node.textContent);
                });
            } else {
              total_amount.remove();
              list_courses.innerHTML = "<p>Корзина пуста</p>";
              document.querySelector(".btn_made_order").remove();
            }
          } else {
            total_amount.remove();
            list_courses.innerHTML = "<p>Корзина пуста</p>";
            document.querySelector(".btn_made_order").remove();
          }
        });
    }
  });
}
