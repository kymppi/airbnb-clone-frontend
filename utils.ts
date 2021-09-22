export const isMultiple = (value: number = 0) => {
  if (value === undefined) return '';
  else if (value === 1) return '';
  else if (value > 1 || value === 0) return 's';
};
