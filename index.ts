import { Client } from "@notionhq/client";
import { PropertyMap } from "@notionhq/client/build/src/api-endpoints";
import {
  CheckboxProperty,
  DateProperty,
  FormulaProperty,
} from "@notionhq/client/build/src/api-types";
import DotEnv from "dotenv";
import { Duration } from "luxon";
import NotionAdapter, { PropertyTable } from "./NotionAdapter";
import NotionApi from "./NotionApi";

type BillsInfo = {
  NextDue: FormulaProperty;
  Done: CheckboxProperty;
  Due: DateProperty;
};

DotEnv.config();

(async () => {
  const notion = NotionApi.getInstance();
  const database = await notion.search({
    filter: { property: "object", value: "page" },
  });
  const result = database.results.map(async (page) => {
    const pageId = page.id;
    const { Done, Due, RecurInterval } = new NotionAdapter().getBillsInfo(
      page.properties as PropertyMap
    );

    if (Done && Done.value) {
      const newDate = Due.value
        .plus(Duration.fromObject({ days: RecurInterval }))
        .toFormat(process.env.NOTION_DATE_FORMAT);

      await notion.pages.update({
        page_id: pageId,
        properties: {
          Due: {
            date: { start: newDate },
            id: Due.id,
            type: "date",
          },
          Done: {
            id: Done.id,
            checkbox: false,
            type: "checkbox",
          },
        },
      });
    }
  });

  try {
    await Promise.all(result);
  } catch (err) {
    console.log(err);
  }
})();
