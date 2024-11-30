import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "./components/Layout"
import { auth } from "./config/firebaseConfig"
const App = () => {

  const navigate = useNavigate()
  let { chatID } = useParams()

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login")
      }
    });

  }, [])

  return (
      <div className=" font-lato text-white">
      <Layout chatid={chatID}/>
      </div>
  )
}

export default App