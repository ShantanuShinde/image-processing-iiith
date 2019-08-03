// Declared global variables
var nextText;
var inputImage;
var outputImage;
var imageNum;
var start;
var end;
var grid;
var selectStartX, selectStartY;
var startX, startY, endX, endY;

init();

// Initialization function
function init() {
    nextText = document.getElementById("nextText");
    inputImage = document.getElementById("inputImg");
    outputImage = document.getElementById("outputImg");
    imageNum = 0;
    initialNextText();
    grid = document.getElementById("gridPoints");
    start = document.getElementById("start-point");
    end = document.getElementById("end-point");
    start.style.height = end.style.height = (grid.offsetHeight/16).toString() + "px";
    start.style.width = end.style.width = (grid.offsetWidth/16).toString() + "px";
    
    start.style.top = (grid.offsetHeight/4).toString() + "px";
    start.style.left = (grid.offsetWidth/4).toString() + "px";
    end.style.top = (grid.offsetHeight/2).toString() + "px";
    end.style.left = (grid.offsetWidth/2).toString() + "px";

    startX = startY = 4, endX = endY = 8;
    selectStartX = selectStartY = true;

    document.getElementById("processingInfo").getElementsByTagName("P")[0].innerText = "Start point: x = 4, y = 4";
    document.getElementById("processingInfo").getElementsByTagName("P")[1].innerText = "End point: x = 8, y = 8";
}


// Function called on clicking the Run button. 
$("#run").bind('click', function () {
    var checkedTaskVal = $('input[name=task]:checked').val();
    if(checkedTaskVal === '1' ) {
        var distanceType = $('input[name=distance]:checked').val();
        var distance;
        if(distanceType === '1') {
            distance = Math.abs(startX - endX) + Math.abs(startY - endY);
        } else if(distanceType === '2') {
            distance = Math.max(Math.abs(startX - endX), Math.abs(startY, endY));
        } else {
            distance = (Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2))).toFixed(2);
        }
        var h3 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
        h3.innerText = "The distance between the two selected points is " + distance + " units.";
    } else if (checkedTaskVal == '4') {
        var h3 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
        if((((startX-1) == endX || (startX+1) == endX) && startY == endY) || (((startY-1) == endY || (startY+1) == endY) && startX == endX)) {
            h3.innerText = "The two selected points are 4-neighbours.";
        } else {
            h3.innerText = "The two selected points are not 4-neighbours.";
        }
    } else if (checkedTaskVal == '5') {
        var h3 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
        if ((startX-1) == endX || (startX+1) == endX || (startY-1) == endY || (startY+1) == endY) {
            h3.innerText = "The two selected points are 8-neighbours.";
        } else {
            h3.innerText = "The two selected points are not 8-neighbours.";
        }
    }
});

// Function called on clicking the Reset button. It resets the experiment to the default stage
$("#reset").bind('click', function () {
    var h3 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
    h3.innerText = "";
    start.style.top = (grid.offsetHeight/4).toString() + "px";
    start.style.left = (grid.offsetWidth/4).toString() + "px";
    end.style.top = (grid.offsetHeight/2).toString() + "px";
    end.style.left = (grid.offsetWidth/2).toString() + "px";
    document.getElementById("processingInfo").getElementsByTagName("P")[0].innerText = "Start point: x = 4, y = 4";
    document.getElementById("processingInfo").getElementsByTagName("P")[1].innerText = "End point: x = 8, y = 8";
});

// Change the text in the Next Text box
function initialNextText() {
    nextText.innerHTML = "Select the start and the end point from the axis grid. Then select approriate options and click Run";
}

function laterNextText() {
    nextText.innerHTML = "Select the appropriate parameters and click the <b>Run</b> button";
}

function clickedPoint(event) {
    var x = event.clientX - $("#gridPoints").offset().left;
    var y = event.clientY - $("#gridPoints").offset().top;
    var oneBoxX = grid.offsetWidth/16, oneBoxY = grid.offsetHeight/16; 
    for(var i = 0; i < 16; i++) {
        if(x >= i*oneBoxX && x < (i+1)*oneBoxX) {
            if(selectStartX) {
                start.style.left = (i*oneBoxX).toString() + "px"; 
                startX = i;
            } else {
                end.style.left = (i*oneBoxX).toString() + "px";
                endX = i;
            }
            selectStartX = !selectStartX;
            break;
        }
    }
    for(var i = 0; i < 16; i++) {
        if(y >= i*oneBoxY && y < (i+1)*oneBoxY) {
            if(selectStartY) {
                start.style.top = (i*oneBoxY).toString() + "px"; 
                startY = i;
            } else {
                end.style.top = (i*oneBoxY).toString() + "px";
                endY = i;
            }
            selectStartY = !selectStartY;
            break;
        }
    }
    document.getElementById("processingInfo").getElementsByTagName("P")[0].innerText = "Start point: x = " + startX + ", y = " + startY;
    document.getElementById("processingInfo").getElementsByTagName("p")[1].innerText = "End point: x = " + endX + ", y = " + endY;
}