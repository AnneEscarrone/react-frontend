import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { grey, green } from '@mui/material/colors'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function TableListActions({ events, onEditEvent, heads, columns, onDelete })  {

  const [rows, setRows] = useState(events)
  
  useEffect(() => {
    setRows(events) 
  }, [events])  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
             {heads.map(head => 
              <TableCell>{head}</TableCell>
            )}
            <TableCell align="center"><b>Ações</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>

              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
              <TableCell>
                <IconButton
                  color={row.active? 'primary' : 'default'}
                  sx={{
                    color: row.active ? green[500] : grey[500],
                  }}
                >
                <CheckCircleIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEditEvent(row)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(index, row.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
