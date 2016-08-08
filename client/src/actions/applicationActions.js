import types from "../static/types"
export function toggleSideMenu(){
    return { type: types.application.TOGGLE_SIDEMENU, data: ""}
}
export function setSideMenuShown(shown){
    return { type: types.application.SET_SIDE_MENU_SHOWN, data: shown}
}
export function setChannelJoinDialogState(isOpen){
    return { type: types.application.SET_CHANNELJOINDIALOG, data: isOpen}
}
export function setPokestopDialogShown(isShown){
    return { type: types.application.SET_POKESTOP_DIALOG_SHOWN, data: isShown}
}
export function setGymDialogShown(isShown){
    return { type: types.application.SET_GYM_DIALOG_SHOWN, data: isShown}
}
export function setPokemonDialogShown(isShown){
    return { type: types.application.SET_POKEMON_DIALOG_SHOWN, data: isShown}
}
export function setSideMenuSwipeAble(swipeAble){
    return { type: types.application.SET_SIDE_MENU_SWIPE_ABLE, data: swipeAble}
}

