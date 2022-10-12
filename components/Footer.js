import { css } from '@emotion/react';

const footerStyles = css`
  font-family: 'Quicksand', sans-serif;
  font-size: 25x;
  padding: 10px;
  cursor: pointer;
  justify-content: center;
  position: center;
`;

export default function Footer() {
  return <footer css={footerStyles}>Wood from Austria</footer>;
}
