import {useParams} from "react-router-dom";
import styled from 'styled-components'
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {Context1} from '../.././App.js';
import {useDispatch} from "react-redux";
import {changeStock, insertCart} from "../../store/cartSlice";

function DetailPage (props){

    let {stock} = useContext(Context1)

    let dispatch = useDispatch()

    let [ac,setAc] =useState(true)
    let [fade,setFade] =useState('')
    let [tab,setTab] = useState(1)
    let params = useParams();
    useEffect((e)=>{

        let watched = localStorage.getItem('watched')
        if(null==watched){
            localStorage.setItem('watched',`["${params.id}"]`)
        }else{
            let beforeWatchedJson = localStorage.getItem('watched')
            let beforeWatchedObject = JSON.parse(beforeWatchedJson)
            let findIndex = beforeWatchedObject.findIndex(item=>item===params.id)
            if(findIndex>=0){
                beforeWatchedObject.splice(findIndex,1)
            }
            beforeWatchedObject.push(params.id)
            let afterWatchedJson = JSON.stringify(beforeWatchedObject)
            // localStorage.removeItem('watched')
            localStorage.setItem('watched',afterWatchedJson)
        }
            setFade('end')
    },[])

    let findIndex = props.shoes.findIndex(item=>item.id==params.id)

    // let Box =styled.div`
    //   padding: 20px;
    //   color: blue;
    // `
    return (
        <div className={'start ' + fade}>
            <div className="container" >
                <div className="row">
                    <div className="col-md-6">
                        <img src={`https://codingapple1.github.io/shop/shoes${params.id}.jpg`} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4 className="pt-5">{props.shoes[findIndex].title}</h4>
                        <p>{props.shoes[findIndex].contents}</p>
                        <p onClick={()=>{
                            setAc(!ac);
                        }}>{props.shoes[findIndex].price}</p>
                       <div onClick={()=>{
                           dispatch(insertCart(props.shoes[findIndex]))

                       }} className="orderButton">주문하기</div>

                    </div>
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab}></TabContent>

        </div>

)
}
function TabContent(props){

    let ar = ["무적","캡틴","사우르스"];
    let [fade,setFade] =useState('')
    let {stock} = useContext(Context1)

    useEffect(()=>{
        setTimeout(()=>{
            setFade('end')
        },100)
        return (
            setFade('')
        )

    },[props])


    return(
        <div className={'start '+ fade}>
            {
                ar.map((item,i)=>{
                    return (
                        props.tab===i?<div key={i}>{item} {stock[i]}</div>:null
                    )
                })
            }
        </div>
        )


}

export default DetailPage;
