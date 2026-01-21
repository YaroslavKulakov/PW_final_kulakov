export type CreditCardData = {
  cardNumber: string;
  expiration: string; // MM/YYYY
  cvv: string;
  holder: string;
};

export function expirationPlusMonths(monthsToAdd: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsToAdd);

  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear());

  return `${mm}/${yyyy}`; // MM/YYYY
}

// “Dummy” card data for tests (expiration calculated once per test run)
export const dummyPaymentCardData: CreditCardData = {
  cardNumber: '1111-1111-1111-1111',
  expiration: expirationPlusMonths(3),
  cvv: '111',
  holder: 'Jane Doe',
};
