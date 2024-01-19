const cols = 2;
const rows = 2;

let image;
let imgData;

async function init(url) {
  Particle.particles.forEach(p => p.remove());
  image = await loadImage(url);
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

  for (let i = 0; i < 10000; i++) {
    new Particle(
      Math.random() * cnv.width, 0,
      "red", rows, Math.random() * 2 + 1
    )
  }
}

init("/images/6e1d2ff43a026bee47e762472079a9c4.jpg");

(function animate() {
  requestAnimationFrame(animate);
  fillCtx("rgba(0 0 0 / .02)");

  Particle.particles.forEach(particle => {
    particle.update();
  });
}());

document
  .querySelector(".img-upload")
  .addEventListener("input", e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.addEventListener("load", () => {
      const data = reader.result;
      if (data) init(data);
    });
  });