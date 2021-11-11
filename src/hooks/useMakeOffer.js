import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { saveTxPending } from '../utils/index'
import useAlertCallback from './useAlertCallback'
import useNtfMarketContract from './useNtfMarketContract'

const useMakeOffer = () => {
    const nftMarketContract = useNtfMarketContract()
    const alertMessage = useAlertCallback()
    const { t } = useTranslation()
    const chainId = useSelector((state) => state.provider.chainId)
  
    return useCallback(
      async (item, amount) => {
        try {
            
          if (!nftMarketContract || !chainId) return
            const makeOfferTx = await nftMarketContract.makeOffer(
              item.id,
              {
                value: ethers.utils.parseUnits(amount.toString(), 'ether').toString()
              },
            )
            saveTxPending(makeOfferTx.hash)
            alertMessage(t('Success'), t('Make Offer success'), 'success')
          
        } catch (e) {
          console.error(e)
          return false 
        }
      },
      [alertMessage, chainId, nftMarketContract, t],
    )
  }
  
  export default useMakeOffer
  