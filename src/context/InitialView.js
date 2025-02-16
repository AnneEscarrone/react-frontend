import React, { useEffect, useState } from 'react'
import TableList from '../components/TableList'
import InstitutionService from '../context/institution/services/InstitutionService'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import DialogConfirmAction from '../components/DialogConfirmAction'

const InitialView = () => {
    const heads = ['ID', 'Nome', 'Tipo']
    const columns = ['id', 'name', 'type']

    const [data, setData] = useState([])
    const [openDialogConfirm, setDialogConfirm] = useState(false)
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const institutions = await InstitutionService.getFindAll()
            setData(institutions)
          } catch (error) {
            console.error('Erro ao carregar instituições:', error)
          }}
    
        fetchData()
    }, [])

    const handleCloseDialogConfirm = () => {
      setDialogConfirm(false)
    }

    const handleOpenDialogConfirm = (id) => {
      setDialogConfirm(true)
      setSelectedId(id)
    }

    const ButtonAdd = () => {
      return <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}>
                  Adicionar
              </Button>
    }

    const handleDelete = async() => {  
      try {
        await InstitutionService.removeById(selectedId);
        const updatedRows = data.filter((institution) => institution.id !== selectedId)
        setData(updatedRows)
      } catch (error) {
        console.error("Erro ao deletar evento:", error)
        alert("Erro ao deletar o evento. Tente novamente.")
      }
      setDialogConfirm(false)
       
  }


  return (
    <>
      <TableList 
          title={'Instituições'}
          data={data}  
          handleDelete={handleOpenDialogConfirm} 
          heads={heads} 
          columns={columns}
          editLink={'/edit-institution/'}
          newLinked={'/new-institution/'}
          renderButtonAdd={() => <ButtonAdd />}
          />
      <DialogConfirmAction 
        openDialogConfirm={openDialogConfirm} 
        handleClose={handleCloseDialogConfirm}
        handleConfirmDelete={handleDelete}
      />
    </>

          
  )
}


export default InitialView