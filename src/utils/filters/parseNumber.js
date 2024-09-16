const parseInteger = (value) => {
  if (typeof value !== 'string') return;

  const parseNumber = parseInt(value);
  if (Number.isNaN(parseNumber)) return;

  return parseNumber;
};

export default parseInteger;
