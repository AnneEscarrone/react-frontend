import React from 'react'
import { TextField } from '@mui/material'
import OptionEnum from '../../../components/OptionEnum'

const InstitutionForm = ({formData, setFormData, handleChange, errors}) => {

  return (
    <>
      <TextField
        label="Nome"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        required
      />
      <OptionEnum
        type={formData.type}
        setType={(newType) => setFormData({ ...formData, type: newType })}
        error={errors.type}
      />
      <br />
      <br />
    </>
  )
}

export default InstitutionForm
