import { useEffect } from "react"
import Layout from "./components/Layout"
import { auth } from "./config/firebaseConfig"
import { useNavigate } from "react-router-dom"
const App = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if(auth.currentUser == null) {
      navigate("/login")
    }
  }, [])

  return (
    <div className=" font-lato text-white">
    <Layout />
    </div>
  )
}

export default App