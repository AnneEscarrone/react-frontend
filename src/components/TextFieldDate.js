import React from 'react'
import { TextField } from '@mui/material'

const TextFieldDate = ({date, validateDate, name, error, label}) => {
 
  return (
    <>
      <TextField
        label={label}
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        name={name}
        value={date}
        onChange={(e) => {validateDate(e)}}
        onBlur={(e) => {validateDate(e)}}
        InputLabelProps={{ shrink: true }}
        inputProps={{ min: new Date().toISOString().split("T")[0] }} 
        error={!!error}
        helperText={error}
        required
      />
    </>
    )
  }
  
  export default TextFieldDate