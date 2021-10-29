import { Box, InputLabel, MenuItem } from '@mui/material'
import styled from '@emotion/styled'
import { CssTextField, StyledFormControl, StyledSelect } from '../Create'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Card from '../../components/Card'
import Modal from '../../components/Modal'

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
  const [sortBy, setSortBy] = useState('Lowest price')
  const [filterByOrderType, setFilterByOrderType] = useState('All')
  const [filterByClassify, setFilterByClassify] = useState('All')

  const [openModal, setOpenModal] = useState(false)

  const onCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container>
      <Modal open={openModal} onClose={onCloseModal} />
      <RowControl display="flex" justifyContent="center">
        <CssTextField width="15vw" label={t('Search...')} variant="outlined" size="small" />
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
            <MenuItem value="Buy new">{t('Buy new')}</MenuItem>
            <MenuItem value="Exchange">{t('Exchange')}</MenuItem>
            <MenuItem value="My Vnext">{t('My Vnext')}</MenuItem>
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
          <Card onClick={() => setOpenModal(true)} onClose={onCloseModal} />
          <Card onClick={() => setOpenModal(true)} onClose={onCloseModal} />
        </RowGrid>
      </RowGridWrapper>
    </Container>
  )
}
