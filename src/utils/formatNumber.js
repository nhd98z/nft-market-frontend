import BigNumber from 'bignumber.js'

export function div1e18(balance) {
  const big = new BigNumber(balance).div(1e18)
  return big
}
