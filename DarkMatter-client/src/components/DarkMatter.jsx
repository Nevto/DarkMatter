import { useState } from "react"
import { getDarkMatterBlocks } from "../services/HttpClient"

export const GetDarkMatter = () => {
    const [darkMatterBlocks, setDarkMatterBlocks] = useState([])

    const darkMatterBlocksHandler = async () => {
        try {
            const blocks = await getDarkMatterBlocks()
            setDarkMatterBlocks(blocks.data)
            console.log('Dark Matter Blocks currently available blocks');
        } catch (error) {
            console.error('Error getting Dark Matter Blocks', error);
        }

    }

    return (
        <>
            <div className="blockWrapper">
                <h2>Dark Matter Blocks</h2>
                <p>Click the button below to view the available blocks</p>
                <button className='loginButton blockButton' onClick={darkMatterBlocksHandler}>View Blocks</button>
                <div className="blocksWrapper">
                    <div className="textWrapper">
                        {darkMatterBlocks.map((block, index) => (
                            <div key={index} className="block">
                                <h3>Block {index + 1}</h3>
                                <p>Hash: {block.hash}</p>
                                <p>PrevHash: {block.lastHash}</p>
                                <p>Timestamp: {block.timestamp}</p>
                                <p>Nonce: {block.nonce}</p>
                                <p>Difficulty: {block.difficulty}</p>
                                <p>Data: {JSON.stringify(block.data)}</p>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </>
    )
}