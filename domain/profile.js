var isNotNull = require('./validation/isNotNull');
var isLengthGreaterThan = require('./validation/isLengthGreaterThan');

const MIN_NAME_LENGTH = 3;

function _validateProfile(profile){
    isNotNull.evaluate('profile', profile);
    isNotNull.evaluate('profile.firstName', profile.firstName);
    isNotNull.evaluate('profile.lastName', profile.firstName);
    isLengthGreaterThan.evaluate('profile.firstName', profile.firstName, [MIN_NAME_LENGTH]);
    isLengthGreaterThan.evaluate('profile.lastName', profile.lastName, [MIN_NAME_LENGTH]);
}

function Profile(profile) {

    _validateProfile(profile);

    var _firstName = profile.firstName;
    var _lastName = profile.lastName;

    return {
        get fullName() {
            return _firstName + ' ' + _lastName;
        },

        get firstName() {
            return _firstName;
        },

        get lastName() {
            return _lastName;
        }
    };
}

/**
 * Public Interface
 * @type {{Profile: Profile}}
 */
module.exports = {
    Profile: Profile
};