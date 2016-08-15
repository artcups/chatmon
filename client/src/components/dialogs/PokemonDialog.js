import React, { PropTypes } from 'react'
import {
    Dialog,
    Button,
    Row,
    Col
} from 'react-onsenui';
import ons from 'onsenui';
import chatEnum from "../../static/chat"


export default class PokemonDialog extends React.Component{

    render(){
        const { setPokemonDialogShown, isPokemonDialogShown } = this.props;
        const options = Object.keys(chatEnum.pointOfInterest.pokemonDisplay).map((pokemon, index) => {
            return <option key={index} value={pokemon}>{chatEnum.pointOfInterest.pokemonDisplay[pokemon]}</option>;
        });
        const isAndroid = ons.platform.isAndroid();
        console.log(ons)
        return (
        <Dialog
            isOpen={isPokemonDialogShown}
            isCancelable={true}
            onCancel={() => setPokemonDialogShown(false)}
            animation="fade">
            <div className={isAndroid ? "alert-dialog-container alert-dialog-container--material" : "alert-dialog-container"}>
                <div className={isAndroid ? "alert-dialog-title alert-dialog-title--material" : "alert-dialog-title"}>Tag a pokemon!</div>
                <div className={isAndroid ? "alert-dialog-content alert-dialog-content--material" : "alert-dialog-content"}>
                    <Row className="inline-form">
                        <Col width="32"><label>Pokemon</label></Col>
                        <Col width="68">
                            <select className={ons.platform.isAndroid() ? "android" : "default"}>
                                <option disabled="true" selected key="-1" value="0">Choose pokemon</option>
                                {options}
                            </select>
                        </Col>
                    </Row>
                </div>
                <div className={isAndroid ? "alert-dialog-footer alert-dialog-footer--one alert-dialog-footer--material alert-dialog-footer--one--material" : "alert-dialog-footer alert-dialog-footer--one" }>
                    <button className={isAndroid ? "alert-dialog-button alert-dialog-button--one alert-dialog-button--material alert-dialog-button--one--material" : "alert-dialog-button alert-dialog-button--one" }>Cancel</button>
                    <button className={isAndroid ? "alert-dialog-button alert-dialog-button--primal alert-dialog-button--one alert-dialog-button--material alert-dialog-button--one--material alert-dialog-button--primal--material" : "alert-dialog-button alert-dialog-button--primal alert-dialog-button--one" }>OK</button>
                </div>

            </div>
        </Dialog>)
    }
}
