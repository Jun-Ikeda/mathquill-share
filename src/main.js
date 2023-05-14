const doGet = () => include('src/index');

const include = filename =>
  HtmlService.createHtmlOutputFromFile(filename).getContent();
