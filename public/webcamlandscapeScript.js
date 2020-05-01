import * as THREE from "/three/build/three.module.js";
import { PointerLockControls } from "/three/examples/jsm/controls/PointerLockControls.js";
var connection = new RTCMultiConnection();
connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";
connection.session = {
  audio: true,
  video: true
};

connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true
};

connection.onstream = function(event) {
  let container = document.getElementById("container");
  event.mediaElement.classList.add("video");

  let videoelement = document.createElement("div");
  videoelement.classList.add("videoelement");
  videoelement.appendChild(event.mediaElement);
  container.appendChild(videoelement);
};

connection.onstreamended = function(event) {
  var mediaElement = document.getElementById(event.streamid);
  if (mediaElement) {
    console.log(mediaElement.parentNode);
    mediaElement.parentNode.parentNode.removeChild(mediaElement.parentNode);
  }
};

document.getElementById("btn-open-room").onclick = function() {
  var predefinedRoomId = document.getElementById("room-id").value;
  instructions.style.display = "none";
  blocker.style.display = "none";
  document.getElementById("roomregistration").style.display = "none";
  document.getElementById("lounge").style.display = "inline-block";
  connection.open(predefinedRoomId, function(isRoomOpened, roomid, error) {
    if (error === "Room not available") {
      let otherRoomId = prompt(
        "it looks like this room already exist - click okay to join the room where your virtual stoners already are",
        roomid
      );
      connection.join(otherRoomId, function(isRoomOpened, roomid, error) {
        return;
      });
      return;
    }
  });
};
document.getElementById("btn-join-room").onclick = function() {
  var predefinedRoomId = document.getElementById("room-id").value;
  instructions.style.display = "none";
  blocker.style.display = "none";
  document.getElementById("roomregistration").style.display = "none";
  document.getElementById("lounge").style.display = "inline-block";
  connection.join(predefinedRoomId, function(isRoomOpened, roomid, error) {
    if (error === "Room not available") {
      let otherRoomId = prompt(
        "it looks like this room doesnt exist yet and u r alone - click okay to open a new room for your friends",
        roomid
      );
      connection.open(otherRoomId, function(isRoomOpened, roomid, error) {
        return;
      });
      return;
    }
  });
};
let videoIdNumbers = [];
document.getElementById("3d-toggle").onclick = function() {
  instructions.style.display = "inline-block";
  blocker.style.display = "inline-block";
  document.getElementById("waitingroom").style.display = "none";
  var streams = document.getElementsByTagName("video");

  for (var i = 0; i < streams.length; i++) {
    videoIdNumbers.push(streams[i].id);
  }
  init(videoIdNumbers);
  animate();
};

var camera, scene, renderer, controls, group;

var objects = [];
let movingtext = [];

var raycaster;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

let boxes = [];

function init(streamArray) {
  //set up textureloader for url texture placement
  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "Anonymous";
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 40;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog("black", 400, 1000);
  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);
  controls = new PointerLockControls(camera, document.body);

  var blocker = document.getElementById("blocker");
  var instructions = document.getElementById("instructions");

  instructions.addEventListener(
    "click",
    function() {
      controls.lock();
    },
    false
  );

  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });

  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "block";
  });
  scene.add(controls.getObject());

  var onKeyDown = function(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

      case 32: // space
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  var onKeyUp = function(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);

  for (var i = 0; i < streamArray.length; i++) {
    var video = document.getElementById(streamArray[i]);
    let texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    createShape(texture);
  }

  function createShape(texture) {
    let boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
    var boxGeometry = new THREE.OctahedronBufferGeometry(100, 5);
    for (let i = 0; i < 3; i++) {
      var box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 20 - 10) * 50;
      box.position.y = Math.floor(Math.random() * 20) * 10;
      box.position.z = Math.floor(Math.random() * 20 - 10) * 50;
      boxes.push(box);
      scene.add(box);
    }
  }

  // floor
  function createfloor() {
    let ground = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    ground.rotateX(-Math.PI / 2);
    var texture = new THREE.Texture(generateTexture());
    texture.needsUpdate = true; // important!
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      overdraw: 0.5,
      opacity: 0.5
    });
    let floor = new THREE.Mesh(ground, material);
    floor.receiveShadow = true;
    scene.add(floor);
    function generateTexture() {
      var size = 20;
      let floorcolor = document.createElement("canvas");
      floorcolor.width = size;
      floorcolor.height = size;
      // get context
      var context = floorcolor.getContext("2d");
      // draw gradient
      context.rect(0, 0, size, size);
      var gradient = context.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, "#00fffd"); // light blue
      gradient.addColorStop(0.6, "#00ff21"); // dark blue
      gradient.addColorStop(0.8, "#ffffff"); // dark blue

      context.fillStyle = gradient;
      context.fill();

      return floorcolor;
    }
  }
  createfloor();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  let canvases = document.getElementsByTagName("canvas");
  requestAnimationFrame(animate);
  // raycaster.ray.origin.copy(controls.getObject().position);
  // raycaster.ray.origin.y -= 10;
  // var intersections = raycaster.intersectObjects(objects);
  function createControls() {
    var time = performance.now();
    var delta = (time - prevTime) / 1000;
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions
    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);
    controls.getObject().position.y += velocity.y * delta; // new behavior
    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;
      canJump = true;
    }
    prevTime = time;
  }
  createControls();

  for (var i = 0; i < boxes.length; i++) {
    // boxes[i].rotation.y += 0.005;
    boxes[i].rotation.y += 0.002;
    boxes[i].rotation.x += 0.002;
    boxes[i].position.y += 0.002;
    // if(boxes[i].position.y>=1000){
    //   boxes[i].position.y = -100;
    // }
  }
  renderer.render(scene, camera);
}

ticker("ticker1");
ticker("ticker2");

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
