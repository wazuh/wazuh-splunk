import * as React from 'react';
export default function createContext(defaultValue) {
  var context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };
  var ReactContext = React.createContext ? React.createContext(defaultValue) : context;
  return ReactContext;
}