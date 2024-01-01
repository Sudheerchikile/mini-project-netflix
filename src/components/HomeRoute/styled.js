import styled from 'styled-components'

const PosterContainer = styled.div`
  background-image: url(${props => props.backgroundImage});

  background-size: cover;

  min-height: 68vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`

export default PosterContainer
