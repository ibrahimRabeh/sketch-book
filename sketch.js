//container for the color selection buttons
const options = document.getElementById("options-container");

const blackColor = document.createElement("button");
blackColor.textContent = "Black";
options.appendChild(blackColor);

const Rainbow = document.createElement("button");
Rainbow.textContent = "Rainbow";
options.appendChild(Rainbow);

const Eraser = document.createElement("button");
Eraser.textContent = "Eraser";
options.appendChild(Eraser);

//to get the color palette from the customhexcolorpicker file
var colorInputEle = document.querySelector(".colorInput");

var customHexColorPicker = new CustomHexColorPicker({
  palette: true / false,
  defaultColor: "red" / "#f00" / "#ff0000",
  colorattribute: "currentcolor",
  customlabeltext: "Add",
  canceltext: "cancel",
  selecttext: "select",
});
customHexColorPicker.register(colorInputEle);

//booleans to get which color was chosen 
let black = true;
let rainbow = false;
let eraser = false;
let pickColor = false;
const isColored = [];

//drawing container for both the canvas and the slide bar
const pixels = document.getElementById("drawing-container");
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

// Display the default slider value
output.innerHTML = "SIZE:  " + slider.value + "*" + slider.value;
// Update the current slider value (each time you drag the slider handle)
//and update the canvas size
slider.oninput = function () {
  output.innerHTML = "SIZE:  " + slider.value + "*" + slider.value;
  sketchBook();
};

sketchBook();
function sketchBook() {
  //empties out all divs in pixels so that when updating canvas size the old one is removed
  pixels.innerHTML = "";

  //saves all divs in arrays to able to change
  var pixelArrayHor = [];

  //loop that creates divs both vertically and then it sends it all to pixelsArrayHor array
  for (let i = 0; i < slider.value; i++) {
    var pixelArrayVer = [];
    const drawPixelHor = document.createElement("div");
    drawPixelHor.classList.toggle("PixelsVar");
    drawPixelHor.setAttribute("draggable", false);
    pixels.appendChild(drawPixelHor);

    for (let j = 0; j < slider.value; j++) {
      const drawpixelVer = document.createElement("div");

      pixelArrayVer.push(drawpixelVer);
      drawpixelVer.classList.toggle("PixelsHar");
      drawPixelHor.appendChild(drawpixelVer);
    }

    pixelArrayHor.push(pixelArrayVer);
  }
  //this stops the divs from being draggable
  document.body.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
  let color = draw(pixelArrayHor[1][1]);
  let ms = true;
  //eventlistener for anytime the mouse is down inside the canvas
  pixels.addEventListener("pointerdown", (e) => {
    //a boolean value to stop redrawing the same pixel if it passes over it twice
    let ms = true;

    //couple if statement to color the pixel the color that is chosen
    pixels.addEventListener("pointermove", (e) => {
      if (ms == true) {
        if (color == draw(e)) {
        } else {
          color = draw(e);
          if (color != true) {
            if (black == true) {
              color.style.backgroundColor = "black";
            } else if (eraser == true) {
              color.style.backgroundColor = "rgb(233, 233, 233)";
            } else if (rainbow == true) {
              let r = Math.floor(Math.random() * 255);
              let g = Math.floor(Math.random() * 255);
              let b = Math.floor(Math.random() * 255);
              color.style.backgroundColor =
                "rgb(" + r + "," + g + "," + b + ")";
            } else if (pickColor == true) {
              color.style.backgroundColor =
                colorInputEle.getAttribute("currentcolor");
            }
          }
        }
      }
    });
    //stop drawing once mouse is up
    pixels.addEventListener("pointerup", (e) => {
      ms = false;
    });
  });

  //function to get the pixel that was pressed
  function draw(e) {
    for (let i = 0; i < pixelArrayHor.length; i++) {
      for (let j = 0; j < pixelArrayHor[i].length; j++) {
        if (e.target == pixelArrayHor[i][j]) {
          return pixelArrayHor[i][j];
        }
      }
    }
    return true;
  }

  //event listeners for all color buttons
  blackColor.addEventListener("click", (e) => {
    black = true;
    rainbow = false;
    pickColor = false;
    eraser = false;
  });
  Rainbow.addEventListener("click", (e) => {
    rainbow = true;
    black = false;
    pickColor = false;
    eraser = false;
  });
  Eraser.addEventListener("click", (e) => {
    rainbow = false;
    black = false;
    pickColor = false;
    eraser = true;
  });
  colorInputEle.addEventListener("click", (e) => {
    rainbow = false;
    black = false;
    pickColor = true;
    eraser = false;
  });
  const ResetColor = document.getElementById("ResetButton");
  ResetColor.textContent = "Reset";
  ResetColor.style.width = "100%";

  //reset all colors using the array that was saved in the sketch function
  ResetColor.addEventListener("click", (e) => {
    for (let i = 0; i < pixelArrayVer.length; i++) {
      for (let j = 0; j < pixelArrayHor.length; j++) {
        pixelArrayHor[i][j].style.backgroundColor = "rgb(233, 233, 233)";
      }
    }
  });
}
