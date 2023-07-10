import { IConvertProps } from "../typings";
import { currencyFormat, convert } from "../utils";

interface Props {
  rate: IConvertProps;
}

const CurrencyCard: React.FC<Props> = ({ rate }) => {
  return (
    <div className="card">
      <p>
        {`${currencyFormat(1, rate.base)} to 
        ${currencyFormat(rate.rate, rate.name)}`}
      </p>

      <h4>{currencyFormat(convert(rate.rate, rate.amount), rate.name)}</h4>
    </div>
  );
};

export default CurrencyCard;
