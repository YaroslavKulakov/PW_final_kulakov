export type SortDirection = 'asc' | 'desc';

// ---------- NUMBERS ----------

export function getSortedNumbers(values: number[], direction: SortDirection): number[] {
  return [...values].sort((a, b) =>
    direction === 'asc' ? a - b : b - a
  );
}

// ---------- STRINGS ----------

export function getSortedStrings(values: string[], direction: SortDirection): string[] {
  const normalize = (v: string) => v.replace(/\s+/g, ' ').trim();

  return [...values].sort((a, b) => {
    const aNorm = normalize(a);
    const bNorm = normalize(b);

    return direction === 'asc'
      ? aNorm.localeCompare(bNorm)
      : bNorm.localeCompare(aNorm);
  });
}
