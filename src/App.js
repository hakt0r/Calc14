// yarn add redux react-redux

import { Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import logo from "./logo.svg";

import { Display         } from './component/Display';
import { TinyDisplay     } from './component/TinyDisplay';
import { NumberButton    } from './component/NumberButton';
import { OperationButton } from './component/OperationButton';
import { SpecialButton   } from './component/SpecialButton';

function App() {
  return <>
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
  </Row></>;
}

export default App;
