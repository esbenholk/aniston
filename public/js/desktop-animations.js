// click handler for document to close clicked window
document.addEventListener("click", function(target) {
  for (var i = 0; i < target.target.classList.length; i++) {
    if (target.target.classList[i] === "windowbutton") {
      target.target.parentNode.parentNode.parentNode.classList.add("invisible");
      target.target.parentNode.parentNode.parentNode.classList.remove("open");
      if (
        target.target.parentNode.parentNode.parentNode.getElementsByTagName(
          "video"
        ).length > 0
      ) {
        let videos = target.target.parentNode.parentNode.parentNode.getElementsByTagName(
          "video"
        );
        for (var i = 0; i < videos.length; i++) {
          videos[i].pause();
        }
      }
    }
  }
});

let currentWindow = {};
let otherWindow = {};
var isDown = false;
var offset = [0, 0];
var mousePosition;

$(".windowHeader").mousedown(function(e) {
  console.log(e.target.parentNode.id);
  currentWindow = document.getElementById(e.target.parentNode.parentNode.id);
  if (currentWindow.classList.contains("window")) {
    currentWindow.classList.add("currentWindow");
    isDown = true;
    offset = [
      currentWindow.offsetLeft - e.clientX,
      currentWindow.offsetTop - e.clientY
    ];
  }
});

document.addEventListener(
  "mouseup",
  function() {
    isDown = false;
    otherWindow = currentWindow;
    currentWindow = {};
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
      currentWindow.style.zIndex = "999";
      currentWindow.style.left = mousePosition.x + offset[0] + "px";
      currentWindow.style.top = mousePosition.y + offset[1] + "px";
    }
  },
  true
);

createTrigger("emojicon", "emojiconwindow", "emojiconheader");
createTrigger("stayvirtual", "stayvirtualwindow", "stayvirtualheader");

$(function() {
  $("#emojiconwindow").resizable();
  $("#stayvirtualwindow").resizable();
});

function createTrigger(button, window, header) {
  let trigger = document.getElementById(button);
  trigger.addEventListener("click", function() {
    let targetwindow = document.getElementById(window);
    if (targetwindow.classList.contains("invisible")) {
      targetwindow.classList.remove("invisible");
      targetwindow.classList.add("open");
      targetwindow.style.zIndex = "9999";
      if (targetwindow.getElementsByTagName("video").length > 0) {
        let videos = targetwindow.getElementsByTagName("video");
        for (var i = 0; i < videos.length; i++) {
          videos[i].play();
        }
      }
    } else {
      targetwindow.classList.remove("open");
      targetwindow.classList.add("invisible");
      if (targetwindow.getElementsByTagName("video").length > 0) {
        let videos = targetwindow.getElementsByTagName("video");
        for (var i = 0; i < videos.length; i++) {
          videos[i].pause();
        }
      }
    }
  });
}
