import { useEffect, useState } from 'react'
import useNtfContract from './useNtfContract'
import useNtfMarketContract from './useNtfMarketContract'
import { useDispatch } from 'react-redux'
import useBlock from './useBlock'
import { ethers } from 'ethers'
import _ from 'lodash'

const useListOffer = (itemId) =>{
    const nftContract = useNtfContract()
    const nftMarketContract = useNtfMarketContract()
    const [list, setList] = useState([])
    const block = useBlock()
    const dispatch = useDispatch()


    useEffect(() => {
        ;(async() => {

            if (!nftContract || !nftMarketContract) return;
            const listOffer = await nftMarketContract.fetchOffersOfItem(itemId)
            
            const listOfferAvail = listOffer.filter((offer) => {
                if(offer.refundable) return true
            })
            const listOfferOrderByAmount = _.orderBy(listOfferAvail, ['amount'],['desc'])
            const data = await Promise.all(
                listOfferOrderByAmount.map(async (i) => {
                    let offer = {
                        id : i.offerId,
                        asker : i.asker,
                        amount : ethers.utils.formatUnits(i.amount.toString(), 'ether'),
                        blockTime : i.blockTime
                    }
                    return offer
                }),
            )
            setList(data)
            return true
        })()
    },[dispatch, nftContract, nftMarketContract, block, itemId])
    return list
}
export default useListOffer