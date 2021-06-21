export type postType = {
  id: number
  text: string
  likes: null | number
}
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}
export type photosType = {
  large: string|null
  small: string|null
}
export type profileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string|null
  contacts: ContactsType
  photos: photosType
  aboutMe: string|null
}
export type userType = {
  id: number
  name: string
  status: string
  photos: photosType
  followed: boolean
} 