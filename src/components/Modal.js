import { Box, Modal as MuiModal } from '@mui/material'
import Card from './Card'

export default function Modal({ open, onClose }) {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      disableBackdropClick
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" onClick={onClose}>
        <Card
          style={{ width: '337.5px', maxHeight: '90vh', height: 'max-content' }}
          imageWidth="260px"
          showBuyButton
          history={[]}
        />
      </Box>
    </MuiModal>
  )
}
