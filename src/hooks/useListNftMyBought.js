import { useEffect, useState } from 'react'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import axios from 'axios'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import useBlock from './useBlock'
import { fetchMetadata } from '../states/tokenDataSlice'

const useListNftMyBought = () => {
  const nftContract = useNtfContract()
  const nftMarketContract = useNtfMarketContract()
  const [list, setList] = useState([])
  const account = useSelector((state) => state.provider.account)
  const block = useBlock()
  const dispatch = useDispatch()
  const metaData = useSelector((state) => state.tokenData.metaData)

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
            let meta
            if (!metaData[i.tokenId]) {
              const tokenUri = await nftContract.tokenURI(i.tokenId)
              meta = (await axios.get(tokenUri)).data
              dispatch(fetchMetadata({ meta: meta, id: i.tokenId }))
            }else{
              meta = metaData[i.tokenId]
            }
            const tokenState = await nftContract.tokenDetail(i.tokenId)
            let item = {
              id: i.itemId.toString(),
              tokenId: i.tokenId.toNumber(),
              image: meta.urlImage,
              class: meta.classId,
              level: tokenState.level.toString(),
              heath: tokenState.heath.toString(),
              morale: tokenState.morale.toString(),
              skill: tokenState.skill.toString(),
              speed: tokenState.speed.toString(),
              buyer: i.buyer
            }
            return item
          }),
        )
        setList(data)
        return true
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, nftContract, nftMarketContract, block, dispatch])
  return list
}

export default useListNftMyBought
