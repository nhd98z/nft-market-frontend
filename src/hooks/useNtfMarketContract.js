import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ABI, NFT_MARKET_ADDRESS } from '../constants'
import useProvider from './useProvider'

const useNtfMarketContract = () => {
  const [nftMarketContract, setNftMarketContract] = useState()
  const provider = useProvider()
  const chainId = useSelector((state) => state.provider.chainId)

  useEffect(() => {
    ;(async () => {
      try {
        if (provider && chainId &&  NFT_MARKET_ADDRESS[chainId] && ABI['ntfMarket'] ) {
          const currentSigner = await provider.getSigner()
          const contract = new ethers.Contract(NFT_MARKET_ADDRESS[chainId], ABI['ntfMarket'], provider)
          setNftMarketContract(contract.connect(currentSigner))
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [chainId, provider])

  return nftMarketContract
}

export default useNtfMarketContract
