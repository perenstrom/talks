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
  Map, see type of map and myNumber

  toExponent in callback

  myArr.stringify error

  myArr() error
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
* Reduces hopping between files to check what the function you just wrote returns

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

---
layout: image-right
image: /duck.jpg
---

# Duck typing

Also called _structural typing_

Means you sometimes have to rethink your code.

And this is a _good_ thing.

```ts
interface User {
  name: string;
}

const myFunction = (user: User) => {
  callExternalApi(user);
}

myFunction({
  name: 'Per',
  address: 'Home'
})
// Might lead to unknown
// errors in external API
```

---

# You don't need to – and shouldn't – type everything

## Inferring types

Typescript is great at figuring out what types are.

```ts
const myArr = [1, 2, 3, 4, 5];
//     ^? const myArr: number[]

const concatenate = (numbers: number[]) => (
  numbers.join('-')
);

const result = concatenate(myArr);
//     ^? const result: string
```

<v-click>

We do however need to type the input `numbers` to the function in this case

</v-click>

---

# Enough talk, let's get to some syntax

## Specifying types

```ts{1|3-5|7-10}
const myVar: number = 6; // Note, no need to specify type here, will be inferred

const myObject: MyObjectType = {
  property1: 'hello'
}

const myFunction = (input: MyType): MyReturnType => {
  // do stuff
  // return something of type MyReturnType
}
```

---

# Typing functions

```ts{1-4|1-6|all}
const myFunction = (input: MyType): MyReturnType => {
  // do stuff
  // return something of type MyReturnType
}

type MyFunctionType = (input: MyType) => MyReturnType;
const myFunction2: MyFunctionType = (input) => {
  // do stuff
  // return something of type MyReturnType
}
```

---

# Basic types

## Primitives

```ts
number
string
boolean
```
 

## Arrays and tuples

```ts
const myArray: number[] = [ 1, 2, 3 ];
const myTuple: [number, number, number] = [ 1, 2, 3 ];
```

<v-click>

```ts{1|all}
const myTuple = [ 1, 2, 3 ] as const;
//     ^? const myTuple: readonly [1, 2, 3]
```

</v-click>

---

# Objects

```ts{all|1-4|6-9|11-13|all}
interface MyObjectType {
  property1: string;
  optionalProperty?: number;
}

type MyObjectType2 = {
  property1: string;
  optionalProperty?: number;
}

const myObject: MyObjectType = {
  // ...
}
```

<v-click>

What's the difference you might ask?

Basically nothing, I tend to use `interface`;

</v-click>

---

# Union types

## Specify multiple types

```ts
interface User {
  id: string | number;
  name: string;
}

const myArray = [4, "hello"];
//     ^? const myArray: (string | number)[]
```

<v-click>

Subtle but different:

```ts{1-2|1,4-6|2,8-10|all}
type MyMixedArrayType1 = number[] | string[];
type MyMixedArrayType2 = (number | string)[];

const myArray1: MyMixedArrayType1 = [1, 2, 3, 4];
const myArray2: MyMixedArrayType1 = ["a", "b", "c", "d"];
const myArray3: MyMixedArrayType1 = [1, "b", 3, "d"]; // ❗️Error

const myArray4: MyMixedArrayType2 = [1, 2, 3, 4];
const myArray5: MyMixedArrayType2 = ["a", "b", "c", "d"];
const myArray6: MyMixedArrayType2 = [1, "b", 3, "d"]; // ✅

```

</v-click>

---
layout: iframe-right

# the web page source
url: https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgKoGdrIN4ChnLAAmAXMumFKAObIA+yIArgLYBG0A3Po3CxGQpUQ1bgQpxIZAETombdAioci0+smmhEYYADcI07gF9cuBAHsQFZE0xQACtDIYsAXhw9iZAIwAaHiB8AhqOUNL+4mCSwZqBCDr64bhGnEA
---

# Literal types

## Constrain stuff!

When only certain values are valid.

<v-click>

## What about enums?

Short answer, they don't behave as you might expect. My recommendation is to stay away from them.

For a more in depth explanation, look at the video [_Enums considered harmful_ by _Matt Pocock_](https://www.youtube.com/watch?v=jjMbPt_H3RQ) on Youtube.

</v-click>

---

# Type Narrowing

---

# Escape hatches

## If your ship is sinking, use these as a last resort

* Any
* as Type
  * useful in certain foreach functions over keys
  * Map

---

# Hard to read types, how to parse?

```ts
(method) Array<number>.map<void>(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void[]
```

---

# Generics

---

# Error messages

Type '(string | number)[]' is not assignable to type 'MyMixedArrayType1'.
  Type '(string | number)[]' is not assignable to type 'number[]'.
    Type 'string | number' is not assignable to type 'number'.
      Type 'string' is not assignable to type 'number'.ts(2322)

---

# Integrating with frameworks, vue, react

---

# Utility functions

---

# Working with APIs

---

# Libraries and their types

// Screenshot of docs telling user to install types from definitely typed

---

# Resources

* Typescript Handbook
* Matt Pocock
* These slides (made with slidev)