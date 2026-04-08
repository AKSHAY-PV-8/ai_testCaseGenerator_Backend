import multer from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPath = path.join(__dirname, "../../uploads");

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, {recursive: true});
    console.log("Uploads folder created");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    }
})

export const upload = multer({storage})

