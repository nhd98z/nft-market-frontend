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

export const NFT_ADDRESS = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: '0xa0D184337bdb746356aF721B39C491666f73e0ef',
}
export const NFT_MARKET_ADDRESS = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: '0x1DB1F5A5346e06764F01174BE3B3789F70866BBa',
}

export const SECOND_PER_BLOCK = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: 14,
}

export const OWNER_NFT = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: '0x090030D40A193a5966014c2D0B014F21459cb33e',
}

export const OWNER_NFT_MARKET = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: '0x090030D40A193a5966014c2D0B014F21459cb33e',
}
export const EXPLORER_TX = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: 'https://rinkeby.etherscan.io/tx/',
}

export const ClassItem = {
  BEAST: 1,
  PLANT: 2,
  BUG: 3,
  MECH: 4,
}

export const SECONDS_TIME_MAX_SELL = 3600 * 24 * 7 * 2 // 2 weeks

export const LEVEL_UP_FEE = 0.001 // Ether

export const LISTING_PRICE = 0.0025 // Ether

export const ITEMS_PER_PAGE = 8
