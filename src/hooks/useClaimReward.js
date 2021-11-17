import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { saveTxPending } from '../utils/index'
import useAlertCallback from './useAlertCallback'
import useNtfMarketContract from './useNtfMarketContract'

const useClaimReward = () => {
    const nftMarketContract = useNtfMarketContract()
    const alertMessage = useAlertCallback()
    const { t } = useTranslation()
    return useCallback(
      async (item, offer) => {
        try {
          if (!nftMarketContract) return
            const claimTx = await nftMarketContract.claimReward(
              item.id,
              offer.id,
            )
            saveTxPending(claimTx.hash)
            alertMessage(t('Success'), t('Claim reward successfully'), 'success')
          
        } catch (e) {
          console.error(e)
          return false 
        }
      },
      [alertMessage, nftMarketContract, t],
    )
  }
  
  export default useClaimReward
  