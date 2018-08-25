import React, { Component } from "react";
import Logined from "./logined.jsx";
import { withStore } from "../../store";
import { withScatter, eosNetwork } from "../scatter";

const commonStatus = {
    "NO_SCATTER": 'no-scatter',
    "NOT_LOGIN": 'not-login',
    "LOGINED": 'logined',
}

class User extends Component {
    network = eosNetwork['local']

    isLogined() {
        const { store } = this.props
        return store.get('id') !== null
    }

    isScatterLoaded() {
        return this.props.scatter !== null
    }

    async requestIdentity() {
        const { scatter } = this.props
        try {
            await scatter.suggestNetwork(this.network)
        } catch (error) {
            console.info('User canceled to suggestNetwork')
            return;
        }
        scatter.getIdentity(
            { accounts: [this.network] }
        ).then(({accounts}) => {
            this.props.store.set('id')(accounts[0])
        }).catch(error => {
            console.error(error.message)
            //...
        });
    }

    async signOut() {
        const { scatter } = this.props
        try {
            await scatter.forgetIdentity(this.network)
        } catch (error) {
        }
    }

    render() {
        var userStatus = commonStatus.NO_SCATTER;
        if (this.isScatterLoaded()) {
            userStatus = commonStatus.NOT_LOGIN
        }
        if (this.isLogined()) {
            userStatus = commonStatus.LOGINED
        }

        switch (userStatus) {
            default:
                return <div className="no-scatter">
                    <button className="button" disabled> 正在加载 Scatter </button>
                    <p className="tips"> 如果你还没有安装 Scatter,
                    <a href="https://get-scatter.com/" rel="noopener noreferrer" target="_blank">获得 Scatter</a>
                    </p>
                </div>
            case commonStatus.NOT_LOGIN:
                return <div className="login">
                    <button className="button" onClick={() => this.requestIdentity()}> 用 Scatter 登录 </button>
                </div>
            case commonStatus.LOGINED:
                return <Logined {...this.props}/>
        }
    }
}

export default withStore(withScatter(User))