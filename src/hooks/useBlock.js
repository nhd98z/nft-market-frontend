import { useEffect, useState } from 'react'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const provider = window.providerEth

  useEffect(() => {
    ;(async () => {
      try {
        if (provider) {
          const block = await provider.getBlockNumber()
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
