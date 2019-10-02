














/*
  1 - The { authentication-service } is used to Login and Logout of
  the apps
    -  To login: It posts the Users Credentials to the API
      and checks the response for JWT token
      + If there is one , It means Authentication was successful,
        so the User details including the token are added to local storage

      + The logged in user details are stored in LOCAL STORAGE
      until they logout

*/
