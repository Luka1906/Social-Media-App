import { Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form";
import Logo from "../../components/Logo";

const LoginPage = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        
       
     
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Socializer
        </Typography>
        <Box ml="7.5rem">
        <Logo/>
        </Box>
   
       

      </Box>
      <Box
        width={isNotMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socializer, the Social media for antisocial individuals
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
