import { useEffect, useState } from "react";

function useCurrencyInfo(currency, to) {
  const [data, setData] = useState(null); // Use `null` to differentiate between "no data yet" and "empty data".

  useEffect(() => {
    if (!currency || !to) {
      return; // Ensure both `currency` and `to` are provided before making the API call.
    }

    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_y9Op4R40yLLS3IhAbdlFevuNjx80pmvosSJAXYSM&currencies=${to.toUpperCase()}&base_currency=${currency.toUpperCase()}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch currency data");
        }
        return res.json();
      })
      .then((res) => {
        const currencyData = res.data[to.toUpperCase()];
        setData(currencyData);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
        setData(null); // Handle errors gracefully.
      });
  }, [currency, to]);

  console.log("data", data);

  return data;
}

export default useCurrencyInfo;
