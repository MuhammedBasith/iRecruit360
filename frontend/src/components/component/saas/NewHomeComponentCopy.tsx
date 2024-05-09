'use client'

import * as React from "react";
// import { customTheme } from '@/theme';
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef } from 'react';
import theme from '../../../theme';
import { Footer } from "../layout/footer";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Spline from '@splinetool/react-spline';
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SEO } from "@/components/component/seo/seo";

import { FallInPlace } from "@/components/component/motion/fall-in-place";
import { Hero } from "@/components/component/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "@/components/component/typography";
import { NextjsLogo, ChakraLogo } from "@/components/component/logos";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";
import { Features } from "@/components/component/features";
import { BackgroundGradient } from "@/components/component/gradients/background-gradient";
import { Faq } from "@/components/component/faq";
import { Pricing } from "@/components/component/pricing/pricing";

import { ButtonLink } from "@/components/component/button-link/button-link";
import { Testimonial, Testimonials } from "@/components/component/testimonials";

import faq from "../../../../data/faq";
import testimonials from "../../../../data/testimonials";
import pricing from "../../../../data/pricing";

import Header from "../layout/header";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "@/components/component/highlights";


// const extendedTheme = extendTheme(theme);

const HomePage: NextPage = () => {
  return (
    <Box>
      <Header />
      <SEO
        title="iRecruit360"
        description="Streamlining Your Hiring Process"
      />
      <Box>
        <HeroSection />

        <HighlightsSection />

        <FeaturesSection />

        <PricingSection />

        <FaqSection />
        <Footer />
      </Box>
    </Box>
  );
};

const HeroSection: React.FC = () => {

  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient theme={theme} height="100%" zIndex="-1" />
      <Container maxW="container.xl" pt={{ base: 20, lg: 40 }} pb={{ base: 20, lg: 40 }}>

      <FallInPlace delay={0}>
          {/* <VideoPlayer src="/cubic2.mp4" width={1000} height={400} /> */}
          <Spline scene="https://prod.spline.design/kt6uNniTmojQsHqJ/scene.splinecode"/>
      </FallInPlace>

      </Container>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="170"
        features={[
          {
            title: "Intelligent",
            icon: FiSmile,
            description: "Harness AI to generate comprehensive candidate reports, automate feedback, and streamline the hiring process.",
            iconPosition: "left",
            delay: 0.6,
          },
          {
            title: "Efficient",
            icon: FiSliders,
            description:
              "Conduct three-round interviews seamlessly, leverage AI feedback, and simplify HR tasks like email communication with a single click.",
            iconPosition: "left",
            delay: 0.8,
          },
          {
            title: "Accessible",
            icon: FiGrid,
            description:
              "All features adhere to WAI-ARIA standards, ensuring accessibility for all users and compliance with accessibility guidelines.",
            iconPosition: "left",
            delay: 1,
          },
          {
            title: "Productive",
            icon: FiThumbsUp,
            description:
              "Designed to reduce boilerplate and fully typed, streamline at ease.",
            iconPosition: "left",
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @saas-ui/react");

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core components">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
          With smart automation powered by AI, candidate evaluation reaches new heights. Precision tools delve into personalities, logic, and presence, while the dynamic interview bot fosters engaging experiences, leading to profound insights. Data-driven decisions become second nature, backed by robust analytics.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                iRecruit360
              </Text>{" "}

            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
        Our platform boasts robust security, scalable architecture, and unwavering performance. Supported by expert guidance and global accessibility, seamless integration is our hallmark.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="HR"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “I've tried numerous hiring platforms, but none compare to the seamless experience offered by this one. From its smart automation to its attentive support team, it's truly a cut above the rest. Our hiring process has never been smoother.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Transform Your Talent Search"
      >
        <Text color="muted" fontSize="lg">
        Experience the Future of Hiring with Our Innovative Platform, Setting New Standards in Recruitment.
        </Text>
        <Wrap mt="8">
          {[
            "authentication",
            "assessments",
            "automation",
            "analysis",
            "integrations",
            "layouts",
            "insights",
            "supports",
            "server-side rendering",
            "documentation",
            "onboarding",
            "verification",
            "theming",
            "upselling",
            "unit testing",
            "feature flags",
            "responsiveness",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
           Discover iRecruit360:
          <Br /> The Future of Interviews
        </Heading>
      }
      description={
        <>
          Smart automation, driven by AI, revolutionizes candidate evaluation.
          <Br />
          Precision tools delve into personalities and logic.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: "Revolution.",
          icon: FiBox,
          description:
            "Transform interviews with cutting-edge tech.",
          variant: "inline",
        },
        {
          title: "Excellence.",
          icon: FiLock,
          description:
            "Achieve top-tier interview outcomes.",
          variant: "inline",
        },
        {
          title: "Progress.",
          icon: FiSearch,
          description:
            "Drive organizational advancement.",
          variant: "inline",
        },
        {
          title: "Ingenuity.",
          icon: FiUserPlus,
          description:
            "Unleash creativity and innovation in your interviews with our platform.",
          variant: "inline",
        },
        {
          title: "Advancement.",
          icon: FiFlag,
          description:
            "Propel your hiring process forward with our advanced tools and features.",
          variant: "inline",
        },
        {
          title: "Momentum.",
          icon: FiTrendingUp,
          description:
            "Build momentum in your recruitment, towards success with our solutions.",
          variant: "inline",
        },
      ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        VAT may be applicable depending on your location.
      </Text>
    </Pricing>
  );
};

const FaqSection = () => {
  return <Faq {...faq} />;
};

export default HomePage;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Support us by becoming a stargazer! 🚀 ",
        description:
          '<img src="https://img.shields.io/github/stars/saas-js/saas-ui.svg?style=social&label=Star" />',
        href: "https://github.com/saas-js/saas-ui",
        action: false,
      },
    },
  };
}


const VideoPlayer = ({ src, width, height }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch((error) => {
        // Handle video playback error
        console.error('Error playing video:', error);
      });

      video.addEventListener('ended', () => {
        video.play(); // Loop the video when it ends
      });
    }
  }, []);

  return (
    <Box
      overflow="hidden"
      height="100%"
      width="100%"
      borderRadius="lg" // Apply small rounded corners
      boxShadow="'dark-lg" // Apply drop shadow
    >
      <video
        ref={videoRef}
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
        style={{ objectFit: 'cover' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};