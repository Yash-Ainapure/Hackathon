// action types can be anything according to user requirement 
// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';

// these are action creators
export const increment=()=>{
    return {
        type:'INCREMENT'
    };
};
export const decrement=()=>{
    return {
        type:'DECREMENT'
    };
};

export const setUserObj=(obj)=>{
    return {
        type:'userObj',
        data:obj,
        
    };
};


export const updateCaption=(caption)=>{
    
    
    return {
        type:'UPDATE',
        currentCaption:caption,
    };
}