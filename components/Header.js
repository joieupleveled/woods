import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #972d07;
  border: 20px;
  margin: 100px 100px;
  padding: 10px;

  > a {
    margin-left: 13px;
    color: white;
    padding: 65px;
    font-size: large;
    font-weight: 600;
  }
`;

const icon = css`
  height: 40px;
`;

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <Link href="/">Home</Link>
        <Link href="/woods">Woods</Link>
        <Link href="/shopping-cart">Shopping Cart</Link>

        {/* // reduce method */}

        <Link href="/shopping-bag">
          <a>
            <img css={icon} src="/bag-icon.jpeg" alt="shopping bag" />0
          </a>
        </Link>

        {/*
        Using an anchor <a> tag is not best practice for most links (it will be slower)- use a Link component instead
        i.e. <a href="/about">About</a> */}
      </nav>
    </header>
  );
}
