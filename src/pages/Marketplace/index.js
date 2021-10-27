import { Box, InputLabel, MenuItem, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { CssTextField, StyledFormControl, StyledSelect } from '../Create'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import * as MI from '@mui/icons-material'
import axie1 from '../../assets/axie-1.png'

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

  > div {
    height: 285px;
    width: 225px;
    background: #decbbd;
    color: #000000;
    border-radius: 32px;
    cursor: pointer;

    :hover {
      background: #fed;
    }
  }
`

export default function Marketplace() {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState('Lowest price')
  const [filterByOrderType, setFilterByOrderType] = useState('All')
  const [filterByClassify, setFilterByClassify] = useState('All')

  return (
    <Container>
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
            onChange={(e) => setFilterByOrderType(e.target.value)}
          >
            <MenuItem value="All">{t('All')}</MenuItem>
            <MenuItem value="Buy new">{t('Buy new')}</MenuItem>
            <MenuItem value="Exchange">{t('Exchange')}</MenuItem>
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
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
          {/* Card */}
          <Box padding="16px" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Box>
                <div>#12345678</div>
                <Box display="flex" alignItems="flex-end" marginTop="4px">
                  <MI.Pets />
                  <Typography marginLeft="4px" fontSize="14px" lineHeight="normal">
                    {t('Beast')}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.Favorite fontSize="small" style={{ fill: '#3ac279' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      15
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.FlashOn fontSize="small" style={{ fill: '#f7ac0a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      16
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box display="flex" alignItems="flex-start">
                    <MI.StarRate fontSize="small" style={{ fill: '#9166e0' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      17
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="flex-start">
                    <MI.LocalFireDepartment fontSize="small" style={{ fill: '#c23a3a' }} />
                    <Typography fontSize="20px" lineHeight="normal">
                      18
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box width="100%" display="flex" justifyContent="center" alignItems="center" flex="1">
              <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
            </Box>
          </Box>
        </RowGrid>
      </RowGridWrapper>
    </Container>
  )
}
