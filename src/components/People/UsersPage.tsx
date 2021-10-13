import React from 'react'
import { useSelector } from 'react-redux'
import People from './People'
import Preloader from '../common/Preloader'
import { getIsFetching } from '../../redux/peopleSelector'

export const UsersPage = () => {
  const isFetching = useSelector(getIsFetching)
  return <>
    {isFetching ? <Preloader/> : null}
    <People/>
  </>
}