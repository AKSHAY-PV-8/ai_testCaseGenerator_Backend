import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.OPENAI_API_KEY){
    throw new Error("Open ai key is missing in .env");
}else{
    console.log("api is in env")
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});