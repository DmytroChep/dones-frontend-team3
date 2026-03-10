import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import path from "path";
import { env } from "process";

export const ENV = {
	NOVAPOSTTOKEN: env.NOVAPOSTTOKEN,
};
