import React, {PropTypes, Component} from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as canUseDOM } from "can-use-dom";
import chatEnum from "../static/chat"
import mindLogo from '../content/img/pokeball.png';
import {
    SpeedDial,
    SpeedDialItem,
    Fab,
    Icon,
    Dialog,
    Button
} from 'react-onsenui';
import ons from 'onsenui';

//components
import PokestopDialog from '../components/dialogs/PokestopDialog';
import GymDialog from '../components/dialogs/GymDialog';
import PokemonDialog from '../components/dialogs/PokemonDialog';

export default class NewMap extends Component {

    constructor(props, context) {
        super(props, context);
        //this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
    }

    componentDidMount() {
        if (!canUseDOM) {
            return;
        }
        window.addEventListener(`resize`, this.handleWindowResize.bind(this));
    }

    componentWillUnmount() {
        if (!canUseDOM) {
            return;
        }
        window.removeEventListener(`resize`, this.handleWindowResize.bind(this));
    }

    handleWindowResize() {
        console.log(`handleWindowResize`, this.googleMapRef_);
        triggerEvent(this.googleMapRef_, `resize`);
        this.props.changeMapCenter({latitude: this.props.position.latitude + 0.00000001, longitude: this.props.position.longitude + 0.00000001})
    }
    componentDidResized () {
        let map = this.googleMapRef_;
        triggerEvent(map, "resize");
        this.props.changeMapCenter({latitude: this.props.position.latitude + 0.00000001, longitude: this.props.position.longitude + 0.00000001})
    }
    triggerEvent (component, ...args) {
        const instance = null /* some magic to get Google Maps instance from react-google-maps component */;
        return maps.event.trigger(instance, ...args);

    }
    render() {
        const { position, pointOfInterests, setPokestopDialogShown, setGymDialogShown, setPokemonDialogShown, isPokestopDialogShown, isGymDialogShown, isPokemonDialogShown, sendPio} = this.props;
        const Cords = pointOfInterests.map((poi, index) => {
            let content = poi.content.split("|");

            let pokemonImg = "";
            if(content[0] === chatEnum.pointOfInterest.type.GYM)
                console.log("1")
            else if(content[0] === chatEnum.pointOfInterest.type.POKESTOP)
                console.log("2")
            else if(content[0] === chatEnum.pointOfInterest.type.POKEMON){
                pokemonImg = chatEnum.pointOfInterest.pokemonImages[content[1]];
            }

            let img = pokemonImg == "" ? mindLogo : pokemonImg;
            return {position: { lat: poi.lat,  lng: poi.lng }, key: index, icon:{
                        size: new google.maps.Size(30, 30),
                        scaledSize: new google.maps.Size(30, 30),
                        url: "data:image/png;base64,"+img
                    }}
        })

        return (<div>
                <GymDialog
                    setGymDialogShown={setGymDialogShown}
                    isGymDialogShown={isGymDialogShown}
                />
                <PokestopDialog
                    setPokestopDialogShown={setPokestopDialogShown}
                    isPokestopDialogShown={isPokestopDialogShown}
                />
                <PokemonDialog
                    setPokemonDialogShown={setPokemonDialogShown}
                    isPokemonDialogShown={isPokemonDialogShown}
                />


                <GoogleMapLoader
                    containerElement={
                  <div
                    style={{
                      height: `100%`,
                    }}
                  />
                }
                    googleMapElement={
          <GoogleMap
                    ref={r => this.googleMapRef_ = r}
                    defaultZoom={11}
                    options={{
                        disableDefaultUI: true
                    }}
                    center={{lat: position.latitude, lng: position.longitude}} >
            {Cords.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                />
              );
            })}
          </GoogleMap>
        }
                />
            <SpeedDial disabled={false} direction='up' onClick={() => console.log('test1')} position='right bottom'>
                <Fab>
                    <Icon icon='fa-globe' fixedWidth={false} style={{verticalAlign: 'middle'}} />
                </Fab>
                <SpeedDialItem onClick={() => ons.notification.confirm({message: "Are you sure you want to place a gym at your location?", cancelable: true, callback: () => sendPio(chatEnum.pointOfInterest.type.GYM + "|-1"), title: "Gym location"})}> <Icon icon='fa-globe' fixedWidth={false} style={{verticalAlign: 'middle'}} /> </SpeedDialItem>
                <SpeedDialItem onClick={() => ons.notification.confirm({message: "Are you sure you want to place a pokestop at your location?", cancelable: true, callback: () => sendPio(chatEnum.pointOfInterest.type.POKESTOP + "|-1"), title: "Pokestop location"})}> <Icon icon='fa-globe' fixedWidth={false} style={{verticalAlign: 'middle'}} /> </SpeedDialItem>
                <SpeedDialItem onClick={() => setPokemonDialogShown(true)}> <Icon icon='fa-globe' fixedWidth={false} style={{verticalAlign: 'middle'}} /> </SpeedDialItem>
            </SpeedDial>
            </div>

        );
    }
}