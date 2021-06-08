import {Client} from '@notionhq/client'
import { CheckboxProperty, DateProperty, FormulaProperty, Property } from '@notionhq/client/build/src/api-types'

type BillsInfo = {
    NextDue: FormulaProperty
    Done: CheckboxProperty
    Due: DateProperty

}

(async () => {
    const notion = new Client({auth: 'secret_BoShGhDDwqXJ3wGKuP4Pzwmcfy686ec9WUaVR72pAhM'})
    //console.log(await notion.users.list());
    const database = await notion.search({filter: {property: 'object', value: 'page'}})
    const billsInfo: BillsInfo = database.results[0].properties as any
    const dateDue = new Date(billsInfo.Due.date.start)
    
    console.log(database.results[0].properties);
    
    console.log(await notion.pages.update({page_id: database.results[0].id, properties: {Due: {date: { start: '2021-07-10' }, id: billsInfo.Due.id, type: 'date'}}}));
})()
