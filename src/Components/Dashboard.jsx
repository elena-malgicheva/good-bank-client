import React, { useState, useEffect, useContext} from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// Icons
import { TbMoodDollar } from 'react-icons/tb'
import { RiUserAddFill } from 'react-icons/ri';
import { FaPiggyBank } from 'react-icons/fa';
import { BsCardList } from 'react-icons/bs';
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [depositAmmount, setDepositAmmount] = useState(0);
  const [withdrawAmmount, setWithdrawAmmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [show, setShow] = useState(false);
  const [showWithdraw, setWithdrawShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleWithdrawClose = () => setWithdrawShow(false);
  
  const handleShow = () => setShow(true);
  const handleWithdrawShow = () => setWithdrawShow(true);


  const handleDeposit = async() => {
    const newBalance = parseInt(userData.balance) + parseInt(depositAmmount);
    try {
      const { data } = await axios.post(
        
        "https://good-bank-server-05e57b3f40b4.herokuapp.com/deposit/lena@mail777/" + newBalance,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        console.log("Success");
        setUserData(data.user);
        setDepositAmmount(0);
        setShow(false);
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setError(error);
    }
  }

  const handleWithdraw = async() => {
    const newBalance = parseInt(userData.balance) - parseInt(withdrawAmmount);
    if (newBalance < 0) { 
      alert ("Not enough, your current balance is " + userData.balance + "$");
      
    }
    else {
    try {
      const { data } = await axios.post(
        "https://good-bank-server-05e57b3f40b4.herokuapp.com/deposit/lena@mail777/" + newBalance,
        { withCredentials: true }
      );
      console.log(data);
      if (data.success) {
        console.log("Success");
        setUserData(data.user);
        setDepositAmmount(0);
        handleClose();
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      setError(error);
    }
  }
  }

  useEffect(() => {
    const fetchUserData = async() => {
      try {
        const { data } = await axios.get(
          "https://good-bank-server-05e57b3f40b4.herokuapp.com/user/lena@mail777",
          { withCredentials: true }
        );
        console.log(data);
        if (data.success) {
          console.log(data.message);
          setUserData(data.user);
          
        } else {
          console.log(data.message);
        }
      } catch (error) {
        setError(error);
      }
    }

    fetchUserData();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <div className="app-card w-50 p-5 m-3 deposit-color">
      {userData && (
        <div>
          <h2>Hello {userData.username}</h2>
          
          <p>Your Balance: ${userData.balance}.00</p>
          
        </div>
      )}
    
    
    <Button variant="primary" onClick={handleShow}>
    Deposit
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><FaPiggyBank className='icon' /> Enter Amount you want to deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body><InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          aria-label="Amount (to the nearest dollar)"
          onChange={(event) => {
            setDepositAmmount(event.target.value);
          }} />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        
          Close
        </Button>
        <Button variant="primary" onClick={handleDeposit}>
          Deposit
        </Button>
      </Modal.Footer>
    </Modal>
    
    <Button variant="primary" className="m-3" onClick={handleWithdrawShow}>
    Withdraw
    </Button>
    <Modal show={showWithdraw} onHide={handleWithdrawClose}>
      <Modal.Header closeButton>
        <Modal.Title><FaPiggyBank className='icon' /> Enter Amount you want to withdraw</Modal.Title>
      </Modal.Header>
      <Modal.Body><InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control 
          aria-label="Amount (to the nearest dollar)"
          onChange={(event) => {
            setWithdrawAmmount(event.target.value);
          }} />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleWithdrawClose}>
        
          Close
        </Button>
        <Button variant="primary" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  </>
  );
};

export default Dashboard;