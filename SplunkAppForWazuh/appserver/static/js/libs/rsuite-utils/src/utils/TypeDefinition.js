export type Dimension = 'height' | 'width';
export type PlacementAround = 'top' | 'right' | 'bottom' | 'left';
export type PlacementEighPoints =
  | 'bottomStart'
  | 'bottomEnd'
  | 'topStart'
  | 'topEnd'
  | 'leftStart'
  | 'leftEnd'
  | 'rightStart'
  | 'rightEnd';

export type PlacementAuto =
  | 'auto'
  | 'autoVertical'
  | 'autoVerticalStart'
  | 'autoVerticalEnd'
  | 'autoHorizontal'
  | 'autoHorizontalStart'
  | 'autoHorizontalEnd';

export type Placement = PlacementAround | PlacementEighPoints | PlacementAuto;
export type TriggerName = 'click' | 'hover' | 'focus' | 'active';

export type DefaultEvent = SyntheticEvent<*>;
export type ReactFindDOMNode = null | Element | Text;
export type DefaultEventFunction = (event: DefaultEvent) => void;
export type AnimationEventFunction = (node: ReactFindDOMNode) => void;
