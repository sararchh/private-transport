export const sanitizeNumber = (val: string) => String(val).replace(/\D/g, "");

export const formatPhoneNumber = (phoneNumber: string) => {
  let cleaned = sanitizeNumber(phoneNumber ? phoneNumber.replace("+55", "") : "");

  if (cleaned.length > 10) {
    cleaned = cleaned.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
  } else if (cleaned.length > 6) {
    cleaned = cleaned.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
  } else if (cleaned.length > 2) {
    cleaned = cleaned.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else {
    cleaned = cleaned.replace(/^(\d*)/, "$1");
  }
  return cleaned.substr(0, 15);
};


export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}