export const saveTxPending = (tx) => {
    const txsStorage = JSON.parse(localStorage.getItem('tx_pending') ??  '[]') ?? []
    txsStorage.push(tx) 
    localStorage.setItem('tx_pending', JSON.stringify(txsStorage))
}

export const removeTxSuccess = (tx) => {
    const txsStorage = JSON.parse(localStorage.getItem('tx_pending') ??  '[]') ?? []
    const index = txsStorage.indexOf(tx);
    if (index > -1) {
        txsStorage.splice(index, 1);
    }
    localStorage.setItem('tx_pending', JSON.stringify(txsStorage))
}