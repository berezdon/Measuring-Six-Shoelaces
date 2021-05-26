const footerTitle = document.querySelector('.footer__title');
const footerInformation = document.querySelector('.footer__information');
const measurementsInput = document.querySelector('.input');
const numberOfIntervals = document.querySelector('.input_quantity');
const measurementsForm = document.querySelector('.measurements__form');
const stepValue = document.querySelector('.step');
const arithmeticMean = document.querySelector('.arithmetic-mean');
const standardDeviation = document.querySelector('.standard-deviation');
const minimum = document.querySelector('.minimum');
const maximum = document.querySelector('.maximum');
const coefficientOfVariation = document.querySelector('.coefficient-of-variation');
const deviationFromTheNominalValue = document.querySelector('.deviation-from-the-nominal');
const footerArrow = document.querySelector('.footer__arrow');
const getCanvas = document.querySelector('.canvas');
const constValues = {
  width: getCanvas.width,
  height: getCanvas.height,
}
const validationConfig = {
  formSelector: '.measurements__form',
  inputSelector: '.measurements__input',
  submitButtonSelector: '.measurements__button',
  inactiveButtonClass: 'measurements__button_inactive',
  inputErrorClass: 'measurements__input_type_error',
  errorClass: 'measurements__input-error_active'
}


export {
  footerTitle,
  footerInformation,
  measurementsInput,
  numberOfIntervals,
  validationConfig,
  measurementsForm,
  stepValue,
  arithmeticMean,
  standardDeviation,
  minimum,
  maximum,
  coefficientOfVariation,
  deviationFromTheNominalValue,
  footerArrow,
  getCanvas,
  constValues
}
