import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({ children}: Props) => {
    // checks if user is logged in, returneschildren which arepassed as props its just whatverer component is protected
    
    const navigate = useNavigate();
    useEffect(() => {
        if(!auth.currentUser && window.location.pathname.split("/").pop() != 'dashboard') {
            navigate("../")
            signInWithPopup(auth, Providers.google)
        }
    }, [])

  return (
    <>{children}</>
  )
}

export default AuthChecker