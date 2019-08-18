/**
  * Draw a spiral.
  *  cx     = center x in pixels (0..1000)
  *  cy     = center y in pixels (0..1000)
  *  angle  = how many spins (in radians)
  *  inc    = radius increase rate (in pixels)
  *  size   = line size in pixels (0..9)
  */
window.drawSpiral = function(cx, cy, angle, inc, size) {
    let a = 0;
    let m = 1;
    let lastX = cx, lastY = cy;
    let iv = setInterval(() => {

        for (let i = 0; i < 95; i++) {
        
            let x = cx + Math.floor(Math.cos(a)*m);
            let y = cy + Math.floor(Math.sin(a)*m);

            setCurrentColor(currentColor);
            ptxLine(true, lastX, lastY, x, y, size);

            lastX = x;
            lastY = y;

            a += Math.PI*2 / 360;
            if (a >= angle) {
                clearInterval(iv);
                break;
            }

            m += inc;
            
        }

    }, 1000/8);

}
