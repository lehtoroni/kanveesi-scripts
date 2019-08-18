/*
 * (c) Tapsa 2019
 * See license in LICENSE
 */

/**
  * Draw a filled rectangle.
  *  x, y           = top left corner position
  *  w, h           = width and height
  *  currentColor   = fill color
  */
window.fillRect = function(x, y, w, h, currentColor){

    let i = y;
    let iMax = y + h;

    let iv = setInterval(() => {

        for (let ii = 0; ii < 45; ii++) {
            setCurrentColor(currentColor);
            ptxLine(true, x, i, x + w, i, 1);

            i++;

            if (i >= iMax) {
                clearInterval(iv);
                break;
            }
        }

    }, 1000/8);

}
