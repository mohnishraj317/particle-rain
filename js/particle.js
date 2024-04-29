class Particle {
  constructor(x, y, color, particleSize, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particleSize = particleSize;
    this.speed = speed;
    this.randSpeed = Math.random() * 3;
    
    Particle.particles.push(this);
  }

  draw() {
    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.particleSize / 2, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.particleSize, this.particleSize);
    ctx.fill();
  }

  update() {
    const [ir, ig, ib] = getColorIndicesForCoord(~~this.x, ~~this.y, cnv.width);
    const r = imgData[ir];
    const g = imgData[ig];
    const b = imgData[ib];

    const bFactor = brightness(r, g, b) / 255;
    
    this.speed = ((bFactor * 2) ** 2 * 2 + this.randSpeed * 2) / 3;
    
    const rgb = `rgba(${r} ${g} ${b} / ${bFactor / 2})`;
    this.color = rgb;
    
    this.y += this.speed;

    this.draw();

    if (this.y > cnv.height) this.y = 0;
  }

  remove() {
    Particle.particles = Particle.particles.filter(p => p !== this);
  }

  static particles = [];
}