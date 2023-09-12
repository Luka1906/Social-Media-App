import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  EditOutlined,
  HideSourceOutlined,
  DeleteOutline,
  MoreHorizOutlined,
  CloseOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPost, setPosts } from "../../store";
import EditModal from "../../components/EditModal";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const isMobile = useMediaQuery("(max-width: 500px)");

  const likesHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}posts/${postId}/like`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePostHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}posts/${postId}/deletePost`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { posts } = await response.json();

    dispatch(setPosts({ posts: posts }));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => setModalIsOpen(false);

  return (
    <WidgetWrapper m="2rem 0" position="relative">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <FlexBetween color={main} sx={{ mt: "0.5rem" }}>
        <Typography>{description}</Typography>
        <IconButton onClick={handleClick}>
          <MoreHorizOutlined />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,

              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box display="flex" gap=" 0.5rem" fontWeight="500">
              <HideSourceOutlined /> Hide Post
            </Box>
            <Box>
              <Typography color={main} marginLeft="1.8rem">
                See fewer posts like this.
              </Typography>
            </Box>
          </MenuItem>

          {loggedInUserId === postUserId && (
            <div>
              <Divider />
              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                // onClick={()=>dispatch(setEditMode())}
                onClick={handleModalOpen}
              >
                <Box display="flex" gap=" 0.5rem" fontWeight="500">
                  <EditOutlined /> Edit Post
                </Box>
              </MenuItem>

              <MenuItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Box display="flex" gap=" 0.5rem" fontWeight="500">
                  <DeleteOutline /> Delete Post
                </Box>
                <Box>
                  <Typography color={main} marginLeft="1.8rem">
                    Permanently delete the post
                  </Typography>
                </Box>
              </MenuItem>
            </div>
          )}
        </Menu>
        <EditModal
          open={modalIsOpen}
          onClose={handleModalClose}
          picturePath={picturePath}
          userPicturePath={userPicturePath}
          description={description}
          postId={postId}
          name={name}
        />

        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(!isOpen)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <FlexBetween>
            <DialogTitle
              fontSize={`${isMobile ? "0.7rem" : "1.1rem"}`}
              component="h2"
              color={primary}
              fontWeight={500}
            >
              {" "}
              {"Are you sure you want to delete this post?"}
            </DialogTitle>
            <IconButton onClick={() => setIsOpen(!isOpen)}>
              <CloseOutlined
                sx={{ fontSize: isMobile ? 16 : 26 }}
                color={main}
              />
            </IconButton>
          </FlexBetween>
          <Divider />

          <DialogContent>
            <DialogContentText>
              <Typography fontSize={isMobile ? 10 : 16}>
                {" "}
                Selected post will be permanently deleted. There is no available
                option to undo this action.
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontSize: isMobile ? 10 : 12 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              Cancel
            </Button>

            <Button
              onClick={deletePostHandler}
              onClickCapture={() => setIsOpen(!isOpen)}
              sx={{ fontSize: isMobile ? 10 : 12 }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </FlexBetween>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${process.env.REACT_APP_SERVER_URL}assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={likesHandler}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
