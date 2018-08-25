import React, { Component } from "react";
import Store from "../../store";
import { getCurrencyBalance, sell, update_auth,buy } from "./helper";
import { withScatter, eosNetwork } from "../scatter";

const commonStatus = {
    "NO_SCATTER": 'no-scatter',
    "NOT_LOGIN": 'not-login',
    "LOGINED": 'logined',
}

class Logined extends Component {
    state = { tokenList: [], userHoldToken: {} }
    network = eosNetwork['local']

    isLogined() {
        const { scatter } = this.props
        return scatter && scatter.identity !== null
    }

    isScatterLoaded() {
        return this.props.scatter !== null
    }

    componentDidMount() {
        const account_name = this.props.store.get('id').name
        getCurrencyBalance({ account_name })
            .then(tokenList => {
                const userHoldToken = {}
                tokenList.forEach(
                    t => userHoldToken[t.symbol] = t.amount
                )

                this.setState({ tokenList, userHoldToken });
            })

    }

    async signOut() {
        const { scatter } = this.props
        try {
            await scatter.forgetIdentity(this.network)
            this.props.store.set('id')(null)
        } catch (error) {

        }
    }

    async updateAuth() {
        const { scatter, store } = this.props
        const account_name = store.get('id').name
        update_auth({ scatter, account_name })
    }

    async buy() {
        const { store } = this.props
        const target = prompt(`How much do you want to buy?`)
        const total_eos = prompt(`To exchange how much EOS?`)
        const account_name = store.get('id').name
        const scatter = store.get('scatter')
        buy({ account_name, target, total_eos, scatter })
    }
    async sell() {
        const { store } = this.props
        const target = prompt(`How much do you want to sell?`)
        const total_eos = prompt(`To exchange how much EOS?`)
        const account_name = store.get('id').name
        const scatter = store.get('scatter')
        sell({ account_name, target, total_eos, scatter })
    }

    render() {
        const { store } = this.props
        const { tokenList } = this.state
        return (
            <div className="logined">
                <h1 className="title">Welcome back, {store.get('id').name} !</h1>
                <h2 className="subtitle">You have {tokenList.map(JSON.stringify).join(", ")} in your account.</h2>
                <button className="button" onClick={() => this.signOut()}> 忘了我吧 </button>
                <button className="button" onClick={() => this.updateAuth()}> 授权合约 </button>
                <button className="button" onClick={() => this.sell()}> 卖币 </button>
                <button className="button" onClick={() => this.buy()}> 买币 </button>
            </div>
        )
    }
}

export default Store.withStore(withScatter(Logined))