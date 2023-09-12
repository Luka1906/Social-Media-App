import FlexBetween from "./FlexBetween";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import {
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";


const OptionsBar = ({ setIsImage, isImage}) => {
  const { palette } = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const isMediumScreen =  useMediaQuery("(min-width: 1200px)");
  const mediumMain = palette.neutral.mediumMain;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
 return (
    <>
      <Box display="flex" justifyContent={`${isMediumScreen? "space-between" : "center"}`} >
        <Box>
            {isMediumScreen &&<Typography color={main} fontWeight="500" >Add to your post</Typography> }
          
        </Box>
        <Box display="flex" gap="0.3rem">
          <FlexBetween sx={{ color: mediumMain, "&:hover": { cursor: "pointer", color: medium} }} gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined   />
            <Typography
              color={mediumMain}
             
            >
              Image
            </Typography>
          </FlexBetween>
          {isNotMobile ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>

              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>

              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OptionsBar;
