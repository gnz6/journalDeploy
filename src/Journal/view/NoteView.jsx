import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { setActiveNote } from "../../redux/slices/journal/journalSlice"
import { startDeleteNote, startSavedNote, uploadFile } from "../../redux/slices/journal/thunks"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

export const NoteView = () => {

    const date = new Date()

    const dispatch = useDispatch()
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal)

    const { input, handleInputChange } = useForm(activeNote)

    const fileRef=useRef()


    useEffect(() => {
        dispatch(setActiveNote(input))
    }, [input])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire("Note updated", messageSaved, "success")
        }
    }, [messageSaved])

    const handleSaveNote = () => {
        console.log("active");
        dispatch(startSavedNote())
    }

    const handleDelete = () =>{
       dispatch( startDeleteNote())
    }

    const handleFileChange = ({ target }) => {
        console.log(target.files);
        if (target.files === 0) return;
        dispatch(uploadFile( target.files))
    }

    return (
        <Grid container direction="row" justifyContent={"space-between"} sx={{ mb: 1, mt: 5 }}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item >
                <Typography fontSize={39} fontWeight="light"> {date.toDateString()}</Typography>
            </Grid>
            <Grid item >

                <input type={"file"} multiple onChange={handleFileChange} ref={fileRef}
                style={{display:"none"}} />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={(()=> fileRef.current.click())}
                >
                    <UploadOutlined />
                </IconButton>


                <Button
                    disabled={isSaving}
                    onClick={handleSaveNote}
                    color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type={"text"}
                    variant="filled"
                    fullWidth
                    label="Title"
                    placeholder="Insert a Title"
                    sx={{ border: "none", mb: 1 }}
                    value={input.title}
                    onChange={handleInputChange}
                    name="title"
                />

                <TextField
                    type={"text"}
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="What happened today?"
                    minRows={5}
                    value={input.body}
                    onChange={handleInputChange}
                    name="body"
                />
            </Grid>

            <Grid container justifyContent={"end"}>
                <Button onClick={handleDelete} sx={{mt:2}} color="error">
                    <DeleteOutline/>
                    Delete
                </Button>
            </Grid>

            <ImageGallery imageUrls={activeNote.imageUrls} />

        </Grid>
    )

}
