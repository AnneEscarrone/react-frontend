import React from 'react'
import { Box, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

const InstitutionFormActionButtons = ({formData, handleCancel, handleSaveForm}) => {

  return (
    <>
      <Box sx={{ textAlign: "right", mt: 2 }}>
        <Button variant="contained" color="inherit" onClick={handleCancel}>
          Cancelar
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={() => handleSaveForm(formData)} >
          Salvar
        </Button>
      </Box>
      <br />
    </>
  )
}

export default InstitutionFormActionButtons
