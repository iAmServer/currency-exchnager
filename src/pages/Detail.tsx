import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSymbols } from "../api";
import Calculator from "../components/Calculator";
import ChartData from "../components/Chart";
import PageTitle from "../components/PageTitle";
import { IConvertPayload } from "../typings";

const Detail: React.FC = () => {
  const [payload, setPayload] = useState<IConvertPayload>();
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["getSymbols"],
    queryFn: getSymbols,
  });

  useEffect(() => {
    setPayload({
      from: params.from,
      to: params.to,
      amount: +params.amount || 0,
    });
  }, [params]);
  return (
    <>
      {payload && (
        <>
          <PageTitle
            title={`${payload.from} ${
              data && data.success ? " - " + data?.symbols[payload.from] : ""
            }`}
            showHome={true}
          />
          <Calculator data={payload} />
          <div className="chart">
            <ChartData base={payload.from} symbol={payload.to} />
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
