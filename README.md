# ups
Universal Profile Service

![alt tag](https://dl.dropboxusercontent.com/u/3868882/ups.png)

# Profile Schema

Fields:

* firstName: TBD
* lastName: TBD


Example:

{
  "firstName":"Juan Carlos",
  "lastName" :"Cancela"
}


Testing with cURL:

-> curl -X POST -d @000_correct_profile.json -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:5000/profile
-> curl -X POST -d @001_bad_length_first_name.json -H "Accept: application/json" -H "Content-Type: application/json" http://localhost:5000/profile


Error Codes:

E0001 : Missed x-access-token header