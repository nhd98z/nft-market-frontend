import { Box, Button, Typography } from '@mui/material'
import * as MI from '@mui/icons-material'
import axie1 from '../assets/axie-1.png'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import Swal from 'sweetalert2'
import { CssTextField } from '../pages/Create'
import { forwardRef, useState } from 'react'

const StyledCard = styled(Box)`
  height: 285px;
  width: 225px;
  background: #decbbd;
  color: #000000;
  border-radius: 32px;
  cursor: ${({ showBuyOrSellButton }) => (showBuyOrSellButton ? 'normal' : 'pointer')};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ showBuyOrSellButton }) => (showBuyOrSellButton ? `` : `:hover { background: #ffeedd; }`)}
`

const StyledButton = styled(Button)`
  width: 100%;
  background: #525564;
  border-radius: 32px;
  font-size: 16px;
  padding: 8px;

  :hover,
  :active,
  :focus {
    background: #3a3c46;
  }
`

export default forwardRef(function Card(props, ref) {
  const { t } = useTranslation()
  const { imageWidth, showBuyOrSellButton, history, onClose } = props
  const [isSell, setIsSell] = useState(Math.random() < 0.5)
  const [sellPrice, setSellPrice] = useState('')

  return (
    <StyledCard {...props}>
      <Box padding="16px" width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <div>#12345678</div>
            <Box display="flex" alignItems="flex-end" marginTop="4px">
              <MI.Pets />
              <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                {t('Beast')}
              </Typography>
            </Box>
          </Box>
          {showBuyOrSellButton && (
            <Box>
              <MI.ControlPoint
                cursor="pointer"
                fontSize="large"
                onClick={() => {
                  alert(t('Up level successfully.'))
                }}
              />
            </Box>
          )}
          <Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  15
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  16
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  17
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  18
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex="1">
          <img src={axie1} alt="axie1" style={{ width: imageWidth ?? '160px', height: 'fit-content' }} />
          {showBuyOrSellButton && isSell ? (
            <CssTextField
              width="50%"
              unit="ETH"
              type="number"
              label={t('Price')}
              variant="outlined"
              myBackgroundColor="#000000"
              myColor="#000000"
              value={sellPrice}
              onChange={(e) => {
                setSellPrice(e.target.value)
              }}
            />
          ) : (
            <Typography fontSize="20px" fontWeight={400}>
              1.28 ETH
            </Typography>
          )}
        </Box>
        {showBuyOrSellButton && (
          <StyledButton
            variant="contained"
            style={{ margin: '8px 0' }}
            onClick={() => {
              onClose && onClose()
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                title: t('Transaction submitted.'),
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              }).then(() => {
                setTimeout(() => {
                  Swal.fire({
                    position: 'bottom',
                    icon: 'success',
                    title: t('Bought successfully.'),
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                  }).then()
                }, 250)
              })
            }}
          >
            {isSell ? t('Sell') : t('Buy')}
          </StyledButton>
        )}
      </Box>
      {history && (
        <Box
          style={{
            background: '#857b73',
            width: '100%',
            borderRadius: '0 0 32px 32px',
            minHeight: '100px',
            padding: '16px',
            overflow: 'auto',
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize="18px" color="#ffffff" fontWeight={500}>
              {t('Buyer')}
            </Typography>
            <Typography fontSize="18px" color="#ffffff" fontWeight={500}>
              {t('Price & Time')}
            </Typography>
          </Box>
          <Box marginTop="8px" flex={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0xD3fc...07d0
              </Typography>
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0.082 ETH (8h ago)
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0xD3fc...07d0
              </Typography>
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0.082 ETH (8h ago)
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0xD3fc...07d0
              </Typography>
              <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                0.082 ETH (8h ago)
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </StyledCard>
  )
})
