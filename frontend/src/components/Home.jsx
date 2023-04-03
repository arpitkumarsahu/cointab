import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [mail,setMail] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        let user = JSON.parse(localStorage.getItem("user"));
        if(!user.token){
            navigate('/')
        } else {
            setMail(user.user.email)
        }
    },[])


    const handleLogout =()=>{
        localStorage.removeItem("user")
        navigate('/')
    }


  return (
    <Box p={'300px'}>
        <Text fontSize='3xl'>User Email: {mail}</Text>
        <Button onClick={handleLogout}>LogOut</Button>
    </Box>
  )
}

export default Home