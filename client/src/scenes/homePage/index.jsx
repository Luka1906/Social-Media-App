import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";

const HomePage = () => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  console.log(isAuth);

  return (
    <>
      {isAuth ? (
        <Box>
          <Navbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNotMobile ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box flexBasis={isNotMobile ? "26%" : undefined}>
              <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box
              flexBasis={isNotMobile ? "42%" : undefined}
              mt={isNotMobile ? undefined : "2rem"}
            >
                <MyPostWidget picturePath = {picturePath}/>
            </Box>
            {isNotMobile && <Box flexBasis="26%"></Box>}
          </Box>
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default HomePage;
