import { getLiriumBlocks } from "../services/HttpClient";

const retrieveLiriumBlocks = ({ loadLiriumBlocks }) => {
    const handleLoadLiriumBlocks = async () => {
        const liriumBlocks = await getLiriumBlocks(loadLiriumBlocks);
    }

    return (
        <button onClick={handleLoadLiriumBlocks}> Retrieve Blockchain Data</button>
    )
}

export default retrieveLiriumBlocks