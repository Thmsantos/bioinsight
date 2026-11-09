import { RouteGenericInterface } from "fastify";
import { MultipartFile } from "@fastify/multipart";

interface DeleteInsightRequest extends RouteGenericInterface {
  Params: { id: string }
}
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
  DeleteInsightRequest, 
  GetInsightRequest,
  SaveInsightRequest
}