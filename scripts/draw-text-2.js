/**
  * A fancier and faster text drawing algorithm.
  * Uses a general 5x7 pixel font, supports ÄÖäö and some other special chars.
  *  text     = the string to be drawn
  *  px, py   = top left corner coordinates
  *  scale    = text scale (pixel scaling, ≥1)
  *  bg       = background color
  *  fg       = text color
  */
window.drawText2 = function(text, px, py, scale, bg, fg){

    var font=[0,0,0,0,0,0,0,95,0,0,0,7,0,7,0,20,127,20,127,20,36,42,127,42,18,35,19,8,100,98,54,73,85,34,80,0,5,3,0,0,0,28,34,65,0,0,65,34,28,0,8,42,28,42,8,8,8,62,8,8,0,80,48,0,0,8,8,8,8,8,0,96,96,0,0,32,16,8,4,2,62,81,73,69,62,0,66,127,64,0,66,97,81,73,70,33,65,69,75,49,24,20,18,127,16,39,69,69,69,57,60,74,73,73,48,1,113,9,5,3,54,73,73,73,54,6,73,73,41,30,0,54,54,0,0,0,86,54,0,0,0,8,20,34,65,20,20,20,20,20,65,34,20,8,0,2,1,81,9,6,50,73,121,65,62,126,17,17,17,126,127,73,73,73,54,62,65,65,65,34,127,65,
65,34,28,127,73,73,73,65,127,9,9,1,1,62,65,65,81,50,127,8,8,8,127,0,65,127,65,0,32,64,65,63,1,127,8,20,34,65,127,64,64,64,64,127,2,4,2,127,127,4,8,16,127,62,65,65,65,62,127,9,9,9,6,62,65,81,33,94,127,9,25,41,70,70,73,73,73,49,1,1,127,1,1,63,64,64,64,63,31,32,64,32,31,127,32,24,32,127,99,20,8,20,99,3,4,120,4,3,97,81,73,69,67,125,18,18,125,0,61,66,66,66,61,61,64,64,64,61,0,0,127,65,65,2,4,8,16,32,65,65,127,0,0,4,2,1,2,4,64,64,64,64,64,0,1,2,4,0,32,84,84,84,120,127,72,68,68,56,56,68,68,68,32,56,68,68,
72,127,56,84,84,84,24,8,126,9,1,2,8,20,84,84,60,127,8,4,4,120,0,68,125,64,0,32,64,68,61,0,0,127,16,40,68,0,65,127,64,0,124,4,24,4,120,124,8,4,4,120,56,68,68,68,56,124,20,20,20,8,8,20,20,24,124,124,8,4,4,8,72,84,84,84,32,4,63,68,64,32,60,64,64,32,124,28,32,64,32,28,60,64,48,64,60,68,40,16,40,68,12,80,80,80,60,68,100,84,76,68,32,85,84,85,120,58,68,68,58,0,58,64,64,58,0,0,8,54,65,0,0,0,127,0,0,0,65,54,8,0,20,62,85,65,34,8,8,42,28,8,8,28,42,8,8,0,0,7,5,7];

  let lookup = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
           '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@',
           'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
           'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ä', 'Ö', 'Ü', '[', '\\', ']', '^', '_', '`',
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
           'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ä', 'ö', 'ü', '{', '|', '}', '€', '†', '‡', '°'
          ];


    let c = 0;
    let iv = setInterval(() => {

        c++;

        setCurrentColor(bg);

        let char = text[c];

        if (lookup.indexOf(char) > -1) {

            let ci = lookup.indexOf(char);

            for (let x = 0; x < 5; x++) {
                let bt = font[ci*5 + x];
                for (let y = 0; y < 8; y++) {
                    let bit = getBit(bt, y);
                    if (bit == 1) {
                        setCurrentColor(fg);
                    } else {
                        setCurrentColor(bg);
                    }
                    ptxLine(true, c*scale*6 + px + x*scale, py + y*scale, c*scale*6 + px + x*scale, py + y*scale, scale);
                }
            }

        }

        if (c >= text.length) {
            clearInterval(iv);
        }

    }, 1000/8);


}
