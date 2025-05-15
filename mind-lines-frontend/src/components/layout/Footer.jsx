import React from 'react'
import {Box, Typography} from '@mui/material';
function Footer() {
    const [value, setValue] = React.useState(0);
  return (
    <>
    <Box id="footer-section" sx={{p:2, backgroundColor:'black', display:'flex', flexDirection:{xs:'column',sm:'row'},alignItems:'center', justifyContent:'space-between',color:'white'}}>
        <Typography>2025 <Typography component='span' sx={{verticalAlign:'middle',fontSize:'1.2rem' }}>&copy;</Typography> All Rights Reserved</Typography>
        <Typography>Made with <span style={{color:'red'}}>♡</span> by Anwar</Typography>
    </Box>
    </>
  )
}


export default Footer;