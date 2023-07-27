
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";


// Icons
import { TbMoodDollar } from 'react-icons/tb'
import { RiUserAddFill } from 'react-icons/ri';
import { BsCardList } from 'react-icons/bs';



function AppNavbar() {
  let NavLinkClasses = 'nav-item';
  let NavLogoClasses = 'logo';
  
  return (

     <Navbar>     
      <Navbar.Brand className='justify-start p-1'>
        <Nav.Link >
        <NavLink className={(navData) => navData.isActive ?  NavLogoClasses +' active' : NavLogoClasses } to="">
          <TbMoodDollar className='icon' />
          Good Bank
        </NavLink>
        </Nav.Link>
      </Navbar.Brand>

      <Navbar.Toggle />
        
      <Navbar.Collapse className="justify-content-end">
        <NavLink className={(navData) => navData.isActive ?  NavLinkClasses +' active' : NavLinkClasses } to="signup"><RiUserAddFill className='icon' /> SIGNUP</NavLink>
        <NavLink className={(navData) => navData.isActive ?  NavLinkClasses +' active' : NavLinkClasses } to="login" ><RiUserAddFill className='icon' /> LOGIN</NavLink>
        <NavLink className={(navData) => navData.isActive ?  NavLinkClasses +' active' : NavLinkClasses } to=""><BsCardList className='icon' /> LOGOFF</NavLink>
      </Navbar.Collapse> 
       
     </Navbar>
   
  );
}

export default AppNavbar;
