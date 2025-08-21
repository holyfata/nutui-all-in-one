import cors from "cors"
import fs from "node:fs";
import multer from "multer";
import path from "node:path";
import express, { type Request, type Response } from "express";

const app = express();

app.use(cors())
app.use(multer({ dest: './files/' }).any())
app.use(express.static('files'))

app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './index.html'))
})

app.post("/upload", (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        res.status(4000).send("No File Uploaded")
    } else {
        const file = files[0]
        const filename = file?.path + path.parse(file?.originalname!).ext
        fs.rename(file?.path!, filename, (err) => {
            if (err) {
                res.send(res)
            } else {
                res.send(`http://127.0.0.1:3000/${filename.replace('tmp\\', '')}`);
            }
        })
    }
})

app.listen(3000, () => {
    console.log('NutUI React Mini Server is Running on http://127.0.0.1:3000...')
})
