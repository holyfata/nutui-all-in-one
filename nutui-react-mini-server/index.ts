import cors from "cors";
import fs from "node:fs";
import multer from "multer";
import path from "node:path";
import express, { type Request, type Response } from "express";

const app = express();

// 启用跨域资源共享
app.use(cors({
    origin: true,
    credentials: true
}));

// 配置 multer 中间件，上传文件保存到 ./files/ 目录
app.use(multer({ dest: './files/' }).any());

// 提供静态文件服务，访问 files 目录下的文件
app.use(express.static('files'));

// 根路由，返回 index.html 文件
app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// 文件上传接口
app.post("/upload", (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        // 未上传文件，返回错误
        res.status(400).json({ error: "No File Uploaded" });
    } else {
        const file = files[0]!;
        // 生成带原始扩展名的新文件名
        const filename = file.path + path.parse(file.originalname).ext;
        // 重命名文件，保留原始扩展名
        fs.rename(file.path, filename, (err) => {
            if (err) {
                // 文件保存失败，返回错误
                res.status(500).json({ error: "File Save Error" });
            } else {
                // 返回文件可访问的 URL
                const filePath = `http://127.0.0.1:3000/${path.basename(filename)}`;
                res.json({ filePath });
            }
        });
    }
});

// 启动服务器，监听 3000 端口
app.listen(3000, () => {
    console.log('NutUI React Mini Server is Running on http://127.0.0.1:3000...');
});
