import BigNumber from 'bignumber.js'

export function getValueAfterDivideForDecimals(value, decimals) {
  const big = new BigNumber(value).div(new BigNumber(10).pow(decimals))
  return big.decimalPlaces(5).toString()
}
