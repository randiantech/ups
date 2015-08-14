var RtError = require('../utils/utils').RtError;

function Profile(profile) {

    var _firstName;
    var _lastName;

    var _isValidFirstName = function (firstName) {
        return firstName && firstName.length > 3;
    };

    var _isValidLastName = function (lastName) {
        return lastName && lastName.length > 3;
    };

    var _validateFirstName = function(firstName) {
        if (!_isValidFirstName(firstName)) throw new RtError("Profile.firstName is not valid", ["Must not be null", "Length > 3"]);
    };

    var _validateLastName = function(lastName) {
        if (!_isValidLastName(lastName)) throw new Error("PROFILE:::LAST_NAME_IS_NOT_VALID");
    };

    var _validateProfile = function(profile){
        if (!profile) throw new Error("PROFILE:::MISSING_ALL_MANDATORY_VALUES");
        _validateFirstName(profile.firstName);
        _validateLastName(profile.lastName);
    };

    _validateProfile(profile);

    _firstName = profile.firstName;
    _lastName = profile.lastName;

    return {
        get fullName() {
            return _firstName + ' ' + _lastName;
        },

        get firstName() {
            return _firstName;
        },

        set firstName(firstName) {
            _validateFirstName(firstName);
            _firstName = firstName;
        },

        get lastName() {
            return _lastName;
        },

        set lastName(lastName) {
            _lastName = lastName;
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