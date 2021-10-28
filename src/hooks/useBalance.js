import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useBalance = () => {
  const [balance, setBalance] = useState('0')
  const provider = useSelector((state) => state.provider)

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
