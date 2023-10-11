import {
  Modal,
  Typography,
  Box,
  useTheme,
  InputBase,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { ImageOutlined } from "@mui/icons-material";
import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import Dropzone from "react-dropzone";
import { setPosts } from "../store";
import { useSelector, useDispatch } from "react-redux";

import { useCallback, useState } from "react";

const EditModal = ({
  open,
  onClose,
  picturePath,
  userPicturePath,
  description,
  postId,
  name,
}) => {
  const { palette } = useTheme();

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const bkg = palette.background.modal;
  const buttonBkg = palette.background.default;
  const main = palette.neutral.main;

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const [inputVal, setInputVal] = useState("");

  const [focus, setFocus] = useState(false);
  const [image, setImage] = useState(picturePath);
  const [addImage, setAddImage] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const isMobile = useMediaQuery("(max-width: 500px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `${isMobile ? "20rem" : "30rem"}`,
    height: image && !addImage ? 520 : "auto",
    bgcolor: bkg,
    boxShadow: "0 2px 8px rgba(0,0,0,0.50)",
    borderRadius: "0.5rem",
  };

  const inputDataHandler = (e) => {
    if (open) {
      setInputVal(e.target.value);
    }
  };

  const customRef = useCallback(
    (ref) => {
      setTimeout(() => {
        if (ref && open) {
          ref.focus();
          setInputVal(ref.value);
        }
      }, 0);
    },

    [open]
  );

  const closeModalHandler = () => {
    onClose();
    setImage(picturePath);
    removeAddImageHandler();
  };

  const foucusInHandler = () => {
    setFocus(true);
  };
  const focusOutHandler = () => {
    setFocus(false);
  };
  const addImageHandler = () => {
    setAddImage(!addImage);
  };
  const removeAddImageHandler = () => {
    setAddImage(false);
  };
  const deleteImageHandler = () => {
    setImage(null);
    setDeleteImage(true);
  };


  const editPostHandler = async () => {
    const formData = new FormData();
    formData.append("description", inputVal);
    formData.append("initialPicture", picturePath);
    formData.append("editMode", deleteImage);

    if (image) {
      formData.append("picture", image);
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}posts/${postId}/editPost`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const updatedPosts = await response.json();
    dispatch(setPosts({ posts: updatedPosts }));

    onClose();
    removeAddImageHandler();
  };

  return (
    <Modal
      open={open}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} overflow="auto">
        <Box
          padding="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="sticky"
          top="0rem"
          zIndex="1000"
          borderBottom={`0.5px solid ${medium}`}
          bgcolor={bkg}
        >
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h3"
            color={dark}
            fontWeight="500"
          >
            Edit post
          </Typography>
          <IconButton
            sx={{ position: "absolute", right: "2rem", color: dark }}
            onClick={closeModalHandler}
          >
            <CloseOutlined sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        <Box
          padding="15px"
          position="sticky"
          top="4.1rem"
          zIndex="1000"
          bgcolor={bkg}
          display="flex"
          alignItems="center"
          gap="1rem"
        >
          <UserImage image={userPicturePath} size="45px" />
          <Typography variant="h5" color={dark} fontWeight="500">
            {name}
          </Typography>
        </Box>
        <Box>
          <InputBase
            id="input-base"
            defaultValue={description}
            inputRef={customRef}
            onChange={inputDataHandler}
            sx={{
              position: "relative",
              bottom: "0.4rem",
              width: "90%",
              paddingLeft: "25px",
            }}
          />

          {image && !addImage && (
            <Box
              padding="10px"
              width="90%"
              border={`0.5px solid ${medium}`}
              borderRadius="0.5rem"
              margin="0.5rem auto"
              position="relative"
            >
              <Box
                width="100%"
                borderRadius="0.5rem"
                display="flex"
                boxShadow={`${
                  focus ? "inset 0px 0px 0px 1000px rgba(0,0,0,0.25)" : ""
                }`}
                onMouseOver={foucusInHandler}
                onMouseLeave={focusOutHandler}
              >
                <img
                  alt="post"
                  style={{
                    width: "100%",

                    borderRadius: "0.5rem",
                    position: "relative",
                    zIndex: -2,
                  }}
                  src={`${process.env.REACT_APP_SERVER_URL}assets/${picturePath}`}
                />
              </Box>

              <IconButton
                sx={{
                  position: "absolute",
                  color: dark,
                  top: "25px",
                  right: "25px",
                  background: bkg,
                  border: `0.5px solid ${medium}`,
                  padding: "0.3rem",
                  "&:hover": {
                    backgroundColor: buttonBkg,
                  },
                }}
                onClick={deleteImageHandler}
              >
                <CloseOutlined
                  sx={{
                    fontSize: 24,
                  }}
                />
              </IconButton>
            </Box>
          )}
          {addImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius="5px"
              m="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "10%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          {!image && (
            <Box
              padding="10px 25px"
              display="flex"
              gap="0.3rem"
              sx={{
                color: main,
                "&:hover": { cursor: "pointer", color: medium },
              }}
              onClick={addImageHandler}
            >
              <ImageOutlined />
              <Typography>Add Image</Typography>
            </Box>
          )}

          <Box
            textAlign="center"
            position="sticky"
            bottom="0rem"
            width="100%"
            padding="1rem 0"
            zIndex="1000"
            bgcolor={bkg}
          >
            <Button
              disabled={!inputVal}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
                width: "90%",
              }}
              onClick={editPostHandler}
            >
              EDIT
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
