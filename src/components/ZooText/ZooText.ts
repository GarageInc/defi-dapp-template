import styled from 'styled-components'

export const ZooText = styled.span`
  color: #fff;
  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
`

export const GradientStyles = `
  background: linear-gradient(
    90deg,
    rgba(254, 94, 0, 1),
    rgba(246, 69, 98, 1),
    rgba(194, 45, 225, 1),
    rgba(246, 69, 98, 1),
    rgba(254, 94, 0, 1)
  );
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-animation: shine 4s linear infinite;
  animation: shine 4s linear infinite;
  transition: all 0.5s;
  user-select: none;
`

export const ZooTextGradient = styled.span`
  ${GradientStyles}

  font-family: ${({ theme }) => theme.fontUniform};
  font-weight: bold;
`
