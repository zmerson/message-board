import { Prisma } from "@prisma/client"
import { useAuth } from "../auth/authContext"
import React, { useEffect,  } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"


const MyPosts = () =>{
    const location = useLocation()
    const {user} = useAuth()
    const userId = user?.id
    const url = location.pathname
    const urlArray = url.split('/')
    const userName = urlArray[urlArray.length - 1]
    useEffect(() => {
        const getProfile = async () => {
            const response = await axios.get('/my-posts', {})
        }
      
        
        getProfile()
      return () => {
        <div>asdf</div>
      }
    }, [])
    
}
export default MyPosts