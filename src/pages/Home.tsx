import { useState } from "react";
import Calculator from "../components/Calculator";
import CurrencyCard from "../components/CurrencyCard";
import PageTitle from "../components/PageTitle";

const Home: React.FC<any> = () => {
  const [topRates, setTopRates] = useState<any[]>([]);

  return (
    <>
      <PageTitle title="Currency Converter" showHome={false} />
      <Calculator editable onSetTopRates={(rates) => setTopRates(rates)} />
      <div className="grid">
        {topRates &&
          topRates.map((item) => <CurrencyCard key={item.name} rate={item} />)}
      </div>
    </>
  );
};

export default Home;
