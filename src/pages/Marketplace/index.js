import Web3Modal from 'web3modal'
import useProvider from '../../hooks/useProvier'

export default function Marketplace() {

  const provider = useProvider()
  console.log('provider', provider)

  const connectWallet = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
  }

  return (
   <div>
      <div>Marketplace</div>
      <button onClick={connectWallet}>Connect wallet</button>
   </div>
  )
}
