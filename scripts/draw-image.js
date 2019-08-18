/**
  * Draw an image
  *  url  = the image as a base64 encoded string (or a local resource url)
  *  x, y = top left corner coordinates
  *  w, h = width and height of the image (can be scaled)
  */
window.drawImage = function(url, x, y, w, h){

    let rgbToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };

    let img = new Image();

    img.onload = () => {

        if (img.width && img.height && img.width > 0 && img.height > 0) {

            let tcanvas = document.createElement('canvas');
            let tctx = tcanvas.getContext('2d');

            tcanvas.width = w;
            tcanvas.height = h;

            tctx.drawImage(img, 0, 0, w, h);

            let _x = 0;
            let _y = 0;

            let iv = setInterval(() => {

                for (let i = 0; i < 95; i++) {

                    let pixel = tctx.getImageData(_x, _y, 1, 1).data;
                    let hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

                    currentColor = '#'+hex;
                    if (pixel[3] == 0) {
                        currentColor = '#ffffff';
                    }


                    setCurrentColor(currentColor);
                    ptxLine(true, x + _x, y + _y, x + _x, y + _y, 1);


                    _x++;
                    if (_x > tcanvas.width) {
                        _x = 0;
                        _y++;
                    }

                    if (_y > tcanvas.height) {
                        clearInterval(iv);
                        break;
                    }

                }

            }, 1000/8);


        }

    }

    img.src = url;

}
