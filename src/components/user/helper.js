import Eos from "eosjs";
import { eosOptions, eosNetwork } from "../scatter";
const network = eosNetwork['local']
const eosOption = eosOptions["local"];
const requiredFields = { accounts: [network] };
const eosClient = Eos(eosOption);

export async function getCurrencyBalance({ symbol, account_name }) {
    try {
        const tokens = await eosClient
            .getCurrencyBalance({
                code: "eosio.token",
                account: account_name,
                symbol
            })
        return tokens.map(token => {
            const [amount, symbol] = token.split(' ')
            return { amount, symbol }
        })
    } catch (error) {
        throw new Error(error)
    }
}
export async function update_auth({ scatter, account_name }) {
    const eos = scatter.eos(network, Eos, {})
    await eos.updateauth({
        account: account_name,
        permission: "active",
        parent: "owner",
        auth: {
            threshold: 1,
            keys: [
                {
                    key: "EOS52RoHiJhnnMXL29QmfoYZXXhfgtXfy77xd3p5oULmkPYNHgdYJ",
                    weight: 1
                }
            ],
            accounts: [
                {
                    permission: {
                        actor: "pomelo",
                        permission: "eosio.code"
                    },
                    weight: 1
                }
            ]
        }
    });
}
export async function sell({ account_name, target, total_eos, scatter }) {
    try {
        const eos = scatter.eos(network, Eos, {})
        const contract = await eos.contract("pomelo", { requiredFields })
        contract.sell(account_name, target, total_eos, {
            authorization: [`${account_name}@active`]
        })
    } catch (error) {
        throw new Error(error)
    }
}
export async function buy({ account_name, target, total_eos, scatter }) {
    try {
        const eos = scatter.eos(network, Eos, {})
        const contract = await eos.contract("pomelo", { requiredFields })
        contract.buy(account_name, target, total_eos, {
            authorization: [`${account_name}@active`]
        })
    } catch (error) {
        throw new Error(error)
    }
}
