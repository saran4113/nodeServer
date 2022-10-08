import {createSlice} from '@reduxjs/toolkit'


let user = createSlice({
    name: 'user',
    initialState : {name:'kim',age:20},

    reducers:{
        changeName(state, newName){
            state.name = newName.payload
        },
        increaseAge(state, newAge){
            state.age = state.age+=newAge.payload
        }
    }
})

export let {changeName,increaseAge} =user.actions
export default user

