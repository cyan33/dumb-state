# dumb-state

> A simple state management tool that supports undo, redo, etc.

## Usage

```js
const createState = require('dumb-state');

const state = createState({ age: 23 });

state.set({ age: 24 });

state.set((prevState) => ({
  age: prevState.age + 1  // 25
}));

state.undo().get();  // 24
state.redo().get(); // 25
```

It's also chain-able:

```js
state.undo().undo().redo().get(); // which could be dumb though
```
