import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TableListActions from '../../../components/TableListActions'
import EventIcon from '@mui/icons-material/Event'

const EventGrid = ({formData, handleOpenAddModal, handleOpenEditModal, handleDeleteEvent}) => {

  const heads = ['Nome', 'Data inicial', 'Data final', 'Situação']
  const columns = ['name', 'startDate', 'endDate']

  return (
    <>
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal} 
        >
          Adicionar
        </Button>
      </Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        <EventIcon sx={{marginBottom: -1 }}/> Eventos
      </Typography>
      <br />
      <TableListActions
        events={formData.events}
        onEditEvent={handleOpenEditModal} 
        onDelete={handleDeleteEvent}
        heads={heads}
        columns={columns}
      />
      <br />
    </>
  )
}

export default EventGrid
