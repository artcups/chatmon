import React, { PropTypes, Component } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function';
import mindLogo from '../content/img/pokeball.png';

export default class MapIcon extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    render() {
        const K_WIDTH = 40;
        const K_HEIGHT = 40;
        const greatPlaceStyle = {
            // initially any map object has left top corner at lat lng coordinates
            // it's on you to set object origin to 0,0 coordinates
            position: 'absolute',
            width: K_WIDTH,
            height: K_HEIGHT,
            left: -K_WIDTH / 2,
            top: -K_HEIGHT,

        };
        return (
            <img src={mindLogo} style={greatPlaceStyle} />
        );
    }
}