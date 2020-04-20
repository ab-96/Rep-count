var zero = Puck.mag();
var rep = 0;

function onMag(p) {
  p.x -= zero.x;
  p.y -= zero.y;
  p.z -= zero.z;
  var s = Math.sqrt(p.x*p.x + p.y*p.y + p.z*p.z);
  if (!Boolean(s<1000)) {
    digitalPulse(LED2,1,1000);
    rep++;
    console.log(rep);
  }
}

Puck.on('mag', onMag);
Puck.magOn();