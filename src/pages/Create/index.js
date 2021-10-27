import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axie1 from '../../assets/axie-1.png'
import * as MI from '@mui/icons-material'

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
    color: #fff;
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

const CssTextField = styled(TextField)(({ value, unit, width }) => ({
  width: width,
  '& input': {
    color: '#ffffff',
  },
  '& label': {
    color: '#decbbd',
    display: value ? 'block' : 'flex',
    justifyContent: 'center',
    // background: 'red',
    width: '100%',
  },
  '&:hover': {
    label: {
      color: '#ffeedd',
    },
  },
  '& label.Mui-focused': {
    color: '#ffeedd',
    display: 'block',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffeedd',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '32px',
    '& fieldset': {
      borderColor: '#decbbd',
    },
    '&:hover fieldset': {
      borderColor: '#ffeedd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffeedd',
    },
  },
  '&::after': {
    content: value && unit ? "'" + unit + "'" : "''",
    // background: 'red',
    position: 'absolute',
    top: 0,
    padding: 0,
    margin: 0,
    right: '16px',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
}))

const StyledFormControl = styled(FormControl)(({ value }) => ({
  width: '9vw',
  color: '#ffffff',
  '& label': {
    color: '#decbbd',
    display: value ? 'block' : 'flex',
    justifyContent: 'center',
    // background: 'red',
    width: 'calc(100% - 36px)',
  },
  '& .MuiSelect-select': {
    color: '#ffffff',
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

const StyledSelect = styled(Select)({
  borderRadius: '32px !important',
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
  animation: yee 1.75s;
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
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [classify, setClassify] = useState('') // BEAST PLANT BUG MECH
  const [stats, setStats] = useState({ health: 1, speed: 1, skill: 1, morale: 1 })
  const { t } = useTranslation()

  return (
    <Container>
      <Axie1 src={axie1} alt="axie1" />
      <Heading>
        {t("Let's create a new Axie in a few easy steps")
          .split(' ')
          .map((word, index) => (
            <span key={index} style={{ '--i': index }}>
              {word}&nbsp;
            </span>
          ))}
      </Heading>
      <CssTextField
        width="20vw"
        label={t('Name')}
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box width="20vw" display="flex" justifyContent="space-between">
        <CssTextField
          width="9vw"
          unit="ETH"
          type="number"
          label={t('Price')}
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <StyledFormControl value={classify}>
          <InputLabel style={{ color: '#decbbd' }}>{t('Class')}</InputLabel>
          <StyledSelect displayEmpty value={classify} label={t('Class')} onChange={(e) => setClassify(e.target.value)}>
            <MenuItem value="Beast">{t('Beast')}</MenuItem>
            <MenuItem value="Plant">{t('Plant')}</MenuItem>
            <MenuItem value="Bug">{t('Bug')}</MenuItem>
            <MenuItem value="Mech">{t('Mech')}</MenuItem>
          </StyledSelect>
        </StyledFormControl>
      </Box>
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
      <StyledButton variant="primary">{t('Create')}</StyledButton>
    </Container>
  )
}
