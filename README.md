# react-cssfn - Writes CSS in (similar) React Hooks

A lib for generating _Style Sheet_ (css) with _JavaScript function_.  
Similar to _React Hooks_ but for **generating css dynamically**.

By underlying JavaScript language, the css can be easily exported/imported as a regular JavaScript module.

The generated css can be used in your &lt;React Component&gt; easily, something like this:
```jsx
const useButtonSheet = createUseSheet(() => [
    // ....
]);

const awesomeButtonSheet = useButtonSheet();

return (
    <button className={awesomeButtonSheet.main}>
    </button>
);
```

Because your stylesheet is a javascript function, your css properties & values can be taken from another javascript objects/variables/functions:

```jsx
layout({
    display: isVertical ? 'inline-flex' : 'flex', // conditional
    ...anotherStuff(), // using spread operator to define multiple properties
})
```

## Preview

```js
export const usesAwesomeButton = () => composition([
    imports([
        stripoutControl(), // clear browser's default styles
        
        usesButtonBase(), // imports css from a generic button
        
        // imports any stuff here...
    ]),
    layout({
        display       : 'flex',
        flexDirection : 'row',
        background    : 'pink',
        color         : 'darkred',
        
        // writes the css declaration similar to regular css
        
        ...children(['span', '.logo'], [ // target to <span> and class="logo"
            imports([
                // imports any stuff here...
            ]),
            layout({
                // writes the css declaration similar to regular css
            }),
        ]),
    }),
    variants([
        rule('.big', [
            layout({
                fontSize: 'xx-large',
                // ....
            })
        ]),
        rule('.dark', [
            // ...
        ]),
    ]),
    states([
        rule([':disabled', '.disabled'], [
            // ....
        ]),
    ]),
]);

// attach the css to DOM:
export const useAwesomeButtonSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesAwesomeButton(),
        ]),
    ]),
    compositionOf('otherClass', [
        imports([
            // ...
        ]),
    ]),
]);
```

Then we can consume our generated css like this:

```jsx
export default function AwesomeButton(props) {
    const btnSheet = useAwesomeButtonSheet();
    
    return (
        <>
            <button className={btnSheet.main}>Awesome!</button>
            <button className={btnSheet.otherClass}>Cool!</button>
        </>
    );
}
```

## Features

* includes all Vanilla & ES6 JavaScript features.
* Lazy execution (your function will be executed on demand).
* Cached - your function only be executed once (or never if not needed).
* IntelliSense supported - Our cssfn is written in TypeScript (superset of JavaScript).
* CSS Variable Management - Never write variable name in plain string.
* CSS Config Management - Shares a common setting to many components.

## Installation

Using npm:
```
npm i @cssfn/react-cssfn
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
