# @splunk/themes

A collection of Splunk theme variables and mixins. This package is framework-agnostic. Themes consist
of plain objects containing primitives such as strings and numbers. Functions are used for mixins.

## Install

Install the package:
```
npm install @splunk/themes
```

## Usage

Every theme is delivered as a single module exporting an object.

```js
import themeEnterprise from '@splunk/themes/enterprise';
import themeEnterpriseDark from '@splunk/themes/enterpriseDark';
import themeLite from '@splunk/themes/lite';
import themeScp from '@splunk/themes/scp';
```

Hardcoding theme choices into an application/component must be avoided. Higher-level packages
(such as `@splunk/css-loader`) handle theme selection automatically. Manually determining the
active theme depends on the environment. For example, recent versions of Splunk Enterprise/Lite
provide `window.$C.SPLUNK_UI_THEME`.

## Structure

Theme modules contain variables following a `name: string|number` scheme:
```js
{
    brandColor: '#5cc05c',
    mixins: { [...] }
    overlayShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zindexModal: 1050,
}
```

`mixins` is a nested object. Mixins are always functions:
```js
{
    reset: function(display),
    clearfix: function(),
    [...]
}
```
