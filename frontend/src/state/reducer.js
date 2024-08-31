// first import the actions from the actions.js
// import { INCREMENT,DECREMENT } from "./action";


const initialState = {
    count:0,
};
const initialCaption = {
    caption:"demo",
};
const initialUserObj = {
    user : {}
}

//reducer function



export const counterReducer = (state = initialState,action) => {
    console.log(state);
    console.log(action);
    
    
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count:state.count + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                count:state.count - 1
            };
        default:
            return state;
    }
};

export const updateCaptionReducer=(state=initialCaption,action)=>{
    if(action.type==='UPDATE'){
        
        return {
            ...state,
            caption:action.currentCaption,
           }
    }else{
        // alert(state)
        return state;
        
    }
};
export const setUserObjReducer=(state=initialUserObj,action)=>{
    if(action.type==='userObj'){
        
        return {
            ...state,
            user:action.data,
           }
    }else{
        // alert(state)
        return state;
        
    }
};

