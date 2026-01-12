export const parsePrice = (text: string): number => {
  const cleaned = text.replace('$', '').trim();

  const value = Number(cleaned);
  if (Number.isNaN(value)) {
    throw new Error(`Cannot parse price from "${text}"`);
  }

  // convert to cents to avoid floating point issues
  return Math.round(value * 100);
};
