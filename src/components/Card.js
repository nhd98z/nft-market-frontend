import styled from '@emotion/styled'
import * as MI from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { ClassItem } from '../constants'
import useAlertCallback from '../hooks/useAlertCallback'
import useApproveAll from '../hooks/useApproveAll'
import useBuyNft from '../hooks/useBuyNft'
import useSellHistories from '../hooks/useSellHistories'
import useSellNft from '../hooks/useSellNft'
import { CssTextField } from '../pages/Create'
import { connectWallet } from '../utils'

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
  const alertMessage = useAlertCallback()
  const [sellPrice, setSellPrice] = useState('')
  const { imageWidth, showBuyOrSellButton, history, onClose, item } = props
  const account = useSelector((state) => state.provider.account) ?? ''
  const onBuy = useBuyNft()
  const onSell = useSellNft()
  const { isApprove, onApprove } = useApproveAll()
  const histories = useSellHistories(item.tokenId)

  const isSell = item.buyer !== '0x0000000000000000000000000000000000000000'
  const isMySell = !isSell && item.seller.toLowerCase() === account.toLowerCase()
  return (
    <StyledCard {...props}>
      <Box padding="16px" width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <div># {item.tokenId}</div>
            <Box display="flex" alignItems="flex-end" marginTop="4px">
              <MI.Pets />
              <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                {Object.keys(ClassItem).map((i) => {
                  if (ClassItem[i] === item.class) {
                    return t(i)
                  }
                })}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  {item.heath}
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  {item.speed}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  {item.skill}
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                <Typography fontSize="20px" lineHeight="normal">
                  {item.morale}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex="1">
          <img src={item.image} alt="axie1" style={{ width: imageWidth ?? '160px', height: 'fit-content' }} />
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
              {item.price} ETH
            </Typography>
          )}
        </Box>
        {!account && showBuyOrSellButton && (
          <StyledButton variant="contained" style={{ margin: '8px 0' }} onClick={connectWallet}>
            {t('Connect Metamask')}
          </StyledButton>
        )}
         {account && !isApprove && showBuyOrSellButton && isSell && (
          <StyledButton variant="contained" style={{ margin: '8px 0' }} onClick={onApprove}>
            {t('Approve NFT')}
          </StyledButton>
        )}
        {account && showBuyOrSellButton && !isMySell && isApprove && (
          <StyledButton
            variant="contained"
            style={{ margin: '8px 0' }}
            onClick={() => {
              onClose && onClose()
              if (isSell) {
                if (!sellPrice) {
                  alertMessage(t('Error'), t('Please fill input'), 'error')
                }
                onSell(item, sellPrice)
              } else {
                onBuy(item)
              }
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
          {histories.length ?
            histories.map((item, index) => {
              return (
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                    {`${item.buyer.slice(0, 6)}...${item.buyer.slice(item.buyer.length - 4, item.buyer.length)}`}
                  </Typography>
                  <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                    {item.price} ETH ({item.time})
                  </Typography>
                </Box>
              )
            })
            : ( <Box display="flex" justifyContent="space-between" textAlign="center">
                  <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                    {t('No history')}
                  </Typography>
              </Box>)
          }
          </Box>
        </Box>
      )}
    </StyledCard>
  )
})
