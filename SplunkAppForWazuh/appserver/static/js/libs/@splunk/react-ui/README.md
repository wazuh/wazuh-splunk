# @splunk/react-ui

A library of UI components that implement the Splunk design language in React.

## Install

Install the package and its dependencies.

1. Install the peer dependencies:
    ```
    npm install react@^16.3 react-dom@^16.3 styled-components@^4
    ```
2. Install the package:
    ```
    npm install @splunk/react-ui
    ```

## Production Builds

`@splunk/react-ui` and React support production and development builds. The production build removes warnings and guidance from the output. To create a production build, set the environment variable `NODE_ENV` to `"production"` and use the webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) to inject the variable into the code.

## Using the Components

### Children
Nearly all components accept `node` children. Only those components that
require specific constraints include information about the `children` prop in
their documentation.


### Styling
* Pass style to control layout, margins, or positioning, like the
  following example:
  ```js
  <Button label="Hello" style={{ flexBasis: '200px' }} />
  ```

* Alternatively, you can use a component's inline property to switch between
  `inline-block/inline-flex` and `block/flex`. You can use this property instead
  of passing a style prop, like the following example:
  ```js
  <Button inline={false} />
  ```

* Avoid using `className`.

* Avoid overriding stylesheets. When selector specificity changes, the change
  can break stylesheet overrides.

The **generated markup is not an API** and may change at any time without notice, even in a patch
release. Neither is the selector specificity, which may also change at any time without notice.


### Defining Fonts
The component library does not include fonts. You must define and load them in a `@font-face`
declaration. By default, the components render in "Splunk Platform Sans", an alias of "Proxima Nova", and "Splunk Platform Mono", an alias of "Inconsolata".

Please make sure to obtain all required font licenses.

For quick reference, most themes use the following font-family stack:

    Sans (Default): Splunk Platform Sans, Proxima Nova, Roboto, Droid, Helvetica Neue,
        Helvetica, Arial, sans-serif;
    Mono: Splunk Platform Mono, Inconsolata, Consolas, Droid Sans Mono, Monaco,
        Courier New, Courier, monospace;

Individual themes might use different fonts.
