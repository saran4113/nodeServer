import {useNavigate ,Outlet} from "react-router-dom";
function ItemCard (props){
    let navigate = useNavigate();
    return (
        <div className="col-md-4" onClick={() => {navigate(`/detail/${props.item.id}`)}}>
            <img src={`https://codingapple1.github.io/shop/shoes${props.item.id}.jpg`} width="80%"/>
            <h4>{props.item?.title??"gt"}</h4>
            <p>{props.item?.price??"d"}</p>
        </div>
    )
}


export default ItemCard;
