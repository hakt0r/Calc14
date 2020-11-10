import { useSelector } from "react-redux";

export function TinyDisplay (){
    const previous = useSelector( state => state.previous );
    return <span className="tiny">{previous}</span>;
}
  