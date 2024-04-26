import * as React from 'react';
import {
  Box,
  BoxProps,
  Container,
  Flex,
  useColorModeValue,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { Logo } from './logo';
import { useScroll } from 'framer-motion';
import { FiMoon, FiSun, FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
// import Navigation from './navigation';

export interface HeaderProps extends Omit<BoxProps, 'children'> {}

const Header: React.FC<HeaderProps> = (props) => {
  const ref = React.useRef<HTMLHeadingElement>(null);
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

  const { scrollY } = useScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const bg = useColorModeValue('whiteAlpha.700', 'rgba(29, 32, 37, 0.7)');
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      position="fixed"
      backdropFilter="blur(5px)"
      zIndex="sticky"
      borderColor="whiteAlpha.100"
      transitionProperty="common"
      transitionDuration="normal"
      bg={y > height ? bg : ''}
      boxShadow={y > height ? 'md' : ''}
      borderBottomWidth={y > height ? '1px' : ''}
      {...props}
    >
      <Container maxW="container.2xl" px="8" py="4">
        <Flex width="full" align="center" justify="space-between">
          <Logo
            onClick={(e) => {
              if (router.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            }}  
          />
          {/* <Navigation /> */}

          {/* Login Button */}
          {/* <IconButton
            aria-label="Login"
            icon={<FiLogIn size="14" />}
            borderRadius="md"
            onClick={() => router.push('/login')}
            ml="2"
          /> */}

          {/* Signup Button */}
          {/* <IconButton
            aria-label="Signup"
            icon={<FiSun size="14" />}
            borderRadius="md"
            onClick={() => router.push('/signup')}
            ml="2"
          /> */}

          {/* Theme Toggle Button */}
          <IconButton
            aria-label="Theme Toggle"
            icon={colorMode === 'light' ? <FiMoon size="14" /> : <FiSun size="14" />}
            borderRadius="md"
            onClick={toggleColorMode}
            ml="2"
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
