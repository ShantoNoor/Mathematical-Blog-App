import { Typography, Box, Container, Divider } from "@mui/material"
import Navbar from "../components/Navbar.component"
import Footer from "../components/Footer.component"

const NotFound = ({ title }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{
          minWidth: '100%',
          minHeight: '90vh',
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
      <Footer />
    </>
  )
}

export default NotFound