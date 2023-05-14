const doGet = () => HtmlService.createTemplateFromFile("index").evaluate().setHeight(300);

const fetchEqByEqID = eqID => {
  const now = (new Date()).getTime()
  let eq = { id: Utilities.getUuid(), createdAt: now, usedAt: now, saveFor: 0, latex: "", };
  if (eqID != undefined) {
    const sheet = SpreadsheetApp.openById("1rp1XaKwpgYraid3aO2wjGoje3R_E60Hb200EL-ZFu14").getSheetByName("eqList");
    const ids = sheet.getRange(2, 1, 10000).getValues();
    const idx = 2 + ids.findIndex(row => row[0] === eqID); // if findIndex returns 0, that means 2 in the spreadsheet
    if (idx > 1) {
      const eqArray = sheet.getRange(idx, 1, 1, 5).getValues()[0];
      eq = { id: eqArray[0], createdAt: eqArray[1], usedAt: now, saveFor: eqArray[3], latex: eqArray[4] }
    }
  }
  return eq;
}

const save = eq => {
  const sheet = SpreadsheetApp.openById("1rp1XaKwpgYraid3aO2wjGoje3R_E60Hb200EL-ZFu14").getSheetByName("eqList");
  const ids = sheet.getRange(2, 1, 10000).getValues();
  let idx = 2 + ids.findIndex(row => row[0] === eq.id); // if findIndex returns 0, that means 2 in the spreadsheet
  idx = idx > 1 ? idx : sheet.getLastRow() + 1;
  sheet.getRange(idx, 1).setValue(eq.id);
  sheet.getRange(idx, 2).setValue(eq.createdAt);
  sheet.getRange(idx, 3).setValue(eq.usedAt);
  sheet.getRange(idx, 4).setValue(eq.saveFor);
  sheet.getRange(idx, 5).setValue(eq.latex);
  return eq.id;
}


const test = () => {
  console.log((new Date()).getTime());
  console.log(fetchEqByEqID("errorwokaesuhazunoid"))
}
