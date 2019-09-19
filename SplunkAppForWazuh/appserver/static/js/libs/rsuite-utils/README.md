# rsuite-utils

Utilities for creating rsuite components

用于快速创建 RSUITE 组件，提供的常用工具

支持 react 0.14.9, >= 15.3.0, >= 16.0.0

## Animation 动画

### `<Transition>` 自定义过渡效果

```js
import Transition from 'rsuite-utils/lib/Animation/Transition';
```

| 属性名称          | 类型 `(默认值)`                      | 描述                       |
| ----------------- | ------------------------------------ | -------------------------- |
| in                | boolean                              | 进入                       |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| timeout           | number `(1000)`                      | 动画过渡延迟时间           |
| exitedClassName   | string                               | 退出动画过渡后 className   |
| exitingClassName  | string                               | 退出动画过渡中 className   |
| enteredClassName  | string                               | 进入动画过渡后 className   |
| enteringClassName | string                               | 进入动画过渡中 className   |
| onEnter           | (node?: null, Element, Text) => void | 显示动画过渡的回调函数     |
| onEntering        | (node?: null, Element, Text) => void | 显示中动画过渡的回调函数   |
| onEntered         | (node?: null, Element, Text) => void | 显示后动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void | 退出前动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void | 退出中动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void | 退出后动画过渡的回调函数   |

### `<Collapse>` 折叠效果

```js
import Collapse from 'rsuite-utils/lib/Animation/Collapse';
```

| 属性名称          | 类型 `(默认值)`                                  | 描述                       |
| ----------------- | ------------------------------------------------ | -------------------------- |
| in                | boolean                                          | 进入                       |
| unmountOnExit     | boolean                                          | 在退出时卸载组件           |
| transitionAppear  | boolean                                          | 初始显示的时候开启过渡效果 |
| timeout           | number`(300)`                                    | 动画过渡延迟时间           |
| exitedClassName   | string `('collapse')`                            | 退出动画过渡后 className   |
| exitingClassName  | string `('collapsing')`                          | 退出动画过渡中 className   |
| enteredClassName  | string `('collapse in')`                         | 进入动画过渡后 className   |
| enteringClassName | string `('collapsing')`                          | 进入动画过渡中 className   |
| onEnter           | (node?: null, Element, Text) => void             | 显示前动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void             | 显示中动画过渡的回调函数   |
| onEntered         | (node?: null, Element, Text) => void             | 显示后动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void             | 退出前动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void             | 退出中动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void             | 退出后动画过渡的回调函数   |
| role              | string                                           | HTML role                  |
| dimension         | union: 'height', 'width' ()=>('height', 'width') | 设置折叠尺寸类型           |
| getDimensionValue | ()=>number                                       | 自定义尺寸值               |

### `<Fade>` 淡进淡出

```js
import Fade from 'rsuite-utils/lib/Animation/Fade';
```

| 属性名称          | 类型 `(默认值)`                      | 描述                       |
| ----------------- | ------------------------------------ | -------------------------- |
| in                | boolean                              | 进入                       |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| timeout           | number `(300)`                       | 动画过渡延迟时间           |
| exitedClassName   | string                               | 退出动画过渡后 className   |
| exitingClassName  | string                               | 退出动画过渡中 className   |
| enteredClassName  | string                               | 进入动画过渡后 className   |
| enteringClassName | string                               | 进入动画过渡中 className   |
| onEnter           | (node?: null, Element, Text) => void | 显示动画过渡的回调函数     |
| onEntering        | (node?: null, Element, Text) => void | 显示中动画过渡的回调函数   |
| onEntered         | (node?: null, Element, Text) => void | 显示后动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void | 退出前动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void | 退出中动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void | 退出后动画过渡的回调函数   |

## Overlay 浮层

### `<Overlay>` 覆盖层

```js
import Overlay from 'rsuite-utils/lib/Overlay/Overlay';
```

| 属性名称   | 类型 `(默认值)`                            | 描述                       |
| ---------- | ------------------------------------------ | -------------------------- |
| show       | boolean                                    | 显示                       |
| rootClose  | boolean `(true)`                           | 启用 RootCloseWrapper 代理 |
| animation  | union: boolean, React.ElementType `(Fade)` | 动画                       |
| onEnter    | (node?: null, Element, Text) => void       | 显示前动画过渡的回调函数   |
| onEntering | (node?: null, Element, Text) => void       | 显示中动画过渡的回调函数   |
| onEntered  | (node?: null, Element, Text) => void       | 显示后动画过渡的回调函数   |
| onExit     | (node?: null, Element, Text) => void       | 退出前动画过渡的回调函数   |
| onExiting  | (node?: null, Element, Text) => void       | 退出中动画过渡的回调函数   |
| onExited   | (node?: null, Element, Text) => void       | 退出后动画过渡的回调函数   |

### `<OverlayTrigger>` 覆盖层触发器

```js
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
```

```js
type PlacementAround = 'top' | 'right' | 'bottom' | 'left';
type PlacementEighPoints =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'leftEnd'
  | 'rightStart'
  | 'rightEnd';
type Placement = PlacementAround | PlacementEighPoints;
```

| 属性名称    | 类型 `(默认值)`                                        | 描述                            |
| ----------- | ------------------------------------------------------ | ------------------------------- |
| placement   | enum: Placement                                        | 显示位置                        |
| trigger     | union: 'click', 'hover', 'focus' `(['hover','focus'])` | 触发事件,可以通过数组配置多事件 |
| delay       | number                                                 | 延迟时间                        |
| delayShow   | number                                                 | 展示的延迟时间                  |
| delayHide   | number                                                 | 隐藏的延迟时间                  |
| speaker     | React.Element<any>                                     | 展示的元素                      |
| onEnter     | (node?: null, Element, Text) => void                   | 显示前动画过渡的回调函数        |
| onEntering  | (node?: null, Element, Text) => void                   | 显示中动画过渡的回调函数        |
| onEntered   | (node?: null, Element, Text) => void                   | 显示后动画过渡的回调函数        |
| onExit      | (node?: null, Element, Text) => void                   | 退出前动画过渡的回调函数        |
| onExiting   | (node?: null, Element, Text) => void                   | 退出中动画过渡的回调函数        |
| onExited    | (node?: null, Element, Text) => void                   | 退出后动画过渡的回调函数        |
| defaultOpen | boolean                                                | 默认打开                        |
| open        | boolean                                                | 打开（受控）                    |

### `<RootCloseWrapper>` 代理外部关闭事件

```js
import RootCloseWrapper from 'rsuite-utils/lib/Overlay/RootCloseWrapper';
```

| 属性名称    | 类型 `(默认值)` | 描述               |
| ----------- | --------------- | ------------------ |
| onRootClose | ()=>void        | 触发关闭的回调函数 |
