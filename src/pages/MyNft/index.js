import { Box, InputLabel, MenuItem } from '@mui/material'
import styled from '@emotion/styled'
import { CssTextField, StyledFormControl, StyledSelect } from '../Create'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Modal from '../../components/Modal'
import useListNftInListing from '../../hooks/useListNftInListing'
import { ClassItem } from '../../constants'
import { useSelector } from 'react-redux'
import useListNftMyBought from '../../hooks/useListNftMyBought'
import ReactPaginate from 'react-paginate';
import Pagination from '@mui/material/Pagination';

import _ from 'lodash'

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
const PagingContainer = styled(Box)`
    margin-top:80px;
    display: flex;
    justify-content: center;
  `
export default function Marketplace() {
  const itemsPerPage = 8
  const { t } = useTranslation()
  const chainId = useSelector((state) => state.provider.chainId)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('Lowest price')
  const [filterByOrderType, setFilterByOrderType] = useState('My NFT')
  const [filterByClassify, setFilterByClassify] = useState('All')
  const [listDataLength, setListDataLength] = useState([])
  const account = useSelector((state) => state.provider.account)

  const [openModal, setOpenModal] = useState(false)
  const [itemModal, setItemModal] = useState({})

  const listNftIsListing = useListNftInListing()
  const listNftIsMyBought = useListNftMyBought()
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    let result
    switch (filterByOrderType) {
      case 'My Selling':
        result = _.filter(listNftIsListing, (item) => account && item.seller.toLowerCase() === account.toLowerCase())
        break
      case 'My NFT':
        const itemIsSelling = _.map(listNftIsListing, (item) => {
          if (account && item.seller.toLowerCase() === account.toLowerCase()) {
            return item.tokenId
          }
        }).filter((i) => i !== undefined)
        result = _.filter(listNftIsMyBought, (item) => !itemIsSelling.includes(item.tokenId))
        break
      default:
        result = listNftIsListing
        break
    }
    if (filterByClassify !== 'All') {
      result = _.filter(result, (item) => item.class === filterByClassify)
    }
    if (search) {
      result = _.filter(result, (item) => item.tokenId.toString() === search)
    }
    switch (sortBy) {
      case 'Lowest price':
        result = _.orderBy(result, ['price'], ['asc'])
        break
      case 'Highest price':
        result = _.orderBy(result, ['price'], ['desc'])
        break
      case 'Lowest ID':
        result = _.orderBy(result, ['id'], ['asc'])
        break
      case 'Highest ID':
        result = _.orderBy(result, ['id'], ['desc'])
        break
      default:
        break
    }
    setListDataLength(result.length)
    const endOffset = itemOffset + itemsPerPage;
    setPageCount(Math.ceil(result.length / itemsPerPage));
    setCurrentItems(result.slice(itemOffset, endOffset))
  }, [account, chainId, filterByClassify, filterByOrderType, listNftIsListing, listNftIsMyBought, search, sortBy,itemOffset])

  const onCloseModal = () => {
    setOpenModal(false)
  }
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listDataLength;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    console.log(
      `length ${listDataLength},`
    );
    setItemOffset(newOffset);
  };
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
            defaultValue="My NFT"
            onChange={(e) => setFilterByOrderType(e.target.value)}
          >
            <MenuItem value="My NFT">{t('My NFT')}</MenuItem>
            <MenuItem value="My Selling">{t('My Selling')}</MenuItem>
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
            {Object.keys(ClassItem).map((item, index) => {
              return (
                <MenuItem value={ClassItem[item]} style={{ textTransform: 'capitalize' }} key={index}>
                  {t(item.toLocaleLowerCase())}
                </MenuItem>
              )
            })}
          </StyledSelect>
        </StyledFormControl>
      </RowControl>
      <RowGridWrapper style={{ overflow: 'visible' }}>
        <RowGrid>
          {currentItems.map((item, index) => {
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
      <PagingContainer style={{ color: 'pink' }}>
      <Pagination count={10} showFirstButton showLastButton color="secondary" style={{display: 'none'}}/>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textSecondary MuiPaginationItem-page css-19micn4-MuiButtonBase-root-MuiPaginationItem-root"
          previousClassName="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textSecondary MuiPaginationItem-page css-19micn4-MuiButtonBase-root-MuiPaginationItem-root"
          nextClassName="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textSecondary MuiPaginationItem-page css-19micn4-MuiButtonBase-root-MuiPaginationItem-root"
          breakClassName="css-1v2lvtn-MuiPaginationItem-root"
          containerClassName="css-wjh20t-MuiPagination-ul"
          activeClassName="Mui-selected"
        />
      </PagingContainer>
    </Container>
  )
}
