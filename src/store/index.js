import { createConnectedStore } from 'undux'
import effects from './MyEffects'

// Declare your store's initial state.
const initialState = {
  id: null,
  scatter: null
}

const Store = createConnectedStore(
  initialState, effects
)

// Create & export a store with an initial value.
export let { withStore, Container } = Store
export default Store