/**
 * Evaluation function
 * @param name name of the value to be evaluated
 * @param value value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 */
function evaluate(name, value, constraints){
    if (!value) throw new ERROR('E0007', null, [name, value, constraints]);
}

/**
 * @type {{evaluate: evaluate}}
 */
module.exports = {
    evaluate   : evaluate
};