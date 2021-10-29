import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataWithAccount, fetchDataWithChainId } from '../states/providerSlice'

const useProvider = () => {
  const dispatch = useDispatch()
  const [provider, setProvider] = useState()

  useEffect(() => {
    const accountChangeHandler = (accounts) => {
      if (accounts.length > 0) {
        dispatch(fetchDataWithAccount(accounts[0]))
      }
    }

    const networkChangeHandler = (chainId) => {
      dispatch(fetchDataWithChainId(parseInt(chainId, 16)))
    }

    const loadProvider = async () => {
      try {
        if (window.ethereum) {
          // detect Metamask account change
          window.ethereum.on && window.ethereum.on('accountsChanged', accountChangeHandler)
          // detect Network account change
          window.ethereum.on && window.ethereum.on('chainChanged', networkChangeHandler)
          // use MetaMask's provider
          const currentProvider = new ethers.providers.Web3Provider(window.ethereum)
          setProvider(currentProvider)
          // set provider
          const currentSigner = await currentProvider.getSigner()
          // set chainID
          // dispatch(fetchDataWithChainId(await currentSigner.getChainId()))
          // set account
          const web3Account = await currentSigner.getAddress()
          dispatch(fetchDataWithAccount(web3Account))
        } else {
          throw new Error('Metamask not install!!!')
        }
      } catch (error) {
        console.error('error', error)
      }
    }
    window.addEventListener('load', loadProvider)
    return () => {
      window.removeEventListener('load', loadProvider)
      window.ethereum.on && window.ethereum.removeListener('accountsChanged', accountChangeHandler)
      window.ethereum.on && window.ethereum.removeListener('chainChanged', networkChangeHandler)
    }
  }, [dispatch])

  return provider
}

export default useProvider
