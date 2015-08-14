var assert = require("assert");
var Profile = require('../../domain/profile').Profile;

describe('Profile', function () {

    var validProfile = new Profile({firstName : "Pepe", lastName : "Pepo"});

    it('should set firstName property if provided correct first name', function () {
        assert.equal(validProfile.firstName, "Pepe", "Setting Profile.firstName");
    });

    it('should set lastName property if provided correct first name', function () {
        assert.equal(validProfile.lastName, "Pepo", "Setting Profile.lastName");
    });

    it('should set fullName property as concat of firstName and lastName properties', function () {
        assert.equal(validProfile.fullName, "Pepe Pepo", "Setting Profile.fullName");
    });
});
