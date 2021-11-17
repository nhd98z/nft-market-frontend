import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { NFT_MARKET_ADDRESS } from '../constants'
import { saveTxPending } from '../utils'
import useAlertCallback from './useAlertCallback'
import useBlock from './useBlock'
import useNtfContract from './useNtfContract'


const useApproveAll = () => {
  const nftContract = useNtfContract()
  const chainId = useSelector((state) => state.provider.chainId)
  const account = useSelector((state) => state.provider.account)
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()
  const [isApprove, setIsApprove] = useState(false)
  const block = useBlock()

  useEffect(() => {
    (async () => {
      if (nftContract && chainId && account) {
        const isApproved = await nftContract.isApprovedForAll(account, NFT_MARKET_ADDRESS[chainId])
        setIsApprove(isApproved)
      }
    })()
  }, [account, alertMessage, chainId, nftContract, t, block])


  const handleApproveAll = useCallback(
    async () => {
      try {
        if (nftContract && chainId && account) {
          const approveTx = await nftContract.setApprovalForAll(NFT_MARKET_ADDRESS[chainId], true)
          saveTxPending(approveTx.hash, t('Approve for NFT Market.'))
          alertMessage(t('Submitted'), t('Submit transaction approve success'), 'success')
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [nftContract, chainId, account, alertMessage, t],
  )

  return { onApprove: handleApproveAll, isApprove }
}

export default useApproveAll
