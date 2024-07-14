import { useState } from "react";
import { mineBlock } from "../services/HttpClient"

export const MineBlock = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    const handleMineClick = async () => {
        try {
            await mineBlock();
            setSuccessMessage('Block successfully mined, go to the blocks page to view your newely mined block!')
        } catch (error) {
            console.error('Error mining block', error);
            setError('Error mining block, please try again');
        }
    }
    return (
        <>
            <div className="mineWrapper">
                <h2>Mine your transactions</h2>
                <p>Click the button below to make them permanent in the blockchain</p>
                <button className="loginButton" onClick={handleMineClick}>Mine</button>
                {<p style={{ color: 'white' }}>{successMessage}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>
        </>
    )
}