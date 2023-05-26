import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContactForm from './ContactForm';
import { server_calls } from '../api/server';
import { useGetData } from '../custom-hooks/FetchData';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = {
    id: string[];
    open: boolean;
    onClose: () => void;
}

export default function BasicModal(props: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ selectionModel, setSelectionModel ] = useState<string[]>([])
    const { contactData, getData } = useGetData();

    const deleteData = () => {
      server_calls.delete(props.id);
      getData();
      console.log(`Selection model: ${props.id}`)
      setTimeout( () => { window.location.reload() }, 500)
    }
    return (
      <div className='m-10 mt-0'>
        <Button onClick={handleOpen}>Create New Book</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ContactForm id={props.id}></ContactForm>
          </Box>
        </Modal>
        <Button onClick={handleOpen}>Update</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ContactForm id={props.id}></ContactForm>
          </Box>
        </Modal>
        <Button onClick={deleteData}>Delete</Button>
      </div>
      
    );
  }
