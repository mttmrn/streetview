export const getAddressCity = (address, length) => {
  const findType = (type) => type.types[0] === "locality";
  const location = address.map((obj) => obj);
  const rr = location.filter(findType)[0];

  return length === "short" ? rr.short_name : rr.long_name;
};

export const getAddressState = (address, length) => {
  const findType = (type) => type.types[0] === "administrative_area_level_1";
  const location = address.map((obj) => obj);
  const rr = location.filter(findType)[0];

  return length === "short" ? rr.short_name : rr.long_name;
};

export const getAddressCountry = (address, length) => {
  const findType = (type) => type.types[0] === "country";
  const location = address.map((obj) => obj);
  const rr = location.filter(findType)[0];

  return length === "short" ? rr.short_name : rr.long_name;
};
