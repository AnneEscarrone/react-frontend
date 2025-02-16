
import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import TextFieldDate from '../../../components/TextFieldDate'
import { validateRequired, validateDate, validateEndDate } from '../helpers/EventValidation'
import EventIcon from '@mui/icons-material/Event'


const EventFormView = ({ open, onClose, onAddEvent, eventToEdit, onEditEvent }) => {
  const eventEmpty = { name: "", startDate: "", endDate: "" }
  const [newEvent, setNewEvent] = useState(eventEmpty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (eventToEdit) {
      setNewEvent(eventToEdit) 
    } else {
      setNewEvent(eventEmpty)
    }
  }, [eventToEdit, open])

  const handleAddEvent = () => {
    if(validateForm()) {
      onAddEvent(newEvent) 
      setNewEvent(eventEmpty) 
    }
  }

  const handleEditEvent = () => {
    onEditEvent(newEvent) 
    setNewEvent(eventEmpty) 
  }

  const handleClosed = () => {
    onClose()
    setErrors({})
  }

  const validateFormatDate = (e) => {
    const selectedDate = e.target.value
    const fieldName = e.target.name
    const today = new Date().toISOString().split("T")[0]

    if (selectedDate < today) {
      setNewEvent({ ...newEvent, [fieldName]: today })
    } else {
      setNewEvent({ ...newEvent, [fieldName]: selectedDate })
    }
  }

  const validateForm = () => {
    let newErrors = {}
    newErrors.name = validateRequired(newEvent.name)
    newErrors.startDate = validateDate(newEvent.startDate)
    newErrors.endDate = validateEndDate(newEvent.startDate, newEvent.endDate)

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key]
    })

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <EventIcon sx={{marginBottom: -1 }}/>  {eventToEdit ? "Editar Evento" : "Adicionar Novo Evento"}
        </DialogTitle>
      <DialogContent>
          <TextField
            label="Nome do Evento"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          <TextFieldDate 
            newEvent={newEvent} 
            date={newEvent.startDate}
            validateDate={validateFormatDate} 
            name={'startDate'}
            error={errors.startDate}
            label='Data inicial' />
          
          <TextFieldDate 
            newEvent={newEvent} 
            date={newEvent.endDate}
            validateDate={validateFormatDate} 
            name={'endDate'}
            error={errors.endDate} 
            label='Data final'/>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosed} color="inherit">
          Cancelar
        </Button>
        <Button onClick={eventToEdit ? handleEditEvent : handleAddEvent} color="primary">
          {eventToEdit ? "Salvar alterações" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventFormView
