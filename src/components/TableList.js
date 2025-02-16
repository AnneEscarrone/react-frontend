import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { Edit, Delete } from '@mui/icons-material'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'

const TableList = ({title, data, handleDelete, heads, columns, editLink, newLinked, renderButtonAdd}) => {
 
    return (
      <>
          <br/>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
          <CorporateFareIcon />  {title} 
          </Typography>
          <br />
          <Box sx={{ textAlign: "right", mt: 2 }}>
          <Link to={newLinked}>
              {renderButtonAdd()}
          </Link>
          </Box>
          <br/>
          <TableContainer component={Paper}>
              <Table>
              <TableHead>
                  <TableRow>
                    {heads.map(head => 
                      <TableCell>{head}</TableCell>
                    )}
                    <TableCell><b>Ações</b></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                    <TableCell>
                      <Link to={`${editLink}${row.id}`}>
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => handleDelete(row.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
          </TableContainer>
      </>
    )
  }
  
  export default TableList