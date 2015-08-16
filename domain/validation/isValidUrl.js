var RtError = require('../../utils/utils').RtError;

const URL_PATTERN = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

/**
 * Evaluation function
 * @param name name of the value to be evaluated
 * @param value value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 */
function evaluate(name, value, constraints){
    if (!value || !value.match(URL_PATTERN)) throw new RtError(_descr(name, value, constraints));
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
    return name + " is not a valid URL";
}

/**
 * @type {{evaluate: evaluate}}
 */
module.exports = {
    evaluate   : evaluate
};