import { asyncHandler } from "../middleware/asyncHandler.mjs";

import { darkMatter, pubnubServer } from "../server.mjs";

export const mineBlock = asyncHandler(async (req, res, next) => {
    try {
        const data = req.body

        if (!data) {
            const err = new Error('Data is missing');
            err.statusCode = 400
            throw err
        }

        const newBlock = await darkMatter.addBlock({ data })



        pubnubServer.broadcast();

        res.status(201).json({
            success: true,
            data: newBlock
        });
    } catch (error) {
        next(error)
    }
});
