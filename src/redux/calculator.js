
import { createStore } from 'redux';

const defaultState = {
  mem:       0,
  field:     '',
  previous:  null,
  operation: null
}

const reducer = ( state, action ) => {

  const { value } = action;
  
  switch ( action.type ){

    case "@@INIT": return defaultState;

    case "countdown":
      return {
          field: Number(state.field) - 1
      }
  
    case "number":
      const current = state.field == 0 ? '' : state.field;
      return {
      ...state,
      field: `${current}${value}`
    };
  
    case "clear": return { ...state, field: '' };

    case "memclear":  return { ...state, mem: 0 };
    case "memplus":   return { ...state, mem: state.mem + Number(state.field) };
    case "memrecall": return { ...state, field: state.mem };
  
    case "operation":
      const fieldAsNumber = Number(state.field);

      if ( value === '=' || state.previous !== null ){
        let result = Number(state.previous);

        switch ( state.operation ){
            case "+": result += fieldAsNumber; break;
            case "/": result /= fieldAsNumber; break;
            case "-": result -= fieldAsNumber; break;
            case "*": result *= fieldAsNumber; break;
        }
    
        if ( value === '=' ){
            return {
            ...state, 
            field: result,
            previous: null,
            operation: null };
        } else {
            return {
            ...state,
            previous: result,
            operation: value,
            field:''
            };
        }

      } else return {
          ...state,
          previous:  fieldAsNumber,
          operation: value,
          field:     ''
      }
  
    default: return state;
  }
}
  
export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 
  