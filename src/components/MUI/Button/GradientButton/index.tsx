import { ButtonProps } from '@mui/material'
import { useTheme } from 'styled-components'

import { GradientButtonContained, GradientButtonOutlined, GradientText } from './styles'

interface IGradientButton extends ButtonProps {
  bgColor?: string
  gradientColor?: string
}

const GradientButton = (props: IGradientButton) => {
  const theme = useTheme()

  const { bgColor, gradientColor = theme.gradient1, ...restProps } = props

  if (restProps.variant === 'outlined') {
    const { children, ...rest } = restProps
    return (
      <GradientButtonOutlined {...rest} $bgColor={bgColor} $gradientColor={gradientColor}>
        <GradientText $gradientColor={gradientColor}>{children}</GradientText>
      </GradientButtonOutlined>
    )
  }

  return <GradientButtonContained {...restProps} />
}

export default GradientButton
