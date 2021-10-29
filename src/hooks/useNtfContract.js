import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useProvider from './useProvider'
import { ethers } from 'ethers'
import { ABI, NTF_ADDRESS } from '../constants'

const useNtfContract = () => {
  const [nftContract, setNftContract] = useState()
  const provider = useProvider()
  const chainId = useSelector((state) => state.provider.chainId)

  useEffect(() => {
    ;(async () => {
      try {
        if (provider && chainId &&  NTF_ADDRESS[chainId] && ABI['ntf'] ) {
          const currentSigner = await provider.getSigner()
          const contract = new ethers.Contract(NTF_ADDRESS[chainId], ABI['ntf'], provider)
          setNftContract(contract.connect(currentSigner))
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [chainId, provider])

  return nftContract
}

export default useNtfContract
