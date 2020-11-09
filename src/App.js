// yarn add redux react-redux

import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore }              from 'redux';
import { Button, FormControl, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import logo from "./logo.svg";

const defaultState = {
  mem:       0,
  field:     '',
  previous:  null,
  operation: null
}

const reducer = ( state = defaultState, action ) => {

  const { value } = action;

  switch ( action.type ){

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

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 

function SpecialButton({value,type}){
  const dispatch = useDispatch();
  return <Button
    variant="secondary"
    onClick={ e => dispatch({type}) }
  >{value}</Button>
}

function NumberButton({value}){
  const dispatch = useDispatch();
  return <Button
    variant="secondary"
    onClick={ e => dispatch({type:'number',value}) }
  >{value}</Button>
}

function OperationButton ({value}){
  const operation = useSelector( state => state.operation );
  const dispatch = useDispatch();
  return <Button
    variant={ operation === value ? "warning" : "primary" }
    onClick={ e => dispatch({type:'operation',value:value}) }
  >{value}</Button>;
}

function Display (){
  const field = useSelector( state => state.field );
  return <FormControl value={field}/>;
}

function TinyDisplay (){
  const previous = useSelector( state => state.previous );
  return <span className="tiny">{previous}</span>;
}

function App() {
  return <Provider store={store}>
    <img src={logo}/>
    <Row>
      <Display/>
      <TinyDisplay/>
    </Row>
    <Row>
      <NumberButton value="1"/>
      <NumberButton value="2"/>
      <NumberButton value="3"/>
      <OperationButton value="+"/>
      <SpecialButton type="clear" value="C"/>
    </Row>
    <Row>
      <NumberButton    value="4"/>
      <NumberButton    value="5"/>
      <NumberButton    value="6"/>    
      <OperationButton value="-"/>
      <SpecialButton type="memclear" value="MC"/>
    </Row>
    <Row>
      <NumberButton    value="7"/>
      <NumberButton    value="8"/>
      <NumberButton    value="9"/>
      <OperationButton value="/"/>
      <SpecialButton type="memplus" value="M+"/>
    </Row>
    <Row>
      <NumberButton    value="0"/>
      <NumberButton    value="."/>
      <OperationButton value="="/>
      <OperationButton value="*"/>
      <SpecialButton type="memrecall" value="MR"/>
    </Row>
  </Provider>;
}

export default App;
