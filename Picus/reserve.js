function draw() {
    let check = 1
    canvas.style.cursor = 'crosshair';
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    let rangeSlide = document.querySelector('.Ranger')
    rangeSlide.style.opacity = '1'
    function startDrawing(e) {
        if (check === 1) {
            isDrawing = true;
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
    }
    function draw(e) {
        if (isDrawing === true) {
            let x = e.offsetX
            let y = e.offsetY
            context.lineTo(x, y);
            context.strokeStyle = colorStyle
            context.stroke();
            context.lineWidth = rangeValue
            let round = document.getElementById('round')
            round.addEventListener('click', function () {
                context.lineCap = 'round';
            })
            let square = document.getElementById('square')
            square.addEventListener('click', function () {
                context.lineCap = 'square';
            })
        }
    }
    function stopDrawing() {
        isDrawing = false;
    }
}
function adjacent() {
    let x = null, y = null;
    isStarting = false
    canvas.onmousedown = adjStart
    canvas.onmousemove = adjKeep
    canvas.onmouseup = adjStop
    canvas.style.cursor = 'crosshair';
    function adjStart() {
        isStarting = true
    }
    function adjKeep(e) {
        if (x === null || y === null || !isStarting) {
            x = e.pageX - canvas.offsetLeft;
            y = e.pageY - canvas.offsetTop;
        }
        let currentX = e.pageX - canvas.offsetLeft, currentY = e.pageY - canvas.offsetTop;
        context.beginPath()
        context.moveTo(x, y)
        context.lineWidth = rangeValue
        context.lineTo(currentX, currentY)
        context.strokeStyle = strokColor
        context.stroke()
    }
    function adjStop() {
        isStarting = false
    }
}