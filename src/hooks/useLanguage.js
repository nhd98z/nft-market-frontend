import i18next from 'i18next'
import { useEffect, useState } from 'react'

export default function useLanguage() {
  const [lng, setLng] = useState('en-US')

  useEffect(() => {
    const lng = window.localStorage.getItem('lng')
    if (lng === 'ja-JP') {
      i18next.changeLanguage(lng, (err) => {
        if (err) return console.error(err)
      })
      setLng(lng)
    } else if (lng === null) {
      window.localStorage.setItem('lng', 'en-US')
    }
  }, [])

  const toggleLanguage = () => {
    i18next.changeLanguage(lng === 'en-US' ? 'ja-JP' : 'en-US', (err) => {
      if (err) return console.error(err)
    })
    window.localStorage.setItem('lng', lng === 'en-US' ? 'ja-JP' : 'en-US')
    setLng(lng === 'en-US' ? 'ja-JP' : 'en-US')
  }

  return [lng, toggleLanguage]
}
