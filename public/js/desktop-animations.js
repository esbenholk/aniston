document.addEventListener("click", function(target) {
  for (var i = 0; i < target.target.classList.length; i++) {
    if (target.target.classList[i] === "windowbutton") {
      target.target.parentNode.parentNode.parentNode.classList.add("invisible");
      target.target.parentNode.parentNode.parentNode.classList.remove("open");
    }
  }
});

createTrigger("emojicon", "emojiconwindow", "emojiconheader");
createTrigger("stayvirtual", "stayvirtualwindow", "stayvirtualheader");
$(function() {
  $("#emojiconwindow").resizable();
});
$(function() {
  $("#stayvirtualwindow").resizable();
});

var mousePosition;
var offset = [0, 0];
var div;
var isDown = false;
var currentWindow = {};
document.addEventListener(
  "mouseup",
  function() {
    isDown = false;
  },
  true
);
document.addEventListener(
  "mousemove",
  function(event) {
    event.preventDefault();
    if (isDown) {
      mousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      currentWindow.style.left = mousePosition.x + offset[0] + "px";
      currentWindow.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);
moveWindow("emojiconheader");
function moveWindow(name) {
  let div = document.getElementById(name);
  currentWindow = div.parentNode;
  div.addEventListener(
    "mousedown",
    function(e) {
      isDown = true;
      offset = [
        currentWindow.offsetLeft - e.clientX,
        currentWindow.offsetTop - e.clientY
      ];
    },
    true
  );
}
function createTrigger(button, window, header) {
  let trigger = document.getElementById(button);
  trigger.addEventListener("click", function() {
    let targetwindow = document.getElementById(window);
    if (targetwindow.classList.contains("invisible")) {
      targetwindow.classList.remove("invisible");
      targetwindow.classList.add("open");
      targetwindow.style.zIndex = "9999";
    } else {
      targetwindow.classList.remove("open");
      targetwindow.classList.add("invisible");
    }
  });
}
