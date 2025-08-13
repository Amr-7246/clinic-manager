
export const changeLang = () => {

  const lastValue = localStorage.getItem('lang')
  if (!lastValue || lastValue == 'ar') {
    localStorage.setItem('lang','en')
    const CValue = localStorage.getItem('lang')
    return CValue
  } else {
    localStorage.setItem('lang','ar')
    const CValue = localStorage.getItem('lang')
    return CValue
  }
}
