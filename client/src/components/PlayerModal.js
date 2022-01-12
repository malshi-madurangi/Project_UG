import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addPlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';

import Home from './screens/Home';

class PlayerModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newPlayer = {
            name: this.state.name
        };

        //Add player via addPlayer action
        this.props.addPlayer(newPlayer);

        //Close the modal
        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? <Button
                        color="dark"
                        style={{marginBottom: '2rem'}}
                        onClick={this.toggle}
                    >
                        Add Player
                    </Button> : <Home />}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Player List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="player">Player</Label>
                                <Input 
                                    type="text"
                                    name="name"
                                    id="player"
                                    placeholder="Add Player"
                                    onChange={this.onChange}
                                />
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                            >Add Player</Button>    
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    player: state.player,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addPlayer })(PlayerModal);