export class Vec2 {
  constructor(readonly x: number, readonly y: number) {}

  add(vec: Vec2):Vec2 {
    return vec2(this.x + vec.x, this.y + vec.y);
  }

  sub(vec: Vec2):Vec2 {
    return vec2(this.x - vec.x, this.y - vec.y);
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  dist(other: Vec2):number {
    return this.sub(other).mag()
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  rotRad(angle: number): Vec2 {
    const newAngle = this.angle() + angle;
    const mag = this.mag();
    return new Vec2(Math.cos(newAngle) * mag, Math.sin(newAngle) * mag);
  }

  setRotRad(angle: number): Vec2 {
    const mag = this.mag();
    return new Vec2(Math.cos(angle) * mag, Math.sin(angle) * mag);
  }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y);
