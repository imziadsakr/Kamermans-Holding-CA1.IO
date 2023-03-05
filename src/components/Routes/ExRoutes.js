import React, { memo } from "react";

import { Routes , Route } from "react-router-dom";

import ProtectedRoute from "../../utils/ProtectedRoute";

// Pages
import NotFound from '../Common/NotFound';
import User from '../../pages/Ex/User' ;
import UpdateUser from '../../pages/Ex/UpdateUser';
import Crypto from '../../pages/Ex/Crypto' ;
import AddCrypto from "../../pages/Ex/AddCrypto";
import UpdateCrypto from "../../pages/Ex/UpdateCrypto" ;
import Notification from '../../pages/Ex/Notification' ;
import AddNotification from "../../pages/Ex/AddNotification";
import Login from '../../pages/Login'

const ExRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login to='ex'/>} />
            {/* <Route element={<ProtectedRoute protect='ex' />}> */}
                <Route path={"/user"}  element={<User />}/>
                <Route path={"/updateuser"}  element={<UpdateUser />}/>
                
                <Route path={'/crypto'} element={<Crypto />} />
                <Route path={'/addcrypto'} element={<AddCrypto />} />
                <Route path={'/updatecrypto'} element={<UpdateCrypto />} />
                
                <Route path={'/notification'} element={<Notification />} />
                <Route path={'/addnotification'} element={<AddNotification />} />
            {/* </Route> */}
            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
}

ExRoutes.propTypes = {

};

export default memo(ExRoutes);
