import types from "./types"
export function toggleSideMenu(){
    return { type: types.application.TOGGLE_SIDEMENU, data: ""}
}
export function setChannelJoinDialogState(isOpen){
    return { type: types.application.SET_CHANNELJOINDIALOG, data: isOpen}
}