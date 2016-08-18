import React, { PropTypes } from 'react'
import {
    Dialog,
    Button,
    Row,
    Col,
Input
} from 'react-onsenui';
import ons from 'onsenui';
import chatEnum from "../../static/chat"


export default class ChannelJoinDialog extends React.Component{

    okClick(){
       // this.props.sendPoi(chatEnum.pointOfInterest.type.POKEMON+"|"+this.refs.pokemon.value);
       // this.refs.pokemon.value = 0;
        this.props.setChannelJoinDialogShown(false);
        this.props.addSubscription();
    }
    cancelClick(){
        this.props.setChannelJoinDialogShown(false);
        this.refs.channelName.value = "";
        this.refs.channelPassword.value = "";
    }
    render(){
        const { setChannelJoinDialogShown, channelJoinDialogIsShown, addSubscription, onChannelNameAndPasswordChange} = this.props;
      //  const options = Object.keys(chatEnum.pointOfInterest.pokemonDisplay).map((pokemon, index) => {
      //      return <option key={index} value={pokemon}>{chatEnum.pointOfInterest.pokemonDisplay[pokemon]}</option>;
      //  });
        const isAndroid = ons.platform.isAndroid();
        console.log(ons)
        return (
        <Dialog
            isOpen={channelJoinDialogIsShown}
            isCancelable={true}
            onCancel={() => setChannelJoinDialogShown(false)}
            animation="fade">
            <div className={isAndroid ? "alert-dialog-container alert-dialog-container--material" : "alert-dialog-container"}>
                <div className={isAndroid ? "alert-dialog-title alert-dialog-title--material" : "alert-dialog-title"}>Join or create a channel!</div>
                <div className={isAndroid ? "alert-dialog-content alert-dialog-content--material" : "alert-dialog-content"}>
                    <Row className="inline-form">
                        <Col width="40"><label>Channel</label></Col>
                        <Col width="60">
                            <input type="text" ref="channelName" onChange={() => {onChannelNameAndPasswordChange(this.refs.channelName.value, this.refs.channelPassword.value)}} className={ons.platform.isAndroid() ? "android text-input--material" : "default"} />
                        </Col>
                    </Row>
                    <Row className="inline-form">
                        <Col width="40"><label>Password</label></Col>
                        <Col width="60">
                            <input type="text" ref="channelPassword" onChange={() => onChannelNameAndPasswordChange(this.refs.channelName.value, this.refs.channelPassword.value)}className={ons.platform.isAndroid() ? "android text-input--material" : "default"} />
                        </Col>
                    </Row>
                </div>
                <div className={isAndroid ? "alert-dialog-footer alert-dialog-footer--one alert-dialog-footer--material alert-dialog-footer--one--material" : "alert-dialog-footer alert-dialog-footer--one" }>
                    <button onClick={() => this.cancelClick()} className={isAndroid ? "alert-dialog-button alert-dialog-button--one alert-dialog-button--material alert-dialog-button--one--material" : "alert-dialog-button alert-dialog-button--one" }>Cancel</button>
                    <button onClick={() => this.okClick()} className={isAndroid ? "alert-dialog-button alert-dialog-button--primal alert-dialog-button--one alert-dialog-button--material alert-dialog-button--one--material alert-dialog-button--primal--material" : "alert-dialog-button alert-dialog-button--primal alert-dialog-button--one" }>Go</button>
                </div>

            </div>
        </Dialog>)
    }
}