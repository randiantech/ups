function RtError(description){
    if(!description) return {
      description : "Unknown Error",
      date        : new Date()
    };
    
    var rtError = {};
    rtError.description = description;

    return new Error(JSON.stringify(rtError));
}

module.exports = {
    RtError : RtError
};