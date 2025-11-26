import React from 'react'
import { colors } from '../constants/Colors'
import CustomText from './text'

const Description = ({description, color, centered, textDecorationLine}: {description: string, color?: string, centered?: boolean, textDecorationLine?:string}) => {
  return (
    <CustomText 
    style={{textDecorationLine: textDecorationLine ,color: color || colors.text, fontSize: 14, textAlign: centered ? "center" : "left" , fontWeight:100, fontFamily: 'Geist-regular'}}>{description}</CustomText>
  )
}

export default Description  