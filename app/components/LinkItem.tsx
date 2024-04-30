'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from 'theme-ui'


export const LinkItem = ({id,title}:{id:string,title:string})=>{

    const router = useRouter()
    return (
	<Button onClick={()=>{router.push(`blog/${id}`)} }  sx={{
	    backgroundColor:'primary'
	}}>{title}</Button>
    )
}
