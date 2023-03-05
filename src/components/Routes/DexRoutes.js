import React, { memo } from "react";
// import PropTypes from "prop-types";

import { Routes , Route } from "react-router-dom";

import ProtectedRoute from "../../utils/ProtectedRoute";
import Login from "../../pages/Login";
import Token from "../../pages/Dex/Token";
import AddToken from '../../pages/Dex/AddToken' ;

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={< Login to='dex'/>} />
            <Route element={<ProtectedRoute protect='dex' />}>
                <Route path="/token" element={<Token />} />
                <Route path='/addtoken' element={<AddToken />} />
            </Route>
        </Routes>
    );
}

Routing.propTypes = {
    // selectLanding: PropTypes.func.isRequired,
};

export default memo(Routing);
