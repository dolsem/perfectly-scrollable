# Perfectly Scrollable

[![size](https://img.shields.io/bundlephobia/minzip/perfectly-scrollable?style=for-the-badge)](https://bundlephobia.com/package/perfectly-scrollable)
[![](https://img.shields.io/npm/v/perfectly-scrollable?style=for-the-badge)](https://www.npmjs.com/package/perfectly-scrollable)
[![](https://img.shields.io/npm/dw/perfectly-scrollable?style=for-the-badge)](https://www.npmjs.com/package/perfectly-scrollable)

SolidJS higher-order component for [Perfect Scrollbar](https://perfectscrollbar.com/).

## Installation

```bash
npm install perfectly-scrollable
```

## Example Usage

Define a scrollable component like this:
```tsx
// MyComponent.tsx
import { PerfectlyScrollable } from 'perfectly-scrollable';
import { Component } from 'solid-js';

export interface MyComponentProps {
  ref?: JSX.IntrinsicAttributes['ref'];
  title: string;
} 
const MyComponent: Component<MyComponentProps> => (props) => {
  return (
    // Make sure to pass the ref down to the element you want to make scrollable
    // You should also make sure the CSS position property is set on the element
    <div ref={props.ref} style={{ position: 'relative' }}>
      <h1>{props.title}</h1>
    </div>
  );
};

export default PerfectlyScrollable(MyComponent);
```

The resulting component props will include all `MyComponent` props and [all Perfect Scrollbar props](https://perfectscrollbar.com/#section-options):
```tsx
// App.tsx
import MyComponent from './MyComponent.tsx';
import { Component } from 'solid-js';

export default () => {
  return (
    <MyComponent title="some title" suppressScrollX />
  );
};
```

You can add Perfect Scrollbar to native elements as well:
```tsx
// MyComponent.tsx
import { PerfectlyScrollable } from 'perfectly-scrollable';
import { Component } from 'solid-js';

const ScrollableDiv = PerfectlyScrollable('div');

export interface MyComponentProps {
  ref?: JSX.IntrinsicAttributes['ref'];
  title: string;
} 
const MyComponent: Component<MyComponentProps> => (props) => {
  return (
    <ScrollableDiv
      ref={props.ref}
      // Don't forget to set the position property
      style={{ position: 'relative' }}
      suppressScrollX
    >
      <h1>{props.title}</h1>
    </ScrollableDiv>
  );
};

export default MyComponent;
```

## Demo

View a functional demo on CodeSandbox: https://codesandbox.io/s/nxso2r.
