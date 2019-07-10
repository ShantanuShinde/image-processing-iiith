var nextText, inputImage, outputImage, imageNum, nextPressed;

init();

function init() {
    nextText = document.getElementById("nextText");
    inputImage = document.getElementById("inputImg");
    outputImage = document.getElementById("outputImg");
    imageNum = document.getElementById("imgNum");
    nextPressed = false;
    initialNextText();
}

$("#imageSelected").bind('click', function () {
    var imageInd = parseInt(imageNum.selectedIndex);
    if (imageInd > 0) {
        inputImage.src = "/static/Images/Mosaic" + imageInd.toString() + ".png";
        nextPressed = true;
        laterNextText();
    } else {
        alert("Select an image.");
    }
});

$("#run").bind('click', function () {
    if (nextPressed) {
        var selectedImageNum = imageNum.options[imageNum.selectedIndex].value;
        var filterNum = $("input[name='filter']:checked")[0].value;
        var neighbourhoodNum = $("input[name='window']:checked")[0].value;
        $.ajax({
            type: "POST",
            url: $SCRIPT_ROOT + '/apply_filter',
            data: {
                imageNumber: selectedImageNum,
                filter: filterNum,
                windowSize: neighbourhoodNum
            }
        }).done(function (data) {
            outputImage.src = "data:image/png;base64," + data;
            var processingInfo = document.getElementById("processingInfo");
            processingInfo.innerHTML = "Image processed using " + $("input[name='filter']:checked").parent('label').text() + " of size " + $("input[name='window']:checked").parent('label').text() + ".";
            processingInfo.style.border = "#2f4f4f solid 0.2em";
        });
    } else {
        alert("Select an Image and press Next");
    }
});

$("#reset").bind('click', function () {
    inputImage.src = "/static/Images/blank.png";
    outputImage.src = "/static/Images/blank.png";
    initialNextText();
    document.getElementsByName("filter")[0].checked = true;
    document.getElementsByName("window")[1].checked = true;
    imageNum.options[0].selected = true;
    var processingInfo = document.getElementById("processingInfo");
    processingInfo.innerHTML = "";
    processingInfo.style.border = "none";
    nextPressed = false;
});

$("#imgNum").bind('change', function () {
    nextPressed = false;
});

var modal = document.getElementById("enlargedMosaic");
var btn = document.getElementById("mosaicImg");

var closeButton = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function initialNextText() {
    nextText.innerHTML = "Select one of the images from the mosaic using the dropdown at the bottom of the page and press the <b>Next</b> button to continue";
}

function laterNextText() {
    nextText.innerHTML = "Select the appropriate parameters and click the <b>Run</b> button";
}