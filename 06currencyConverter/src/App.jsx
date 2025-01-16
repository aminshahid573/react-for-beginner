import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from, to);

  const options = [
    "AFN", "EUR", "ALL", "AMD", "AUD", "AWG", "AZN", "BSD", "BHD", "BDT",
    "BBD", "BYN", "BZD", "BMD", "BOB", "BAM", "BWP", "BRL", "BND", "BGN",
    "BIF", "CAD", "CVE", "KYD", "XAF", "CLP", "CNY", "COP", "KMF", "CRC",
    "HRK", "CUP", "CZK", "DKK", "DJF", "DOP", "EGP", "ERN", "ETB", "FJD",
    "GMD", "GEL", "GHS", "GIP", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD",
    "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "JMD", "JPY", "JOD",
    "KZT", "KES", "KPW", "KRW", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD",
    "LYD", "MOP", "MWK", "MYR", "MVR", "MRU", "MUR", "MXN", "MDL", "MNT",
    "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "NZD", "NIO", "NGN", "NOK",
    "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON",
    "RUB", "RWF", "SHP", "WST", "STN", "SAR", "RSD", "SCR", "SLL", "SGD",
    "ANG", "SBD", "SOS", "ZAR", "LKR", "SDG", "SRD", "SZL", "SEK", "CHF",
    "SYP", "TWD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT",
    "UGX", "UAH", "AED", "GBP", "USD", "UYU", "UZS", "VUV", "VES", "VND",
    "YER", "ZMW", "ZWL"
  ];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo?.value) {
      setConvertedAmount(amount * currencyInfo.value);
    } else {
      alert("Currency information not available. Please try again.");
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(value) => setAmount(value)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
