import React from 'react'
import { CircularProgress } from '@mui/material'

export default function Loader() {
  return (
     <CircularProgress sx={{ position:'fixed',top:'50%',left:'50%',display: "block", margin: "20px auto" }} />
  )
}
