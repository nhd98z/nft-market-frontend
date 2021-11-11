import axios from 'axios'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useBlock from './useBlock'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'

const useListNftInListing = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const [list, setList] = useState([])
  const dispatch = useDispatch()
  const block = useBlock()

  useEffect(() => {
    ;(async () => {
      if (nftContract && nftMarketContract) {
        // get list tokens
        const listItems = await nftMarketContract.fetchMarketItems()
        // dispatch(fetchMetadata(nftContract, listItems[0]))
        const data = await Promise.all(
          listItems.map(async (i) => {
            const tokenUri = await nftContract.tokenURI(i.tokenId)
            const tokenState = await nftContract._tokenDetails(i.tokenId)
            const meta = await axios.get(tokenUri)
            let minPrice = ethers.utils.formatUnits(i.minPrice.toString(), 'ether')
            let price = ethers.utils.formatUnits(i.maxPrice.toString(), 'ether')
            let currentPrice = ethers.utils.formatUnits(i.currentPrice.toString(), 'ether')
            let item = {
              id: i.itemId.toString(),
              minPrice,
              price,
              currentPrice,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              buyer: i.buyer,
              image: meta.data.urlImage,
              class: meta.data.classId,
              level: tokenState.level.toString(),
              heath: tokenState.heath.toString(),
              morale: tokenState.morale.toString(),
              skill: tokenState.skill.toString(),
              speed: tokenState.speed.toString(),
            }
            return item
          }),
        )
        setList(data)
        return true
      }
    })()
  }, [dispatch, nftContract, nftMarketContract, block])
  return list
}

export default useListNftInListing
