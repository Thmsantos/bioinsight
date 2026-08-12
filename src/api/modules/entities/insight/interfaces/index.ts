import { RouteGenericInterface } from "fastify";
import { MultipartFile } from "@fastify/multipart";

interface SaveInsightRequest extends RouteGenericInterface {
  Body: {
    file?: MultipartFile;
    userId: string
  };
}

export { SaveInsightRequest };