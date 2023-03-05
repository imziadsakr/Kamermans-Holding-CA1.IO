

const ActionTypes = {
    // auth action types
    ExSignIn : "ExSignIn",
    ExSignInError : 'ExSignInError' ,
    ExSignOut : "ExSignOut",

    // user action types
    ExUserList : "ExUserList",
    ExUserListError : "ExUserListError", 

    ExDeleteUser : "ExDeleteUser" ,
    ExDeleteUserError : "ExDeleteUserError" ,

    ExUpdateUserProfile : 'ExUpdateUserProfile',
    ExUpdateUserProfileError : 'ExUpdateUserProfileError',

    ExCreateUserProfile : 'ExCreateUserProfile',
    ExCreateUserProfileError : 'ExCreateUserProfileError' ,
    
    // crypto action types
    ExBaseCryptoList : 'ExBaseCryptoList',
    ExBaseCryptoListError : "ExBaseCryptoListError",
    
    ExCryptoList : "ExCyptoList",
    ExCryptoListError : "ExCryptoListError",

    ExAddCrypto : "ExAddCrypto",
    ExAddCryptoError : "ExAddCryptoError",

    ExDeleteCrypto : "ExDeleteCrypto",
    ExDeleteCryptoError : "ExDeleteCryptoError",

    // notification action types
    ExAddNotification : "ExAddNotification",
    ExAddNotificationError : "ExAddNotificationError",

    ExNotificationList : "ExNotificationList",
    ExNotificationListError : "ExNotificationListError",

    ExDeleteNotification : "ExDeleteNotification",
    ExDeleteNotificationError : "ExDeleteNotificationError" ,
}

export default ActionTypes ;