import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axie1 from '../../assets/axie-1.png'

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

const StyledFormControl = styled(FormControl)({
  width: '20vw',
})

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
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <CssTextField
        width="20vw"
        unit="ETH"
        type="number"
        label="Price"
        variant="outlined"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <StyledFormControl>
        <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>
          {t('Class')}
        </InputLabel>
        <StyledSelect
          displayEmpty
          value={classify}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Class"
          onChange={(e) => setClassify(e.target.value)}
        >
          <MenuItem value="Beast">Beast</MenuItem>
          <MenuItem value="Plant">Plant</MenuItem>
          <MenuItem value="Bug">Bug</MenuItem>
          <MenuItem value="Mech">Mech</MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <StyledButton variant="primary">Create</StyledButton>
    </Container>
  )
}
