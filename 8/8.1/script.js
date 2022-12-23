const market_price = document.querySelector("#market_price");
const deals_volume = document.querySelector("#deals_volume");
const deals_price = document.querySelector("#deals_price");
const price_change = document.querySelector("#price_change");

async function getDollarCourse() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
  const data = await response.json();

  return data.Valute.USD.Value;
}

async function fetchBitcoinData() {
  const response = await fetch("https://luky3.jinr.ru/bitcoin.json");
  const data = await response.json();
  return data;
}

async function updateData() {
  const bitCoinData = await fetchBitcoinData();
  const dollarCourse = await getDollarCourse();

  const market_price_rub = bitCoinData.market_price_usd * dollarCourse;
  const deals_price_btc = bitCoinData.trade_volume_btc;
  const deals_volume_rub = bitCoinData.trade_volume_usd * dollarCourse;
  const previous_deals_volume_rub = +localStorage.getItem("deals_volume_rub");

  market_price.innerHTML = market_price_rub.toFixed(2);
  deals_volume.innerHTML = deals_price_btc.toFixed(2);
  deals_price.innerHTML = deals_volume_rub.toFixed(2);

  price_change.innerHTML = previous_deals_volume_rub
    ? deals_volume_rub - previous_deals_volume_rub
    : "0";

  localStorage.setItem("deals_volume_rub", deals_volume_rub);
}

// обновляем каждую минуту
setInterval(updateData, 60000);
