import { withLogger, withReduxDevtools } from 'undux'
let effects = (store) => {
  // Magic happened, it support redux devtool and print mutation on console
  withReduxDevtools(store)
  withLogger(store)
  // Self defined Logic Here
  store.on('buttonText')
    .subscribe(buttonText =>
      console.log('The user updated buttonText to', buttonText)
    )
  return store
}

export default effects