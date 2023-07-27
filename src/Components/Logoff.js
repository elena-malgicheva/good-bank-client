import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from '../Context/UserContext';

 const Logoff = () => {
    const { setEmail, setUserName } = useContext(UserContext);

    useEffect(() => {
        setEmail('');
        setUserName('Guest');
    }, [])
    
}

export default Logoff;