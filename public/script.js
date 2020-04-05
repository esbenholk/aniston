(function() {
  ticker("ticker1");
  ticker("ticker2");
  ticker("ticker3");
  ticker("ticker4");
  ticker("ticker5");
  ticker("ticker6");
  ticker("ticker7");
  ticker("ticker8");
  ticker("ticker9");

  function ticker(element) {
    console.log("move ticker", element);
    var ticker = document.getElementById(element);
    var headlines = ticker.querySelector(".headlines");
    var links = headlines.getElementsByTagName("a");
    var left = headlines.offsetLeft;
    var animId;

    headlines.addEventListener("mouseenter", function() {
      cancelAnimationFrame(animId);
    });

    headlines.addEventListener("mouseleave", function() {
      moveHeadLines();
    });

    moveHeadLines();

    function moveHeadLines() {
      left--;
      if (left <= -links[0].offsetWidth) {
        left += links[0].offsetWidth;
        headlines.appendChild(links[0]);
      }
      headlines.style.left = left + "px";
      animId = requestAnimationFrame(moveHeadLines);
    }
  }
})();
