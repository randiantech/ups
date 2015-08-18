/**
 * Evaluation function
 * @param name name of the value to be evaluated
 * @param value value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 */
function evaluate(name, value, constraints){
    if (value.length < constraints[0]) throw new ERROR('E0006', null, [name, value, constraints]);
}

/**
 * Public Interface
 * @type {{isValid: evaluate}}
 */
module.exports = {
    evaluate   : evaluate
};