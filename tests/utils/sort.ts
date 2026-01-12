export type SortDirection = 'asc' | 'desc';

// ---------- SORT ----------

export function getSortedNumbers(values: number[], direction: SortDirection): number[] {
  return [...values].sort((a, b) =>
    direction === 'asc' ? a - b : b - a
  );
}

export function getSortedStrings(values: string[], direction: SortDirection): string[] {
  const normalized = values.map(v => v.replace(/\s+/g, ' ').trim());

  return [...normalized].sort((a, b) =>
    direction === 'asc'
      ? a.localeCompare(b)
      : b.localeCompare(a)
  );
}

// ---------- CHECK ----------

export function isSortedNumbers(values: number[], direction: SortDirection): boolean {
  for (let i = 1; i < values.length; i++) {
    if (direction === 'asc' && values[i] < values[i - 1]) return false;
    if (direction === 'desc' && values[i] > values[i - 1]) return false;
  }
  return true;
}

export function isSortedStrings(values: string[], direction: SortDirection): boolean {
  const normalized = values.map(v => v.replace(/\s+/g, ' ').trim());

  for (let i = 1; i < normalized.length; i++) {
    if (direction === 'asc' && normalized[i].localeCompare(normalized[i - 1]) < 0) return false;
    if (direction === 'desc' && normalized[i].localeCompare(normalized[i - 1]) > 0) return false;
  }
  return true;
}


