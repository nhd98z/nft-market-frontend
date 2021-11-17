import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axie1 from '../../assets/axie-1.png'
import * as MI from '@mui/icons-material'
import { ClassItem } from '../../constants/index'
import useCreateToken from '../../hooks/useCreateToken'
import useAlertCallback from '../../hooks/useAlertCallback'
import {SECOND_PER_BLOCK } from '../../constants'
import { useSelector } from 'react-redux'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * + * {
    margin-top: 30px !important;
  }
`

const Heading = styled.h1`
  font-size: 60px;
  margin: 36px 0;
  position: relative;
  -webkit-box-reflect: below -20px linear-gradient(transparent, rgba(0, 0, 0, 0.2));

  span {
    font-family: 'Permanent Marker', cursive;
    position: relative;
    display: inline-block;
    color: #ffffff;
    animation: waviy 1s;
    animation-delay: calc(0.1s * var(--i));
  }

  @keyframes waviy {
    0%,
    40%,
    100% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(-20px);
    }
  }
`
const CssTimeTextField = styled(TextField, {})(
  ({ value, unit, width, myBackgroundColor, myColor }) => ({
    width: width,
    '& input': {
      color: myBackgroundColor ?? '#ffeedd',
    },
    '& label': {
      color: myColor ?? '#decbbd',
      display: value ? 'block' : 'flex',
      justifyContent: 'left',
      width: '100%',
    },
    '&:hover': {
      label: {
        color: myBackgroundColor ?? '#ffeedd',
      },
    },
    '& label.Mui-focused': {
      color: myBackgroundColor ?? '#ffeedd',
      display: 'block',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: myBackgroundColor ?? '#ffeedd',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& fieldset': {
        borderColor: myColor ?? '#decbbd',
      },
      '&:hover fieldset': {
        borderColor: myBackgroundColor ?? '#ffeedd',
      },
      '&.Mui-focused fieldset': {
        borderColor: myBackgroundColor ?? '#ffeedd',
      },
    },
    '&::after': {
      content: value && unit ? "'" + unit + "'" : "''",
      position: 'absolute',
      top: 0,
      padding: 0,
      margin: 0,
      right: '16px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
  }),
)
export const CssTextField = styled(TextField, { shouldForwardProp: isPropValid })(
  ({ value, unit, width, myBackgroundColor, myColor }) => ({
    width: width,
    '& input': {
      color: myBackgroundColor ?? '#ffeedd',
    },
    '& label': {
      color: myColor ?? '#decbbd',
      display: value ? 'block' : 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    '&:hover': {
      label: {
        color: myBackgroundColor ?? '#ffeedd',
      },
    },
    '& label.Mui-focused': {
      color: myBackgroundColor ?? '#ffeedd',
      display: 'block',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: myBackgroundColor ?? '#ffeedd',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& fieldset': {
        borderColor: myColor ?? '#decbbd',
      },
      '&:hover fieldset': {
        borderColor: myBackgroundColor ?? '#ffeedd',
      },
      '&.Mui-focused fieldset': {
        borderColor: myBackgroundColor ?? '#ffeedd',
      },
    },
    '&::after': {
      content: value && unit ? "'" + unit + "'" : "''",
      position: 'absolute',
      top: 0,
      padding: 0,
      margin: 0,
      right: '16px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
  }),
)

export const StyledFormControl = styled(FormControl)(({ width, value }) => ({
  width: width,
  color: '#ffeedd',
  '& label': {
    color: '#decbbd',
    display: value ? 'block' : 'flex',
    justifyContent: 'center',
    width: 'calc(100% - 36px)',
  },
  '& .MuiSelect-select': {
    color: '#ffeedd',
  },
  '& label.Mui-focused': {
    display: 'block',
  },
  '& svg': {
    color: '#decbbd',
  },
  '& fieldset': {
    borderColor: '#decbbd',
  },
  '&:hover fieldset': {
    borderColor: '#ffeedd !important',
  },
  '& .Mui-focused fieldset': {
    borderColor: '#ffeedd !important',
  },
}))

export const StyledSelect = styled(Select)({
  borderRadius: '20px !important',
})

const StyledButton = styled(Button)`
  background: #ffeedd;
  color: #000000;
  width: 20vw;
  border-radius: 32px;
  padding: 16.5px 14px;
  font-weight: 500;

  :hover,
  :focus {
    background: #ffeedd;
  }
`

const Axie = styled.img`
  width: 20vw;
  position: absolute;
`

const Axie1 = styled(Axie)`
  top: 25vh;
  left: 10vw;
  transform: scaleX(-1) rotate(15deg);
  animation-timing-function: ease-in-out;
  animation: yee 1s;
  @keyframes yee {
    from {
      left: -100vw;
    }
    to {
      left: 10vw;
    }
  }
`

export default function Create() {
  const [urlImage, setUrlImage] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [classify, setClassify] = useState('') // BEAST PLANT BUG MECH
  const [stats, setStats] = useState({ health: 1, speed: 1, skill: 1, morale: 1 })
  const [blockNumber,setBlockNumber] = useState(0)
  const { t } = useTranslation()
  const onCreateToken = useCreateToken()
  const alertMessage = useAlertCallback()
  const [txPending, setTxPending] = useState(false)
  const chainId = useSelector((state) => state.provider.chainId)
  var currentdate = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]
  function timeToBlockNumber(time){
    let pickTime = new Date(time).getTime() 
    let currentTimeStamp = Date.now() 
    let blockNumber = Math.floor((pickTime-currentTimeStamp)/1000/SECOND_PER_BLOCK[chainId])
    setBlockNumber(blockNumber)
  }
  return (
    <Container>
      <Axie1 src={axie1} alt="axie1" />
      <Heading>
        {t("Let's create a new Vnext in a few easy steps")
          .split(' ')
          .map((word, index) => (
            <span key={index} style={{ '--i': index }}>
              {word}&nbsp;
            </span>
          ))}
      </Heading>
      <CssTextField
        width="20vw"
        label={t('Url Image')}
        variant="outlined"
        value={urlImage}
        onChange={(e) => setUrlImage(e.target.value)}
      />
      <Box width="20vw" display="flex" justifyContent="space-between">
        <CssTextField
          width="9vw"
          unit="ETH"
          type="number"
          label={t('Min Price')}
          variant="outlined"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <CssTextField
          width="9vw"
          unit="ETH"
          type="number"
          label={t('Max Price')}
          variant="outlined"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Box>

      <StyledFormControl width="20vw" value={classify}>
        <InputLabel style={{ color: '#decbbd' }}>{t('Class')}</InputLabel>
        <StyledSelect displayEmpty value={classify} label={t('Class')} onChange={(e) => setClassify(e.target.value)}>
          {Object.keys(ClassItem).map((item, index) => {
            return (
              <MenuItem value={ClassItem[item]} style={{ textTransform: 'capitalize' }} key={index}>
                {t(item.toLocaleLowerCase())}
              </MenuItem>
            )
          })}
        </StyledSelect>
      </StyledFormControl>
      <Box width="20vw" display="flex" justifyContent="space-between">
        <CssTimeTextField
          id="datetime-local"
          label="Auction close"
          type="datetime-local"
          
        inputProps={{
          min: currentdate
        }}
          defaultValue={currentdate}
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          width="20vw"
          onChange={(e) => timeToBlockNumber(e.target.value)}
        />
      </Box>
      <Typography color={blockNumber>=10 ?"#decbbd":"#c23a3a"} width="20vw" fontSize="12px"  fontWeight={400}>
          {t("Number of block to close: ")+blockNumber}
        </Typography>
      <Box width="20vw" display="flex" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="center"
          tabIndex="0"
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              setStats((prev) => ({ ...prev, health: Math.min(prev.health + 1, 100) }))
            } else if (e.key === 'ArrowDown') {
              setStats((prev) => ({ ...prev, health: Math.max(prev.health - 1, 1) }))
            }
          }}
          onClick={() => setStats((prev) => ({ ...prev, health: Math.min(prev.health + 1, 100) }))}
        >
          <MI.Favorite style={{ fill: '#3ac279' }} />
          <Typography fontSize="20px">{stats.health}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          tabIndex="0"
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              setStats((prev) => ({ ...prev, speed: Math.min(prev.speed + 1, 100) }))
            } else if (e.key === 'ArrowDown') {
              setStats((prev) => ({ ...prev, speed: Math.max(prev.speed - 1, 1) }))
            }
          }}
          onClick={() => setStats((prev) => ({ ...prev, speed: Math.min(prev.speed + 1, 100) }))}
        >
          <MI.FlashOn style={{ fill: '#f7ac0a' }} />
          <Typography fontSize="20px">{stats.speed}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          tabIndex="0"
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              setStats((prev) => ({ ...prev, skill: Math.min(prev.skill + 1, 100) }))
            } else if (e.key === 'ArrowDown') {
              setStats((prev) => ({ ...prev, skill: Math.max(prev.skill - 1, 1) }))
            }
          }}
          onClick={() => setStats((prev) => ({ ...prev, skill: Math.min(prev.skill + 1, 100) }))}
        >
          <MI.StarRate style={{ fill: '#9166e0' }} />
          <Typography lineHeight="normal" fontSize="20px">
            {stats.skill}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          tabIndex="0"
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              setStats((prev) => ({ ...prev, morale: Math.min(prev.morale + 1, 100) }))
            } else if (e.key === 'ArrowDown') {
              setStats((prev) => ({ ...prev, morale: Math.max(prev.morale - 1, 1) }))
            }
          }}
          onClick={() => setStats((prev) => ({ ...prev, morale: Math.min(prev.morale + 1, 100) }))}
        >
          <MI.LocalFireDepartment style={{ fill: '#c23a3a' }} />
          <Typography fontSize="20px">{stats.morale}</Typography>
        </Box>
      </Box>
      <StyledButton
        variant="primary"
        onClick={() => {
          if (!urlImage || !minPrice || !maxPrice || !classify) {
            alertMessage(t('Error'), t('Please fill input'), 'error')
            return
          }
          if (parseFloat(minPrice) === 0) {
            alertMessage(t('Error'), t('Min price must greater than 0'), 'error')
            return
          }
          if (parseFloat(maxPrice) === 0) {
            alertMessage(t('Error'), t('Max price must greater than 0'), 'error')
            return
          }
          if (parseFloat(maxPrice) < parseFloat(minPrice) ) {
            alertMessage(t('Error'), t('Max price must greater than min price'), 'error')
            return
          }
          if(blockNumber<10){
            alertMessage(t('Error'), t('Number of block must >= 10 '), 'error')
            return
          }
          setTxPending(true)
          onCreateToken(urlImage, minPrice, maxPrice, classify, stats, blockNumber)
          setTxPending(false)
        }}
      >
        {txPending ? t('Creating') : t('Create')}
      </StyledButton>
    </Container>
  )
}
