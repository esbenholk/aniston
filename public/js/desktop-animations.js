let emojiconTrigger = document.getElementById("emojicon");
emojiconTrigger.addEventListener("click", function() {
  let emojiconWindow = document.getElementById("emojiconwindow");
  if (emojiconWindow.classList.contains("invisible")) {
    emojiconWindow.classList.remove("invisible");
    emojiconWindow.classList.add("open");
  } else {
    emojiconWindow.classList.remove("open");
    emojiconWindow.classList.add("invisible");
  }
  console.log("clicked icon");
});

$(function() {
  $("#emojiconwindow").resizable();
});

document.addEventListener("click", function(target) {
  for (var i = 0; i < target.target.classList.length; i++) {
    if (target.target.classList[i] === "windowbutton") {
      target.target.parentNode.parentNode.parentNode.classList.add("invisible");
      target.target.parentNode.parentNode.parentNode.classList.remove("open");
    }
  }
});
