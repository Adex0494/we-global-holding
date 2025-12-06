'use client';

import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

// ✨ Animation: subtle fade and slide
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;
  overflow: hidden;

  /* Dark overlay + background */
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.45),
      rgba(0, 0, 0, 0.25)
    ),
    url('/bg.jpg') center/cover no-repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
`;

// Smooth animated entry
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1.5s ease forwards;
  padding-top: 3rem; /* pushes content BELOW navbar visually */
`;

const Logo = styled(Image)`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    width: 240px;
  }
`;

const Message = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  text-align: center;
  max-width: 600px;
  padding: 0 1rem;
  line-height: 1.4;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Footer = styled.p`
  position: absolute;
  bottom: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  width: 100%;
`;

export default function ComingSoon() {
  return (
    <Wrapper>
      <Content>
        <Logo
          src="/WE-logo-transparent.png"
          alt="WE Global Holding Logo"
          width={300}
          height={300}
        />
        <Message>We’re working on something great. Coming soon.</Message>
      </Content>
      <Footer>© {new Date().getFullYear()} WE Global Holding Inc.</Footer>
    </Wrapper>
  );
}
