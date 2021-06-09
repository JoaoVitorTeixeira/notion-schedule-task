import { Client } from "@notionhq/client";
import {
  CheckboxProperty,
  DateProperty,
  FormulaProperty,
  Property,
} from "@notionhq/client/build/src/api-types";
import DotEnv from "dotenv";

type BillsInfo = {
  NextDue: FormulaProperty;
  Done: CheckboxProperty;
  Due: DateProperty;
};

DotEnv.config();

(async () => {
  const notion = new Client({ auth: process.env.NOTION_AUTH });
  //console.log(await notion.users.list());
  const database = await notion.search({
    filter: { property: "object", value: "page" },
  });
  const billsInfo: BillsInfo = database.results[0].properties as any;
  const dateDue = new Date(billsInfo.Due.date.start);

  console.log(database.results[0].properties);

  console.log(
    await notion.pages.update({
      page_id: database.results[0].id,
      properties: {
        Due: {
          date: { start: "2021-07-10" },
          id: billsInfo.Due.id,
          type: "date",
        },
      },
    })
  );
})();
