import { ethers } from 'ethers'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataWithAccount, fetchDataWithChainId, fetchDataWithProvider } from '../states/providerSlice'

const useProvider = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadProvider = async () => {
      let currentProvider
      try {
        if (window.ethereum) {
          // detect Metamask account change
          window.ethereum.on &&
            window.ethereum.on('accountsChanged', function (accounts) {
              console.log('accountsChanged')
              if (accounts.length > 0) {
                dispatch(fetchDataWithAccount(accounts[0]))
              }
            })
          // detect Network account change
          window.ethereum.on &&
            window.ethereum.on('chainChanged', function (chain) {
              dispatch(fetchDataWithChainId(parseInt(chain, 16)))
            })
          // use MetaMask's provider
          currentProvider = new ethers.providers.Web3Provider(window.ethereum)
          dispatch(fetchDataWithProvider(currentProvider))
          // set provider
          const currentSigner = await currentProvider.getSigner()
          // set chainID
          dispatch(fetchDataWithChainId(await currentSigner.getChainId()))
          // set account
          const web3Account = await currentSigner.getAddress()
          dispatch(fetchDataWithAccount(web3Account))
        } else {
          console.error('Metamask not install!!!')
        }
      } catch (error) {
        console.error('error', error)
      }
    }
    window.addEventListener('load', loadProvider)
    return () => window.removeEventListener('load', loadProvider)
  }, [])

  return {}
}

export default useProvider
