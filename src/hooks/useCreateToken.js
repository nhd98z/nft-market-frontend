import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useNtfContract from './useNtfContract'
import { saveTxPending } from '../utils/index'
import { create as ipfsHttpClient } from 'ipfs-http-client'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const useCreateToken = () => {
  const nftContract = useNtfContract()
  return useCallback(
    async (urlImage, price, classId, stats) => {
        console.log('stats', stats)
      try {
        const data = JSON.stringify({
          urlImage,
          classId,
        })
        const added = await client.add(data)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        console.log('url', url)
        const tokenURI = url
        const level = 1
        const health = stats.health
        const speed = stats.speed
        const skill = stats.skill
        const morale = stats.morale
        console.log('tokenURI, classId, level, heath, speed, skill, morale', tokenURI, classId, level, health, speed, skill, morale)
        if (nftContract) {
          const tx = nftContract
            .createToken(tokenURI, classId, level, health, speed, skill, morale)
            .then((txResponse) => {
              // TODO: tx hash
              saveTxPending(txResponse.hash)
              return txResponse
            })
            .catch((err) => console.log('err', err))
          return tx
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [nftContract],
  )
}

export default useCreateToken
