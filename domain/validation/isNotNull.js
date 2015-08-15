var RtError = require('../../utils/utils').RtError;

/**
 * Evaluation function
 * @param name name of the value to be evaluated
 * @param value value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 */
function evaluate(name, value, constraints){
    if (!value) throw new RtError(_descr(name, value, constraints));
}

/**
 * Description to be used in the error in case evaluated value is not valid
 * @param name the name of the value to be evaluated
 * @param value the value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 * @returns {string} the error description
 * @private
 */
function _descr(name, value, constraints){
    return name + " length not be null";
}

/**
 * @type {{evaluate: evaluate}}
 */
module.exports = {
    evaluate   : evaluate
};