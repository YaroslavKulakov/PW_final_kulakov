//Converts price text like "$9.17" into number 9.17

export const parsePrice = (text: string): number => {
  return Number(text.replace(/[^0-9.]/g, ''));
};
