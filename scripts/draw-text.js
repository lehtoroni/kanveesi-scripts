/**
  * Draw text
  *  text   = the string to be drawn
  *  x, y   = top left corner coordinates
  *  font   = the font as a canvas compatible string (e.g. "16px Comic Sans MS")
  *  height = height of the filled area
  *  bg     = background color
  *  fg     = text color
  */
window.drawText = function(text, x, y, font, height, bg, fg) {

    let rgbToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };

    let tcanvas = document.createElement('canvas');
    let tctx = tcanvas.getContext('2d');

    tctx.font = font;

    let ms = tctx.measureText(text);
    tcanvas.width = ms.width;
    tcanvas.height = height;

    tctx.textAlign = 'left';
    tctx.textBaseline = 'top';

    tctx.font = font;
    tctx.fillStyle = bg;
    tctx.fillRect(0, 0, tcanvas.width, tcanvas.height);

    tctx.fillStyle = fg;
    tctx.fillText(text, 0, 0);

    let _x = 0, _y = 0;

    let iv = setInterval(() => {

        for (let n = 0; n < 95; n++) {

            let pixel = tctx.getImageData(_x, _y, 1, 1).data;
            let hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

            currentColor = '#'+hex;

        setCurrentColor(currentColor);
            ptxLine(true, x + _x, y + _y, x + _x, y + _y, 1);


            _y++;
            if (_y > tcanvas.height) {
                _y = 0;
                _x++;
            }

            if (_x > tcanvas.width) {
                clearInterval(iv);
                break;
            }

        }

    }, 1000/8);

}
