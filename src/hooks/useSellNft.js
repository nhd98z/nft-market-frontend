import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LISTING_PRICE, NFT_ADDRESS} from '../constants'
import { saveTxPending } from '../utils/index'
import useAlertCallback from './useAlertCallback'
import useBlock from './useBlock'
import useNtfMarketContract from './useNtfMarketContract'

const useSellNft = () => {
  const nftMarketContract = useNtfMarketContract()
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()
  const block = useBlock()
  const chainId = useSelector((state) => state.provider.chainId)

  return useCallback(
    async (item, minPrice, maxPrice, blockNumber) => {
      try {
        if (nftMarketContract && chainId) {
          minPrice = ethers.utils.parseUnits(minPrice, 'ether')
          maxPrice = ethers.utils.parseUnits(maxPrice, 'ether')
          const blockClose = block + blockNumber
          const listingTokenTx = await nftMarketContract.createMarketItem(
            NFT_ADDRESS[chainId],
            item.tokenId,
            minPrice.toString(),
            maxPrice.toString(),
            blockClose,
            {
              value: ethers.utils.parseUnits(LISTING_PRICE.toString(), 'ether').toString(),
            },
          )
          saveTxPending(listingTokenTx.hash, t('Sell NFT #{{id}}.', {id: item.tokenId}))
          alertMessage(t('Submitted'), t('Transaction sell NFT success submitted'), 'success')
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [alertMessage, block, chainId, nftMarketContract, t],
  )
}

export default useSellNft
