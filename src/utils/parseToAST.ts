import fs from "fs";
import { parse } from "@babel/parser";


export const parseToAST = (filePath: string) => {
    const code = fs.readFileSync(filePath, "utf-8");

    return parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"]
    })
}