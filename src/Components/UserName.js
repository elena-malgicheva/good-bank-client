import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UserName = () => {

    const { userName } = useContext(AuthContext);
    return (
        <div>
          {userName}
        </div>
      );

}

export default UserName;