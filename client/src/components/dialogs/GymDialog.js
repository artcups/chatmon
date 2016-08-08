import React, { PropTypes } from 'react'
import {
    Dialog,
    Button
} from 'react-onsenui';

export default class GymDialog extends React.Component{

    render(){
        const { setGymDialogShown, isGymDialogShown } = this.props;
        return (
        <Dialog
            isOpen={isGymDialogShown}
            isCancelable={true}
            onCancel={() => setGymDialogShown(false)}>
            <div style={{textAlign: 'center', margin: '20px'}}>
                <p style={{opacity: 0.5}}>This is a dialog!</p>
                <p>
                    <Button onClick={() => setGymDialogShown(false)}>Close</Button>
                </p>
            </div>
        </Dialog>)
    }
}
