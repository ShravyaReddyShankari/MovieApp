import React from 'react';
import './Header.css';
//import Image1 from 'react-svg-loader!../../assets/logo.svg';

import Modal from 'react-modal';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import Box from "@material-ui/core/Box";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div {...other}>
        {value === index && <div>{children}</div>}
      </div>
    );
  }

Modal.setAppElement('body')

const Header = (props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
        let x = true;
    }

    function closeModal() {
        setIsOpen(false);
    }
    const bookShowButtonClickHandler = () => {
        if(this.state.isLoggedIn) {
            //navigate to book show screen
        }
        else {
            alert("Please Login or Register");
        }
    }

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (
        <div className="header">
            <img className="logo" src={logo} />
            {/* <svg className="logo" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
            <path d="M352,255.5l-192,96v-192L352,255.5z M512,31.5v448H0v-448H512z M320,95.5h64v-32h-64V95.5z M224,95.5h64v-32h-64V95.5z
            M128,95.5h64v-32h-64V95.5z M32,95.5h64v-32H32V95.5z M96,415.5H32v32h64V415.5z M192,415.5h-64v32h64V415.5z M288,415.5h-64v32h64
            V415.5z M384,415.5h-64v32h64V415.5z M480,415.5h-64v32h64V415.5z M480,127.5H32v256h448V127.5z M480,63.5h-64v32h64V63.5z"/>
            </svg> */}
            {/* <Image1 /> */}
            {/* <ReactLogo /> */}
            {/* <img src="../../assets/logo.svg" onerror="this.src='../../assets/logo.svg'"></img> */}
             {/* <img src="../../assets/logo.svg"></img> */}
             <Link to="/bookshow/:id"><Button className="headerButton" variant="contained" color="primary">
                BOOK SHOW 
            </Button>
            </Link>
            {/*(this.state.isLoggedIn) ? ( <Button variant="contained">LOGOUT</Button> ) : 
            ( */}
            <Button className="headerButton" variant="contained" onClick={openModal}>LOGIN</Button> 
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                //contentLabel="Example Modal"
            >
                {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div> */}
                <Paper square>
                    <Tabs
                        value={0}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        //aria-label="disabled tabs example"
                        //aria-hide-app="false"
                        //aria-hide-app={false}
                    >
                        <Tab label="LOGIN" >    
                        </Tab>
                        <Tab label="REGISTER" >
                        </Tab>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Login />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Register />
                    </TabPanel>
                </Paper>
            </Modal>
            {/* )  */}
        </div>
    )
}

export default Header;