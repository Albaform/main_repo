'use client';

import Slider from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Pretendard";
        src: url("/fonts/Pretendard-Light.woff") format("woff");
        font-weight: 300;
    }
    @font-face {
        font-family: 'Pretendard';
        src: url('/fonts/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
    }
    @font-face {
      font-family: "Pretendard";
        src: url("/fonts/Pretendard-Medium.woff")
            format("woff");
        font-weight: 500;
    }
    @font-face {
      font-family: "Pretendard";
        src: url("/fonts/Pretendard-SemiBold.woff")
            format("woff");
        font-weight: 600;
    }
    @font-face {
      font-family: "Pretendard";
        src: url("/fonts/Pretendard-Bold.woff") format("woff");
        font-weight: 700;
    }

    :root {
      --white: #fff;
      --black: #000;
      --red:#fc4100;
      
      --black100: #6b6b6b;
      --black200:#525252;
      --black300:#373737;
      --black400:#1f1f1f;
      --black500:#040404;

      --gray100:#dedede;
      --gray200:#c4c4c4;
      --gray300:#ababab;
      --gray400:#999;
      --gray500:#808080;

      --primary-orange100:#fff7eb;
      --primary-orange200:#fcc369;
      --primary-orange300:#fbaf37;
      --primary-orange400:#f89a05;
      --primary-orange500:#e18c05;

      --primary-blue100:#535779;
      --primary-blue200:#3e415b;
      --primary-blue300:#2a2c3d;

      --background100:#fcfcfc;
      --background200:#f7f7f7;
      --background300:#efefef;

      --line100:#f2f2f2;
      --line200:#e6e6e6;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

    html,
    body,
    h1,
    h2,
    h3,
    h4,
    h5 {
      letter-spacing: -0.4px;
    }
    html,
    body,
    div,
    span,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    abbr,
    address,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    samp,
    small,
    strong,
    sub,
    sup,
    var,
    b,
    i,
    button,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      font-size: 100%;
      vertical-align: baseline;
      background: transparent;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  a {
    display: block;
    margin: 0;
    padding: 0;
    font-size: 100%;
    background: transparent;
    text-decoration: none;
    color: inherit;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  ul, li, ol {
    list-style: none;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:focus,
  textarea:focus {
    outline: none;
  }
  textarea {
    resize: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  img,
  iframe,
  video {
    max-width: 100%;
  }
  section,
  header,
  footer {
    position: relative;
    overflow: hidden;
  }

  img {
    display: block;
    image-rendering: -moz-auto;
    image-rendering: -o-auto;
    image-rendering: auto;
    image-rendering: -webkit-optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
    }

  body{
    width: 100%;
    max-width: 100%;
    overflow-x: visible;
    overflow-y: auto;
    font-weight: 400;
    color: var(--black);
    font-family: 'Pretendard', sans-serif;
  }
`;

export const CustomSlider = styled(Slider)`
  .slick-dots {
    bottom: 20px;
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: lightgray;
    opacity: 1;
  }

  .slick-dots li.slick-active button:before {
    color: var(--primary-orange300);
  }
`;

export default GlobalStyle;
