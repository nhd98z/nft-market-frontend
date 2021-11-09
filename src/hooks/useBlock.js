import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getTxPending, removeTxSuccess } from '../utils'
import useAlertCallback from './useAlertCallback'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const alertMessage = useAlertCallback()
  const provider = window.providerEth
  const { t } = useTranslation()

  useEffect(() => {
    const onNewBlock = async (block) => {
      const data = await provider.getBlockWithTransactions(block)
      const txs = data.transactions
      const pendingTxs = getTxPending()
      txs
        .map((txB) => {
          if (pendingTxs.hasOwnProperty(txB.hash)) {
            alertMessage(t('Success'), pendingTxs[txB.hash], 'success')
            removeTxSuccess(txB.hash)
            return txB.hash
          }
          return txB
        })
        .filter((hash) => hash !== undefined)
      setBlock(block)
    }
    ;(async () => {
      try {
        if (provider) {
          provider.on('block', onNewBlock)
          const block = await provider.getBlockNumber()
          setBlock(block)
        }
      } catch (error) {
        console.error('error', error)
      }
    })()
    return () => {
      provider && provider.off('block', onNewBlock)
    }
  }, [alertMessage, block, provider, t])

  return block
}

export default useBlock
