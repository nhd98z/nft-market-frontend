import { useEffect, useState } from 'react'
import useProvider from './useProvider'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const provider = useProvider()

  useEffect(() => {
    ;(async () => {
      try {
        if (provider) {
          const block = await provider.getBlockNumber()
          console.log('block', block)
          setBlock(block)
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
  }, [provider])

  return block
}

export default useBlock
