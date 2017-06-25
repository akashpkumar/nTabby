
// window.onload = function() {
// 	chrome.topSites.get(thumbnailsGotten);
// 	var date = new Date().toDateString();
// 	document.getElementById("date").textContent = date.slice(0,-4);
// }

document.addEventListener("DOMContentLoaded", function () {
  chrome.management.getAll(getAllCallback);
});

var getAllCallback = function (list) {
  var apps = document.getElementById("apps");
  for (var i in list) {
    // we don't want to do anything with extensions yet.
    var extInf = list[i];
    if (extInf.isApp && extInf.enabled) {
      var app = document.createElement("div");

      var img = new Image();
      img.className = "image";
      img.src = find128Image(extInf.icons);

      app.addEventListener("click", (function (ext) {
        return function () {
          chrome.management.launchApp(ext.id);
        };
      })(extInf));

      var name = document.createElement("div");
      name.className = "name";
      name.textContent = extInf.name;

      app.className = "box";
      app.appendChild(img);
      app.appendChild(name);
      apps.appendChild(app);
    }
  }
};
var find128Image = function (icons) {
  for (var icon in icons) {
    if (icons[icon].size == "128") {
      return icons[icon].url;
    }
  }

  return "/noicon.png";
};