import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useBalance = () => {
  const [balance, setBalance] = useState('0')
  const providerState = useSelector((state) => state.provider)
  useEffect(() => {
    ;(async () => {
      try {
        if (providerState && providerState.account) {
          const signer = await providerState.provider.getSigner()
          const balance = await signer.getBalance()
          setBalance(balance.toString())
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [providerState])
  return balance
}

export default useBalance
