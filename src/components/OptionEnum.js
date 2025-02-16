import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'

const StatusEnum = {
    CONFEDERATION: 'Confederação',
    SINGULAR: 'Singular',
    CENTRAL: 'Central',
    COOPERATIVE: 'Cooperativa'
}

const OptionEnum = ({ type, setType, error }) => {

  const [status, setStatus] = useState(type)

  useEffect(() => {
    setStatus(type)
  }, [type])

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus)
    setType(newStatus)
  }

  return (
    <FormControl fullWidth sx={{ maxWidth: 300, mt: 2 }} error={!!error} required>
      <InputLabel>Tipo</InputLabel>
      <Select value={status} onChange={handleChange} label="Tipo">
        {Object.entries(StatusEnum).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}

export default OptionEnum
