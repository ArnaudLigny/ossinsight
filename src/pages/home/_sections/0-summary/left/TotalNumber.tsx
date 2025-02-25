import { styled } from '@mui/material/styles';
import React from 'react';
import AnimatedNumber from 'react-awesome-animated-number';
import { useInView } from 'react-intersection-observer';
import { useTotalEvents } from "../../../../../components/RemoteCharts/hook";
import useVisibility from '../../../../../hooks/visibility';

const StyledAnimatedNumber = styled(AnimatedNumber)({
  color: '#E30C34',
  marginLeft: 4,
  marginRight: 4,
})

export interface TotalNumberProps {
  fontSize?: number
}

const TotalNumber = ({ fontSize = 24 }: TotalNumberProps) => {
  const visible = useVisibility()
  const { inView, ref } = useInView()
  const total = useTotalEvents(inView && visible);

  return (
    <div style={{ display: 'inline' }} ref={ref}>
      <StyledAnimatedNumber value={total} hasComma duration={200} size={fontSize} />
    </div>
  )
}

export default TotalNumber
