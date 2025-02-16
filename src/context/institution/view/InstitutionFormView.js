import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import InstitutionService from '../services/InstitutionService'
import { useParams, useNavigate } from 'react-router-dom'
import EventFormView from '../../event/view/EventFormView'
import EventService from '../../event/services/EventService'
import InstitutionForm from './InstitutionForm'
import EventGrid from '../../event/view/EventGrid'
import InstitutionFormActionButtons from './InstitutionFormActionButtons'
import { validateRequired }  from '../helpers/InstitutionValidation'
import DialogConfirmAction from '../../../components/DialogConfirmAction'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const InstitutionFormView = () => {
  
  const [openModal, setOpenModal] = useState(false)
  const [eventToEdit, setEventToEdit] = useState(null)
  const [errors, setErrors] = useState({})

  const [openDialogConfirm, setDialogConfirm] = useState(false)
  const [selectedId, setSelectedId] = useState({});

  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    events: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      if(id) {
        try {
          const institutions = await InstitutionService.getFindById(id)
          setFormData(institutions);
        } catch (error) {
          console.error("Erro ao carregar instituições:", error)
        }
      }     
    }

    fetchData()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAddEventModal = (newEvent) => {
    const newEventBuild = {
      id: newEvent.id,
      name: newEvent.name,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      active: handleActiveEvent(newEvent),
      institution: { id: formData.id}
    }

    setFormData({
      ...formData,
      events: [...formData.events, newEventBuild], 
    })
    setOpenModal(false) 
  }

  const handleActiveEvent = (newEvent) => {
    const today = new Date().toISOString().split("T")[0]
    const inputDate = new Date(newEvent.startDate).toISOString().split("T")[0]
    
    return today === inputDate
  }

  const handleEditEventModal = (updatedEvent) => {
    const updatedEvents = formData.events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    )
    setFormData({ ...formData, events: updatedEvents })
    setOpenModal(false) 
  }

  const handleOpenEditModal = (event) => {
    setEventToEdit(event) 
    setOpenModal(true)
  }

  const handleOpenDialogConfirm = (index, id) => {
    setDialogConfirm(true)
    setSelectedId({ id: id, index: index})
  }

  const handleCloseDialogConfirm = () => {
    setDialogConfirm(false)
  }

  const handleDeleteEvent = async() => {  
    const objectSelect = selectedId
    if(!objectSelect.id) {
      const updatedEvents = formData.events.filter((event, i) => i !== objectSelect.index)
      setFormData({ ...formData, events: updatedEvents })
    } else {
      try {
        await EventService.removeById(objectSelect.id)
        const updatedEvents = formData.events.filter((event) => event.id !== objectSelect.id)
        setFormData({ ...formData, events: updatedEvents })
      } catch (error) {
        console.error("Erro ao deletar evento:", error)
      }
    }
    setDialogConfirm(false)
  }

  const handleOpenAddModal = () => {
    setEventToEdit(null)
    setOpenModal(true)
  }

  const handleSaveForm  = async (formData) => {
    if(validateForm()) {
      if(id) {
        await InstitutionService.update(formData)
      } else {
        await InstitutionService.save(formData)
      }
      navigate("/")
    }
  }

  const validateForm = () => {
    let newErrors = {}
    newErrors.name = validateRequired(formData.name)
    newErrors.type = validateRequired(formData.type)

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key]
    })

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0
  }


  const handleCancel = () => {
    navigate("/")
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h4" gutterBottom>
          <CorporateFareIcon /> {formData.id? "Editar Instituição": "Adicionar Nova Instituição"}
        </Typography>
        <form>
          <InstitutionForm 
            formData={formData} 
            setFormData={setFormData} 
            handleChange={handleChange} 
            errors={errors}/>
          
          <EventGrid
            formData={formData}
            handleOpenAddModal={handleOpenAddModal}
            handleOpenEditModal={handleOpenEditModal}
            handleDeleteEvent={handleOpenDialogConfirm} />

          <InstitutionFormActionButtons
            formData={formData} 
            handleCancel={handleCancel}
            handleSaveForm={handleSaveForm}
          />

        </form>
      </Box>

      <EventFormView
        open={openModal}
        onClose={() => setOpenModal(false)} 
        onAddEvent={handleAddEventModal} 
        onEditEvent={handleEditEventModal} 
        eventToEdit={eventToEdit} 
      />

      <DialogConfirmAction 
        openDialogConfirm={openDialogConfirm} 
        handleClose={handleCloseDialogConfirm}
        handleConfirmDelete={handleDeleteEvent}
        />

    </Container>
  )
}

export default InstitutionFormView
