import { backdatedMonth } from "./../utils/index";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_FIXER_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const TOP_TEN = import.meta.env.VITE_TOP_TEN;

export const getSymbols = async () => {
  const { data } = await axios({
    baseURL: BASE_URL,
    url: "symbols",
    method: "GET",
    params: {
      access_key: API_KEY,
    },
  });

  return data;
};

export const getHistorical = async (base: string, to: string) => {
  const { data } = await axios({
    baseURL: BASE_URL,
    url: new Date().toISOString().split("T")[0].toString(),
    method: "GET",
    params: {
      access_key: API_KEY,
      base,
      symbols: `${to},${TOP_TEN}`,
    },
  });

  return data;
};

export const getChart = async (base: string, to: string) => {
  const chart: {
    date: string;
    rate: string;
  }[] = [];
  const dates = backdatedMonth(12);

  const requests = dates.map(async (item) => {
    const { data } = await axios({
      baseURL: BASE_URL,
      url: item,
      method: "GET",
      params: {
        access_key: API_KEY,
        base,
        symbols: `${to}`,
      },
    });

    console.log(data.rates[to]);
    return {
      date: item,
      rate: data?.rates[to],
    };
  });

  const results = await Promise.all(requests);
  console.log(results);
  const filteredResults = results?.filter(
    (result) => result.rate !== undefined
  );
  chart.push(...filteredResults);

  return chart;
};
