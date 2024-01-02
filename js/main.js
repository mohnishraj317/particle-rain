const cnv = document.querySelector(".cnv");
const ctx = cnv.getContext("2d");
let h = innerHeight;
let w = innerWidth;

function resizeCnv(w, h) {
  cnv.style.cssText = `
    height: ${h}px;
    width: ${w}px;
  `;

  cnv.height = h * devicePixelRatio;
  cnv.width = w * devicePixelRatio;

  ctx.scale(devicePixelRatio, devicePixelRatio);
}

function fillCtx(color="black") {
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
};

async function loadImage(path) {
  const img = new Image;
  img.src = path;

  return new Promise(res => {
    img.addEventListener("load", () => res(img));
  });
}

function drawImage(img) {
  const imgAspectRatio = img.width / img.height;
  const width = 400;
  const height = width / imgAspectRatio;
  resizeCnv(width, height);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
}

function getImageData(img) {
  drawImage(img);
  const data = ctx.getImageData(0, 0, cnv.width, cnv.height);
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  return data;
}

const getColorIndicesForCoord = (x, y, width) => {
  let red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
};

// const brightness = (r, g, b) =>
//   (0.21 * r) + (0.72 * g) + (0.07 * b);
const brightness = (r, g, b) =>
  Math.sqrt(r*r * .299 + g*g * .587 + b*b * .114);