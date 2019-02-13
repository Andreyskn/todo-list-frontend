import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	*, *::before, *::after {
		box-sizing: border-box;
	}

	body {
		overflow: hidden;
	}

	#root {
		height: 100vh;
	}
`;
