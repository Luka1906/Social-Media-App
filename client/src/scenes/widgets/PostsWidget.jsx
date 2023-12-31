import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store";
import PostWidget from "./PostWidget";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPostsHandler = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}posts`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPostsHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPostsHandler();
    } else {
      getPostsHandler();
   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <Box display="flex" flexDirection="column-reverse">
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
          // key = {_id}
          postId = {_id}
          postUserId = {userId}
          name = {`${firstName} ${lastName}`}
          description = {description}
          location = {location}
          picturePath = {picturePath}
          userPicturePath = {userPicturePath}
          likes = {likes}
          comments = {comments} />
        )
      )}
    </Box>
  );
};

export default PostsWidget;
