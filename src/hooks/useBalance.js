import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useProvider from './useProvider'

const useBalance = () => {
  const [balance, setBalance] = useState('0')
  const provider = useProvider()
  const account = useSelector((state) => state.provider.account)

  useEffect(() => {
    ;(async () => {
      try {
        if (provider && account) {
          const signer = await provider.getSigner()
          const balance = await signer.getBalance()
          setBalance(balance.toString())
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [account, provider])

  return balance
}

export default useBalance
