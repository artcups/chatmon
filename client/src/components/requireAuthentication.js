import React from 'react';
import {connect} from 'react-redux';
import {pushState, replace} from 'redux-router';
import { push } from 'react-router-redux'
import { authenticateSilentGoogle } from './../actions/userActions'

export function RequireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth(this.props.user);
        }

        componentWillReceiveProps (nextProps, nextState) {
            this.checkAuth(nextProps.user);
        }

        checkAuth (user) {
            debugger;
            if (user.id === "") {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(authenticateSilentGoogle(`/login?next=${redirectAfterLogin}`))
            }
        }

        render () {
            return (
                <div>
                    {this.props.user.id !== null
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        user: state.user.user
    });
    return connect(mapStateToProps)(AuthenticatedComponent);

}