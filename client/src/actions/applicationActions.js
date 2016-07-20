import types from "./types"
export function setSidemenuState(isOpen){
    return { type: types.application.SET_SIDEMENU, data: isOpen}
}