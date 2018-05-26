pragma solidity ^0.4.0;

contract WifiAuthenticator {
    
    //initialization string for the network name
    string networkname = "Hello HelloWorld";
    
    
    //user struct for storing and authenticating users
    struct user {
        address username;
        string key;
        uint8 failedTries;
        uint8 successTries;
    }
    
    //mapping from users to addresses
    mapping(address => user) users;
    uint8 numberOfUsers;
    uint8 currentUsers;

    //wifi user authenticastor
     function WifiAuthenticator(string mesage,uint8 _numusers) public {
        networkname = mesage;
        numberOfUsers = _numusers;
        currentUsers = 0;
    }
    
    //getter function for getting the name of network
     function getnetworkName() public view returns (string) {
         return networkname;
     }
     
     //get current registered nunmber of users
     function getRegisteredUser() public view returns (uint8) {
         return currentUsers;
     }
     
     /// Give $(_newuser) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    function addUser(address _newuser) public {
        if (currentUsers > numberOfUsers) return;
        users[_newuser].username = _newuser;
        users[_newuser].key = "admin123";
        users[_newuser].failedTries = 0;
        users[_newuser].successTries = 0;
        currentUsers = currentUsers+1;
    }
     
     //get user credentials in case the user has forgot the credentials
     function getUserCredentials(address _usercredentials) public view returns (string) {
         return users[_usercredentials].key;
     }
     
     //get user credentials in case the user has forgot the credentials
     function getFailedTries(address _usercredentials) public view returns (uint8) {
         return users[_usercredentials].successTries;
     }
     
     //get user credentials in case the user has forgot the credentials
     function getSuccessTries(address _usercredentials) public view returns (uint8) {
         return users[_usercredentials].failedTries;
     }
     
     //helper function for comparing string with each other
     function compareStrings (string a, string b) view returns (bool){
       return keccak256(a) == keccak256(b);
   }
     
     //helper function for validating the user
     function ValidateUser(address _usercredentials,string _key) public view returns (string) {
         if (compareStrings( users[_usercredentials].key, _key) ) {
            
             users[_usercredentials].successTries = users[_usercredentials].successTries  + 1;
              return  "Successfully logged in ";
         }else{
             
             users[_usercredentials].failedTries = users[_usercredentials].failedTries  + 1;
             return "Either user name or password is wrong";
         }
         
         return "Edge case handling";
     }
     
     //get possible allowed users in the network
     function getNumberOfUsers() public view returns (uint8){
         return numberOfUsers;
     }
}