import { useEffect } from "react"
import Layout from "./components/Layout"
import { auth } from "./config/firebaseConfig"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
const App = () => {

  const navigate = useNavigate()

  // FIXME: Fetching user authstate have delay so make it asynch
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Auth')
      } else {
        navigate("/login")
      }
    });
    if(auth.currentUser == null) {
      console.log("User null")
    }
  }, [])

  return (
    <div className=" font-lato text-white">
    <Layout />
    </div>
  )
}

export default App