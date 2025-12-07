function validateVin(vin) {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;

  return vinRegex.test(vin);
}

module.exports = validateVin;
