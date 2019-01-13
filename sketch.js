let carA, carB;
let overlay;
let pauseButton;
const distances = [];
let minDist, minDistTime, minSlope;

let paused = false;

function setup() {
  createCanvas(600, 600, WEBGL);
  carA = new Car(1 / 16, "north");
  carB = new Car(3 / 32, "east");
  frameRate(60);
  overlay = createGraphics(200, 200);
  // pauseButton = createButton("pause");
  // pauseButton.mousePressed(() => {
  //   paused = !paused;
  //   pauseButton.html(paused ? "play" : "pause");
  // });
}

function draw() {
  scale(3);
  background(0, 200, 200);
  noStroke();
  // rotateY(-sqrt(2) / 3);
  // rotateZ(sqrt(2) / 3);
  rotateX(-sqrt(2) / 3);
  translate(0, 25, 25);
  push();
  fill(0, 180, 0);
  rotateX(PI / 2);
  plane(100, 100);
  pop();
  carA.draw();
  carB.draw(rotateY);
  if (!paused) {
    carA.update(frameCount);
    carB.update(frameCount);
    distances.push(
      sqrt(Math.pow(carA.x - carB.x, 2) + Math.pow(carA.z - carB.z, 2)).toFixed(
        2
      )
    );
    stroke(0);
    if (!minDist || distances[distances.length - 1] < minDist) {
      stroke(255, 153, 0);
      minDist = distances[distances.length - 1];
      minDistTime = frameCount;
      minSlope =
        0.5 *
        Math.pow(
          Math.pow(carB.speed * minDistTime - 30, 2) +
            Math.pow(carA.speed * minDistTime, 2),
          -0.5
        ) *
        (2 * (carB.speed * minDistTime - 30) * carB.speed +
          2 * (carA.speed * minDistTime) * carA.speed);
      //console.log(minSlope);
    }
    if (distances[distances.length - 1] > 30) paused = true;
  }
  push();

  strokeWeight(1);
  line(carA.x, carA.y, carA.z, carB.x, carB.y, carB.z);
  overlay.fill(0);
  overlay.stroke(0);
  overlay.textSize(15);
  // overlay.background(0, 200, 200);
  overlay.background(255);
  overlay.textAlign(LEFT);
  overlay.text(
    `Current Dist: ${distances[distances.length - 1]}mi.`,
    10,
    10,
    90,
    100
  );
  overlay.textAlign(RIGHT);
  overlay.fill(255, 153, 0);
  overlay.noStroke();
  overlay.text(`Min Dist: ${minDist}mi.`, 100, 10, 90, 100);
  let distanceCopy = distances.slice(0);
  distanceCopy.sort();
  let maxVal = distanceCopy.pop();
  let slopeLineLeft = -minSlope * -minDistTime - minDist;
  let slopeLineRight = -minSlope * (distances.length - minDistTime) - minDist;
  overlay.noFill();
  overlay.stroke(0);
  overlay.beginShape();
  for (let i = 0; i < distances.length; i++) {
    const dist = distances[i];
    overlay.vertex(
      (i / distances.length) * 200,
      -((dist / maxVal) * 200) + 250
    );
  }
  overlay.endShape();
  overlay.stroke(255, 153, 0);
  overlay.strokeWeight(1);
  // console.log(slopeLineRight);
  overlay.line(
    0,
    (slopeLineLeft / maxVal) * 200 + 250,
    200,
    (slopeLineRight / maxVal) * 200 + 250
  );
  // console.log(minDistTime);
  overlay.fill(255, 153, 0);
  overlay.ellipse(
    (minDistTime / distances.length) * 200,
    -((minDist / maxVal) * 200) + 250,
    5,
    5
  );
  texture(overlay);
  translate(0, -50, -50);
  // rotateY(sqrt(2) / 2);
  box(100, 100, 1);
  pop();
}
