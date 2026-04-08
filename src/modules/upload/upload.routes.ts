import { Router } from "express";
import { upload } from "../../config/multer.js";
import { uploadFile } from "./upload.controller.js";


const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), uploadFile);

export default uploadRouter;