 /*an object of the created clothing needed here, whatever the user chooses and create, will be added to the object, this way, us the admins will know the final of the product at the end of creation*/
            /*we need an object for the final clothing created, and one for the final design created, so that the user ca resize the design without touching the clothing, after done with the second dialog, the two objects will merge to give the final product*/

            let theDesignedOne = []
            let simpleMock = document.getElementById('mockup')
            let theDesign = document.getElementById('designs')
            let finalProduct = {
                type: "simple",
                colorOfCloth: "white",
                sleeves: "short",
                designedSleeve: "red",
                ColType: "round",
                colDesign: "white",
                pockets: "no",
                pocketsCoordinates: "0, 0",
            }
            let finalDesign = {
                color: "orginal",
                frame: "keep",
                text: "noChange",
                language: "english",
                textDeletion: "no",
                newText: "empty",
                shapes: "empty",
                background: "empty",
                manga: "no"
            }
            /*the below stack is for whatever enters the canvas*/
            let inCanvas = []
            let VcolIsUp = false
            let theLastCreated
            let Dsection = document.getElementById('designStep')
            let Tsection = document.getElementById('tshirtStep')
            let shirtStep = document.getElementById('tshirtsOptions')
            /*the below stack (canvasStack) is only for undo and redo of the tshirt sleeves*/
            let canvasStack = []
            let modDialog = document.getElementById('goButn')
            let dialog = document.getElementById('dialogBox')
            modDialog.addEventListener('click', function () {
                dialog.style.display = 'block';
                mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                mock.drawImage(theDesign, 58, 88, 240, 170)
            })
            /*importing fabric.js into the code*/
            const canvas = document.getElementById('myCanvas')
            const ctx = canvas.getContext('2d')
            canvas.height = 470
            canvas.width = 400
            const mockup = document.getElementById('CanvasTwo')
            const mock = mockup.getContext('2d')
            mockup.height = 470
            mockup.width = 360
            const finalDraft = document.getElementById('finalCanvas')
            const finalItem = finalDraft.getContext('2d')
            finalDraft.height = 500
            finalDraft.width = 425
            const Circle = class {
                constructor() {
                    this.Radius = 150
                    this.CenterX = canvas.width / 2
                    this.CenterY = canvas.height / 2
                }
                /*we need the radius, and both coordinate of the center (x,y) to know where the user wants to start, by default the coordinates will be in the middle of the canvas*/
                Radius
                CenterX
                CenterY
                changeX
                changeY
                Degree
                YforSine
                itsColor = "#FF0000"
                DrawFill(x, y, r) {
                    /*using drawFill, if the user chooses fill circle, otherwise it would be stroke, since drawFill the line from center to the edge, the radius, has to be filled, unlike stroke where we are going to start only from the edge*/
                    /*the parameters of draw are 3, x&y for the center point, and radius*/
                    /*we are not going to add this object to the ctx function, we are going to use ctx methods to draw through this class*/
                    /*the point behind this function is simple, we are going to start from the center, draw a line based on the radius of the user, then we keep moving downwards*/
                    /*there is going to be a lot of math, so hold your horses*/
                    /*we still need the user to see the changes of the cricle on time of dragging the range input*/
                    /*the following will look like a clock moving, to fill*/
                    ctx.beginPath()
                    ctx.moveTo(x, y)
                    /*move "radius length" on the x-axis and keep y point the same to create a radius*/
                    /*we have to move the radius through the circle on input, to see the area it covers*/
                    ctx.lineTo(x + r, y)
                    /*basically the circle is the distance from a center to a point is equal to the distance from the cented to other point, which means you have to figure out how to draw points to connect lines to, if you keep x the same, this will make the radius always go the value x+r on the axis, you to know by how much change in both y & x, not just y*/
                    /*probably is better to use arc function to create an arc, */
                    /*this function drawFill, could only be used to create the line, as beginning of creating a circle, then we know how to preform from there based on these data of center point and radius*/
                    ctx.stroke()
                    ctx.closePath()
                    this.CenterX = x
                    this.CenterY = y
                    this.Radius = r
                    /*changeX field represents the change in x after adding the radius length*/
                    this.changeX = this.CenterX + r
                    this.changeY = this.CenterY
                }
                DrawOnInput() {
                    ctx.beginPath()
                    ctx.moveTo(this.CenterX, this.CenterY)
                    this.changeX -= 0.5
                    this.changeY += 0.5
                    this.YforSine = this.changeY - this.CenterY
                    ctx.lineTo(this.changeX, this.changeY)
                    this.findDegree()
                    /*on input, a line will be created again from the center to -0.001y and -0.001x, meaning by how much we went down on the y&x axis. this will give us opposite side of the triangle 0.001(we should theoritically consider only y axis, since at first we will consider it as a right sided triangle, we but in practice we also going down the x-axis too, to create a curve), meaning we could using to calculate sin, we will use the sin to find the degree of theta, we will use that degree to find the arc*/
                    ctx.arc(this.CenterX, this.CenterY, this.Radius, 0, (this.Degree * (Math.PI / 180)))
                    ctx.stroke()
                    ctx.closePath()
                    ctx.fill()
                    /*the standard is 0.001 to change for y, but that value will be incremented each time*/
                    /*new values will be entered for the object as the value is changed on input, we assumed that when the user inputs 1 on the range, x will change by 1, y will change by 2, the change of these two points will be used to calculate the degree created due to the change, then from that the degree we can calculate the measurments of the arc created based on that the degree, if we found the arc, we can then use it to find the area created, and we only going to fill that area created*/
                    /*it is not a good idea to always fill based on the changes of 0.001, we have to see the difference between both y and x points*/
                    /*this.changeY will only change if there is a change in y, and the change in y won't happen until the user uses the ranger input*/
                    /*I don't want to use arc function, since the drawing has to start from the center of the circle to the radius, each area covered by that radius while moving will need to be filled*/
                }
                findDegree() {
                    let TheSine = this.YforSine / 2/*the hyppotenus*/;
                    this.Degree = Math.asin(TheSine)
                }
                /*do we actually need the distance between two points?, yes if the user want to go slowly filling the circle, but for now, we can start by filling the circle quarterly, one fourth at a time of the 360 degrees, we going to fill each 90 degree at a time, 360/4*/
            }
            mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
            let dialogs = document.getElementById('belowOpt')
            function tshirtsOptions() {
                if (dialogs.style.display != "none") {
                    dialogs.style.display = "none"
                }
                else {
                    dialogs.style.display = "block"
                }
            }
            function addCircle() {
                let ranger = document.getElementById('rovercol')
                ranger.style.display = "block"
                ranger.addEventListener('input', () => {
                    myCircle.DrawOnInput()
                })
                /*we have to find a way to make the focus on the object until its color is changed, then when the user click somwhere else, is where the color will be of the circle*/
                /*probably you can create a class of circle and draw the circle from scratch without relying on these functions*/
                const myCircle = new Circle();
                myCircle.DrawFill(80, 80, 100)
                /*I can access the entire ctx object and manipulate the way it draws the circle*/
                /*the problem here is that the arc function use the arc length using radians, meaning it does start drawing from the center of the circle, it start from angle 0, then goes of a curved line from there without connecting with the center, this way we cannot create a spice out circle*/
                /*this can all be done using fabric.js, however, if fabric.js cannot be uploaded, we have to figure out a way to move the shapes through the canvas*/
            }
            function thisOne(shirt) {
                let itsId = shirt.getAttribute('id')
                finalProduct["type"] = itsId
                if (itsId == 'simple') {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(simpleMock, -106, 30, simpleMock.width, simpleMock.height)
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
                else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(shirt, 25, 8, 330, 440)
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    mock.drawImage(shirt, 22, 9, 330, 440)
                    mock.drawImage(theDesign, 65, 215, 240, 170)
                }
            }
            function colorFull() {
                let colorDialog = document.getElementById('color')
                if (colorDialog.style.display != "none") {
                    colorDialog.style.display = "none"
                }
                else {
                    colorDialog.style.display = "block"
                }
            }

            function newColor(elem) {
                let myImage = ctx.getImageData(-106, 30, simpleMock.width, simpleMock.height)
                myImage.crossOrigin = "Anonymous"
                let savedColor = []
                let dataArray = myImage.data;
                if (elem.value === 1) {
                    for (let index = 0; index < dataArray.length; index = index + 4) {
                        dataArray[index] = 210;
                        dataArray[index + 1] = 10;
                        dataArray[index + 2] = 10;
                        /*storing the color of the tshirt on the object so at the end of the creation admin can know which color the tshirt should be*/
                        finalProduct["colorOfCloth"] = String(dataArray[index], dataArray[index + 1], dataArray[index + 2])
                    }
                }
                else if (elem.value === 2) {
                    for (let index = 0; index < dataArray.length; index = index + 4) {
                        dataArray[index] = 10;
                        dataArray[index + 1] = 210;
                        dataArray[index + 2] = 10;
                        finalProduct["colorOfCloth"] = String(dataArray[index], dataArray[index + 1], dataArray[index + 2])
                    }
                }
                else if (elem.value === 3) {
                    for (let index = 0; index < dataArray.length; index = index + 4) {
                        dataArray[index] = 189;
                        dataArray[index + 1] = 21;
                        dataArray[index + 2] = 210;
                        finalProduct["colorOfCloth"] = String(dataArray[index], dataArray[index + 1], dataArray[index + 2])
                    }
                }
            }
            let long = document.getElementById('longSleeves')
            function longSleeve(element) {
                let inner = element.textContent
                if (inner === 'Make Long Sleeves') {
                    finalProduct["sleeves"] = "long"
                    long.style.display = "block"
                    element.textContent = "Make Short Sleeves"
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(long, -60, 30, long.width, long.height)
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    mock.drawImage(long, -60, 30, long.width, long.height)
                    mock.drawImage(theDesign, 80, 88, 210, 170)
                }
                else {
                    finalProduct["sleeves"] = "short"
                    element.textContent = "Make Long Sleeves"
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(simpleMock, -106, 30, simpleMock.width, simpleMock.height)
                    mock.clearRect(0, 0, canvas.width, canvas.height)
                    mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
            }
            function options() {
                let division = document.querySelector('.sleeveOptions')
                if (division.style.display === 'none') {
                    division.style.display = 'block'
                }
                else {
                    division.style.display = 'none'
                }
            }
            /*find a way to clear only the tshirt, not the whole canvas*/
            function redS(picture) {
                finalProduct["designedSleeve"] = "red"
                if (canvasStack.length === 0) {
                    canvasStack.push(picture)
                }
                else {
                    canvasStack.pop()
                    canvasStack.push(picture)
                }
                /*here, to do undo and redo we need stacks data structure, we have to push the picture of chosen sleeve and push to the stack, and then grab that stack and draw the desired sleeve on the canvas, since this one is a redS function, meaning we should filter out the canvas for the proper picture*/
                ctx.drawImage(canvasStack[0], -106, 50, simpleMock.width, 340)
                mock.drawImage(canvasStack[0], -125, 50, simpleMock.width, 340)
                if (!VcolIsUp) {
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
                else {
                    mock.drawImage(theDesign, 65, 110, 240, 170)
                }
            }
            function greenS(picture) {
                finalProduct["designedSleeve"] = "green"
                if (canvasStack.length === 0) {
                    canvasStack.push(picture)
                }
                else {
                    canvasStack.pop()
                    canvasStack.push(picture)
                }
                mock.drawImage(canvasStack[0], -125, 50, simpleMock.width, 340)
                if (!VcolIsUp) {
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
                else {
                    mock.drawImage(theDesign, 65, 110, 240, 170)
                }
            }
            function lineS(picture) {
                finalProduct["designedSleeve"] = "line"
                if (canvasStack.length === 0) {
                    canvasStack.push(picture)
                }
                else {
                    canvasStack.pop()
                    canvasStack.push(picture)
                }
                ctx.drawImage(canvasStack[0], -106, 50, simpleMock.width, 340)
                mock.drawImage(canvasStack[0], -125, 50, simpleMock.width, 340)
                if (!VcolIsUp) {
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
                else {
                    mock.drawImage(theDesign, 65, 110, 240, 170)
                }
            }
            /*for step of resizing, choosing fabric... the image on the mockup canvas should be displayed on that step's canvas, and its should be the same as the one created by the user*/
            let v = document.getElementById('colV')
            function colType(inside) {
                let type = inside.textContent
                if (type === "Make Col V") {
                    v.style.display = "block"
                    finalProduct["ColType"] = "V"
                    inside.textContent = "Make Col Round"
                    VcolIsUp = true
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    ctx.drawImage(v, -100, 30, v.width + 110, v.height)
                    mock.drawImage(v, -119, 30, v.width + 110, v.height)
                    mock.drawImage(theDesign, 65, 110, 240, 170)
                }
                else {
                    inside.textContent = "Make Col V"
                    finalProduct["ColType"] = "round"
                    VcolIsUp = false
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    ctx.drawImage(simpleMock, -106, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                }
            }
            function pocket(element) {
                if (element.textContent === "Add Pockets") {
                    element.textContent = "Remove Pockets"
                }
                else {
                    element.textContent = "Add Pockets"
                }
            }
            let backAllowed = false
            designStep = document.getElementById('designOptions')
            function step1() {
                if (Dsection.style.backgroundColor != 'rgb(91, 223, 91)') {
                    Dsection.style.backgroundColor = 'rgb(91, 223, 91)'
                }
                backAllowed = false
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                designStep.style.display = "none"
                shirtStep.style.display = "block"
                Tsection.style.backgroundColor = "orange"
            }
            function step2() {
                if (Tsection.style.backgroundColor != 'rgb(91, 223, 91)') {
                    Tsection.style.backgroundColor = 'rgb(91, 223, 91)'
                }
                backAllowed = true
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(theDesign, -65, 35, 520, 400)
                designStep.style.display = "block"
                shirtStep.style.display = "none"
                Dsection.style.backgroundColor = "orange"
            }
            function manga() {
                let average
                let myDesign = ctx.getImageData(-65, 35, 520, 400)
                let desigArray = myDesign.data
                for (let i = 0; i < desigArray.length; i += 4) {
                    average = ((desigArray[i] + desigArray[i + 1] + desigArray[i + 2]) / 3)
                    if (average > 127) {
                        desigArray[i] = 255
                        desigArray[i + 1] = 255
                        desigArray[i + 2] = 255
                    }
                    else {
                        desigArray[i] = 0
                        desigArray[i + 1] = 0
                        desigArray[i + 2] = 0
                    }
                }
            }
            function NewText() {
                let divText = document.getElementById('text')
                if (divText.style.display === "none") {
                    divText.style.display = "block"
                }
                else {
                    divText.style.display = "none"
                }
            }
            function filltheCanvas(input) {
                let fonts = document.getElementsByClassName('font')
                for (let i = 0; i < fonts.length; i++) {
                    fonts[i].textContent = input.value
                }
                ctx.fillText(input.value, 10, 12, 30)
                finalDesign.newText = input.value
            }
            let secondDialog = document.getElementById('sizeANDprint')
            function takeFinal() {
                dialog.style.display = 'none'
                secondDialog.style.display = 'block'
                if (finalProduct["ColType"] === "round") {
                    if (finalProduct["sleeves"] === 'long') {
                        finalDraft.width = 560
                        finalItem.clearRect(0, 0, finalItem.width, finalItem.height)
                        finalItem.drawImage(long, -86, 44, simpleMock.width + 110, simpleMock.height)
                        finalItem.drawImage(theDesign, 155, 110, 240, 170)
                    }
                    else {
                        finalDraft.width = 425
                        finalItem.clearRect(0, 0, finalItem.width, finalItem.height)
                        finalItem.drawImage(simpleMock, -153, 44, simpleMock.width + 110, simpleMock.height)
                        finalItem.drawImage(theDesign, 87, 110, 240, 170)
                    }
                }
                else if (finalProduct["ColType"] === "V") {
                    finalDraft.width = 425
                    finalItem.clearRect(0, 0, finalItem.width, finalItem.height)
                    finalItem.drawImage(v, -153, 44, simpleMock.width + 110, simpleMock.height)
                    finalItem.drawImage(theDesign, 87, 125, 240, 170)
                }
            }
            function goBack() {
                dialog.style.display = 'block'
                secondDialog.style.display = 'none'
            }
            function position() {
                let posDiv = document.getElementById('positioning')
                if (posDiv.style.display === 'none') {
                    posDiv.style.display = 'block'
                }
                else {
                    posDiv.style.display = 'none'
                }
            }
            function sizeShirt() {
                let divSize = document.getElementById('sizeTshirt')
                if (divSize.style.display === 'none') {
                    divSize.style.display = 'block'
                }
                else {
                    divSize.style.display = 'none'
                }
            }
            function fabric() {
                let fabrics = document.getElementById('fabric')
                if (fabrics.style.display === 'none') {
                    fabrics.style.display = 'block'
                }
                else {
                    fabrics.style.display = 'none'
                }
            }
            function print() {
                let printing = document.getElementById('print')
                if (printing.style.display === 'none') {
                    printing.style.display = 'block'
                } else {
                    printing.style.display = 'none'
                }
            }
            function changeContent(buy) {
                buy.textContent = 'Ghir Clicki Mtkhafch'
            }
            function bringContent(buy) {
                buy.textContent = 'Buy'
            }
            let addBack = document.getElementById('addinBack')
            let imageBack = document.getElementById('backShirt')
            function turnIt(value) {
                if (backAllowed === false) {
                    imageBack.style.display = 'none'
                    addBack.style.display = 'none'
                    mock.clearRect(0, 0, mockup.width, mockup.height)
                    mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                    mock.drawImage(theDesign, 58, 88, 240, 170)
                    alert("click on Create Design")
                }
                else {
                    if (value.textContent === "Turn It") {
                        value.textContent = 'Bring Front'
                        imageBack.style.display = 'block'
                        addBack.style.display = 'inline-block'
                        mock.clearRect(0, 0, mockup.width, mockup.height)
                        mock.drawImage(imageBack, -5, 30, simpleMock.width - 250, simpleMock.height)
                        addBack.addEventListener('click', function () {
                            mock.drawImage(theDesign, 58, 88, 240, 170)
                        })
                    }
                    else {
                        value.textContent = 'Turn It'
                        imageBack.style.display = 'none'
                        addBack.style.display = 'none'
                        mock.clearRect(0, 0, mockup.width, mockup.height)
                        mock.drawImage(simpleMock, -125, 30, simpleMock.width, simpleMock.height)
                        mock.drawImage(theDesign, 58, 88, 240, 170)
                    }

                }
            }
            console.log(finalProduct)
            /*why members on the object do not change?*/
            /*can an image be created based on the information existed in the object?*/
            /*the problem i have in canvas is to keep the focus on a certain element on the canvas until the user goes to another one, meaning the color of certain element can change, font, size, until the usr click on other element*/
            /*tshirts should be deleted by its own, modified by its own, without other things on the canvas get affected, so each thing should be focused by its own during creation, during clearRect, tshirt should be cleared only*/
            /*to preserve memory, how to make the color of the item change without changing the actual image, is there a function that controls the color of the item on the canvas?*/