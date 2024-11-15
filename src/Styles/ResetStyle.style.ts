import { createGlobalStyle } from "styled-components";

const ResetStyle = createGlobalStyle`
html, body, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
	}
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
    body,html{
		height: 100%;
        min-height: 100% !important;
        background-color: ${({ theme }) => theme.background};
    }

    #root{
        min-height: 100%;
		max-height: fit-content;
		
    }

    input{
        &:focus{
            outline: none;
        }
    }

	.swal2-image{
		object-fit: cover;
	}

    button{
        cursor: pointer;
        user-select: none;
        &:disabled{
            cursor: not-allowed;
			opacity: 0.75;
        }
    }

    * {
        font-family: ${({ theme }) => theme.fonts.primary};
        transition: all 200ms;
        box-sizing: border-box;
		&::-webkit-scrollbar {
			width: 10px;
			background-color: ${({ theme }) => theme.colors.scrollBars.track};
			opacity: 0.5;
		}
		&::-webkit-scrollbar-thumb {
			background-color:${({ theme }) => theme.colors.scrollBars.thumb};
			border-radius: 1px;
		}
    }

	.ReactModal__Overlay {
		z-index: 9999;
	}

	@keyframes fadein {
		from{
			opacity: 0;
		}
		to{
			opacity: 1;
		}
  	}
`;

export default ResetStyle;
