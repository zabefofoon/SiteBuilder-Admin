import ShortUniqueId from "short-unique-id"

export const generateUniqueId = (): string => {
  const {randomUUID} = new ShortUniqueId({length: 10, dictionary: 'alpha'})
  return randomUUID()
}

export const prepend = (str: string, unit = 'px') => isNaN(Number(str)) ? str : str + unit