import { MineBlock } from "../components/MineBlock"
import { SendTransaction } from "../components/SendTransaction"

export const Transactions = () => {
    return (
        <div>
            <SendTransaction />
            <MineBlock />
        </div>
    )
}