import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import BannerWidget from "../widgets/BannerWidget";
import FriendsListWidget from "../widgets/FriendsListWidget";

const HomePage = () => {
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <>
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
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
          {isNotMobile && (
            <Box flexBasis="26%">
              <BannerWidget />
              <Box m="2rem 0" />
              <FriendsListWidget userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
