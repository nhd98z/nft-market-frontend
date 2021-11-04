import { Box, InputLabel, MenuItem } from '@mui/material'
import styled from '@emotion/styled'
import { CssTextField, StyledFormControl, StyledSelect } from '../Create'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import useListNftInListing from '../../hooks/useListNftInListing'
import { OWNER_NFT_MARKET } from '../../constants'
import { useSelector } from 'react-redux'
import useListNftMyBought from '../../hooks/useListNftMyBought'

const Container = styled(Box)`
  width: calc(100% - 16px);
`

const RowControl = styled(Box)`
  margin-top: 32px;

  > * + * {
    margin-left: 16px !important;
  }
`

const RowGridWrapper = styled(Box)`
  margin-top: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
  flex: 1;
`

const RowGrid = styled(Box)`
  width: 1080px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;
  row-gap: 45px;
`

export default function Marketplace() {
  const { t } = useTranslation()
  const chainId = useSelector((state) => state.provider.chainId)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('Lowest price')
  const [filterByOrderType, setFilterByOrderType] = useState('All')
  const [filterByClassify, setFilterByClassify] = useState('All')
  const [listData, setListData] = useState([])
  const account = useSelector((state) => state.provider.account)

  const [openModal, setOpenModal] = useState(false)
  const [itemModal, setItemModal] = useState({})

  const listNftIsListing = useListNftInListing()

  const listNftIsMyBought = useListNftMyBought()

  useEffect(() => {
    
  })

  useEffect(() => {
    let result
    switch (filterByOrderType) {
      case 'All':
        result = listNftIsListing
        break
      case 'Buy from Admin':
        result = listNftIsListing.filter((item) => item.seller.toLowerCase() === OWNER_NFT_MARKET[chainId].toLowerCase())
        break;
      case 'My Selling':
        result = listNftIsListing.filter((item) => item.seller.toLowerCase() === account.toLowerCase())
        break;
      case 'My NFT':
        result = listNftIsMyBought
        break;
      default:
        result = listNftIsListing
        break;
    }
    setListData(result)
  }, [account, chainId, filterByOrderType, listNftIsListing, listNftIsMyBought])

  const onCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container>
      <Modal open={openModal} onClose={onCloseModal} itemModal={itemModal} />
      <RowControl display="flex" justifyContent="center">
        <CssTextField
          width="15vw"
          label={t('Search...')}
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StyledFormControl width="160px" value={sortBy}>
          <InputLabel style={{ color: '#decbbd' }} size="small">
            {t('Sort by')}
          </InputLabel>
          <StyledSelect
            displayEmpty
            label={t('Sort by')}
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="Lowest price">{t('Lowest price')}</MenuItem>
            <MenuItem value="Highest price">{t('Highest price')}</MenuItem>
            <MenuItem value="Lowest ID">{t('Lowest ID')}</MenuItem>
            <MenuItem value="Highest ID">{t('Highest ID')}</MenuItem>
            <MenuItem value="Name">{t('Name')}</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledFormControl width="120px" value={filterByOrderType}>
          <InputLabel style={{ color: '#decbbd' }} size="small">
            {t('Type')}
          </InputLabel>
          <StyledSelect
            displayEmpty
            label={t('Type')}
            size="small"
            defaultValue="All"
            onChange={(e) => setFilterByOrderType(e.target.value)}
          >
            <MenuItem value="All">{t('All')}</MenuItem>
            <MenuItem value="Buy from Admin">{t('Buy from Admin')}</MenuItem>
            <MenuItem value="My Selling">{t('My Selling')}</MenuItem>
            <MenuItem value="My NFT">{t('My NFT')}</MenuItem>
          </StyledSelect>
        </StyledFormControl>
        <StyledFormControl width="120px" value={filterByClassify}>
          <InputLabel style={{ color: '#decbbd' }} size="small">
            {t('Class')}
          </InputLabel>
          <StyledSelect
            displayEmpty
            label={t('Class')}
            size="small"
            defaultValue="All"
            onChange={(e) => setFilterByClassify(e.target.value)}
          >
            <MenuItem value="All">{t('All')}</MenuItem>
            <MenuItem value="Beast">{t('Beast')}</MenuItem>
            <MenuItem value="Plant">{t('Plant')}</MenuItem>
            <MenuItem value="Bug">{t('Bug')}</MenuItem>
            <MenuItem value="Mech">{t('Mech')}</MenuItem>
          </StyledSelect>
        </StyledFormControl>
      </RowControl>
      <RowGridWrapper>
        <RowGrid>
          {listData.map((item, index) => {
            return (
              <Card
                onClick={() => {
                  setItemModal(item)
                  setOpenModal(true)
                }}
                onClose={onCloseModal}
                item={item}
                key={index}
              />
            )
          })}
        </RowGrid>
      </RowGridWrapper>
    </Container>
  )
}
