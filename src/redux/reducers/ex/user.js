import ActionTypes from "../../actions/ex/actionTypes";


const INITIAL_STATE = {
   userList : null
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type){
        case ActionTypes.ExUserList:
            return ({
                ...state,
                userList : action.payload
            })
        case ActionTypes.ExUserListError :
        default :
            return state ;
    }
}