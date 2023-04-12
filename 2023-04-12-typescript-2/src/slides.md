---
theme: seriph
lineNumbers: true
css: unocss

layout: cover
---

# The _why_ and _how_ of TypeScript

Part 2

## Per Enström

---

# Recap

## Typing stuff

```ts{1|3-5|7-10|all}
const myVar: number = 6; // Note, no need to specify type here, will be inferred

const myObject: MyObjectType = {
  property1: 'hello'
}

const myFunction = (input: MyType): MyReturnType => {
  // do stuff
  // return something of type MyReturnType
}
```

You don't _need_ to type everything. Inferring types based on usage is really strong.

---

# Recap

## Discriminated unions

```ts{all|4,11|14|all}
interface User {
  id: string | number;
  name: string;
  memberType: "user";
}

interface Company {
  id: string;
  legalName: string;
  publicName: string;
  memberType: "company";
}

type Member = User | Company;
```
---

# Recap

## Discriminated unions

_"Can't you just switch on the Type without having a literal property?"_

<v-click>

```ts
const printName = (member: Member) => {
  if (typeof member === "User") {
    console.log(member.name);
    //           ^? member: User
  }

  else {
    console.log(member.publicName);
    //           ^? member: Company
  }
};
```

</v-click>

<v-click>

No. 

Typescript needs to be able to transpile down to plain Javascript, and there is no way of doing that in this case.

</v-click>

---
layout: two-cols
---

<div class="mr-4">

# Type predicates

How would you do in javascript?

<v-click>

```js
const myEvent = {
  eventType: 'payment',
  data: {
    payee: '07011111111'
  }
}

const myPayment = {
  amount: 123,
  message: 'Hello'
}
```

</v-click>

</div>

::right::

<v-click>

<div class="mt-88px">

```js
const isEvent = (eventOrPayment) => {
  // If key eventType exists in object eventOrPayment
  return "eventType" in eventOrPayment;
};

const doSomething = (eventOrPayment) => {
  if(isEvent(myEvent)){
    console.log(myEvent.data);
  }
}
```

</div>

</v-click>

---
layout: two-cols
---

<div class="mr-4">

# Type predicates

How do you do in Typescript?

```ts{0|1-4|1-9|1-14|all}
interface EventType {
  eventType: string;
  data: { payee: string; };
}

const myEvent: EventType = {
  eventType: "payment",
  data: { payee: "07011111111" }
};

interface PaymentType {
  amount: number;
  message: string;
}

const myPayment: PaymentType = {
  amount: 123,
  message: 'Hello'
}
```

</div>

::right::

<div class="mt-88px">

```ts{0|1-5|all|2}
const isEvent = 
  (e: EventType | PaymentType) => {
    // if key eventType exists in object e
    return "eventType" in e;
  };

const doStuff = (e: EventType | PaymentType) => {
  if(isEvent(e)){
    console.log(e.data); // ❗️Error
    //          ^? const e: EventType | PaymentType
  }
}
```

</div>

---
layout: two-cols
---

<div class="mr-4">

# Type predicates

How do you do in Typescript?

```ts
interface EventType {
  eventType: string;
  data: { payee: string; };
}

const myEvent: EventType = {
  eventType: "payment",
  data: { payee: "07011111111" }
};

interface PaymentType {
  amount: number;
  message: string;
}

const myPayment: PaymentType = {
  amount: 123,
  message: 'Hello'
}
```

</div>

::right::

<div class="mt-88px">

```ts{2|all}
const isEvent = 
  (e: EventType | PaymentType): e is MyEvent => {
    // if key eventType exists in object e
    return "eventType" in e;
  };

const doStuff = (e: EventType | PaymentType) => {
  if(isEvent(e)){
    console.log(e.data);
    //          ^? const e: EventType
  }
}
```

</div>

---

# Hard to read types, how to parse?

The following is what you get when hovering over an array map function:

```ts
(method) Array<number>.map<number>(callbackfn: (value: number, index: number, array: number[]) => number, thisArg?: any): number[]
```

<v-click>

Let's break it down


```ts{1-3|4-5|6-13}
// Remove category (only a visual representation)
Array<number>.map<number>(callbackfn: (value: number, index: number, array: number[]) => 
  number, thisArg?: any): number[]
// Remove generics for now (assume an array of numbers, and that map returns a number)
Array.map(callbackfn: (value: number, index: number, array: number[]) => number, thisArg?: any): number[]
// Move types to separate definitions
type CallBackFn = (
  value: number, 
  index: number, 
  array: number[]
) => number

Array.map(callbackfn: CallBackFn, thisArg?: any): number[]
```

</v-click>

---

# Generics

A way of _passing arguments_ to a type

<v-click>

Passing parameters to a function

```ts
const myFunction = (input: number) => {
  return input + 1;
}

const addedNumber = myFunction(5);

```

</v-click>

<v-click>

Passing arguments to a type

```ts{1-4|1-7|all}
const myFunction = <T>(input: T) => {
  if (typeof input === "number") return input + 1;
  else return "Not a number";
};

myFunction<number>(1); // returns 2
myFunction<string>("1"); // returns "Not a number"

myFunction(true); // returns "Not a number"
// ^? const myFunction: <boolean>(input: boolean) => number | "Not a number" 

```

</v-click>

---

# Generics

```ts{1-4|1-9|1-14|all}
interface ErrorMessage {
  code: string;
  message: string;
}

type SuccessResult<T> = {
  success: true;
  data: T;
};

type ErrorResult = {
  success: false;
  error: ErrorMessage;
};

type Maybe<T> = SuccessResult<T> | ErrorResult;

```

---

# Back to the complicated map type

This is the actual definition

```ts
interface Array<T> {
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}
```

<v-click>

Let's break it down

```ts{1-3|5-7|9-12}
interface Array {
  map(arguments): any[];
}

interface Array {
  map<U>(arguments): U[];
}

interface Array {
  map<U>(callbackfn: CallbackFn): U[];
}
```

</v-click>

---

# Back to the complicated map type

This is the actual definition

```ts
interface Array<T> {
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}
```

Let's break it down

```ts{1-5|3|9|7|7-11}
interface Array {
  map<U>(
    callbackfn: CallbackFn
  ): U[];
}

interface Array<T> {
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U
  ): U[];
}
```

---

# Error messages

We had this example before:

```ts
type MyMixedArrayType1 = number[] | string[];

const myArray3: MyMixedArrayType1 = [1, "b", 3, "d"]; // ❗️Error
```

What the hell does this mean?

```ts{all|1|2|3|4}
Type '(string | number)[]' is not assignable to type 'MyMixedArrayType1'.
  Type '(string | number)[]' is not assignable to type 'number[]'.
    Type 'string | number' is not assignable to type 'number'.
      Type 'string' is not assignable to type 'number'.
```

---

# Utility functions

Create types from other types

```ts{1|1,3|1,4|6-10|6-10,12|6-10,13}
type Fruits = "apple" | "banana" | "mango";

type TastyFruits = Exclude<Fruits, "mango">;        // "apple" | "banana"
type ActuallyNotAFruit = Extract<Fruits, "banana">; // "mango"

interface Fruit {
  name: string;
  color: string;
  tasty: boolean;
}

type BasicFruit = Omit<Fruit, 'tasty'>; // { name: string; color: string; }
type FruitName = Pick<Fruit, 'name'>;   // { name: string; }
```

---

# Working with APIs

```ts
const getData = async () => {
  const result = await fetch('https://my.external.api');
  const data = await result.json();
  //     ^? const data: any

  return data as UserDetails
}
```

---

# Working with APIs

Enter Zod

```ts{1|1-5|1-7,21|1-10,21|1-12,21|12}
import { z } from "zod";

const UserSchema = z.object({
  username: z.string()
});

const getData = async (userId: string) => {
  const result = await fetch(`https://my.external.api/user/${userId}`);
  const data = await result.json();
  //     ^? const data: any

  const parsedUser = UserSchema.safeParse(data);

  if (parsedUser.success === false) {
    console.log(parsedUser.error);
    throw new Error(parsedUser.error.message)
  } else {
    return parsedUser.data;
    //                ^? data: { username: string; } 
  }
}
```

---

# Working with APIs

Enter Zod

```ts{7|1-9|1-17|all}
import { z } from "zod";

const UserSchema = z.object({
  username: z.string()
});

const parsedUser = UserSchema.safeParse(data);

type ParseResult = SuccessUser | ErrorUser;

type SuccessUser = {
  success: true;
  data: {
    username: string;
  }
}

type ErrorUser = {
  success: false;
  error: ZodError;
}
```

---

# Working with APIs

Enter Zod

```ts{1-12,21|all}
import { z } from "zod";

const UserSchema = z.object({
  username: z.string()
});

const getData = async (userId: string) => {
  const result = await fetch(`https://my.external.api/user/${userId}`);
  const data = await result.json();
  //     ^? const data: any

  const parsedUser = UserSchema.safeParse(data);

  if (parsedUser.success === false) {
    console.log(parsedUser.error);
    throw new Error(parsedUser.error.message)
  } else {
    return parsedUser.data;
    //                ^? data: { username: string; } 
  }
}
```

---

# Libraries and their types

Most libraries have specified types. Either built in or as a separate package.

<v-click>

![Styled components documentation](/styled-components.png)

Don't be afraid to cmd-click into the definitions!

</v-click>

---

# Libraries and their types

If we cmd-click into `safeParse` in the example from before

```ts{1-2|1-4|1-9|1-14|all}
// src/node_modules/zod/lib/types.d.ts
safeParse(data: unknown, params?: Partial<ParseParams>): SafeParseReturnType<Input, Output>;

type SafeParseReturnType<Input, Output> = SafeParseSuccess<Output> | SafeParseError<Input>;

type SafeParseSuccess<Output> = {
    success: true;
    data: Output;
};

type SafeParseError<Input> = {
    success: false;
    error: ZodError<Input>;
};

class ZodError<T = any> extends Error {
    issues: ZodIssue[];
    // ...
}
```

---

# Integrating with frameworks, vue, react

## React

```tsx{all|1-6|8|all}
interface Props {
  nomination: Nomination;
  film: Film;
  bets: Bet[];
  players: Nullable<NormalizedPlayers>;
}

const NominatedFilmComponent: React.FC<Props> = ({
  nomination,
  film,
  bets,
  players
}) => {
  return (
    <Wrapper winner={nomination.won}>
      <Poster alt={film.name} src={poster} />
      {nomination.nominee && <p>{nomination.nominee}</p>}
      {bettingPlayers}
    </Wrapper>
  );
};
```

---

# Integrating with frameworks, vue, react

## Vue

```tsx{all|1|2-9|all}
<script setup lang="ts">
export interface Props {
  title?: string;
  text?: string;
  linkText?: string;
  linkUrl?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="box">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <p v-if="text" class="text">{{ text }}</p>
    <a v-if="linkText && linkUrl" class="link" :href="linkUrl">
      <SwLinkButton :label="linkText" />
    </a>
  </div>
</template>
```

---

# Resources

* [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) – typescriptlang.org/docs/handbook/intro.html
* [Zod](https://zod.dev/) – zod.dev
* [These slides](https://per.fyi/talks) (made with [slidev](https://sli.dev/)) – per.fyi/talks
