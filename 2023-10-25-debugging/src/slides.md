---
theme: seriph
lineNumbers: true
css: unocss

layout: cover
---

# Debugging made easier

## Per Enström

---

# Do you recognize this way of debugging?

```js
console.log("BEFORE");
const array = [1,2,3,4,5];

for (let index = 0; index < array.length; index++) {
  console.log("ARE WE HERE?");
  console.log(index);
  const element = array[index];
  console.log(element);
}

console.log("ASDFASDF");
```
---

# Use the browser or IDE debugger instead!

## Trigger the debug

```js{all|4|all}
const array = [1,2,3,4,5];

for (let index = 0; index < array.length; index++) {
  debugger;
  const element = array[index];
}
```

This will open the debugger in your browser if the code is running in a browser, or in your IDE if you've started the code from there.

---

# The debugging interface

Live demo time!

_demo-1.js_

<!-- Show controls, variables, console, etc. -->

---

# Debugging controls

![Debugging menu 1](/debugger-chrome.png)

![Debugging menu 2](/debugger-firefox2.png)

![Debugging menu 3](/debugger-vscode.png)

---

# Debugging controls

## Play

![Play](/play.png)

* Continues the normal running of the code, until the next breakpoint, where it will stop again.

* Demo!

_demo-1.js_

---

# Debugging controls

## Step over

![Step over](/step-over.png)

* Executes and steps to the next expression in the current scope (i.e. same function)

* This is the most common way to step through your code

* Demo!

_demo-2.js_

---

# Debugging controls

## Step into

![Step into](/step-into.png)

* Steps one level deeper into the code, i.e. into functions being called

* Demo!

_demo-2.js_

---

# Debugging controls

## Step out of

![Step out](/step-out.png)

* Executes the full current scopes and pauses when it's returned to the calling scope.

* A way to get out of functions you're not interested in looking at

* Demo!

_demo-3.js_

---

# Breakpoints

* We've already seen the use of `debugger`
* Breakpoints can be set directly in the debugger as well

* Demo!

_demo-4.js_

---

# Conditional breakpoints

* Some cases you don't want your code to stop every time a certain line is evaluated
* You can set conditions on the breakpoints to tell the debugger when to stop

* Demo!

_demo-4.js_

---

# Watchers

* Instead of inspecting variables
* Evaluates continuously
* Good for checking calculated properties

* Demo!

_demo-4.js_

---

# Log points

* Instead of writing `console.log` to print stuff to the console, or checking the variables in scope in the debugger
* Lets you log whatever you please, without changing your source code

* Demo!

_demo-5.js_

---

# Debugging client side code

* Starting single js scripts from VS Code is rarely what we do
* Either in the browser or in IDE
* A `launch.json` is needed for VS Code to know what to do
* Most frameworks have documentation on how these should look
* Demo!

_App.vue_

---

# Adding breakpoints in the browser

* Instead of adding a `debugger` statement
* Code can be found in the "Sources" tab of the dev tools (or under the "Debugging" tab in Firefox)
* A bit of a mess to navigate, if everything is set up correctly it should map to your actual source files
* Demo!

---

# Thank you for listening

<hr /> 

### Resources

* [VS Code Debugging Docs](https://code.visualstudio.com/docs/editor/debugging) – code.visualstudio.com/docs/editor/debugging
* [These slides](https://per.fyi/talks) (made with [slidev](https://sli.dev/)) – per.fyi/talks