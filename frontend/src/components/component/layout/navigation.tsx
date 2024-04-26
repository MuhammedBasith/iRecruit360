import * as React from 'react';
import { HStack, IconButton, useColorMode } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import { FiMoon, FiSun } from 'react-icons/fi';
import siteConfig from '../../../../data/config';
import { NavLink } from '@/components/component/nav-link';
import { useScrollSpy } from '../../../../hooks/use-scrollspy';
import { MobileNavButton, MobileNavContent } from '@/components/component/mobile-nav';
import { useDisclosure, useUpdateEffect } from '@chakra-ui/react';
import ThemeToggle from './theme-toggle';

const Navigation: React.FC = () => {
  const mobileNav = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const activeId = useScrollSpy(
    siteConfig.header.links.filter(({ id }) => id).map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    }
  );

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, id, ...props }, i) => (
        <NavLink
          key={i}
          display={["none", null, "block"]}
          href={href || `/#${id}`}
          isActive={!!(id && activeId === id) || (href && pathname === href)}
          {...props}
        >
          {props.label}
        </NavLink>
      ))}

      {/* Login Button */}
      <NavLink href="/login" isActive={pathname === '/login'}>Login</NavLink>

      {/* Signup Button */}
      <NavLink href="/signup" isActive={pathname === '/signup'}>Signup</NavLink>

      {/* Theme Toggle Button */}
      <IconButton
        aria-label="Theme Toggle"
        icon={colorMode === 'light' ? <FiMoon size="14" /> : <FiSun size="14" />}
        borderRadius="md"
        onClick={toggleColorMode}
      />

      {/* Mobile Nav Button */}
      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      {/* Mobile Nav Content */}
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  );
};

export default Navigation;
