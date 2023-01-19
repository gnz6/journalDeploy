import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView } from '../view/NoteView'
import { NothingSelecterView } from '../view/NothingSelecterView'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../redux/slices/journal/thunks'
import { savingNewNote } from '../../redux/slices/journal/journalSlice'
import { useEffect } from 'react'



export const Home = () => {

  const dispatch = useDispatch()

  const { isSaving, activeNote } = useSelector(state => state.journal)


  const handleNewNote = () => {
    dispatch(startNewNote())
  }



  return (
    <JournalLayout>

      {!!activeNote
        ? 
        <NoteView />
        : 
        <NothingSelecterView />
      }


      <IconButton
        onClick={handleNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 40,
          bottom: 30,
          zIndex: 10,
          padding: 2
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />

      </IconButton>

    </JournalLayout>
  )
}
