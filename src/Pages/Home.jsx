
import { TbMoodDollar } from 'react-icons/tb';
import SomeComponent from '../Components/SomeComponent';
import UserName from '../Components/UserName';


function Home() {

  console.log("we are home")

  return (
  
  <div class="home-container">
    
      <h1><TbMoodDollar />Welcome, <UserName/></h1>
      <hr /> 
      <h2>Good Bank - your tool for managing your finances on-the-go!</h2> 
      <p>Our app provides you with quick and easy access to your account, allowing to 
          check your balance, deposit and withdraw funds.</p>
      <p>We are thrilled to have you onboard and look forward to helping your achieve your financial goals!</p>

      <SomeComponent/>
    </div>
      
  );
}

export default Home;