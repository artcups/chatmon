import React, {PropTypes, Component} from 'react';
import GoogleMap from 'google-map-react';
import { triggerEvent } from "react-google-maps/lib/utils";

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
    componentDidResized () {
        triggerEvent(this._googleMapComponent, "resize");
    }
    triggerEvent(component, ...args) {
        const instance = null /* some magic to get Google Maps instance from react-google-maps component */;
        return google.maps.event.trigger(instance, ...args);
    }
    resize(a, d) {
        debugger;
        let map = this.googleMapRef_;
            map._setViewSize();

        this.props.changeMapCenter({latitude: 50, longitude: 50})

        window.google.maps.event.trigger(this.googleMapRef_, "resize")
        map.map_.setZoom(map.map_.getZoom());

    }
    shouldComponentUpdate = shouldPureComponentUpdate;
    //_onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event)
    render() {
        const Cords = [
                {title: "Title", lat: 59.34541678, lng: 18.1822184},
                {title: "Title", lat: 59.36392828, lng: 18.05248107},
                {title: "Title", lat: 59.29262043, lng: 18.09982699},
                {title: "Title", lat: 59.37168456, lng: 17.94860701},
                {title: "Title", lat: 59.32854157, lng: 18.14709156},
                {title: "Title", lat: 59.3655718, lng: 17.98080168},
                {title: "Title", lat: 59.37156078, lng: 18.06419743},
                {title: "Title", lat: 59.28866218, lng: 18.00586609},
                {title: "Title", lat: 59.24203335, lng: 18.03614352},
                {title: "Title", lat: 59.2657605, lng: 18.09346632}
                    ].map((cord, i) => <MapIcon key={i} lat={cord.lat} lng={cord.lng} onClick={this._onClick} />);
        //const Cords = this.props.markers.latestMessage.pointsOfInterest.content.map((cord, i) => <MapIcon key={i} lat={cord.lat} lng={cord.lng} onClick={this._onClick} />);
        const key = "AIzaSyAMUqHJyxbFqkQbdYEizz_TNGZ_mUcAujw";
        return (<GoogleMap
                className="tabContent"
                    bootstrapURLKeys={{key: key}} // set if you need stats etc ...
                    center={[this.props.position.latitude, this.props.position.longitude]}
                    zoom={this.props.zoom}
                    ref={r => this.googleMapRef_ = r}>
                    {Cords}
                    <MapIcon lat={59.326633} lng={18.071737} text={'A'} /* Kreyser Avrora */ />
                    <MapIcon {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
                </GoogleMap>
        );
    }
}