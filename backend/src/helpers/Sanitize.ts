export const Sanitize = (data: string) => {
  return data.replace(/\D/g, '');
};
