import { ethers } from 'ethers'
import { useCallback } from 'react'
import { LEVEL_UP_FEE } from '../constants'
import useNtfContract from './useNtfContract'
import useAlertCallback from './useAlertCallback'
import { useTranslation } from 'react-i18next'
import { saveTxPending } from '../utils/index'

const useLevelUp = () => {
  const nftContract = useNtfContract()
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()

  return useCallback(
    async (nftId) => {
      try {
        const updateStatusTx = await nftContract.upgradeLevel(nftId, {
          value: ethers.utils.parseUnits(LEVEL_UP_FEE.toString(), 'ether').toString(),
        })
        saveTxPending(updateStatusTx.hash, t('Upgrade level #{{id}} .', {id: nftId}))
        alertMessage(t('Submitted'), t('Level up transaction submitted!'), 'success')
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [nftContract, alertMessage, t],
  )
}

export default useLevelUp
