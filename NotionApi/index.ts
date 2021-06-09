import { Client } from "@notionhq/client";

export default class NotionApi extends Client {
  private static instance: Client;

  public static getInstance(): NotionApi {
    if (!NotionApi.instance) {
      NotionApi.instance = new Client({
        auth: process.env.NOTION_AUTH,
      });
    }

    return NotionApi.instance;
  }
}
