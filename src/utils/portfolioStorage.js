export const loadPortfolioData = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue
  try {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) return defaultValue
    return JSON.parse(storedValue)
  } catch (error) {
    console.error("loadPortfolioData error", error)
    return defaultValue
  }
}

export const savePortfolioData = (key, value) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("savePortfolioData error", error)
  }
}

export const addPortfolioDataItem = (key, item) => {
  const current = loadPortfolioData(key, [])
  const next = [item, ...current]
  savePortfolioData(key, next)
  return next
}
