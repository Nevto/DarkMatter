import { mineBlock } from "../services/HttpClient"

export const MineBlock = () => {
    const handleMineClick = async () => {
        try {
            await mineBlock();
            console.log('Block mined successfully');
        } catch (error) {
            console.error('Error mining block', error);
        }
    }
    return (
        <>
            <h2>Mine your transactions</h2>
            <p>Click the button below to make them permanent in the blockchain</p>
            <button onClick={handleMineClick}>Mine</button>
        </>
    )
}