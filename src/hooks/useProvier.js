import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const useProvider = () => {
  const [provider, setProvider] = useState()
  const [chainID, setChainID] = useState(0)
  const [account, setAccount] = useState('')

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
                setAccount(accounts[0])
              }
            })
          // detect Network account change
          window.ethereum.on &&
            window.ethereum.on('chainChanged', function (chain) {
              setChainID(parseInt(chain, 16))
            })
          // use MetaMask's provider
          currentProvider = new ethers.providers.Web3Provider(window.ethereum)
          // set provider
          setProvider(currentProvider)
          const currentSigner = await currentProvider.getSigner()
          // set chainID
          setChainID(await currentSigner.getChainId())
          // set account
          const web3Account = await currentSigner.getAddress()
          setAccount(web3Account)
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

  return {provider, chainID, account}
}


export default useProvider
