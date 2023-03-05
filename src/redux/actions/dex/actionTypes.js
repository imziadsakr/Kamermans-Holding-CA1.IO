

const ActionTypes = {
    // auth action types
    DexSignIn : "DexSignIn",
    DexSignInError : 'DexSignInError' ,
    DexSignOut : "DexSignOut",

    // user action types
    DexUserList : "DexUserList",
    DexUserListError : "DexUserListError", 

    DexDeleteUser : "DexDeleteUser" ,
    DexDeleteUserError : "DexDeleteUserError" ,
    
    // token action types
    DexTokenList : "DexTokenList",
    DexTokenListError : "DexTokenListError",

    DexAddToken : "DexAddToken",
    DexAddTokenError : "DexAddTokenError",

    DexDeleteToken : "DexDeleteToken",
    DexDeleteTokenError : "DexDeleteTokenError",

    // notification action types
    DexAddNotification : "DexAddNotification",
    DexAddNotificationError : "DexAddNotificationError",

    DexNotificationList : "DexNotificationList",
    DexNotificationListError : "DexNotificationListError",

    DexDeleteNotification : "DexDeleteNotification",
    DexDeleteNotificationError : "DexDeleteNotificationError" ,
}

export default ActionTypes ;