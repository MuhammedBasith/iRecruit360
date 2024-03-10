'use client'

import { Box } from '@chakra-ui/react'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps
  } from '@chakra-ui/react'
// import  from '@chakra-ui/react'


const steps = [
    { title: 'Round One', description: 'Basic Questions' },
    { title: 'Round Two', description: 'Date & Time' },
    { title: 'Round Three', description: 'Select Rooms' },
  ]
  
export default function MyStepper() {
    const { activeStep } = useSteps({
      index: 1,
      count: steps.length,
    })
  
    return (
      <Stepper index={activeStep} colorScheme='gray'>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
  
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
  
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    )
  }