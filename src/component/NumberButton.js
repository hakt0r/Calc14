import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export function NumberButton({value}){
    const dispatch = useDispatch();
    return <Button
      variant="secondary"
      onClick={ e => dispatch({type:'number',value}) }
    >{value}</Button>
  }
  
  
  
  
  
  