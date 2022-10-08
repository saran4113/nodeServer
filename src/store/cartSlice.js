import {createSlice} from "@reduxjs/toolkit";


let cart = createSlice({
    name: 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers:{
        changeCart(state, id){
            let findIndex = state.findIndex((item)=>item.id===id.payload)
            state[findIndex].count+=1
        },
        insertCart(state, item){
            let pay = item.payload
            let findIndex = state.findIndex((item)=>item.id===pay.id)
            if(findIndex===-1){
                let newItem = {id:pay.id,name:pay.content,count:1}
                let copy = [...state,newItem]
                return copy;
            }else{
                state[findIndex].count+=1
                alert("이미 있는상품으로 개수만 한개 추가했음")
            }

        }
    }

})

export let {changeCart,insertCart} =cart.actions
export default cart
