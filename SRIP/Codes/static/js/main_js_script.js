// Declared global variables
var nextText;
var inputImage;
var outputImage;
var imageNum;

init();

// Initialization function
function init() {
    nextText = document.getElementById("nextText");
    inputImage = document.getElementById("inputImg");
    outputImage = document.getElementById("outputImg");
    imageNum = 0;
    initialNextText();
}

// Function called on clicking the Run button. It the sends the information of the selected image, filter and window size and sends it to the server for processing
$("#run").bind('click', function () {
    if (imageNum > 0) {
        var filterNum = $("input[name='filter']:checked")[0].value;
        var neighbourhoodNum = $("input[name='window']:checked")[0].value;
        $.ajax({
            type: "POST",
            url: $SCRIPT_ROOT + '/apply_filter',
            data: {
                imageNumber: imageNum,
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
        alert("Select an Image");
    }
});

// Function called on clicking the Reset button. It resets the experiment to the default stage
$("#reset").bind('click', function () {
    inputImage.src = "/static/Images/blank.png";
    outputImage.src = "/static/Images/blank.png";
    initialNextText();
    document.getElementsByName("filter")[0].checked = true;
    document.getElementsByName("window")[1].checked = true;
    var processingInfo = document.getElementById("processingInfo");
    processingInfo.innerHTML = "";
    processingInfo.style.border = "none";
    imageNum = 0;
});

// Function called on clicking on a part of the mosaic. It displays the selected image as Input image
function selectImage(imageNumber) {
    console.log("here");
    imageNum = imageNumber;
    inputImage.src = "/static/Images/Mosaic" + imageNum.toString() + ".png";
    laterNextText();
}

$(function() {
    $('#mosaicImg').maphilight();
});

// Change the text in the Next Text box
function initialNextText() {
    nextText.innerHTML = "Click on the Image to be selected from the mosaic of images below.";
}
function laterNextText() {
    nextText.innerHTML = "Select the appropriate parameters and click the <b>Run</b> button";
}