import { Typography, Box, Container, Divider } from "@mui/material"


const NotFound = ({ title }) => {
  return (
    <Container>
      <Box sx={{
        minWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h1">{title} not found.</Typography>
        <Divider sx={{ padding:'1px' }}/>
        <Typography variant="h2">Error 404</Typography>
      </Box>
    </Container>
  )
}

export default NotFound