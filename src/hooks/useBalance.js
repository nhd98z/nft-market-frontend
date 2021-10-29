import { useEffect, useState } from 'react'
import useProvider from './useProvider'

const useBalance = () => {
  const [balance, setBalance] = useState('0')
  const provider = useProvider()

  useEffect(() => {
    ;(async () => {
      try {
        if (provider && provider.account) {
          const signer = await provider.provider.getSigner()
          const balance = await signer.getBalance()
          setBalance(balance.toString())
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [provider])

  return balance
}

export default useBalance
