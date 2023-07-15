import { Typography, Box, Container, Divider } from "@mui/material"


const NotFound = ({ title }) => {
  return (
    <Container>
      <Box sx={{
        display: 'flex', 
        flexDirection: 'column',
        minWidth: '100%', 
        minHeight: '100vh', 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant="h1">{title} not found.</Typography>
        <Divider />
        <Typography variant="h2">Error 404</Typography>
      </Box>
    </Container>
  )
}

export default NotFound