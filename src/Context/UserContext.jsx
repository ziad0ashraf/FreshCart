import { createContext, useEffect, useState }  from 'react';

export let UserContext = createContext();

export default function UserContextProvider({children}) {
 
 const [userData, setUserData] = useState(null);

 

 useEffect(() => {
   if (localStorage.getItem('user-token')) {
     setUserData(localStorage.getItem('user-token'))
    }

  }, [])



 return <UserContext.Provider value={{userData, setUserData}}>
    {children}
 </UserContext.Provider>
}