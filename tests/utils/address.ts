export type AddressData = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export const defaultAddress: AddressData = {
  street: 'Test street',
  city: 'Kyiv',
  state: 'Kyiv',
  country: 'Ukraine',
  postalCode: '01001',
};
