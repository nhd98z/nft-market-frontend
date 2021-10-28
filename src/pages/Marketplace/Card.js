import { Box, Typography } from '@mui/material'
import * as MI from '@mui/icons-material'
import axie1 from '../../assets/axie-1.png'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

const StyledCard = styled(Box)`
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    display: none;

    ::after {
      background: rgb(222, 203, 189, 0.75);
      content: 'BUY';
      font-size: 32px;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :hover {
    .overlay {
      display: block;
    }
  }
`
export default function Card() {
  const { t } = useTranslation()

  return (
    <StyledCard
      position="relative"
      padding="16px"
      display="flex"
      flexDirection="column"
      onClick={() => alert('Mua thành công!')}
    >
      <div className="overlay" />
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
      <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" flex="1">
        <img src={axie1} alt="axie1" style={{ width: '160px', height: 'fit-content' }} />
        <Typography fontSize="20px" fontWeight={400}>
          1.28 ETH
        </Typography>
      </Box>
    </StyledCard>
  )
}
