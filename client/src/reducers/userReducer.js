export default function reducer(state={
    user: {
      id: null,
      name: null,
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "SET_USER": {
        return {...state, user: action.data}
      }
    }

    return state
}