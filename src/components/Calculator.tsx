import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistorical, getSymbols } from "../api";
import { IConvertPayload, IConvertProps } from "../typings";
import { currencyFormat, convert, getOptions } from "../utils";

interface Props {
  editable?: boolean;
  onSetTopRates?: (rates: IConvertProps[]) => void;
  data?: IConvertPayload;
}

const Calculator: React.FC<Props> = ({ onSetTopRates, editable, data }) => {
  const [payload, setPayload] = useState<IConvertPayload>({
    to: "USD",
    from: "EUR",
    amount: 0,
  });
  const [fixerRate, setFixerRate] = useState<number>(0);
  const [totalConversion, setTotalConversion] = useState<number>(0);

  const { data: symbols, status: symbolStatus } = useQuery({
    queryKey: ["getSymbols"],
    queryFn: getSymbols,
  });

  const { data: historical } = useQuery({
    enabled: symbolStatus === "success",
    queryKey: ["getHistorical", payload?.from, payload?.to],
    queryFn: () => getHistorical(payload?.from, payload?.to),
  });

  const handleInputChange = (name: string, value: any) => {
    setPayload((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSwap = () => {
    const swap = {
      from: payload?.to,
      to: payload?.from,
      amount: payload?.amount,
    };

    setPayload(swap);
    setTotalConversion(0);
  };

  const convertOther = () => {
    const newRates: Record<string, number> = historical?.rates;

    delete newRates[payload.from];

    onSetTopRates?.(
      Object.entries(newRates).map(([key, rate]) => ({
        name: key,
        rate,
        base: payload.from,
        amount: payload.amount,
      }))
    );
  };

  useEffect(() => {
    if (data) {
      setPayload(data);
    }
  }, [data]);

  useEffect(() => {
    if (historical?.success && historical?.rates) {
      const data: number = historical.rates[payload.to];

      setFixerRate(data);
      convertOther();
    }
  }, [historical]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTotalConversion(convert(fixerRate, payload.amount));

    convertOther();
  };

  return (
    <div className="calculator">
      <form className="calculator-container">
        <div className="item actions1">
          <input
            type="number"
            value={payload.amount}
            className="full-width"
            onChange={(e) => handleInputChange("amount", e.target.value)}
          />

          <div className="m-top">
            <p>{currencyFormat(fixerRate, payload.to)}</p>
          </div>
        </div>
        <div className="item">
          <div>
            <div className="actions">
              <select
                disabled={!editable}
                value={payload.from}
                onChange={(e) => handleInputChange("from", e.target.value)}
              >
                {symbols &&
                  symbols.success &&
                  getOptions(symbols.symbols).map((symbol) => (
                    <option key={symbol.value}>{symbol.label}</option>
                  ))}
              </select>
              <button
                type="button"
                disabled={!editable}
                onClick={(e) => {
                  e.preventDefault();

                  handleSwap();
                }}
              >
                Swap
              </button>
              <select
                value={payload.to}
                onChange={(e) => handleInputChange("to", e.target.value)}
              >
                {symbols &&
                  symbols.success &&
                  getOptions(symbols.symbols).map((symbol) => (
                    <option key={symbol.value}>{symbol.label}</option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="full-width m-top"
              disabled={!historical?.success}
              onClick={handleSubmit}
            >
              Convert
            </button>
            <div className="sub-actions">
              <p>{currencyFormat(totalConversion, payload.to)}</p>
              {editable && (
                <Link
                  to={`/detail/${payload.from}/${payload.to}/${payload.amount}`}
                >
                  More Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Calculator;
