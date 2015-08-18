const URL_PATTERN = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

/**
 * Evaluation function
 * @param name name of the value to be evaluated
 * @param value value to be evaluated
 * @param constraints constraints required to construct the evaluation criteria
 */
function evaluate(name, value, constraints){
    if (!value || !value.match(URL_PATTERN)) throw new ERROR('E0008',[name, value, constraints]);
}

/**
 * @type {{evaluate: evaluate}}
 */
module.exports = {
    evaluate   : evaluate
};