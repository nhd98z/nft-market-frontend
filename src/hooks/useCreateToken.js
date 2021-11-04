import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { LISTING_PRICE, NFT_ADDRESS, SECONDS_TIME_MAX_SELL, SECOND_PER_BLOCK } from '../constants'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import useBlock from './useBlock'
import useAlertCallback from './useAlertCallback'
import { useTranslation } from 'react-i18next'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const useCreateToken = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const chainId = useSelector((state) => state.provider.chainId)
  const block = useBlock()
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()

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
          const createTokenSuccess = await createTokenTx.wait()
          let event = createTokenSuccess.events[0]
          let value = event.args[2]
          let tokenId = value.toNumber()
          // listing token to market
          price = ethers.utils.parseUnits(price, 'ether')
          const blockNumberAfter2Weeks = block + Math.floor(SECONDS_TIME_MAX_SELL / SECOND_PER_BLOCK[chainId])
          const listingTokenTx = await nftMarketContract.createMarketItem(
            NFT_ADDRESS[chainId],
            tokenId,
            price.toString(),
            price.toString(),
            blockNumberAfter2Weeks,
            {
              value: (ethers.utils.parseUnits(LISTING_PRICE.toString(), 'ether')).toString(),
            },
          )
          await listingTokenTx.wait()
          alertMessage(t('Success'), t('Listing token success'), 'success')
          return true
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [nftContract, nftMarketContract, chainId, block, alertMessage, t],
  )
}

export default useCreateToken
