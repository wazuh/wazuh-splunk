Change Log
============

2.13.1 - October 14, 2019
----------
Bug Fixes:
* A fixed `Table` head now updates column widths after a data update (SUI-1909).
* `RadioBar` now uses full width if children are icon-only buttons (SUI-1932).
* Fixed a flex-related IE11 truncation issue in `Button` (SUI-1933).
* Fixed an icon-related IE11 truncation issue in `Button` (SUI-1940). 

Notes:
* Relicensed to `Apache-2.0`.

2.13.0 - October 8, 2019
----------
New Features:
* Added `scp` theme.
* `Multiselect` now supports a `tabConfirmsNewValue` prop (`SCP-17384`).
* `Multiselect.Option` now supports customizing the selected appearance.

2.12.2 - September 12, 2019
----------
Bug Fixes:
* `CollapsiblePanel` using the `defaultOpen` prop now animates with async content (SUI-1752).
* Disabled `Text` with type='password' no longer shows the value (SUI-1872).
* `Select` and `Multiselect` no longer throw an error if `styled-components@^3` is used (SUI-1851).
* Fixed accessibility issues in `Tooltip` (SUI-1840).
* `Multiselect` no longer includes `aria-activedescendant` when there are no options (SUI-1890).
* `DefinitionList` with insufficient width no longer wraps the description.

2.12.1 - August 19, 2019
----------
Bug Fixes:
* `ControlGroup` no longer causes `ref` on children to be ignored.

2.12.0 - August 8, 2019
----------
New Features:
* `Table` now supports reordering rows (SOLNESS-19219).
* `DefinitionList` now supports additional units in `termWidth` prop (SUI-1854).
* `CardLayout` now supports additional units in `cardWidth`, `cardMinWidth` and `cardMaxWidth` props (SUI-1854).

Bug Fixes:
* `Text`  no longer renders a clear icon when it is disabled and has a value (SUI-1841).
* `Multiselect` no longer throws an error if `styled-components@^3` is used (SUI-1851).
* Fixed `stopScrollPropagation` in `Scroll` on Chrome (SUI-1855).
* `ControlGoup` with `Switch` as a child no longer throws an error when clicking the label (SUI-1852).

2.11.0 - July 8, 2019
----------
New Features:
* Added `Monogram` component.

Bug Fixes:
* `Select` no longer throws an error if `styled-components@^3` is used.
* `TransitionOpen` no longer sets width to zero if a width is not provided (SUI-1836).

2.10.0 - June 11, 2019
----------
New Features:
* Added `Chip` component (SUI-1762).

Bug Fixes:
* Fixed focus issue in a `Select` without filter and no selected option (SUI-1766).
* The `Image` remove button is now accessible by keyboard (SUI-1736).
* `ControlGroup` no longer throws an error when clicking certain labels (SUI-1817).
* `TransitionOpen` no longer throws an error when animations are disabled and default state is open (SUI-1815).

2.9.0 - April 25, 2019
----------
New Features:
* Most animations can be disabled now (SUI-1210).
* Added `AnimationToggle` component (SUI-1210).
* Clicking `ControlGroup` labels now focuses/toggles certain components (SUI-1690).

Bug Fixes:
* `Tooltip` now closes as expected if moved off-screen (SUI-1689).
* `SidePanel` closing animation now is smooth (SUI-1761).
* `Date` now supports `scrollContainer` prop (SUI-1767).
* Fixed the height calculation of `Text` when `multiline` prop applied (SUI-1755).
* Fixed missing focus outline in `Anchor` (SUI-1795).

2.8.0 - March 14, 2019
----------
New Features:
* `Color` now supports a `N/A` option in the palette (SUI-1693).
* `TransitionOpen` now supports an `outerId` prop.
* `CollapsiblePanel` now supports a `headingLevel` prop (SUI-1700).

Bug Fixes:
* `Code` no longer bundles unsupported language definitions (SUI-1744).
* `Modal` no longer freezes if quickly opened multiple times (SUI-1730).
* `Popover` and components using it no longer close unexpectedly on a mobile device content tap (SUI-1686).
* Fixed `Select` not supporting `describedBy` in a `ControlGroup` (SUI-1738).
* `ControlGroup` now renders correctly when it has conditional children (SUI-1732).
* The ellipsis in `Paginator` had an invalid aria role (MAW-1964).
* Fixed invalid aria role in `Select` button element (SUI-1702).
* A closed `Dropdown` no longer includes `aria-owns` (SUI-1704).
* `Multiselect` input was missing aria properties (SUI-1703).

2.7.0 - February 22, 2019
----------
New Features:
* Support for `styled-components@^4`.

Bug Fixes:
* The shadow input in `Text` is now hidden from screen readers (SUI-1710).

2.6.0 - February 12, 2019
----------
New Features:
* Added `Anchor` component (SUI-1664).

Bug Fixes:
* `Image` and `Number` now work as expected with React 16.4 or newer (SUI-1699).
* The `External` icon in `Button` and `Link` now has a more appropriate tooltip (SUI-1674).
* The default color of `Color` wasn't selectable in controlled mode (SUI-1694).
* A disabled multiline `Text` no longer falls back to default height (SUI-1685).

2.5.0 - January 29, 2019
----------
New Features:
* `Color` now supports a `transparent` option in the palette (SUI-1657).
* `JSONTree` now handles null and empty nested objects/arrays (SUI-1319).
* `Slider` now supports `stepMarks` (SUI-1342).

Bug Fixes:
* `Accordion` no longer animates open on mount (SUI-1665).
* `Date` was missing support for including `name` in `onChange` callbacks (SUI-1680).
* Fixed a layout bug in `SlidingPanel` (SUI-1660).
* `Select` items are no longer clickable while the menu is collapsing (SUI-1663).
* `Number` no longer fails if the `value` prop is set to 0 (SUI-1675).
* `Image` now ignores case when checking file extensions (APPLAT-4382).
* `Text` now inherits height by default (SUI-1662).

2.4.0 - January 2, 2019
----------
New Features:
* `RadioList` now supports an `appearance` prop (SUI-1649).

Bug Fixes:
* `Image` wasn't adapting to container width.

2.3.0 - December 6, 2018
----------
New Features:
* Added `Image` file preview component (APPLAT-3862).

Bug Fixes:
* Fixed `Button` pill appearance hover/focus color in dark mode.
* `Resize` no longer omits `className` (SUI-1652).
* `Text` would break if `multiline` was combined with `appearance` set to `search` (SUI-1608).

2.2.1 - November 15, 2018
----------
Bug Fixes:
* `Switch` was missing a default value for prop `someSelectedLabel` (SUI-1622).

2.2.0 - November 2, 2018
----------
New Features:
* `FormRows` now supports a `disabled` prop (SUI-1595).
* `ControlGroup` now supports a `hideLabel` prop (SUI-1564).

Bug Fixes:
* `RadioBar` options that are both `disabled` and `selected` are now disabled correctly (SUI-1580).
* Fixed `WaitSpinner` clipping (SUI-1341).
* `Table` header cell widths were incorrect in fixed/docked mode (SUI-1297, SUI-1593).

2.1.0 - October 29, 2018
----------
New Features:
* `Select`, `Multiselect` and `ComboBox` now support a `defaultPlacement` prop (SUI-1599).

Bug Fixes:
* Calling `focus` on a `Link` no longer crashes (SUI-1601).
* Fixed `propType` warning for passing JSX as `title` prop to `Concertina.Panel` (SUI-1553).
* `CollapsiblePanel` content no longer overflows horizontally (SUI-1602).
* Fixed `Table` header rendering issue (SUI-1297).
* `Table` with selectable rows and sortable columns now uses the correct drop target.

2.0.0 - September 13, 2018
----------
New Features:
* Support for dark mode.
* Support for dynamic color theming.

API Changes:
* `styled-components` is now a peer dependency.
* The `react` peer dependency is now `^16.3`.
* `CardLayout` children are now required to be `Card`s.
* `Paginator` now displays five pages per default (instead of nine, SUI-1304).
* `Resize` with `border` appearance now renders borders inside of the element instead of outside.

Bug Fixes:
* Content inside of `Resize` is not cropped (SUI-1409).

Notes:
* Theme variable names are not yet considered part of the API. They might change in minor releases.
* Relicensed to `Splunk Software License Agreement`.

1.6.0 - September 5, 2018
----------
New Features:
* `CollapsiblePanel` and `Accordion.Panel` now support a `description`.

Bug Fixes:
* The open `Accordion` panel now scrolls if the `Accordion` height is restricted (MAW-1406).
* Placeholder in `Multiselect` was not showing up (SUI-1566).

1.5.2 - August 23, 2018
----------
Bug Fixes:
* New values in `Multiselect` were not added on click (SUI-1550).

1.5.1 - August 7, 2018
----------
Bug Fixes:
* `Resize` (in border mode) was not showing drag handles. The change introduced in 1.4.4 (for SUI-1409) was reverted.
* `react-event-listener` dependency was upgraded to avoid transitive dependency issues with `@babel/runtime` (SUI-1546).

1.5.0 - July 27, 2018
----------
New Features:
* `Concertina` panels now support a `disabled` status (SUI-529).
* `RadioList` now allows `RadioList.Option` to enable `disabled` (SUI-1534).

Bug Fixes:
* `Table` with a fixed head was calculating head column width incorrectly in some cases (SUI-1527).
* `Select` in a `ControlGroup` now works better with screen readers (SUI-1365).
* `Card` with onClick handler now renders with the same formatting as other `Card`s (SUI-1499).

1.4.4 - June 30, 2018
----------
Bug Fixes:
* Clicking away from `Multiselect` will clear filter (SUI-1263).
* Disabled `TabBar` tab will not display tooltip (SUI-1493).
* Bootstrap no longer overrides `File` input styles (SUI-1496).
* Content inside of `Resize` is not cropped (SUI-1409).

1.4.3 - June 7, 2018
----------
Bug Fixes:
* Fixed `Table` header rendering issue (SUI-1297).

Style Changes:
* `Switch` checkbox now uses a pointer cursor (SUI-1373).

1.4.2 - May 24, 2018
----------
Style Changes:
* `Button` pill hover border changed to match style guide (SUI-1390).

1.4.1 - May 3, 2018
----------
Bug Fixes:
* Fixed `MultiSelect compact` select all while disabled bug (APPLAT-835).

1.4.0 - April 23, 2018
----------
New Features:
* `Select` now supports a `suffixLabel` prop to add text after selected label (SUI-1426).
* `TabLayout.Panel` now supports a `disabled` prop (SUI-1434).

Bug Fixes:
* `Select` and `Dropdown` menu will not have overlapped rounded corners (SUI-1435).
* `Tooltip` now uses an easier to read cursor (SUI-1302).

Style Changes:
* `Table` padding changed to match style guide (SUI-1445).

1.3.3 - March 20, 2018
----------
Bug Fixes:
* `Text` now includes `name` in `onChange` callbacks after clearing (SUI-1413).

1.3.2 - March 6, 2018
----------
Bug Fixes:
* `Date` can now be set with the keyboard after pressing escape (SUI-1400).
* `Select` with a filter no longer breaks when the browser is zoomed (SUI-1378).

1.3.1 - N/A
----------
Was not published.

1.3.0 - March 2, 2018
----------
New Feature:
* `MultiSelect` now supports a `useClickawayOverlay` prop to prevent click aways from executing actions on the page (SUI-1393).

Bug Fix:
* `Select` no longer clears the filter on close (SUI-1389).

1.2.0 - February 14, 2018
----------
New Features:
* `Row` of `Table` now supports 'disabled' prop (SUI-1247).

Bug Fixes:
* Changed border-color for disabled `Text` input (SUI-1371).

1.1.1 - February 5, 2018
----------
Bug Fixes:
* Corrected brand color in `Logo` (SUI-1326).
* `StaticContent` now allows resizes vertically when text wraps (SUI-1351).
* Changed primary and error `Button` font weight to semibold (SUI-1350).
* Corrected hover color on `Button` (SUI-1364).

1.1.0 - January 24, 2018
----------
New Features:
* DOM hook added to `RenderToLayer` to facilitate interactions with Backbone components (SUI-1327).

Bug Fixes:
* Improved alignment of `Switch` with `ControlGroup` and other controls (SUI-1329).
* In `Switch`, the `value` prop is no longer required (SUI-1316).
* `RadioGroup` double borders fixed (SUI-1320).

Style Changes:
* `Slider` styles revamped (SUI-1301).
* Colors used in `Progress` updated (SUI-1317).
* Background color in `Accordion`, `Collapsible`, and `Concertina` updated to improve contrast (SUI-1324).
* Updated default and secondary button hover states to improve contrast (SUI-1325).
* Changed the color of the underline in `Tab` (SUI-1328).

1.0.0 - January 4, 2018
----------
New visual design.

New Features:
* `Heading` supports section and subsection levels (SUI-1267).
* `Button` supports secondary appearance.
* `Slider` supports an arbitrary node for `minLabel` and `maxLabel` props (SUI-1256).
* `Message` supports a `fill` prop (SUI-1305).

API Changes:
* `Heading` no longer supports level 5 (SUI-1267).

Bug Fixes:
* Accessibility improvements in `Code`.
* Resize correctly tracks to mouse position when the window or parent element is scaled (SUI-1289).
* Test hooks in `Table` head renders correct data (SUI-1268).
* `JSONTree` clickable values correctly take focus (SUI-1282).
* `Popover` and `Modal` appear at the correct `z-index` within the page stacking context (SUI-1313).
