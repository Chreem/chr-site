import * as React from 'react'
import styled from 'styled-components'

const Center = styled.div<{ width?: number }>`
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width}px;
    >* { width: 100%; }
`;
Center.defaultProps = {
    width: 300
};
export default Center;
