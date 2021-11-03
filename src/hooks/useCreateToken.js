import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { LISTING_PRICE, NFT_ADDRESS, SECONDS_TIME_MAX_SELL, SECOND_PER_BLOCK } from '../constants'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import useBlock from './useBlock'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const useCreateToken = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const chainId = useSelector((state) => state.provider.chainId)
  const block = useBlock()
  return useCallback(
    async (urlImage, price, classId, stats) => {
      try {
        const data = JSON.stringify({
          urlImage,
          classId,
        })
        const added = await client.add(data)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        const tokenURI = url
        const level = 1
        const health = stats.health
        const speed = stats.speed
        const skill = stats.skill
        const morale = stats.morale
        if (nftContract && nftMarketContract && chainId) {
          // create token
          const createTokenTx = await nftContract.createToken(tokenURI, classId, level, health, speed, skill, morale)
          const tokenId = await createTokenTx.wait()
          // listing token to market
          price = ethers.utils.parseUnits(price, 'ether')
          const blockNumberAfter2Weeks = block + Math.floor(SECONDS_TIME_MAX_SELL / SECOND_PER_BLOCK[chainId])
          const listingTokenTx = await nftMarketContract.createMarketItem(
            NFT_ADDRESS[chainId],
            tokenId.toString(),
            price,
            price,
            blockNumberAfter2Weeks,
            {
              value: ethers.utils.parseUnits(LISTING_PRICE, 'ether')
            }
          )
          await listingTokenTx.wait()
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [chainId, nftContract, nftMarketContract, block],
  )
}

export default useCreateToken
