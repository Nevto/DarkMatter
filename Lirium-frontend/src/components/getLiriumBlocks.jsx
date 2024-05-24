import { getLiriumBlocks } from "../services/HttpClient";

const RetrieveLiriumBlocks = ({ loadLiriumBlocks }) => {
    const handleLoadLiriumBlocks = async () => {
        const liriumBlocks = await getLiriumBlocks();
        loadLiriumBlocks(liriumBlocks);
    }

    return (
        <button onClick={handleLoadLiriumBlocks}> Retrieve Blockchain Data</button>
    )
}

export default RetrieveLiriumBlocks