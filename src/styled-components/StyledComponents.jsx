import styled from 'styled-components'

export const DanNav = styled.nav`
	background-color: ${props => props.color ? props.color : 'aliceblue'};
	font-family: monospace;
	width: 100vw;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding-top: 1em;
	padding-bottom: 1em;
`