// ml5.js: Object Detection with COCO-SSD (Image)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

let img;
let detector;

function preload() {
  const searchParams = new URLSearchParams(window.location.search);

  document.getElementById('progress-bar').style.display = 'none';

  if (searchParams.get('selected') != null) {
    img = loadImage('http://127.0.0.1:3000/' + searchParams.get('selected'));
    document.getElementById('progress-bar').style.display = 'flex';

  }
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  let resultat ="";
  results.forEach(result => resultat += `
            Prediction: ${result.label}\n
            Probabilité: ${result.confidence}\n
          `)
  document.getElementById('prediction-list').innerText = resultat;
  document.getElementById('progress-bar').style.display = 'none';

  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}

function setup() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('selected') != null) {
    document.getElementById('selected-image').style.display = 'none';
    createCanvas(1920, 1600);
    // console.log(detector);
    image(img, 0, 0);
    detector.detect(img, gotDetections);
  }
}
