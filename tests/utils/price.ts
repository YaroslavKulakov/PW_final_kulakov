export const parsePrice = (text: string): number => {
  const cleaned = text.replace('$', '').trim();

  const value = Number(cleaned);
  if (Number.isNaN(value)) {
    throw new Error(`Cannot parse price from "${text}"`);
  }

  return Math.round(value * 100) / 100;
};
