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
  [ChainId.RINKEBY]: '0x88fffaD4689581Bc9156041515447751B8A902A5',
}
export const NFT_MARKET_ADDRESS = {
  [ChainId.MAINNET]: undefined,
  [ChainId.ROPSTEN]: undefined,
  [ChainId.RINKEBY]: '0xB0b0C440E23c467a8B7D4ccE75f7658EFDBF8C98',
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
