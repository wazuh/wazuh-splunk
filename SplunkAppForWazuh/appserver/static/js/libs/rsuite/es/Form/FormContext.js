import createContext from '../utils/createContext';
export var FormContext = createContext({});
export var FormValueContext = createContext({});
export var FormErrorContext = createContext({});
export var FormPlaintextContext = createContext(false);
export default FormContext;