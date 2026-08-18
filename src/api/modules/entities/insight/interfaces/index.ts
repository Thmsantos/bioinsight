import { RouteGenericInterface } from "fastify";
import { MultipartFile } from "@fastify/multipart";

interface GetInsightRequest extends RouteGenericInterface {
  Params: { id: string }
}

interface SaveInsightRequest extends RouteGenericInterface {
  Body: {
    file?: MultipartFile;
    userId: string
  };
}

export { 
  GetInsightRequest,
  SaveInsightRequest
}