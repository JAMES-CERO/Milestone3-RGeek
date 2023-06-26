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
import UserImage from "components/UserImage"
import WidgetControl from "components/WidgetControl"
import { setPosts } from "state"

const PostW = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [imagePOST, setImagePOST] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const noMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id)
        formData.append("description", post)
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");

    };

    return (
        <WidgetControl>
            <FlexMUI gap="1rem">
                <UserImage image={picturePath} />
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
                                            <EditOutlined />
                                        </FlexMUI>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexMUI>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexMUI>
                <FlexMUI gap="0.25 rem" onClick={() => setImagePOST(!imagePOST)}>
                    <ImageOutlined />
                    <Typography
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                        Image
                    </Typography>
                </FlexMUI>

                {noMobileScreen ? (
                    <>
                        <FlexMUI gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexMUI>

                        <FlexMUI gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexMUI>

                        <FlexMUI gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexMUI>
                    </>
                ) : (
                    <FlexMUI gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexMUI>
                )}

                <Button
                    disabled={post} onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexMUI>
        </WidgetControl>
    );
};

export default PostW;