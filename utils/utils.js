function RtError(description, constraints){
    if(!description && !constraints) return {
      description : "Unknown Error",
      constraints : null,
      date        : new Date()
    };
    
    var rtError = {};
    rtError.description = description;
    var constraintNumber = 0;
    rtError.constraints = {};

    constraints.forEach(function (constraint){
       rtError['constraints'][constraintNumber] = constraint;
        constraintNumber++;
    });

    return new Error(JSON.stringify(rtError));
}

module.exports = {
    RtError : RtError
};