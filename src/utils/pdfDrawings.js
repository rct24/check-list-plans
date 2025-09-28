function drawGreenCheckMark(ctx, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#28a745";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#28a745";
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = radius * 0.25;
  ctx.moveTo(x - radius * 0.4, y);
  ctx.lineTo(x - radius * 0.1, y + radius * 0.3);
  ctx.lineTo(x + radius * 0.5, y - radius * 0.3);
  ctx.stroke();
  ctx.restore();
}

function drawRedXMark(ctx, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#dc3545";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#dc3545";
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = radius * 0.25;
  ctx.moveTo(x - radius * 0.4, y - radius * 0.4);
  ctx.lineTo(x + radius * 0.4, y + radius * 0.4);
  ctx.moveTo(x + radius * 0.4, y - radius * 0.4);
  ctx.lineTo(x - radius * 0.4, y + radius * 0.4);

  ctx.stroke();
  ctx.restore();
}

function drawText(ctx, x, y, text, type = "check") {
  ctx.save();
  ctx.font = "20px Arial";

  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeText(text, x + 20, y);

  if (type === "x-mark") {
    ctx.fillStyle = "#dc3545";
  } else {
    ctx.fillStyle = "#015e17ff";
  }

  ctx.fillText(text, x + 20, y);
  ctx.restore();
}

export { drawGreenCheckMark, drawRedXMark, drawText };
