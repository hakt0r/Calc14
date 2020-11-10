import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export function OperationButton ({value}){
    const operation = useSelector( state => state.operation );
    const dispatch = useDispatch();
    return <Button
      variant={ operation === value ? "warning" : "primary" }
      onClick={ e => dispatch({type:'operation',value:value}) }
    >{value}</Button>;
}