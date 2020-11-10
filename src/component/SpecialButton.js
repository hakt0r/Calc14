import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export function SpecialButton({value,type}){
    const dispatch = useDispatch();
    return <Button
      variant="secondary"
      onClick={ e => dispatch({type}) }
    >{value}</Button>
}