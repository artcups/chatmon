import types from "./types"


export function fetchPosition() {
  return function(dispatch) {
  //Google login window.nånting nånting then action boom

    dispatch({type: types.map.FETCH_POSITION_FETCHING})
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("success")
        dispatch({type: types.map.FETCH_POSITION_FULFILLED, data: position.coords})
      },
      (error) => {
        console.log("error")
        dispatch({type: types.map.FETCH_POSITION_ERROR, data: error.message})
      }, { timeout: 5000, enableHighAccuracy: true })
  }
}
