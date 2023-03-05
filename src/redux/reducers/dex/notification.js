import ActionTypes from "../../actions/ex/actionTypes"

const INITIAL_STATE = {
    error : null,
    notificationList : null
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.ExNotificationList :
            return ({
                ...state,
                notificationList : action.payload
            })
        case ActionTypes.ExAddNotification :
        case ActionTypes.ExNotificationListError :
        case ActionTypes.ExAddNotificationError :
        default : 
            return state ;
    }
}