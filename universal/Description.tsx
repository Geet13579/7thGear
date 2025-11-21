import React from 'react'
import { colors } from '../constants/Colors'
import CustomText from './text'

const Description = ({description, color, centered}: {description: string, color?: string, centered?: boolean}) => {
  return (
    <CustomText 
    style={{color: color || colors.text, fontSize: 14, textAlign: centered ? "center" : "left" , fontWeight:500, fontFamily: 'Geist-Medium'}}>{description}</CustomText>
  )
}

export default Description