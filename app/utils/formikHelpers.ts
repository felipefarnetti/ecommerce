export const formikFilterForm = <T extends object>(
  touched: { [key: string]: boolean },
  errors: { [key: string]: string }, // Use a separate type for errors
  values: T
) => {
  const touchedKeys = Object.keys(touched).filter((key) => touched[key]);

  const finalErrors: string[] = [];

  Object.entries(errors).forEach(([key, value]) => {
    if (touchedKeys.includes(key) && values) {
      finalErrors.push(value);
    }
  });

  return finalErrors;
};
