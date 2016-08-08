import React, { PropTypes } from 'react'
import {
    Dialog,
    Button
} from 'react-onsenui';

export default class PokestopDialog extends React.Component{

    render(){
        const { setPokestopDialogShown, isPokestopDialogShown } = this.props;
        return (
        <Dialog
            isOpen={isPokestopDialogShown}
            isCancelable={true}
            onCancel={() => setPokestopDialogShown(false)}>
            <div style={{textAlign: 'center', margin: '20px'}}>
                <p style={{opacity: 0.5}}>This is a dialog!</p>
                <p>
                    <Button onClick={() => setPokestopDialogShown(false)}>Close</Button>
                </p>
            </div>
        </Dialog>)
    }
}
