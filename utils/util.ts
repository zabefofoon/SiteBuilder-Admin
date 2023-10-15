import ShortUniqueId from "short-unique-id"

export const generateUniqueId = (): string => {
  const {randomUUID} = new ShortUniqueId({length: 10, dictionary: 'alpha'})
  return randomUUID()
}
