
# Tabs! 

how to make tabs work using vanilla Javascript and CSS!\
`aria-selected` and `aria-label`
Some HTML to reference at while reading this section:

```html
<div role="tablist" aria-label="Programming Languages">
        <button role="tab" aria-selected="true" id="js">
          JavaScript
        </button>
        <button role="tab" aria-selected="false" id="ruby">Ruby
        </button>
        <button role="tab" aria-selected="false" id="php">
          PHP
        </button>
      </div>
      </div>
      <div role="tabpanel" aria-labelledby="js">
        <p>JavaScript is great!</p>
      </div>
      <div role="tabpanel" aria-labelledby="ruby" hidden>
        <p>Ruby is great</p>
      </div>
      <div role="tabpanel" aria-labelledby="php" hidden>
        <p>PHP is great!</p>
      </div>
```
In the HTML in this project you will see that there are attributes for “buttons” called `aria-selected` & `aria-label`, these are for semantics and improve readability for search engines so they understand there is content behind the tabs. You establish the tabs inside of a `div` with an attribute called `role` which should be set to `tablist`. Every tab contained within should have a `role` of `tab`.

`aria-selected` can be set to `true` or `false`, this is the equivalent of form attributes being set to `active` and makes one of the tabs open (you should have 1 set to true and the rest false.

`aria-label` is just semantical, it doesn’t do anything specifically beyond SEO

Totally separate by that, these are connecting the `tabpanel` with a `tab` from the `tablist` by the `aria-labelledby` which is set to equal the `id` of the individual tabs.

One last thing you will notice is `hidden`, this is great because you do not have to use CSS to hide it, it’s a built in feature to this HTML element.

## Selecting
Let’s select our main components and establish our variables:

```js
const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');
```
> Bear in mind [role="tab"] format allows us to search for attributes within an element which is why the tab button is called from tabs

## Event Listener
Now we need to listen for each tab button:
```js
tabButtons.forEach(button => button.addEventListener ('click', handleTabClick));
```
> Remember because they are buttons, they will work with the keyboard or with a click by default using the above event listener. Also note we haven’t created the handleTabClick() function yet so right now this would error. Event listeners need 2 arguments and typically the second handler

## Handler

Let’s create a function that will be called `handleTabClick` so our Javascript console stops yelling at us.\
This will be a pretty basic function to start so we can that it is working.

```js
function handleTabClick(event){
        console.log(event);
}
```

## Structure With “Sudo Code”
Now we will need to create a loop which we haven’t gotten into much detail yet on but we will. If you struggle in this section, it’s ok – just press the “I believe button” and keep on rolling through this. We are going to start with some sudo code:

```js
function handleTabClick(event){
        // HIDE OTHER TAB PANELS
        // MARK ALL TABS AS UNSELECTED
        // MARK THE CLICKED TAB AS SELECTED
        // FIND THE ASSOCIATED TABPANEL AND SHOW IT
}
```
Start by looping through all the `tabPanels` we previously selected and console.log them like so:

```js
function handleTabClick(event){
        // HIDE OTHER TAB PANELS
        tabPanels.forEach(function(panel){
                console.log(panel);

        })
        // MARK ALL TABS AS UNSELECTED
        // MARK THE CLICKED TAB AS SELECTED
        // FIND THE ASSOCIATED TABPANEL AND SHOW IT
}
```

## Hiding All The Tabs
What we need to do next is take the `panel` and use it’s property `hidden` and set it to true.

```js
const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(event){
        // HIDE OTHER TAB PANELS
        // console.log(tabPanels);
        tabPanels.forEach(function(panel){
        //      console.log(panel);
                panel.hidden = true;
        })
        // MARK ALL TABS AS UNSELECTED
        // MARK THE CLICKED TAB AS SELECTED
        // FIND THE ASSOCIATED TABPANEL AND SHOW IT
}

tabButtons.forEach(button => button.addEventListener ('click', handleTabClick));
```

## Unhide The Selected Tab
We are going to loop through again on the `tab` and set the `aria-selected` property to `false`;

It should look something like this:

```js
const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

function handleTabClick(event){
        // HIDE OTHER TAB PANELS
        tabPanels.forEach(panel=>{
                panel.hidden = true;
        })
        // MARK ALL TABS AS UNSELECTED
        tabButtons.forEach(tab=>{
                // tab.ariaSelected = false; // DOES NOT WORK
                tab.setAttribute('aria-selected', false);
        });
        // MARK THE CLICKED TAB AS SELECTED
        // FIND THE ASSOCIATED TABPANEL AND SHOW IT
}

tabButtons.forEach(button => button.addEventListener ('click', handleTabClick));
```

## Mark The Clicked Tab As Selected

Notice we aren’t using any classes here because we are using an accessibility attribute instead! Let’s set that click event to turn `aria-selected` to true.

```js
event.currentTarget.setAttribute('aria-selected', true);
```
Now we have an active tab but we don’t have the matching tabpanel associated with it. Let’s fix that!

## Find the Associated tabPanel And Show It
Let’s create a deconstructed property variable of the `currentTarget` like this:

```js
// FIND THE ASSOCIATED TABPANEL AND SHOW IT
        const {id} = event.currentTarget;
        console.log(id);
```
We need to find the associated `id` for the tab panel. There are a couple of ways we can go about this:

### Method 1: Use The id In A Query Selector
```js
const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
tabPanel.hidden = false;
```
Since the `aria-labelledby` is similar to form `name`, you can attach that `tabPanel` with it’s associated `tab`.

What you see above is we select the `aria-labelledby` attribute (this is done inside of the `[here]` brackets).

We are calling a variable inside of the variable using `${id}`.

### Method 2: Use A Find In The Array Of tabPanels

We could try to use: `tabPanels.find();` but the problem is that `find()` can only be used on an `array`. The `tabPanels` is really just a node list. There is a way we can change the variable `tabPanels` to an array like this:
```js
// const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');

const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
```
What we can do with `find()` is pass in a function:

```js
const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
// const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event){
        // HIDE OTHER TAB PANELS
        tabPanels.forEach(panel=>{
                panel.hidden = true;
        })
        // MARK ALL TABS AS UNSELECTED
        tabButtons.forEach(tab=>{
                tab.setAttribute('aria-selected', false);
        });
        // MARK THE CLICKED TAB AS SELECTED
        event.currentTarget.setAttribute('aria-selected', true);
        // FIND THE ASSOCIATED TABPANEL AND SHOW IT
        const {id} = event.currentTarget;
        console.log(id);
        // Method 1: Use The id In A Query Selector
                // const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
                // tabPanel.hidden = false;
        // Method 2: Use A Find In The Array Of tabPanels
        const tabPanel = tabPanels.find(
                panel => panel.getAttribute('aria-labelledby') === id);
        tabPanel.hidden = false;
}
tabButtons.forEach(button => button.addEventListener ('click', handleTabClick));
```
