var assert = require("assert");
var Profile = require('../../domain/profile').Profile;

describe('Profile', function () {

    var validProfile = new Profile({firstName : "Pepe", lastName : "Pepo", image: "http://www.images.com/image.jpg"});

    it('should set firstName property if provided correct first name', function () {
        assert.equal(validProfile.firstName, "Pepe", "Setting Profile.firstName");
    });

    it('should throw an exception with a descriptive error message if firstName is not valid', function () {
        var invalidFirstNameLength = "Pe";
        try{
            new Profile({firstName : invalidFirstNameLength, lastName : "Pepo"});
        } catch(error){
            return;
        }
        assert.fail();
    });

    it('should set lastName property if provided correct first name', function () {
        assert.equal(validProfile.lastName, "Pepo", "Setting Profile.lastName");
    });

    it('should throw an exception with a descriptive error message if lastName is not valid', function () {
        var invalidLastNameLength = "Pe";
        try{
            new Profile({firstName : "Pepe", lastName : invalidLastNameLength});
        } catch(error){
            return;
        }
        assert.fail();
    });

    it('should set fullName property as concat of firstName and lastName properties', function () {
        assert.equal(validProfile.fullName, "Pepe Pepo", "Setting Profile.fullName");
    });

    it('should set image property if provided a valid URL', function () {
        assert.equal(validProfile.image, "http://www.images.com/image.jpg", "Setting Profile.image");
    });

    it('should throw an exception with a descriptive error message if image is not a valid URL', function () {
        var invalidUrl = "NotAvalidUrl";
        try{
            new Profile({firstName : "Pepe", lastName: "Cancela", image : invalidUrl});
        } catch(error){
            return;
        }
        assert.fail();
    });
});
