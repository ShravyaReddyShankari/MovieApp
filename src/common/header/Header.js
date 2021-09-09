import React from 'react';
import Modal from 'react-modal';
import Login from '../login/Login';
import Register from '../register/Register';

const Header = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
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

    return (
        <div className="header">
            <img src="../assets/log.svg"></img>
            <Button variant="contained" color="primary" onClick={bookShowButtonClickHandler}>
                BOOK SHOW 
            </Button>
            (this.state.isLoggedIn) ? ( <Button variant="contained">LOGOUT</Button> ) : 
            ( <Button variant="contained" onClick={openModal}>LOGIN</Button> 
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <Paper square>
                    <Tabs
                        //value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        //onChange={handleChange}
                        //aria-label="disabled tabs example"
                    >
                        <Tab label="LOGIN"> 
                            <Login />   
                        </Tab>
                        {/* <Tab label="Disabled" disabled /> */}
                        <Tab label="REGISTER">
                            <Register />
                        </Tab>
                    </Tabs>
                </Paper>
            </Modal>
            )
        </div>
    )
}

export default Header;