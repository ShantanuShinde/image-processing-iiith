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
var distIso;
var isodistancePoints;
var distanceIso;

init();

// Initialization function
function init() {
    distanceIso = 1;
    nextText = document.getElementById("nextText");
    inputImage = document.getElementById("inputImg");
    outputImage = document.getElementById("outputImg");
    imageNum = 0;
    initialNextText();
    grid = document.getElementsByClassName("gridPoints")[0];
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

    distIso = true;
    document.getElementsByClassName("grid")[1].style.display = "none";
    document.getElementById("slider").style.display = "none";
}

// Function called on clicking Isodistance
function isodistance(isodistanceButton) {
    if (isodistanceButton.checked == true) {
        distIso = false;
        end.style.display = "none";
        document.getElementsByClassName("grid")[1].style.display = "block";
        isodistanceText();
        document.getElementById("distanceResult").getElementsByTagName("h4")[0].innerText = "";
        document.getElementById("slider").style.display = "block";
        isodistancePoints = [];
        document.getElementById("processingInfo").getElementsByTagName("p")[1].innerText = "";
    }
}

// Function called on clicking button other than Isodistance
function dist(otherButtons) {
    if(otherButtons.checked == true) {
        deleteIsodisance();
        distIso = true;
        end.style.display = "block";
        document.getElementsByClassName("grid")[1].style.display = "none";
        initialNextText();
        document.getElementById("distanceResult").getElementsByTagName("h4")[0].innerText = "";
        document.getElementById("slider").style.display = "none";
        document.getElementById("processingInfo").getElementsByTagName("p")[1].innerText = "End point: x = " + endX + ", y = " + endY;
    }
}

//Function called on moving the slider
function changeDistance (value) {
    distanceIso = parseInt(value);
    document.getElementById("slider").getElementsByTagName("p")[0].innerText = value;
}


// Function called on clicking the Run button. 
$("#run").bind('click', function () {
    if(distIso) {
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
            var h4 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
            h4.innerText = "The distance between the two selected points is " + distance + " units.";
        } else if (checkedTaskVal == '4') {
            var h4 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
            if((((startX-1) == endX || (startX+1) == endX) && startY == endY) || (((startY-1) == endY || (startY+1) == endY) && startX == endX)) {
                h4.innerText = "The two selected points are 4-neighbours.";
            } else {
                h4.innerText = "The two selected points are not 4-neighbours.";
            }
        } else if (checkedTaskVal == '5') {
            var h4 = document.getElementById("distanceResult").getElementsByTagName("h4")[0];
            if ((startX-1) == endX || (startX+1) == endX || (startY-1) == endY || (startY+1) == endY) {
                h4.innerText = "The two selected points are 8-neighbours.";
            } else {
                h4.innerText = "The two selected points are not 8-neighbours.";
            }
        }
    } else {
        var outputPoints = document.getElementById("outGridPts");
        deleteIsodisance();
        var oneBoxX = grid.offsetWidth/16, oneBoxY = grid.offsetHeight/16;
        for(var x = 0; x <= 16; x++) {
            var yMinusY1Sq = Math.abs(distanceIso*distanceIso - ((x - startX)*(x - startX)))
            var yMinusy1Cal = Math.floor(Math.sqrt(yMinusY1Sq));
            if((yMinusY1Sq == yMinusy1Cal*yMinusy1Cal)) {
                if(-yMinusy1Cal + startY != startY) {
                    var y1 = -yMinusy1Cal + startY;
                    if(y1 >= 0) {
                        var point1 = document.createElement("div");
                        point1.className = "output-point";
                        point1.style.height =  (grid.offsetHeight/16).toString() + "px";
                        point1.style.width =  (grid.offsetWidth/16).toString() + "px";
                        outputPoints.appendChild(point1);
                        point1.style.position = "absolute";
                        point1.style.top = (y1*oneBoxY).toString() + "px";
                        point1.style.left = ((x)*oneBoxX).toString() + "px";
                        point1.style.border = "0.188em solid #800080";
                        isodistancePoints.push(point1);
                    }
                }
                var y = yMinusy1Cal + startY;
                if(y <= 16) {
                    var point = document.createElement("div");
                    point.className = "output-point";
                    point.style.height =  (grid.offsetHeight/16).toString() + "px";
                    point.style.width =  (grid.offsetWidth/16).toString() + "px";
                    outputPoints.appendChild(point);
                    point.style.position = "absolute";
                    point.style.top = (y*oneBoxY).toString() + "px";
                    point.style.left = ((x)*oneBoxX).toString() + "px";
                    point.style.border = "0.188em solid #800080";
                    isodistancePoints.push(point);
                }
            }
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
    if(distIso) {
        document.getElementById("processingInfo").getElementsByTagName("P")[1].innerText = "End point: x = 8, y = 8";
    }
    startX = startY = 4, endX = endY = 8;
    selectStartX = selectStartY = true;
    deleteIsodisance();
});

// Change the text in the Next Text box
function initialNextText() {
    nextText.innerHTML = "Select the start and the end point from the axis grid. Then select approriate options and click Run";
}

function isodistanceText() {
    nextText.innerHTML = "Select a point from the grid and select the distance for the isodistance plot using he slider.";
}

// Function called on clicking a point on the grid
function clickedPoint(event) {
    if(distIso) {
        var x = event.clientX - $("#inpGridPts").offset().left;
        var y = event.clientY - $("#outGridPts").offset().top;
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
    } else {
        var x = event.clientX - $("#inpGridPts").offset().left;
        var y = event.clientY - $("#outGridPts").offset().top;
        var oneBoxX = grid.offsetWidth/16, oneBoxY = grid.offsetHeight/16; 
        for(var i = 0; i < 16; i++) {
            if(x >= i*oneBoxX && x < (i+1)*oneBoxX) {
                start.style.left = (i*oneBoxX).toString() + "px"; 
                startX = i;
                break;
            }
        }
        for(var i = 0; i < 16; i++) {
            if(y >= i*oneBoxY && y < (i+1)*oneBoxY) {
                start.style.top = (i*oneBoxY).toString() + "px"; 
                startY = i;
                break;
            }
        }
        document.getElementById("processingInfo").getElementsByTagName("P")[0].innerText = "Start point: x = " + startX + ", y = " + startY;
    }
}

// Function to delete isodistance plot
function deleteIsodisance() {
    var outputPoints = document.getElementById("outGridPts");
    if(isodistancePoints.length > 0) {
        for(var i = isodistancePoints.length - 1; i >= 0 ; i--) {
            outputPoints.removeChild(isodistancePoints[i]);
            
            isodistancePoints.pop();
        }
    }
}