import React from 'react';
import './Header.css';
import Modal from 'react-modal';
import Login from '../../screens/login/Login';
import Register from '../../screens/register/Register';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Header.css';

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
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const isLoggedIn = window.sessionStorage.getItem('access-token') != undefined ? true : false;
    let movieId = '';
    const [bookShowAlertModalIsOpen, setBookShowAlertModalIsOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const history = useHistory();
    let isShowBookShowButton = false;

    if (props.isShowBookShowButton) {
        isShowBookShowButton = props.isShowBookShowButton;
        movieId = props.movieId;
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleModalOpenChange = (e, modalIsOpen) => {
        setModalIsOpen(modalIsOpen);
    }

    const logoutHandler = () => {
        window.sessionStorage.removeItem('access-token');
        window.sessionStorage.removeItem('user-details');
        history.push("/");
    }

    const bookShowButtonClickHandler = () => {
        if (isLoggedIn) {
            history.push({
                pathname: "/bookshow/" + movieId
            });
        }
        else {
            handleBookShowAlertModalOpen();
        }
    }

    const handleBookShowAlertModalOpen = () => {
        setBookShowAlertModalIsOpen(true);
    };

    const handleBookShowAlertModalClose = () => {
        setBookShowAlertModalIsOpen(false);
    };


    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo"/>
            {isLoggedIn ? (<Button className="header-button" variant="contained" color="default" onClick={logoutHandler}>LOGOUT</Button>) :
                (<Button className="header-button" variant="contained" color="default" onClick={openModal}>LOGIN</Button>)}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="secondary"
                        onChange={handleChange}
                    >
                        <Tab label="LOGIN" >
                        </Tab>
                        <Tab label="REGISTER" >
                        </Tab>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Login modalIsOpen={modalIsOpen} onChange={handleModalOpenChange} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Register modalIsOpen={modalIsOpen} onChange={handleModalOpenChange} />
                    </TabPanel>
                </Paper>
            </Modal>
            {isShowBookShowButton ? (
                <Button className="header-button" variant="contained" color="primary" onClick={bookShowButtonClickHandler}>
                    BOOK SHOW
                </Button>
            ) : ''}
            <Modal
                isOpen={bookShowAlertModalIsOpen}
                onRequestClose={handleBookShowAlertModalClose}
                style={customStyles}
            >
                <div>
                    <p>Please Login or Register!</p>
                </div>
            </Modal>
        </div>
    )
}

export default Header;