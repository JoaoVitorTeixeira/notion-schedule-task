import { Client } from "@notionhq/client";

export default class NotionApi extends Client {
  private static instance: Client;

  public static getInstance(): NotionApi {
    if (!NotionApi.instance) {
      NotionApi.instance = new Client({
        auth: "secret_BoShGhDDwqXJ3wGKuP4Pzwmcfy686ec9WUaVR72pAhM",
      });
    }

    return NotionApi.instance;
  }
}
