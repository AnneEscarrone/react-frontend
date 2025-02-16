import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material' 
import { Warning } from '@mui/icons-material'


const DialogConfirmAction = ({openDialogConfirm, handleClose, handleConfirmDelete}) => {

  return (
    <div>
      <Dialog open={openDialogConfirm} onClose={handleClose}>
        <DialogTitle>
          <Warning sx={{ color: "yellow", fontSize: 40, marginBottom: -1 }} /> Confirmar Exclusão
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir esta informação? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogConfirmAction
