# @splunk/ui-utils

A library of common UI utilities.

## Install

```
npm install @splunk/ui-utils
```

## Usage

Individual functions can be imported from several named modules.

Boolean example:
```js
import { normalizeBoolean } from '@splunk/ui-utils/boolean';
```

Cookie example:
```js
import { getEntry } from '@splunk/ui-utils/cookie';
```

Filter example:
```js
import { filterByKeywords } from '@splunk/ui-utils/filter';
```

Focus example:
```js
import { takeFocus } from '@splunk/ui-utils/focus';
```

Format example:
```js
import { smartTrim } from '@splunk/ui-utils/format';
```

Id example:
```js
import { createDOMID } from '@splunk/ui-utils/id';
```

Internationalization example:
```js
import { _ } from '@splunk/ui-utils/i18n';
```

Keyboard example:
```js
import { isNumber } from '@splunk/ui-utils/keyboard';
```

Math example:
```js
import { strictParseFloat } from '@splunk/ui-utils/math';
```

Style example:
```js
import { toClassName } from '@splunk/ui-utils/style';
```

User Agent example:
```js
import { isIE11 } from '@splunk/ui-utils/userAgent';
```
