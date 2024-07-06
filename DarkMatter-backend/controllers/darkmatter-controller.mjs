import { darkMatter } from "../server.mjs";

export const listDarkMatterBlocks = (req, res, next) => {
    res.status(200).json({ success: true, data: darkMatter.chain });
}