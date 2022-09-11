import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';

import './styles.css';

import moment from 'moment';

import Home from './screens/Home';


class Players extends Component {

    static propTypes = {
        getPlayers: PropTypes.func.isRequired,
        player: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getPlayers();
    }

    onDeleteClick = (id) => {
        this.props.deletePlayer(id);
    }
    
    render() {
        
        const { players } = this.props.player; 

        return(
            <Container>
                { this.props.isAuthenticated ?
                    <TransitionGroup className="Players">
                        <div className="table-responsive">
                            <table responsive="sm" class="table" expand="sm">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Id</th>
                                        <th>Contact No</th>
                                        <th>Gender</th>
                                        <th>Last Played Date & Time</th>
                                        <th>Last Session Score</th>
                                        <th>Total Score</th>
                                        <th>Completed Level</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {players.map(({ _id, name, username, contactNo, gender, lastPlayedDateTime, lastSessionScore, totalScore, completedLevel }) => (
                                    <CSSTransition key={_id} timeout={500} classNames="fade">
                                        <tbody>
                                            <tr>
                                                <td>{name}</td>
                                                <td>{username}</td>
                                                <td>{contactNo}</td>
                                                <td>{gender}</td>
                                                <td>{moment(lastPlayedDateTime.replace('Z', '')).format("MMMM Do YYYY, hh:mm:ss  A")}</td>
                                                <td>{lastSessionScore}</td>
                                                <td>{totalScore}</td>
                                                <td>{completedLevel}</td>
                                                <td><Button
                                                    class="btn"
                                                    className="remove-btn"
                                                    color="danger"
                                                    size="sm"
                                                    onClick={this.onDeleteClick.bind(this, _id)}
                                                >&times;</Button></td>
                                            </tr>
                                        </tbody>
                                    </CSSTransition>
                                ))}
                            </table>
                        </div>
                    </TransitionGroup> 
                : <Home />}
            </Container>
        )
    }

}

const mapStateToProps = (state) => ({
    player: state.player,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps, 
    { getPlayers, deletePlayer }
)(Players);