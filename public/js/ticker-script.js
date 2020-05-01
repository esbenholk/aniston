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
  ticker("ticker10");
  ticker("ticker11");
  ticker("ticker12");
  ticker("ticker13");
  ticker("ticker14");

  let emoticons = [
    "💦",
    "🔥",
    "🌈",
    "☢",
    "💕",
    "🌹",
    "🍕",
    "💦",
    "💥",
    "🔥",
    "🍀",
    "🌸",
    "❤️",
    "💖",
    "💞",
    "💗",
    "‍🌈",
    "☽",
    "⭐️",
    "💫",
    "👨‍",
    "💻",
    "🥳",
    "🤯",
    "😻",
    "👽",
    "👍",
    "☠️",
    "🤮",
    "🤡",
    "💩",
    "👻",
    "🙏",
    "💋",
    "🧠",
    "🙌",
    "™️",
    "💃",
    "🕺",
    "👯‍♀️",
    "💅",
    "🧜‍♂️",
    "🦸",
    "🧞‍♂️",
    "👨‍❤️‍👨",
    "👩‍❤️‍💋‍👩",
    "🐕",
    "🐳",
    "🐙",
    "🦩",
    "🐋",
    "🦀",
    "🦐",
    "😜",
    "😝",
    "🌺",
    "🥀",
    "🌸",
    "🐈",
    "🌝",
    "☄️",
    "🌧",
    "🍇",
    "🥝",
    "🥐",
    "🥦",
    "🥑",
    "🍆",
    "🥬",
    "🍌",
    "🍑",
    "🥗",
    "🍺",
    "🥂",
    "🧊",
    "🤼‍♂️",
    "🎨",
    "🧩",
    "✈️",
    "🌠",
    "⛺️",
    "🏖",
    "🛶",
    "💿",
    "🖥",
    "🖨",
    "📱",
    "📼",
    "📺",
    "💡",
    "⚒",
    "🧨",
    "🧿",
    "💊",
    "🚬",
    "🔮",
    "🔪",
    "🦠",
    "🧬",
    "🔑",
    "🎁",
    "💌",
    "📎",
    "🎉",
    "🔍",
    "💜",
    "☢️",
    "🔱",
    "👁‍🗨",
    "💭",
    "🏁",
    "🏴‍☠️",
    "🏳️‍🌈",
    "☂︎",
    "〠"
  ];

  let links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].innerHTML =
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)] +
      emoticons[Math.floor(Math.random() * emoticons.length)];
  }

  function ticker(element) {
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
