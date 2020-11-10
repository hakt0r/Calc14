
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

export function Display (){
    const field = useSelector( state => state.field );
    return <FormControl value={field}/>;
}