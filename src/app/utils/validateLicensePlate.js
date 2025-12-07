function validateLicensePlate(licensePlate) {
  const licensePlateRegex = /^[A-Z]{3}(\d{4}|\d[A-Z]\d{2})$/;

  return licensePlateRegex.test(licensePlate);
}

module.exports = validateLicensePlate;
