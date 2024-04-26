import { HStack, Text } from '@chakra-ui/react'

export default {
  title: 'Explore Our Pricing Options',
  description:
    'Affordable plans, powerful results',
  plans: [
    {
      id: 'oss',
      title: 'Basic',
      description: 'Basic assessment tools.',
      price: 'Free',
      features: [
        {
          title: 'Personality Assessment',
        },
        {
          title: 'Build Logical Reasoning Test',
        },
        {
          title: 'Resume Parsing',
        },
        {
          title: 'Interview Scheduling',
        },
      ],
      action: {
        href: '#',
      },
    },
    {
      id: 'bootstrap',
      title: 'Advanced',
      description: 'Advanced assessments.',
      price: 'Free',
      isRecommended: true,
      features: [
        {
          title: 'Advanced personality assessments',
        },
        {
          title: 'Advanced logical reasoning test',
        },
        {
          title: 'Video analysis',
        },
        {
          title: 'AI driven candidate matching',
        },
      ],
      action: {
        href: '',
      },
    },
    {
      id: 'startup',
      title: 'Enhanced',
      description: 'Enhanced Support.',
      price: (
        <HStack>
          <Text textDecoration="line-through" fontSize="sm" color="gray.400">
            €999,-
          </Text>
          <Text>€499/-</Text>
        </HStack>
      ),
      features: [
        {
          title: 'Priority email and phone support',
        },
        {
          title: 'Dedicated customer support',
        },
        {
          title: 'Onboarding assistance',
        },
      ],
      action: {
        href: '',
      },
    },
  ],
}
