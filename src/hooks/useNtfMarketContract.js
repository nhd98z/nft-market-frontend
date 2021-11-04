import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ABI, NFT_MARKET_ADDRESS } from '../constants'

const useNtfMarketContract = () => {
  const [nftMarketContract, setNftMarketContract] = useState()
  const provider = window.providerEth
  const chainId = useSelector((state) => state.provider.chainId)
  const account = useSelector((state) => state.provider.account)

  useEffect(() => {
    ;(async () => {
      try {
        if (provider && chainId && NFT_MARKET_ADDRESS[chainId] && ABI['ntfMarket']) {
          const currentSigner = await provider.getSigner()
          const contract = new ethers.Contract(NFT_MARKET_ADDRESS[chainId], ABI['ntfMarket'], provider)
          if (account) {
            setNftMarketContract(contract.connect(currentSigner))
          } else {
            setNftMarketContract(contract)
          }
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [account, chainId, provider])

  return nftMarketContract
}

export default useNtfMarketContract
