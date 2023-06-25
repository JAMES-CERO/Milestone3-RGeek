import {
    EditOutlined,
    DeleteOutline,
    ImageOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    MicOutlined,
    MoreHorizOutlined,
} from "@mui/icons-material"
import {
    Box,
    Typography,
    Divider,
    useTheme,
    InputBase,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material"
import FlexMUI from "components/FlexMUI"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Dropzone from "react-dropzone"
// import UserImage from "components/UserImage"
import WidgetControl from "components/WidgetControl"
import { setPost } from "state"

const PostW = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [imagePOST, setImagePOST] = useState(false);
    const [image, setImage] = useState(null);
    // const [post, setPost] = useState('');
    const { palette } = useTheme()
    // const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)

    const habldePost = async () => {
        const formData = new FormData();
        // formData.append("userId", _id)
        // formData.append("description", post)
    }

    return (
        <WidgetControl>
            <FlexMUI>
                {/* <UserImage /> */}
                <InputBase placeholder="Hey! Share your day" />
            </FlexMUI>
            {imagePOST && (
                <Box border={`1px solid black`} borderRadius="5px" mt="1rem" p="1rem">
                    <Dropzone acceptedFiles='.jpg, .jpeg, .png' multiple={false} onDrop={(acceptedFiles) => setImage(acceptedFiles[0])} >
                        {({ getRootProps, getInputProps }) => (
                            <FlexMUI>
                            <Box {...getRootProps()}
                                p="1rem" border={`2px dashed ${palette.primary.main}`}
                                sx={{ "&:hover": { cursor: "pointer" } }} width="100%"
                            >
                                <input {...getInputProps()} />
                                {!image ? (
                                    <p> Add image Here!</p>
                                ) : (
                                    <FlexMUI>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined/>
                                    </FlexMUI>
                                )}
                            </Box>
                            {image &&(
                                <IconButton>
                                    <DeleteOutline />
                                </IconButton>
                            )}
                            </FlexMUI>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0"}} />

            <FlexMUI>
                <FlexMUI gap="0.25 rem">
                    <ImageOutlined />
                    <Typography> Image</Typography>
                </FlexMUI>
                <Button>POST!</Button>
            </FlexMUI>
        </WidgetControl>
    );
};

export default PostW;