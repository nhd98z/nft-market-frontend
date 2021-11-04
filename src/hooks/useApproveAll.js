import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LISTING_PRICE, NFT_ADDRESS, NFT_MARKET_ADDRESS, SECONDS_TIME_MAX_SELL, SECOND_PER_BLOCK } from '../constants'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import useBlock from './useBlock'
import useAlertCallback from './useAlertCallback'
import { useTranslation } from 'react-i18next'
import { saveTxPending } from '../utils'


const useApproveAll = () => {
  const nftContract = useNtfContract()
  const chainId = useSelector((state) => state.provider.chainId)
  const account = useSelector((state) => state.provider.account)
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()
  const [isApprove, setIsApprove] = useState(false)

  useEffect(() => {
    (async () => {
      if (nftContract && chainId && account) {
        const isApproved = await nftContract.isApprovedForAll(account, NFT_MARKET_ADDRESS[chainId])
        setIsApprove(isApproved)
      }
    })()
  }, [account, alertMessage, chainId, nftContract, t])


  const handleApproveAll = useCallback(
    async () => {
      try {
        if (nftContract && chainId && account) {
          const approveTx = await nftContract.setApprovalForAll(NFT_MARKET_ADDRESS[chainId], true)
          saveTxPending(approveTx.hash)
          alertMessage(t('Success'), t('Submit transaction approve success'), 'success')
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
