(function () {
  var input = document.querySelector("[data-docs-search]");
  var results = document.querySelector("[data-docs-results]");
  var button = document.querySelector("[data-docs-menu]");
  var side = document.querySelector(".docs-side");
  if (button && side) {
    button.addEventListener("click", function () {
      var open = side.classList.toggle("is-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (!input || !results) return;
  fetch("/docs/search.json")
    .then(function (response) { return response.json(); })
    .then(function (items) {
      input.addEventListener("input", function () {
        var query = input.value.trim().toLowerCase();
        results.innerHTML = "";
        if (query.length < 2) {
          results.classList.remove("is-open");
          return;
        }
        var found = items.filter(function (item) {
          return (item.title + " " + item.text).toLowerCase().indexOf(query) !== -1;
        }).slice(0, 8);
        found.forEach(function (item) {
          var link = document.createElement("a");
          link.href = item.href;
          link.textContent = item.title;
          results.appendChild(link);
        });
        if (!found.length) {
          var empty = document.createElement("a");
          empty.href = "/documentation";
          empty.textContent = "No matching documents";
          results.appendChild(empty);
        }
        results.classList.add("is-open");
      });
    })
    .catch(function () {});
})();
