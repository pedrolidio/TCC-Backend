function validateDriverLicense(licenseNumber) {
  if (!/^\d{11}$/.test(licenseNumber))
    return false;

  const weightsCheckDigit1 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  const weightsCheckDigit2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const digits = licenseNumber.split("").map(Number);
  const sum1 = digits.slice(0, 9).reduce((acc, digit, idx) => acc + digit * weightsCheckDigit1[idx], 0);
  let checkDigit1 = sum1 % 11;
  checkDigit1 = checkDigit1 === 10 ? 0 : checkDigit1;

  const sum2 = digits.slice(0, 9).reduce((acc, digit, idx) => acc + digit * weightsCheckDigit2[idx], 0);
  let checkDigit2 = sum2 % 11;
  checkDigit2 = checkDigit2 === 10 ? 0 : checkDigit2;

  return checkDigit1 === digits[9] && checkDigit2 === digits[10];
}

module.exports = validateDriverLicense;
