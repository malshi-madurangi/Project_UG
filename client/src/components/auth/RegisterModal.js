import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import '../styles.css';

class RegisterModal extends Component {

    count = 0;

    state = {
        modal: false,
        name: '',
        username: '',
        password: '',
        contactNo: '', 
        gender: '',
        msg: null,
        errormessage : {}
    }

    static propTypes = {
        isRegistered: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        
        const { error, isRegistered } = this.props;
        
        if(error !== prevProps.error) {
            // check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // If authenticated, close modal
        if(this.state.modal) {
            if(isRegistered) {
                this.toggle();
                window.location.reload();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal,
            errormessage: {}
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onValueChange = (e) => {
        this.setState({ gender: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state.gender)

        let errors = {};
        this.count = 0;

        if(!this.state.name) {
            errors["name"]= "Name is required";
            
        } else if(!this.state.name.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
            errors["name"]= "Name should be a string";

            this.count = this.count + 1;
        }

        if(!this.state.username) {
            errors["username"]= "NIC or Driving License No is required";

        }else if(!this.state.username.match(/^[0-9A-Za-z].{9,}/)) {
            errors["username"]= "Please enter the valid ID Number";

            this.count = this.count + 1;
        } 

        if(!this.state.password) {
            errors["password"]= "Password is required";

        }else if(!this.state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/)) {
            errors["password"]= "Must contain at least one number and one uppercase and lowercase letter and special character, and at least 8 or more characters";
            
            this.count = this.count + 1;
        } 

        if(!this.state.contactNo) {
            errors["contactNo"]= "Contact Number is required";

        }else if(!this.state.contactNo.match(/^\d{10}$/)) {
            errors["contactNo"]= "Must contain 10 Numbers";
            
            this.count = this.count + 1;
        } 

        if(!this.state.gender) {
            errors["gender"]= "Gender is required";
        } 

        this.setState({ errormessage : errors });

        const{ name, username, password, contactNo, gender } = this.state;

        // Create User object
        const newUser = {
            name,
            username,
            password,
            contactNo, 
            gender
        };

        console.log(this.count);
        // Attempt to register
        if(this.count === 0){
            this.props.register(newUser);
            
        }
       
        
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? ( <Alert color="danger">{ this.state.msg }</Alert> ) : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <div>
                                <Label for="name"><span>*</span>Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className='mb-3'
                                    // errormessage="Name Should be string"
                                    onChange={this.onChange}
                                />
                                <span>{this.state.errormessage["name"]}</span>
                                </div>

                                <div>
                                <Label for="username"><span>*</span>NIC or Driving License No</Label>
                                <Input 
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="NIC or Driving License No"
                                    className='mb-3'
                                    // errormessage="Please enter the valid ID Number"
                                    onChange={this.onChange}
                                />
                                <span>{this.state.errormessage["username"]}</span>
                                </div>

                                <div>
                                <Label for="password"><span>*</span>Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className='mb-3'
                                    // errormessage="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    onChange={this.onChange}
                                />
                                <span>{this.state.errormessage["password"]}</span>
                                {console.log(this.state.errormessage)}
                                </div>

                                <div>
                                <Label for="contactNo"><span>*</span>Contact Number</Label>
                                <Input 
                                    type="text"
                                    name="contactNo"
                                    id="contactNo"
                                    placeholder="Contact Number"
                                    className='mb-3'
                                    // errormessage="Contact Number should contain 10 integer"
                                    onChange={this.onChange}
                                />
                                <span>{this.state.errormessage["contactNo"]}</span>
                                </div>

                                <div>
                                <Label><span>*</span>Gender</Label><br />
                                <Label for="gender">
                                    <Input
                                    type="radio"
                                    value="Male"
                                    checked={this.state.gender === "Male"}
                                    onChange={this.onValueChange}
                                    />
                                    Male
                                </Label><br />
                                <Label for="gender">
                                    <Input
                                    type="radio"
                                    value="Female"
                                    checked={this.state.gender === "Female"}
                                    onChange={this.onValueChange}
                                    />
                                    Female
                                </Label><br />
                                <span>{this.state.errormessage["gender"]}</span>
                                </div>

                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Register
                                </Button>    
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
    
}

const mapStateToProps = state => ({
    isRegistered: state.auth.isRegistered,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);