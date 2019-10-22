# @splunk/react-icons

A library of various icons in React.

## Install

Install the package and its dependencies.

1. Install the peer dependencies:
    ```
    npm install react@^16 react-dom@^16 styled-components@^4
    ```
2. Install the package:
    ```
    npm install @splunk/react-icons
    ```

## Production Builds

`@splunk/react-icons` and React support production and development builds. The production build removes warnings and guidance from the output. To create a production build, set the environment variable `NODE_ENV` to `"production"` and use the webpack [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) to inject the variable into the code.
