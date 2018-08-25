import React, { Component } from 'react';
import commonNetwork from "./networks.json";
import eosjsOptions from "./eosOptions.json";

export const eosNetwork = commonNetwork
export const eosOptions = eosjsOptions

const { Consumer, Provider } = React.createContext(null);

export const withScatter = (Component) => {
    // Avoid Unknown Component by assign a name for it
    const ScatterConsumer = (props) => (
        <Consumer>
            {
                scatter =>
                    (<Component {...props} scatter={scatter} />)
            }
        </Consumer>
    )
    return ScatterConsumer
}

export class ScatterProvider extends Component {
    // We do all those scatter dirty job here
    state = { scatter: null }

    componentWillMount() {
        // Listen to Scatter Loading
        document.addEventListener('scatterLoaded', () => {
            const scatter = window.scatter
            this.setState({ scatter })
            // It is good practice to take this off the window 
            // once you have a reference to it. @GetScatter Team
            window.scatter = null
        })
    }

    render() {
        return (
            <Provider value={this.state.scatter}>
                {this.props.children(this.state)}
            </Provider>
        )
    }
}