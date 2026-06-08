import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

try {

  const result =
    await yahooFinance.quote("0050.TW");

  console.log(result);

}
catch(err){

  console.error(err);

}