//variables
//I have no idea why, but using `getElementsByTagName` makes the words disappear despite z-index
const canvas = document.getElementById("canvas"), 
  ctx = canvas.getContext("2d"), 
  w = canvas.width = window.innerWidth, 
  h = canvas.height = window.innerHeight, 
  dotz = [], 
  dotNum = window.innerWidth / 5;

//class for dots
class Dot {
  constructor () {
    this.speed = 0.3;
    this.ang = Math.random() * 360;
    this.rad = 1;
    this.loc = {
        x: Math.random() * w,
        y: Math.random() * h
    };
  }
}

//new Dots
for (let i = 0; i < dotNum; i++) {
  dotz.push(new Dot());
}

//IIFE to animate
(function draw () {
  window.requestAnimationFrame(draw, canvas);

  //background
  ctx.fillStyle = "black";
  ctx.fillRect (0, 0, w, h);

  //make the cool shapes
  for (let i = 0; i < dotNum; i++) {
      //dots
      const d = dotz[i];
      
      for (let j = 0; j < dotNum; j++) {
          //other dot connecting point
          const d2 = dotz[j], 
            //calculate distances
            dtX = d2.loc.x - d.loc.x, 
            dtY = d2.loc.y - d.loc.y, 
            dist = Math.sqrt(dtX * dtX + dtY * dtY);

          //draw shapes if calculated distance is less than 80
          if (dist < 80) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, ${120 + dist}, ${120 * dist}, ${((80 - dist) * d.speed)/20})`;
              ctx.lineWidth = 1;
              ctx.moveTo(d.loc.x, d.loc.y);
              ctx.lineTo(d2.loc.x, d2.loc.y);
              ctx.stroke();
          }
      }

      //make the dot points
      ctx.beginPath();
      ctx.arc(d.loc.x, d.loc.y, d.rad, 0, 2 * Math.PI, false);
      ctx.fillStyle = "white";
      ctx.fill();

      //attempt for user interaction... WIP
      /* window.addEventListener("mousemove", (e) => {
        const mX = e.clientX - d.loc.x,
          mY = e.clientY - d.loc.y,
          mdist = Math.sqrt(mX * mX + mY * mY);

        if (mdist < 580) {
          //d.loc.x = e.clientX;
          //d.loc.y = e.clientY;
          //d.ang = ((Math.atan((e.clientY - d.loc.y) / (e.clientX - d.loc.x)) - d.ang));
        }
      }); */

      //prevent from going off-screen
      if (d.loc.x > w) { d.loc.x = 0 };
      if (d.loc.x < 0) { d.loc.x = w };
      if (d.loc.y > h) { d.loc.y = 0 };
      if (d.loc.y < 0) { d.loc.x = h };

      //make 'em move!
      d.loc.x += d.speed * Math.sin(d.ang * Math.PI / 180);
      d.loc.y += d.speed * Math.sin(d.ang * Math.PI / 180);
  }

  //playing around with darkening it to make it look more like a background
  ctx.fillStyle = "rgba(0, 0, 20, 0.7)";
  ctx.fillRect(0, 0, w, h);
}());
