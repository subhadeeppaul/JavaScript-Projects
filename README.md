
# Etch-a-Sketch- JS mini project with the <canvas> Element

The `<canvas>` is an HTML element that is used to draw 2D or 3D graphics on a webpage. The canvas is just the element, where the actual drawing takes place is called the context. This documentation will be focused on modeling the Etch-a-Sketch drawing toy to draw paths (with the arrow keys only) on the canvas, using JavaScript(JS).

**Lay the Foundation** \
First, you write out your html code for the <canvas> element as shown below: \
`<canvas width="1600" height="1000" id="etch-a-sketch"></canvas>`

The width and height attributes are used to specify the desired width and height of the canvas. If not specified, the canvas will have default width and height values of 300px and 150px respectively. The canvas has the x-axis (horizontal) and y-axis (vertical) coordinates. These coordinates begin at 0, 0 on the top left corner of the canvas.\
Here is my HTML code [link](https://github.com/subhadeeppaul/JavaScript-Projects/blob/main/Etch-a-Sketch/index.html)

### Select the HTML Elements in a JS file.
Select the <canvas> and <button> elements in your JS file as shown below:
```js
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
```
The `getContext()` method is used to obtain the particular rendering context you'd want to work with. For my project, I worked with the 2D context.

### Set Up Some Drawing Defaults
You do this with the properties and methods below:
```js
ctx.lineCap = 'round';
ctx.lineJoin = 'round'; //bydefault these are squared meaning it could make it look pixelated and not a very polished final product
ctx.lineWidth = 20;
ctx.beginPath(); //STARTS THE DRAWING (PUTS PEN ON PAPER)
ctx.moveTo(200, 200);
ctx.lineTo(200, 200);
ctx.stroke();
```
Setting the lineCap property to round would create a round edged line. And setting the lineJoin property to round would create a round corner at the point where lines meet. The values you set these properties to depend on your personal preference. You can set the lineWidth property to be as wide as you want. The value is, by default, in pixels, so you wouldn't need to write "px" behind your width value.

The `beginPath()` method, as the name implies, begins the path for drawing. It doesn't draw anything, it just "prepare the way" by telling the browser "hey, we're about the draw".

The `moveTo()` method creates the starting point for drawing, i.e, the actual point where you'll begin to draw. It also doesn't draw anything. Depending on the coordinates you specify, it tells the browser "move to this point on the canvas because that's where I'm gonna start drawing from".

The `lineTo()` method creates an invisible line from the previous point to the newly specified coordinates. This method still doesn't draw the line.\
So what actually draws the line? You guessed it, The `stroke()` method! It allows us to connect the dots.

What the last four lines of code basically does is to begin a path, move to position 200(on the x-axis) and 200(on the y-axis). Create a straight invisible line from positions 200, 200 to positions 200, 200. And then stroke that path to make the line visible.

### Randomize the Starting Point
To randomize the starting point like I have done in my project, select the width and height of the canvas and generate a random number from their values using the Math.random() method. Then round it down to a whole number using the Math.floor() method. And then, replace the moveTo and lineTo arguments with the random values. See code below:

```js
const width = canvas.width;
const height = canvas.height;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
ctx.moveTo(x, y);
ctx.lineTo(x, y);
```
### A Little Restructuring Using Destructuring
We can shorten this using destructuring. Let’s look at it and then break that down:
```js
// -- MAKE A VARIABLE CALLED HEIGHT AND WIDTH FROM THE SAME PROPERTIES ON OUR CANVAS
const { width, height} = canvas;
console.log(width, height);
```
Destructuring means that we are going to pull the property out of a variable. It prevents us from having to rewrite the same variable we are trying to pull a property out of. The context is like this:
`var {property1, property2, etc..} = varName`

### Creating Random Numbers

Javascript comes with some built in randomizing tools. Let’s take a look at `Math.random()`
The `Math.random()` function returns a floating-point (meaning it includes decimals), pseudo-random number in the range 0–1 (inclusive of 0, but not 1) with approximately uniform distribution over that range — which you can then scale to your desired range. The implementation selects the initial seed to the random number generation algorithm; it cannot be chosen or reset by the user. Note this is not a cryptographically secure method of randomizing numbers.

What this means is if we run `const randoNum = Math.random()*100;` we will get a number between 0 (including 0) and 100 (but not including 100). So we could potentially have a number of 99.999999999~ but never actually have 100 as a result.

`Math.floor();` allows us to round down to the closest whole number (like the floor) and `Math.ceiling();` allows us to round up to the closest whole number. So we could use something like:
`const randoNum = Math.floor(Math.random()*100);` which would round the random number down to the closest whole number.

### Create An Event Handler and Listener
If we want to listen for a keypress while the screen is loaded but without any other interactions, we can set the `eventListener` to listen on the `window`.

We will add an `eventListener` for a `keydown` event. Add the following line of code to your javascript:

`window.addEventListener('keydown', handlekey);`

Currently when you press an up or down key, we aren’t doing anything with it. Let’s fix that:

```js
function handlekey () {
        console.log('HANDLING KEY`);
}
```
Now if we run that and press the ? or ?keys we will see the whole window moves. Why do you think that is?

### Prevent The Default Key Responses
To prevent that default we will have to pass an event and use the `preventDefault`, it should look something like this. 

```js
function handlekey (event) {
        event.preventDefault(); // note you will disable refresh shortcuts 
        console.log('HANDLING KEY`),
}
```
### Handling Only The Arrow Key
Currently, we are listening for any key press on the whole keyboard. This renders shortcuts like page refreshes Here is where `if` statements will come in handy and since we know from typing keys in the window from the above code, the arrow keys all include the word `Arrow` in them. Let’s look at how this will work.
```js
function handlekey (event) {
        if(event.key.includes('Arrow'){
                event.preventDefault();
                console.log('HANDLING KEY`),
        });
}
```

### Write the Draw Function.
We can create a `function draw(key){console.log(console.log(key)` but this isn’t very good if you had to pass in multiple options. So the best way to do this is to pass in an options object like this:


```js
// WRITE  DRAW Function
function draw(option) {
        console.log(options);
}
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')){
                event.preventDefault();
                draw({key: event.key});
        };
}
window.addEventListener('keydown', handlekey);
```
We can also destructure function declarations! Let’s take a look at that above but instead of passing `option` we will pass `{key}` and match that in the arguments of the console.log like this:

```js
// WRITE  DRAW Function
function draw({key}) {
        console.log(key);
}
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')) {
                event.preventDefault();
                draw({key: event.key});
        };
}
window.addEventListener('keydown', handlekey);
```
We can take properties and rename them to object variables, this also allows us to create shorter variable names. Now when someone uses their keys we can go ahead and start to draw directly on the canvas.

## Draw!
### Create Some Movement
We will need to add a new `.moveTo()` function and change the x & y values based on what key the user presses. Let’s take a look at how this would work:

```js
// WRITE  DRAW Function
function draw({key}) {
        console.log(key);
        //START THE PATH
        ctx.beginPath(); //FROM THE RANDOM STARTING POINT
        ctx.moveTo(x, y); // MOVE TO NEW COORDINATES
        //MOVE OUR X & Y VALUES DEPENDING ON WHAT THE USER PRESSED
        x -= 10; // DECREASE X VALUE BY 10PX
        y -= 10; // DECREASE Y VALUE BY 10PX
        ctx.lineTo(x,y); // CONNECTS THE 2 POINTS
        ctx.stroke(); // DRAWS THE LINE ALONG THE CONNECTION BETWEEN 2 POINTS ABOVE
};
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')) {
                event.preventDefault();
                draw({key: event.key});
        };
}
window.addEventListener('keydown', handlekey);
```
Regardless of the key pressed the dot moves left 10px and up 10 px. Let’s address that!

### Change The Direction Based On Key Stroke (Flow Control)
Obviously the above isn’t what we are looking for because we hardcoded values in the draw function. Let’s address that first. At the top of the file let’s create a const for the amount each keypress moves by.

### Switch Statements

A user may go `up` `down` `right` or `left`.
Switch Statements are a perfect use case, which are basically saying “We have four possible cases, based on these do the following”. You need to add a break at the end of each case and provide a default which says basically if none of these cases happen, what do you do. In this case, we don’t want it to do anything so we just break; on it.

```js
// WRITE  DRAW Function
function draw({key}) {
        console.log(key);
        //START THE PATH
        ctx.beginPath();
        ctx.moveTo(x, y);
        //MOVE OUR X & Y VALUES DEPENDING ON WHAT THE USER PRESSED
        switch(key){
                default: 
                        break;
                case 'ArrowUp':
                        y -= moveAmmount;
                        break;
                case 'ArrowRight':
                        x += moveAmmount;
                        break;
                case 'ArrowDown':
                        y += moveAmmount;
                        break;
                case 'ArrowLeft':
                        x -= moveAmmount;
                        break;
        }
        ctx.lineTo(x,y);
        ctx.stroke();
};
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')) {
                event.preventDefault();
                draw({key: event.key});
        };
}
window.addEventListener('keydown', handlekey);
```
### Change the Colors😉
To make your lines as colorful, use the [hsl colour](https://www.w3schools.com/colors/colors_hsl.asp) values. First, create a variable and set it to 0. Then set the stroke style to the hsl values shown below. Then, in the draw function, increment the hue by any value of your choice (I incremented mine by 10), and also set the stroke style in the draw function to the same hsl values. This will ensure that the colour of the stroke changes as we draw.
```js
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; //GET THIS FROM MOTHER-EFFINGHSL.COM
// WRITE  DRAW Function
function draw({key}) {
        //INCREMENT THE HUE
        hue += 10
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` //GET THIS FROM MOTHER-EFFINGHSL.COM
        //START THE PATH
        ctx.beginPath();
        ctx.moveTo(x, y);
        //MOVE OUR X & Y VALUES DEPENDING ON WHAT THE USER PRESSED
        switch(key){
                default: 
                        break;
                case 'ArrowUp':
                        y -= moveAmmount;
                        break;
                case 'ArrowRight':
                        x += moveAmmount;
                        break;
                case 'ArrowDown':
                        y += moveAmmount;
                        break;
                case 'ArrowLeft':
                        x -= moveAmmount;
                        break;
        }
        ctx.lineTo(x,y);
        ctx.stroke();
};
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')) {
                event.preventDefault();
                draw({key: event.key});
        };
}
window.addEventListener('keydown', handlekey);
```
For more understanding of the <canvas> element, check out these free tutorials on [mdn](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) and [w3schools](https://www.w3schools.com/html/html5_canvas.asp).




### The Shake
CSS class of `.shake` has an animation of shake for half a second that will run one time. There are some animation translations in the CSS as well. If you click the shake button – it’ll run and attach that class. If you tried to run it again, the class will fail because the class is already applied.

```js
// CLEAR "SHAKE" Function
function clearCanvas () {
        canvas.classList.add('shake');
}
```
So to fix that, we need to create an event listener that listens to when the animation ends in CSS.

```js
shakeButton.addEventListener('click', clearCanvas);
```

Now Let's put it all together:

```js
// SELECT THE ELEMENTS ON THE PAGE -Canvas, SHAKE
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeButton = document.querySelector(`.shake`);
const moveAmmount = 10;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` //GET THIS FROM MOTHER-EFFINGHSL.COM
// SETUP OUR CANVAS FOR DRAWING
// -- MAKE A VARIABLE CALLED HEIGHT AND WIDTH FROM THE SAME PROPERTIES ON OUR CANVAS
const { width, height} = canvas;
// -- CREATE RANDOM X AND Y COORDINATES
let x = Math.floor(Math.random()* width);
let y = Math.floor(Math.random()* width);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.beginPath(); //STARTS THE DRAWING (PUTS PEN ON PAPER)
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke(); 

// WRITE  DRAW Function
function draw({key}) {
        //INCREMENT THE HUE
        hue += 10
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)` //GET THIS FROM MOTHER-EFFINGHSL.COM
        //START THE PATH
        ctx.beginPath();
        ctx.moveTo(x, y);
        //MOVE OUR X & Y VALUES DEPENDING ON WHAT THE USER PRESSED
        switch(key){
                default: 
                        break;
                case 'ArrowUp':
                        y -= moveAmmount;
                        break;
                case 'ArrowRight':
                        x += moveAmmount;
                        break;
                case 'ArrowDown':
                        y += moveAmmount;
                        break;
                case 'ArrowLeft':
                        x -= moveAmmount;
                        break;
        }
        ctx.lineTo(x,y);
        ctx.stroke();
};
// WRITE A HANDLER FOR THE ARROW KEYS
function handlekey (event) {
        if(event.key.includes('Arrow')) {
                event.preventDefault();
                draw({key: event.key});
        };
}
// CLEAR "SHAKE" Function
function clearCanvas () {
        canvas.classList.add('shake');
        ctx.clearRect(0, 0, width, height);
        console.log(`done the shake`);
        canvas.addEventListener('animationend',
                 ()=> {
                canvas.classList.remove('shake');
                },
                {once: true} // auto removes the listener when it's done
        );
}
// LISTEN FOR ARROW KEYS
window.addEventListener('keydown', handlekey);
shakeButton.addEventListener('click', clearCanvas);
```
The clearRect() method clears out the whole or part of the canvas, and it takes in four arguments to do so. The 0, 0, width, height means start clearing the canvas from the x and y coordinates of 0 each, to the entire width and height of the canvas (remember width and height are variables we created in our code). You could as well specify any width and height value you would want the canvas to be cleared to.
Then, add a click event to the button that would listen for a click on the button and carry out the refreshCanvas function.


Voila! You just made an etch-a-sketch you can show off and brag to your friends about!



