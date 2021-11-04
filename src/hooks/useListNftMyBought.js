import { useEffect, useState } from 'react'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import axios from 'axios'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import useBlock from './useBlock'

const useListNftMyBought = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const [list, setList] = useState([])
  const account = useSelector((state) => state.provider.account)
  const block = useBlock()

  useEffect(() => {
    ;(async () => {
      if (nftContract && nftMarketContract && account) {
        // get list tokens
        const listMyBoughtItems = await nftMarketContract.fetchMyNFTs(account)
        const listMySellItems = await nftMarketContract.fetchItemsCreated(account)
        //
        const sortedListMyBoughtItems = _.orderBy(listMyBoughtItems, ['itemId'], ['desc'])
        const uniqueListMyBoughtItems = _.uniqBy(sortedListMyBoughtItems, 'tokenId')
        //
        const sortedListMySellItems = _.orderBy(listMySellItems, ['itemId'], ['desc'])
        const uniqueListMySellItems = _.uniqBy(sortedListMySellItems, 'tokenId')

        const myItem = uniqueListMyBoughtItems.filter((buyItem) => {
          const buyTokenId = buyItem.tokenId.toNumber()
          const buyId = buyItem.itemId.toNumber()
          const sellItems = uniqueListMySellItems.filter((sellItem) => {
            const sellTokenId = sellItem.tokenId.toNumber()
            const sellId = sellItem.itemId.toNumber()
            if (sellTokenId === buyTokenId && sellId > buyId) {
              return true
            }
            return false
          })
          if (!sellItems.length) {
            return true
          }
          return false
        })
        const data = await Promise.all(
          myItem.map(async (i) => {
            const tokenUri = await nftContract.tokenURI(i.tokenId)
            const tokenState = await nftContract._tokenDetails(i.tokenId)
            const meta = await axios.get(tokenUri)
            let item = {
              id: i.itemId.toString(),
              tokenId: i.tokenId.toNumber(),
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
  }, [account, nftContract, nftMarketContract, block])
  return list
}

export default useListNftMyBought
