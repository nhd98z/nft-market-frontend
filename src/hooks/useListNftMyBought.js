import { useEffect, useState } from 'react'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import axios from 'axios'
import { ethers } from 'ethers'

const useListNftMyBought = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      if (nftContract && nftMarketContract) {
        // get list tokens
        const listItems = await nftMarketContract.fetchMyNFTs()
        const data = await Promise.all(
          listItems.map(async (i) => {
            const tokenUri = await nftContract.tokenURI(i.tokenId)
            const tokenState = await nftContract._tokenDetails(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.minPrice.toString(), 'ether')
            let item = {
              id: i.itemId.toString(),
              price,
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
          })
        )
        setList(data)
        return true
      }
    })()
  }, [nftContract, nftMarketContract])
  return list
}

export default useListNftMyBought
