import { createContext, useState, useEffect } from "react";
import axios from "axios";

 
const AuthContext = createContext();
 
function AuthProviderWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
    const storeToken = (token) => {       
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = async () => {        
       
        const storedToken = localStorage.getItem('authToken')        
        // console.log(storedToken)

        if (storedToken) {
          // console.log(storedToken)
          await axios.get(
            `${process.env.REACT_APP_API_URL}/auth/verify`, 
            { headers: { Authorization: `Bearer ${storedToken}`} }
          )
          .then((response) => {
           
            const user = response.data;
            // console.log(user.isAdmin)
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);  
            // console.log('done')     
          })
          .catch((error) => {     
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);        
          }); 
          return     
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);   
            console.log('else')   
        }   
      }

      const removeToken = () => {                   
        localStorage.removeItem("authToken")
        console.log('removed');
      }
     
     
      const logOutUser = async () => {       
        await removeToken();
        authenticateUser();
      }  
    
      useEffect(()=>{
        authenticateUser();
      }, [])
 
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };