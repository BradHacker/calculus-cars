class Car {
  constructor(speed, direction) {
    this.speed = speed;
    this.dir = direction;
    this.x = direction === "east" ? -30 : 0;
    this.y = -10;
    this.z = 0;
  }

  calcPos(t) {
    if (this.dir === "east") return this.speed * t - 30;
    else return this.speed * t;
  }

  draw(r) {
    push();
    fill(180, 0, 0);
    stroke(120, 0, 0);
    strokeWeight(1);
    // console.log(`DIR: ${this.dir} X: ${this.x} Y: ${this.y} Z: ${this.z}`);
    translate(this.x, this.y, this.z);
    if (this.dir === "east") {
      box(10, 5, 5);
    } else {
      box(5, 5, 10);
    }
    pop();
  }

  update(t) {
    if (this.dir === "east") {
      this.x = this.calcPos(t);
    } else {
      this.z = this.calcPos(t);
    }
  }
}
