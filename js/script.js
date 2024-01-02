const cols = 2;
const rows = 2;

let image;
let imgData;

(async function() {
  image = await loadImage("/zoro.jpg");
  imgData = getImageData(image).data;

  /* draw pixelated image */
  // for (let i = cols; i < cnv.width; i += cols) {
  //   for (let j = rows; j < cnv.height; j += rows) {
  //     const [ir, ig, ib] = getColorIndicesForCoord(i, j, cnv.width);
  //     const r = imgData[ir];
  //     const g = imgData[ig];
  //     const b = imgData[ib];
  //     const rgb = `rgba(${r} ${g} ${b} / 1)`;

  //     new Particle(i, j, rgb, cols, 0);
  //   }
  // }

  for (let i = 0; i < 20000; i++) {
    new Particle(
      Math.random() * cnv.width, 0,
      "red", rows, Math.random() * 2 + 1
    )
  }
}());

(function animate() {
  requestAnimationFrame(animate);
  fillCtx("rgba(0 0 0 / .02)");

  Particle.particles.forEach(particle => {
    particle.update();
  });
}());