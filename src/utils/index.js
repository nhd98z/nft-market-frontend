export const saveTxPending = (tx) => {
    const txsStorage = JSON.parse(localStorage.getItem('tx_pending') ?? '') ??[]
    txsStorage.push(tx) 
    localStorage.setItem('tx_pending', JSON.stringify(txsStorage))
}