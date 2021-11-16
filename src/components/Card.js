import styled from '@emotion/styled'
import * as MI from '@mui/icons-material'
import { Box, Button, Typography, Switch } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ClassItem, EXPLORER_TX } from '../constants'
import useAlertCallback from '../hooks/useAlertCallback'
import useApproveAll from '../hooks/useApproveAll'
import useBuyNft from '../hooks/useBuyNft'
import useMakeOffer from '../hooks/useMakeOffer'
import useSellHistories from '../hooks/useSellHistories'
import useListOffer from '../hooks/useListOffer'
import useSellNft from '../hooks/useSellNft'
import OfferDiaglog from './OfferDialog'
import { CssTextField } from '../pages/Create'
import { connectWallet } from '../utils'
import { ReactComponent as Beast } from '../assets/beast.svg'
import { ReactComponent as Plant } from '../assets/plant.svg'
import { ReactComponent as Mech } from '../assets/mech.svg'
import { ReactComponent as Bug } from '../assets/bug.svg'
import useCancelMarketItem from '../hooks/useCancelMarketItem'
import useLevelUp from '../hooks/useLevelUp'
import { copyBuyer, inforTx } from '../utils/index'
const StyledCard = styled(Box)`
  height: 320px;
  width: 225px;
  background: #2c394b;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: -2px 0px 24px #000;
  cursor: ${({ showBuyOrSellButton }) => (showBuyOrSellButton ? 'normal' : 'pointer')};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: 0.4s ease-out;
  ${({ showBuyOrSellButton }) =>
    showBuyOrSellButton
      ? ``
      : `:hover { background: #334756; transform: translateY(-8px);
    transition: 0.4s ease-out; }`}
`
const StyledImage = styled(Box)`
  height: 200px;
  width: 225px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain, cover;
`
const StyledButton = styled(Button)`
  width: 100%;
  background: #ff4c29;
  transition: all 200ms ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  font-size: 16px;
  padding: 8px;

  :hover,
  :active,
  :focus {
    background: #ff7c62;
  }
`

export default forwardRef(function Card(props, ref) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const { t } = useTranslation()
  const alertMessage = useAlertCallback()
  const [minSellPrice, setMinSellPrice] = useState('')
  const [maxSellPrice, setMaxSellPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [isBuyDirectly, setIsBuyDirectly] = useState(true)
  const { showBuyOrSellButton, history, onClose, item } = props
  const account = useSelector((state) => state.provider.account) ?? ''
  const onBuy = useBuyNft()
  const onOffer = useMakeOffer()
  const onSell = useSellNft()
  const onLevelUp = useLevelUp()
  const { isApprove, onApprove } = useApproveAll()
  const histories = useSellHistories(item.tokenId)
  const chainId = useSelector((state) => state.provider.chainId)


  const onCancelMarketItem = useCancelMarketItem()
  const offers = useListOffer(item.id)
  const isSell = item.buyer !== '0x0000000000000000000000000000000000000000'
  const isMySell = !isSell && item.seller.toLowerCase() === account.toLowerCase()
  const isMyNft = item.buyer === undefined && item.seller === undefined
  const isOwner = item.buyer.toLowerCase() === account.toLowerCase()
  const icon =
    item.class === 1 ? (
      <Beast />
    ) : item.class === 2 ? (
      <Plant />
    ) : item.class === 3 ? (
      <Bug />
    ) : item.class === 4 ? (
      <Mech />
    ) : null


  return (
    <StyledCard {...props}>
      <Box padding="16px" width="100%">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <div># {item.tokenId}</div>
            <Box display="flex" alignItems="flex-end" marginTop="4px">
              {icon}
              <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                {Object.keys(ClassItem).map((i) => {
                  if (ClassItem[i] === item.class) {
                    return t(i)
                  }
                  return ''
                })}
              </Typography>
            </Box>
          </Box>
          {isMyNft && showBuyOrSellButton && (
            <Box>
              <MI.ControlPoint
                cursor="pointer"
                fontSize="large"
                onClick={() => {
                  onLevelUp(item.tokenId)
                }}
              />
            </Box>
          )}
          <Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                <Typography fontSize="16px" lineHeight="normal">
                  {item.heath}
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                <Typography fontSize="16px" lineHeight="normal">
                  {item.speed}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box display="flex" alignItems="flex-start">
                <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                <Typography fontSize="16px" lineHeight="normal">
                  {item.skill}
                </Typography>
              </Box>
              <Box display="flex" alignItems="flex-start">
                <Typography fontSize="16px" lineHeight="normal">
                  {item.morale}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex="1"
        >
          <StyledImage style={{
            backgroundImage: `url("${item.image}")`
          }}></StyledImage>
          {showBuyOrSellButton && !isMySell && !isOwner ? (
            <Switch
              defaultChecked ={false}
              disabled = {item.minPrice===item.price}
              checked={!isBuyDirectly}
              onChange={(e) => {
                setIsBuyDirectly((!e.target.checked))
              }}
            // inputProps={{ 'make offer': 'buy directly' }}
            />
          ) : null
          }
          {showBuyOrSellButton && isSell && isApprove ? (
            <div style ={{display : "flex" ,  alignItems: "center", justifyContent: "center", margin: "10px -5px" }}>
            <CssTextField
              style ={{margin: "0 5px"}}
              width="50%"
              unit="ETH"
              type="number"
              label={t('Min Price')}
              variant="outlined"
              myBackgroundColor="#000000"
              myColor="#000000"
              value={minSellPrice}
              onChange={(e) => {
                setMinSellPrice(e.target.value)
              }}
            />        
              <CssTextField
              width="50%"
              unit="ETH"
              type="number"
              label={t('Max Price')}
              variant="outlined"
              myBackgroundColor="#000000"
              myColor="#000000"
              value={maxSellPrice}
              onChange={(e) => {
                setMaxSellPrice(e.target.value)
              }}
            />
            </div>
          ) : !isApprove && isSell ? null :  item.minPrice !== item.price ? (
            <Typography fontSize="14px" lineHeight="48px" fontWeight={400}>
              {item.minPrice + " to " + item.price + "ETH"}
            </Typography>) : (
            <Typography fontSize="14px" lineHeight="48px" fontWeight={400}>
              {item.price === undefined ? null : item.price + "ETH"}
            </Typography>
          )}
          {showBuyOrSellButton && !isMySell && !isOwner && !isBuyDirectly ? (
            <CssTextField
              width="60%"
              unit="ETH"
              type="number"
              label={t('Offer amount')}
              variant="filled"
              myBackgroundColor="#ffffff"
              myColor="#ffffff"
              value={offerPrice}
              onChange={(e) => {
                setOfferPrice(e.target.value)
              }}
            />
          ) : null}
          {showBuyOrSellButton && !isOwner && !isBuyDirectly && item.currentPrice > 0 ? (
            <div>
              <br />
              <Button variant="outlined" onClick={handleClickOpen}>
                List Offer
              </Button>
              <OfferDiaglog
                listOffer={offers}
                open={open}
                onClose={handleClose}
              />
            </div>

          ) : showBuyOrSellButton && !isOwner && !isBuyDirectly
            ? <Typography color="#718099" fontSize="12px" lineHeight="20px" fontWeight={400}>
              {t("No offer")}
            </Typography> : null}

          {showBuyOrSellButton && !isOwner && !isBuyDirectly && item.currentPrice > 0 ? (
            <Typography color="#718099" fontSize="12px" lineHeight="20px" fontWeight={400}>
              {t("Lastest price is: ") + item.currentPrice} ETH
            </Typography>
          ) : null}
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
        {account && showBuyOrSellButton && isMySell && (
          <StyledButton
            variant="contained"
            style={{ margin: '8px 0' }}
            onClick={() => {
              onCancelMarketItem(item.id)
            }}
          >
            {t('Cancel')}
          </StyledButton>
        )}
          {account && showBuyOrSellButton && !isMySell && (!isOwner || isApprove) && (
          <StyledButton
            variant="contained"
            style={{ margin: '8px 0' }}
            onClick={() => {

              onClose && onClose()
              if (isSell && isApprove) {

                if (!minSellPrice || !maxSellPrice ) {
                  alertMessage(t('Error'), t('Please fill input'), 'error')
                }
                if (minSellPrice && parseFloat(minSellPrice) === 0) {
                  alertMessage(t('Error'), t('Min sell price must greater than 0'), 'error')
                }
                if (maxSellPrice && parseFloat(maxSellPrice) === 0) {
                  alertMessage(t('Error'), t('Min sell price must greater than 0'), 'error')
                }
                onSell(item, minSellPrice, maxSellPrice)
                return
              }
              if (!isBuyDirectly) {
                onOffer(item, offerPrice)
                return
              }
              if (isBuyDirectly) {
                onBuy(item)
                return
              }
            }}
          >
            {isSell && isApprove ? t('Sell') : isBuyDirectly ? t('Buy Directly') : t('Make Offer')}
          </StyledButton>
        )}
      </Box>
      {history && (
        <Box
          style={{
            background: '#334756',
            width: '100%',
            borderRadius: '0 0 12px 12px',
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
            {histories.length ? (
              histories.map((item, index) => {
                return (
                  <Box display="flex" justifyContent="space-between">
                    <MI.CopyAllSharp onClick={() => copyBuyer(item.buyer)} fontSize="big" style={{ fill: '#c23a3a', cursor: "pointer" }} />
                    <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                      {`${item.buyer.slice(0, 6)}...${item.buyer.slice(item.buyer.length - 4, item.buyer.length)}`}
                    </Typography>
                    <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                      {item.price} ETH ({item.time})
                    </Typography>
                    <MI.LoginSharp onClick={() => inforTx(chainId,item.itemMarketId)} fontSize="big" style={{ fill: '#c23a3a', cursor: "pointer" }} />
                  </Box>
                )
              })
            ) : (
              <Box display="flex" justifyContent="space-between" textAlign="center">
                <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                  {t('No history')}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </StyledCard>
  )
})
