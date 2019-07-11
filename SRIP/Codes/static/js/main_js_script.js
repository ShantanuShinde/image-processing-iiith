// Declared global variables
var nextText, inputImage, outputImage, imageNum;

init();

// Initialization function
function init() {
    nextText = document.getElementById("nextText");
    inputImage = document.getElementById("inputImg");
    outputImage = document.getElementById("outputImg");
    imageNum = 0;
    initialNextText();
}

// Function called on clicking the Select Image button. It displays the enlarged mosaic to select an image from it.
$("#selectImage").bind('click', function () {
    document.getElementById("enlargedMosaic").style.display = "block";
});

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

// Displaying enlarged mosaic on clicking the smaller mosaic image
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

// Function called on clicking on a part of the mosaic. It displays the selected image as Input image
function selectImage(imageNumber) {
    imageNum = imageNumber;
    inputImage.src = "/static/Images/Mosaic" + imageNum.toString() + ".png";
    laterNextText();
    document.getElementById("enlargedMosaic").style.display = "none";
}

$(function() {
    $('#largeMosaic').maphilight();
});

// Change the text in the Next Text box
function initialNextText() {
    nextText.innerHTML = "Click on the <b>Select Image</b> button to select an image to process from the mosaic.";
}
function laterNextText() {
    nextText.innerHTML = "Select the appropriate parameters and click the <b>Run</b> button";
}