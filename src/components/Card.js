import styled from '@emotion/styled'
import * as MI from '@mui/icons-material'
import { Box, Button, Switch, Typography } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ClassItem, SECOND_PER_BLOCK } from '../constants'
import useAlertCallback from '../hooks/useAlertCallback'
import useApproveAll from '../hooks/useApproveAll'
import useBuyNft from '../hooks/useBuyNft'
import useMakeOffer from '../hooks/useMakeOffer'
import useSellHistories from '../hooks/useSellHistories'
import useListOffer from '../hooks/useListOffer'
import useSellNft from '../hooks/useSellNft'
import useClaimReward from '../hooks/useClaimReward'
import useBlock from '../hooks/useBlock'
import OfferDialog from './OfferDialog'
import { CssTextField, CssTimeTextField } from '../pages/Create'
import { connectWallet, timeToBlockNumber } from '../utils'
import { ReactComponent as Beast } from '../assets/beast.svg'
import { ReactComponent as Plant } from '../assets/plant.svg'
import { ReactComponent as Mech } from '../assets/mech.svg'
import { ReactComponent as Bug } from '../assets/bug.svg'
import useCancelMarketItem from '../hooks/useCancelMarketItem'
import useLevelUp from '../hooks/useLevelUp'
import { copyBuyer, inforTx,getTxSuccess } from '../utils/index'
const StyledCard = styled(Box)`
  height: 340px;
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
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
  }
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
  const onClaimReward = useClaimReward()
  const block = useBlock()
  const isEndAuction = block >= item.endBlock
  const offers = useListOffer(item.id)
  const isSell = item.buyer !== '0x0000000000000000000000000000000000000000'
  const isMySell = !isSell && item.seller.toLowerCase() === account.toLowerCase()
  const isMyNft = item.buyer === undefined && item.seller === undefined
  const isOwner = item.buyer.toLowerCase() === account.toLowerCase()
  const [blockNumber, setBlockNumber] = useState(0)
  var currentdate = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]
  const isLatestOffer = offers[0]?.asker.toLowerCase() === account.toLowerCase()
  function secondsToHms(d) {
    d = Number(d);
    if (d <= 0) return 0
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes ") : "";
    return hDisplay + mDisplay;
  }
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
            {item.seller !== undefined ? <Typography marginLeft="4px" fontSize="10px" lineHeight="20px">
              {`Seller: ${item.seller.slice(0, 6)}...${item.seller.slice(item.seller.length - 4, item.seller.length)}`}
            </Typography> : null}
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
                <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />

                <Typography fontSize="16px" lineHeight="normal">
                  {item.morale}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex="1">
          <StyledImage
            style={{
              backgroundImage: `url("${item.image}")`,
            }}
          ></StyledImage>
          {showBuyOrSellButton && !isMySell && !isOwner ? (
            <Switch
              defaultChecked={false}
              disabled={item.minPrice === item.price}
              checked={!isBuyDirectly}
              onChange={(e) => {
                setIsBuyDirectly(!e.target.checked)
              }}
            />
          ) : null
          }
          {showBuyOrSellButton && (!isSell && !isBuyDirectly || isMySell) ? (
            <Typography fontSize="12px" color="#90b8ef" lineHeight="12px" fontWeight={400}>
              {item.remainBlock <= 0 ? t('Auction ended') : t('Time remains: ') + secondsToHms((item.remainBlock * SECOND_PER_BLOCK[chainId]))}
            </Typography>
          ) : null}
          {showBuyOrSellButton && isSell && isApprove ? (
            <Box>

              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px -5px 24px" }}>
                <CssTextField
                  style={{ margin: "0 5px" }}
                  width="50%"
                  unit="ETH"
                  type="number"
                  label={t('Min Price')}
                  variant="filled"
                  myBackgroundColor="#ffffff"
                  myColor="#ffffff"
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
                  variant="filled"
                  myBackgroundColor="#ffffff"
                  myColor="#ffffff"
                  value={maxSellPrice}
                  onChange={(e) => {
                    setMaxSellPrice(e.target.value)
                  }}
                />
              </div>
              <CssTimeTextField
                id="datetime-local"
                label="Auction close"
                type="datetime-local"
                style={{ margin: "0 0 12px" }}
                inputProps={{
                  min: currentdate
                }}
                defaultValue={currentdate}
                InputLabelProps={{
                  shrink: true,
                }}
                width="100%"
                onChange={(e) => setBlockNumber(timeToBlockNumber(e.target.value, chainId))}
              />
              <Typography style={{ margin: "0 0 12px" }} color={blockNumber >= 10 ? "#ffffff" : "#c23a3a"} width="100%" fontSize="12px" fontWeight={400}>
                {t("Number of block to close: ") + blockNumber}
              </Typography>
            </Box>

          ) : !isApprove && isSell ? null : item.minPrice !== item.price ? (
            <Typography fontSize="14px" lineHeight="48px" fontWeight={400}>
              {item.minPrice + ' to ' + item.price + ' ETH'}
            </Typography>
          ) : (
            <Typography fontSize="14px" lineHeight="48px" fontWeight={400}>
              {item.price === undefined ? null : item.price + ' ETH'}
            </Typography>
          )}
          {showBuyOrSellButton && !isMySell && !isOwner && !isBuyDirectly && !isEndAuction ? (
            <CssTextField
              width="60%"
              unit="ETH"
              type="number"
              disabled={item.remainBlock <= 0 && !isBuyDirectly}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
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
              <OfferDialog
                listOffer={offers}
                open={open}
                onClose={handleClose}
              />
            </div>
          ) : showBuyOrSellButton && !isOwner && !isBuyDirectly ? (
            <Typography color="#718099" fontSize="12px" lineHeight="20px" fontWeight={400}>
              {t('No offer')}
            </Typography>
          ) : null}

          {showBuyOrSellButton && !isOwner && !isBuyDirectly && item.currentPrice > 0 ? (
            <Typography color="#718099" fontSize="12px" lineHeight="20px" fontWeight={400}>
              {t('Latest price: ') + item.currentPrice} ETH
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
        {account && showBuyOrSellButton && !isMySell && (!isOwner || isApprove) &&
          isLatestOffer && isEndAuction && (
            <StyledButton
              variant="contained"
              style={{ margin: '8px 0' }}
              onClick={() => {
                onClaimReward(item, offers[0])
              }}
            >
              {t('Claim')}
            </StyledButton>
          )}
        {account && showBuyOrSellButton && !isMySell && (!isOwner || isApprove) && !isEndAuction && (
          <StyledButton
            variant="contained"
            style={{ margin: '8px 0' }}
            disabled={item.remainBlock <= 0 && !isBuyDirectly}
            onClick={() => {
              onClose && onClose()
              if (isSell && isApprove) {
                if (!minSellPrice || !maxSellPrice) {
                  alertMessage(t('Error'), t('Please fill input'), 'error')
                }
                if (minSellPrice && parseFloat(minSellPrice) === 0) {
                  alertMessage(t('Error'), t('Min sell price must greater than 0'), 'error')
                }
                if (maxSellPrice && parseFloat(maxSellPrice) === 0) {
                  alertMessage(t('Error'), t('Min sell price must greater than 0'), 'error')
                }
                if (blockNumber < 10) {
                  alertMessage(t('Error'), t('Number of block must >= 10 '), 'error')
                  return
                }
                onSell(item, minSellPrice, maxSellPrice, blockNumber)
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
                    <MI.CopyAllSharp
                      onClick={() => copyBuyer(item.buyer)}
                      fontSize="big"
                      style={{ fill: '#c23a3a', cursor: 'pointer' }}
                    />
                    <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                      {`${item.buyer.slice(0, 6)}...${item.buyer.slice(item.buyer.length - 4, item.buyer.length)}`}
                    </Typography>
                    <Typography fontSize="14px" color="#ffffff" fontWeight={500}>
                      {item.price} ETH ({item.time})
                    </Typography>
                    <Box>
                      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
                      <i class="fas fa-external-link-alt" style={{ color: '#c23a3a', cursor: "pointer", visibility: getTxSuccess()[item.itemMarketId] ? 'unset' : 'hidden' }}
                        onClick={() => inforTx(chainId, item.itemMarketId)}
                      />

                    </Box>
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
