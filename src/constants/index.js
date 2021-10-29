import NFT_ABI from './abis/NFT.json'
import NFT_MARKET_ABI from './abis/NFT_Market.json'

export const ChainId = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
}

export const ABI = {
  ntf: NFT_ABI,
  ntfMarket: NFT_MARKET_ABI,
}

export const NTF_ADDRESS = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '0xEFa80AB89b567Af03855427FE9080Eb269038a7A',
}
export const NTF_MARKET_ADDRESS = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '0xDC7d62e844c929F3Be233402A87CF620f39f8133',
}

export const ClassItem = {
  BEAST: 1,
  PLANT: 2,
  BUG: 3,
  MECH: 4,
}

export const LEVEL_UP_FEE = 0.001 // Ether

export const LISTING_PRICE = 0.0025 // Ether