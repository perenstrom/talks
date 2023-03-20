---
theme: seriph
lineNumbers: true

layout: cover
---

# The _why_ and _how_ of TypeScript

## Per Enström

---
layout: quote
---

# First, a short description on _what_

_TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale._

typescriptlang.org

---

# But what does that mean?

- It's a separate language
- It gets compiled to plain old JavaScript
- "Strongly typed" means that you specify what type everything is
  - String
  - Numbers
  - Booleans
  - Custom types

---
layout: center
---

# Why should I use it?

---
layout: center
---

# What if I told you...

---
layout: center
---

# ...that you already are

_probably_

---

# VS Code

VS Code is built on TypeScript, and that is what is powering the intellisense functionality.

```ts
const myArr = [1, 2, 3, 4, 5];

myArr.map((item) => null);
// ^? const myArr: number[]
```

---

# Aside: TwoSlash queries

```ts{all|4}
const myArr = [1, 2, 3, 4, 5];

myArr.map((item) => null);
// ^?
```

---

# Aside: TwoSlash queries

```ts
const myArr = [1, 2, 3, 4, 5];

myArr.map((item) => null);
// ^? const myArr: number[]
```

<v-click>

Works in the playground at typescriptlang.org as well as in VS Code with the plugin `vscode-twoslash-queries`.

</v-click>

---
layout: center
---

# Back to the array example

---
layout: iframe-right

# the web page source
url: https://www.typescriptlang.org/play?#code/MYewdgzgLgBAtgTwIICcUwLwwNoEYA0MATIQMyEAshArALoDcQA
---

# Built in functions

* Autocomplete
* Documentation
* Prevent accidents

<!--
  Map

  toExponent

  stringify
-->

---

# Adding your own types

Let's extend the built-in functionality

```ts{1-5|7-9|11-13|all}
interface User {
  id: string;
  name: string;
  numberOfPosts: number;
}

const myFunction = (input: User) => {
  console.log(input.numberOfPosts)
}

myFunction({ id: '1', name: 'Per' }) 
// ^^^ THIS WILL ERROR
// Property 'numberOfPosts' is missing in type
```

---

# Recap on _why_
<v-clicks>

* Autocomplete in your editor
* Documentation for standard methods
* Catch errors when developing instead of shipping to users
* Covers edge-cases automatically

</v-clicks>

---
layout: center
---

# Time to dive into _how_

---
layout: image-right
image: /duck.jpg
---

# Duck typing

Also called _structural typing_

Typescript is meant to prevent runtime errors, if you pass in extra properties in an object to a function, Javascript will not care. And neither does Typescript.

<v-click>

```ts{all|1-3|1-7|all}
interface User {
  name: string;
}

const myFunction = (user: User) => {
  doSomething(user.name);
}

myFunction({
  name: 'Per',
  address: 'Home'
})
```

</v-click>