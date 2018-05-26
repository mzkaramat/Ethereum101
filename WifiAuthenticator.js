pragma solidity ^0.4.0;

contract WifiAuthenticator {
    
    //initialization string for the network name
        //allow some users to only login between 1 to 10 PM

    
    string networkname = "Hello HelloWorld";
    
    
    //user struct for storing and authenticating users
    struct user {
        address username;
        string key;
        uint8 failedTries;
        uint8 successTries;
        uint8 downlaoed_data;
        bool status;
    }
    
    
     address[] blacklist_users =  [0x9AB55D9559623a78Ac7F016648f9C9325A42E57c, 0xf235aa56dd96bda02acfb361e];
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
    function addUser(address _newuser) public view returns (string) {
        
      if (checkUserBlackListing(_newuser)) {
        return "user is blacklisted";
      }
      
        if (currentUsers > numberOfUsers) return;
        users[_newuser].username = _newuser;
        users[_newuser].key = "admin123";
        users[_newuser].failedTries = 0;
        users[_newuser].successTries = 0;
        users[_newuser].status = true;
        currentUsers = currentUsers+1;
        
        return "user is added successfully";
    }
     
     function checkUserBlackListing(address _user) public view returns (bool){
          for(uint i = 0; i < blacklist_users.length; i++) {
          if (blacklist_users[i] == _user) {
            return true;
          }else{
              return false;
          }
        }
     }
     
     //get user credentials in case the user has forgot the credentials
     function getUserCredentials(address _usercredentials) public view returns (string) {
         return users[_usercredentials].key;
     }
     
     //get user credentials in case the user has forgot the credentials
     function updateUserStatus(address _usercredentials,bool _status) public view returns (string) {
         
         users[_usercredentials].status = _status;
         return "Successfully updated user status";
         
     }
     
     //get user credentials in case the user has forgot the credentials
     function updateUserPassword(address _usercredentials,string previousPassword,string newPassword) public view returns (string) {
         if (compareStrings( users[_usercredentials].key, previousPassword) ) {
             if(bytes(newPassword).length < 8){
                 return "password should be longer than 8 characters";
             }else{
                  if (compareStrings( newPassword, previousPassword) ) {
                      return "Previous password shouldn't be similar to old password";
                  }else{
                      users[_usercredentials].key = newPassword;
                     return "successfully changed password"; 
                  }
                 
             }
             
         }else{
             return "Previous password don't match";
         }
         
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
         if (checkUserBlackListing(_usercredentials) && users[_usercredentials].status) {
            return "user is blacklisted";
          }
          
         if (compareStrings( users[_usercredentials].key, _key) ) {
            
             users[_usercredentials].successTries = users[_usercredentials].successTries  + 1;
             users[_usercredentials].downlaoed_data = 0;
              return  "Successfully logged in ";
         }else{
             
             users[_usercredentials].failedTries = users[_usercredentials].failedTries  + 1;
             if (users[_usercredentials].failedTries > 5){
                 users[_usercredentials].status = false;
             }
             return "Either user name or password is wrong";
         }
         
         return "Edge case qq";
     }
     
     //get possible allowed users in the network
     function getNumberOfUsers() public view returns (uint8){
         return numberOfUsers;
     }
     
     //get user credentials in case the user has forgot the credentials
     function getSuccessTries(address _usercredentials,uint8 _data_consumed) public view returns (uint8) {
         users[_usercredentials].downlaoed_data = users[_usercredentials].downlaoed_data + _data_consumed;
     }
     
}