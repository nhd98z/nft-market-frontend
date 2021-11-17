import Web3Modal from 'web3modal'
import { SECOND_PER_BLOCK } from '../constants'

export const saveTxPending = (tx, message) => {
  const txsStorage = JSON.parse(localStorage.getItem('tx_pending') ?? '{}') ?? {}
  txsStorage[tx] = message
  localStorage.setItem('tx_pending', JSON.stringify(txsStorage))
}

export const getTxPending = () => {
  return JSON.parse(localStorage.getItem('tx_pending') ?? '{}') ?? {}
}

export const removeTxSuccess = (tx) => {
  const txsStorage = JSON.parse(localStorage.getItem('tx_pending') ?? '{}') ?? {}
  if (txsStorage.hasOwnProperty(tx)) {
    delete txsStorage[tx]
  }
  localStorage.setItem('tx_pending', JSON.stringify(txsStorage))
}

export const connectWallet = async () => {
  const web3Modal = new Web3Modal()
  await web3Modal.connect()
}

export const timeToBlockNumber =  (time, chainId) => {
    let pickTime = new Date(time).getTime()
    let currentTimeStamp = Date.now()
    let blockNumber = Math.floor((pickTime - currentTimeStamp) / 1000 / SECOND_PER_BLOCK[chainId])
    console.log(blockNumber)
    
    return blockNumber
    // setBlockNumber(blockNumber)
}