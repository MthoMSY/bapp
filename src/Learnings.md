# Redux
Redux is state container for javascript applications.
    - helps manage global app state and share state amongst components
    - easier to see when, how, why state has changed in your application with the tools that it comes with
    - aids in writing predictable code 

# Redux toolkit
Tool for more efficient redux usage
    - helps configuring redux easier, less boilerplate and packages to install
    - an abstraction of redux

# React-Redux
The official Redux UI binding library for React
    - offers function to connect the two libraries to manage state

# When to use redux
- When you have large amounts of application state that are needed in many places in the app
- The app state is updated frequently over time
- Logic to update state is complicated
- Codebase is worked on by many developers

## Store
Entity which holds the global state

## Action
Describes what happened to the application

## Reducer
Describes how the store should be updated and updates it

# React hooks
React hooks are components that let you use state and other react features without writing classes.  A more fluent way to provide a direct API to the concepts such as component lifecycle , props, state etc.
Hooks don't work inside classes.

## Rules
- Only call hooks at the Top level
    - Don't call hooks inside loops, conditions, or nested functions. 
    - This ensures that hooks are called in the same order each time a component rerenders. This is what allows react to correctly preserve the state of hooks between multiple useState and useEffect calls.
- Only call hooks from react functions
    - Don't call hooks from regular Javascript functions
    - Only call hooks from react tsx/jsx components or custom hooks.
    - This ensures that all stateful logic in a component is clearly visible from its source code

```mermaid
  graph TD;
      Store-->Application;
      Application-->Action;
      Action-->Reducer;
      Reducer-->Store;
```