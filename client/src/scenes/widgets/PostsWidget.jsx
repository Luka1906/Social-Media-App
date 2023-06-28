import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store";
import PostWidget from "./PostWidget";

const PostsWidget = ({userId, isProgile = false}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.posts);
    const token = useSelector((state) => state.token);

    const getPostsHandler = async () => {
        const response = await fetch ("http://localhost: 3001")
    }

}

export default PostsWidget