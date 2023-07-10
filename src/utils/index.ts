export const currencyFormat = (value: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export const convert = (rate: number, amount: number) => rate * amount;

export const getOptions = (symbols: Record<string, string>) =>
  Object.entries(symbols).map(([key]) => ({ label: key, value: key }));

export const backdatedMonth = (count: number): string[] => {
  const currentDate: Date = new Date();
  const lastDaysOfMonths: string[] = [];

  for (let i = count; i > 0; i--) {
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() - i;
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);

    if (i === 1 && lastDayOfMonth > currentDate) {
      lastDaysOfMonths.push(currentDate.toISOString().split("T")[0]);
    } else {
      const formattedDate = lastDayOfMonth.toISOString().split("T")[0];

      lastDaysOfMonths.push(formattedDate);
    }
  }

  return lastDaysOfMonths;
};
