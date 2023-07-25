import Users from "../Components/Users";
import Dashboard from "../Components/Dashboard";
import { BsCardList } from 'react-icons/bs';

function Alldata() {
    return (
      <div className="w-50 p-5 m-3 alldata-color">
        <h1><BsCardList/> ALL DATA</h1>
        <hr />
        <Dashboard />
        <Users />    
      </div>
    );
  }
  
export default Alldata;