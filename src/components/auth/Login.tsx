import { getAdditionalUserInfo, getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, provider } from '../../config/firebaseConfig'
import { SiIonic } from "react-icons/si";
import { Spotlight } from '../ui/Spotlight';
import { User } from '../../interface/iUser';
import { addUser } from '../../services/UserService';
import { Navigate, redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
    // signInWithRedirect(auth, provider)
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        
        console.log(credential)
        if(result.user) {
          const user = result.user
          const additional = getAdditionalUserInfo(result)

          const userInput: User = {
            display_name: user.displayName ? user.displayName : 'User',
            email: user.email ? user.email : 'email',
            profile_url: user.photoURL ? user.photoURL : '',
            uid: user.uid,
            created_at: new Date()
          }

          addUser(userInput, additional?.isNewUser!)
        }

        // console.log(auth.currentUser)

        if(auth.currentUser) {
          navigate("/");
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }

    const handleCheck = () => {
      console.log(auth.currentUser)
    }

    const handleLogout = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
    }

    useEffect(() => {
      if(auth.currentUser) {
        navigate("/");
      }
    }, [])
  return (
    <div className='bg-[#141618] min-h-screen grid grid-rows-[auto_1fr] text-white font-lato'>
        <header className='flex justify-between px-5 py-3'>
            <h4>AIonic</h4>
        <button
        onClick={handleLogin}
        className='border-[1px] border-white rounded-md'
        >Login</button>
        </header>
        <div className='flex justify-center items-center flex-col gap-3'>
          <Spotlight />
        <SiIonic className='text-[#0080FF] size-20 animate-spin'/>
        <div className='flex flex-col justify-center items-center'>
          <p className=' text-[2rem] font-bold'>Build something...</p>
          <p className=' text-[2rem] font-bold'>Build something part 2...</p>
          <p className=' text-[2rem] font-bold'>Build something...</p>
        </div>
        <button 
        className='border-[1px] border-gray-300 px-4 py-3 rounded-md'
        onClick={handleLogin}
        >
          Join now
        </button>
          <button
          onClick={handleCheck}
          >
            Check
          </button>
          <button
          onClick={handleLogout}
          >
            Logout
          </button>
        </div>
    </div>
  )
}

export default Login