import {
  CheckboxProperty,
  DateProperty,
  NumberProperty,
  Property,
} from "@notionhq/client/build/src/api-types";
import { DateTime } from "luxon";

type BillsInfo = {
  Done: { value: boolean; id: string };
  Due: { value: DateTime; id: string };
  RecurInterval: number;
};

export type PropertyTable = {
  [propertyName: string]: Property;
};

interface BillsBehavior {
  getBillsInfo(property: PropertyTable): BillsInfo;
}

export default class NotionAdapter implements BillsBehavior {
  constructor() {}
  public getBillsInfo(property: PropertyTable): BillsInfo {
    const done: CheckboxProperty = this.getProperty(property, "Done");
    const due: DateProperty = this.getProperty(property, "Due");
    const recurInterval: NumberProperty = this.getProperty(
      property,
      "RecurInterval"
    );

    if (done && due && recurInterval) {
      return {
        RecurInterval: recurInterval.number as any,
        Done: { id: done.id, value: done.checkbox as any },
        Due: {
          id: due.id,
          value: DateTime.fromFormat(
            due.date["start"],
            process.env.NOTION_DATE_FORMAT
          ),
        },
      };
    } else {
      return {} as any;
    }
  }

  private getProperty(obj: PropertyTable, key: keyof BillsInfo) {
    return obj[key] !== undefined ? (obj[key] as any) : null;
  }
}
