import React, { memo } from "react";

import { Routes , Route, Navigate } from "react-router-dom";

import NotFound from '../Common/NotFound';

import Ex from "../ExLayout";
import Dex from "../DexLayout";
import Swap from "../SwapLayout";
import Remit from "../RemitLayout";

const MainRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Ex />} />
                <Route path={"/ex/*"}  element={<Ex />}/>
                <Route path={"/dex/*"}  element={<Dex />}/>
                <Route path={"/swap/*"}  element={<Swap />}/>
                <Route path={"/remit/*"}  element={<Remit />}/>
                <Route path={"/*"} element={<NotFound/>} />
            </Routes>
        </>
    );
}

MainRoutes.propTypes = {

};

export default memo(MainRoutes);
