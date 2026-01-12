declare module "firebase-functions/v2/https" {
  import type {IncomingMessage, ServerResponse} from "http";

  export type Request = IncomingMessage;
  export interface Response extends ServerResponse {
    send: (body: string) => void;
  }
  export const onRequest: (
    handler: (req: Request, res: Response) => void,
  ) => unknown;
}

declare module "firebase-functions/logger" {
  export const info: (message: string, meta?: Record<string, unknown>) => void;
}
