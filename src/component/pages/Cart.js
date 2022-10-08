import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeName,increaseAge} from "../../store/userSlice";
import {changeCart} from "../../store/cartSlice";
import {memo, useEffect, useMemo} from "react";

// let ChildCard = memo(function (){
//   let a =0;
//   for(let i=0;i<1000000000; i++){
//     a=i
//   }
//   console.log("차일드 랜더링됨")
// })
//

function errorFunction(){
  console.log("dD")
}

function Cart(){


    useMemo(()=>{
      return errorFunction()
    },[])

    let state = useSelector((state)=>state)
    let dispatch = useDispatch()

    useEffect((e)=>{
        console.log("처음한번실행")
        return (()=>{
            console.log("처음엔 안실행, 끝날때실행")
        })
    },[])

    return (
        <div>
          {/*<ChildCard></ChildCard>*/}
            {state.user.name} , {state.user.age}
            <button onClick={()=>{
                dispatch(changeName('park'))
            }}>버튼</button>
            <button  onClick={()=>{
                dispatch(increaseAge(10))
            }}>나이</button>
            <Table>

                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((item,i)=>{
                        return(<tr key={i}>
                            <td>{i+1}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button onClick={()=>{
                                    return(
                                        dispatch(changeCart(item.id))
                                    )

                                }}>변경</button>
                            </td>
                        </tr>)

                    })
                }

                </tbody>
            </Table>
        </div>
    )
}

export default Cart
