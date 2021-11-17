import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { saveTxPending } from '../utils/index'
import useAlertCallback from './useAlertCallback'
import useNtfMarketContract from './useNtfMarketContract'

const useBuyNft = () => {
  const nftMarketContract = useNtfMarketContract()
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()
  return useCallback(
    async (item) => {
      try {
        if (nftMarketContract) {
          const price = ethers.utils.parseUnits(item.price, 'ether')
          console.log(item)
          const buyNftTx = await nftMarketContract.buyDirectly(item.id, {
            value: price.toString(),
          })
          saveTxPending(buyNftTx.hash, t('Buy NFT #{{id}}.', {id: item.id}))
          alertMessage(t('Submitted'), t('Transaction buy NFT submitted'), 'success')
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [alertMessage, nftMarketContract, t],
  )
}

export default useBuyNft
