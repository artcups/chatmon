
/*
 * Base Google Map example
 */
import React, {PropTypes, Component} from 'react';

import GoogleMap from 'google-map-react';

import MapIcon from './MapIcon.js';
import shouldPureComponentUpdate from 'react-pure-render/function';


export default class Map extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        greatPlaceCoords: PropTypes.any,
        onChildClick: PropTypes.func,
    };
    static defaultProps = {
        center: [59.485951, 17.8539388],
        zoom: 11,
        greatPlaceCoords: {lat: 59.3963944, lng: 17.8515504}
    };

    constructor(props) {
        super(props);
    }
    _onChildClick = (key, childProps) => {
        const markerId = childProps.marker.get('id');
        const index = this.props.markers.findIndex(m => m.get('id') === markerId);
        if (this.props.onChildClick) {
            this.props.onChildClick(index);
        }
    }
    resize(a, d) {
        debugger;
        if(typeof google !== 'undefined') {
            let map = this.refs.googleMaps.map_;
            google.maps.event.trigger(map, 'resize');
            map.setZoom(map.getZoom());

        }

    }
    shouldComponentUpdate = shouldPureComponentUpdate;
    getDimensions() {
        // Do some stuff here to return dimensions
        debugger;

        let style = {
            width: "436px",
            height: "724px"
        }
        return style;
    };
    // _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)
    render() {
        const Cords = this.props.markers.latestMessage.pointsOfInterest.content.map((cord, i) => <MapIcon key={i} lat={cord.lat} lng={cord.lng} onClick={this._onClick} />);
        const key = "AIzaSyAMUqHJyxbFqkQbdYEizz_TNGZ_mUcAujw";
        const style = this.getDimensions();
        return (
            <div ref="mapContainer" >
                <GoogleMap
                    style={style}
                    ref="googleMaps"
                    bootstrapURLKeys={{key: key}} // set if you need stats etc ...
                    center={this.props.center}
                    zoom={this.props.zoom}>
                    {Cords}
                    <MapIcon lat={59.326633} lng={18.071737} text={'A'} /* Kreyser Avrora */ />
                    <MapIcon {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
                </GoogleMap>
            </div>

        );
    }
}