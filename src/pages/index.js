import './index.css';
import getMaxOfArray from "../components/maximum.js";
import geMinOfArray from "../components/minimum.js";
import step from "../components/step.js";
import getArithmeticMean from "../components/arithmeticMean.js";
import getVariance from "../components/variance.js";
import getCoefficientOfVariation from "../components/coefficientOfVariation.js";
import getDeviationFromTheNominalValue from "../components/deviationFromTheNominalValue.js";
import FormValidator from "../components/FormValidator.js";
import Canvas from '../components/Canvas.js';
import {
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
} from "../utils/constants.js";

const canvas = new Canvas(getCanvas, constValues);

function clickOnFooterTitle() {
  footerInformation.classList.toggle('footer__information_active');
  footerArrow.classList.toggle('footer__arrow_active');
}

function submitForm(evt) {
  evt.preventDefault();
  const measurementsValue = [];
  measurementsInput.forEach((measurement) => {
    measurementsValue.push(Number(measurement.value));
  });
  const getMaximum = getMaxOfArray(measurementsValue);
  const getMinimum = geMinOfArray(measurementsValue);
  const getIntervals = Number(numberOfIntervals.value);
  const getStepValue = step(getMaximum, getMinimum, getIntervals);
  const getArithmeticMeanValue = getArithmeticMean(measurementsValue);
  const getStandardDeviation = Math.sqrt(getVariance(getArithmeticMeanValue, measurementsValue)).toFixed(3);
  const getCoefficientOfVariationValue = getCoefficientOfVariation(getStandardDeviation, getArithmeticMeanValue);
  const getDeviationFromTheNominalValueValue = getDeviationFromTheNominalValue(getArithmeticMeanValue, 90).toFixed(3);

  stepValue.textContent = getStepValue;
  arithmeticMean.textContent = getArithmeticMeanValue;
  standardDeviation.textContent = getStandardDeviation;
  minimum.textContent = getMinimum;
  maximum.textContent = getMaximum;
  coefficientOfVariation.textContent = getCoefficientOfVariationValue;
  deviationFromTheNominalValue.textContent = getDeviationFromTheNominalValueValue;
  const objData = {
    getIntervals,
    getStepValue,
    getMinimum
  }

  canvas.run(measurementsValue, objData);
}




const formMeasure = new FormValidator(validationConfig, measurementsForm);
formMeasure.enableValidation();

footerTitle.addEventListener('click', clickOnFooterTitle);
measurementsForm.addEventListener('submit', (evt) => {submitForm(evt)});
