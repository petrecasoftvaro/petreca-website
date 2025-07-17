import { Box, Container, Grid } from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ width: '100%', paddingLeft: 0 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ padding: 2, backgroundColor: "green"}} >
            teste grid 1
          </Box>

        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ padding: 2, backgroundColor: "black"}} >
            teste grid 2
          </Box>
        </Grid>
      </Grid>
    </Container>

    
  )
}


