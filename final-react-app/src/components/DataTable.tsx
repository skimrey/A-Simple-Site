import React, { useState } from 'react'
import Button from './Button'
import BasicModal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';


const columns: GridColDef[] = [
  { field: 'id', headerName: "ID", width: 90, hide: true },
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'author', headerName: 'Author', flex: 1},
  { field: 'publisher', headerName: 'Publisher', flex: 1},
  { field: 'pageCount', headerName: 'Page Count', flex: 2}
]

function DataTable() {
  const [ open, setOpen ] = useState(false);
  const { contactData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])

  const handleOpen = () => {
    setOpen(true)
  }
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
  
  const handleClose = () => {
    setOpen(false)
  }


  return (
    <>
        
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 400, width: '100%' }}
          >
            <DataGrid rows={contactData} columns={columns} rowsPerPageOptions={[5]}
            checkboxSelection={true} 
            onSelectionModelChange={ (item:any) => {
            setSelectionModel(item)
            }}
            />
            
        </div>
        <BasicModal 
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />
    </>
  )
}

export default DataTable