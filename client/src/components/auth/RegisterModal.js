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

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        username: '',
        password: '',
        contactNo: '', 
        gender: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
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
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        this.setState({
            modal: !this.state.modal
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

        const{  name, username, password, contactNo, gender } = this.state;

        // Create User object
        const newUser = {
            name,
            username,
            password,
            contactNo, 
            gender
        };

        // Attempt to register
        this.props.register(newUser);

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
                                <Label for="name">Name</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for="username">NIC or Driving License No</Label>
                                <Input 
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="NIC or Driving License No"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label for="contactNo">Contact Number</Label>
                                <Input 
                                    type="text"
                                    name="contactNo"
                                    id="contactNo"
                                    placeholder="Contact Number"
                                    className='mb-3'
                                    onChange={this.onChange}
                                />

                                <Label>Gender</Label><br />
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
                                </Label>

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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);