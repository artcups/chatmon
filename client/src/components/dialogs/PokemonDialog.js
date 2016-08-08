import React, { PropTypes } from 'react'
import {
    Dialog,
    Button
} from 'react-onsenui';
import chatEnum from "../../static/chat"


export default class PokemonDialog extends React.Component{

    render(){
        const { setPokemonDialogShown, isPokemonDialogShown } = this.props;
        const options = Object.keys(chatEnum.pointOfInterest.pokemonDisplay).map((pokemon, index) => {
            return <option key={index} value={pokemon}>{chatEnum.pointOfInterest.pokemonDisplay[pokemon]}</option>;
        });

        return (
        <Dialog
            isOpen={isPokemonDialogShown}
            isCancelable={true}
            onCancel={() => setPokemonDialogShown(false)}>
            <div style={{textAlign: 'center', margin: '20px'}}>
                <p style={{opacity: 0.5}}>This is a dialog!</p>
                <select name="" id="">{options}</select>
                <p>
                    <Button onClick={() => setPokemonDialogShown(false)}>Close</Button>
                </p>
            </div>
        </Dialog>)
    }
}
