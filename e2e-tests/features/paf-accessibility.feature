@PafRegressionTest @PafAccessibilityTest
Feature: PAF - Accessibility
  # Scans every page in the journey, including validation error states, against WCAG 2 A and AA.
  # Violations are recorded as soft assertions so all pages are checked in a single run.

  Scenario: Accessibility check on every page of the Paf journey
    Given I visit the Public Allegations Form page
    Then the "Report an immigration or customs crime" page should have no accessibility violations
    When I choose to complete "Report an immigration or customs crime" page
    Then the "What is the crime you are reporting?" page should have no accessibility violations
    When I choose to complete "What is the crime you are reporting?" page
    Then the "Are there children involved? (A child is anyone under 18 years of age)" page should have no accessibility violations
    When I choose to complete "Are there children involved? (A child is anyone under 18 years of age)" page
    Then the "When is the crime happening?" page should have no accessibility violations
    When I choose to complete "When is the crime happening?" page
    Then the "Does the crime involve any vehicles, transport or travel?" page should have no accessibility violations
    When I choose to complete "Does the crime involve any vehicles, transport or travel?" page
    Then the "What is the vehicle type?" page should have no accessibility violations
    When I choose to complete "What is the vehicle type?" page
    Then the "What are the vehicle details?" page should have no accessibility violations
    When I choose to complete "What are the vehicle details?" page
    Then the "What is the boat type?" page should have no accessibility violations
    When I choose to complete "What is the boat type?" page
    Then the "What are the boat details?" page should have no accessibility violations
    When I choose to complete "What are the boat details?" page
    Then the "What are the train details?" page should have no accessibility violations
    When I choose to complete "What are the train details?" page
    Then the "What are the aeroplane details?" page should have no accessibility violations
    When I choose to complete "What are the aeroplane details?" page
    Then the "Tell us which of the following the crime involves:" page should have no accessibility violations
    When I choose to complete "Tell us which of the following the crime involves:" page
    Then the "Do you know where the crime takes place, took place or will take place?" page should have no accessibility violations
    When I choose to complete "Do you know where the crime takes place, took place or will take place?" page
    Then the "Do you want to tell us about another location where the crime is taking place?" page should have no accessibility violations
    When I choose to complete "Do you want to tell us about another location where the crime is taking place?" page
    Then the "The Person" page should have no accessibility violations
    When I choose to complete "The Person" page
    Then the "What is the person's name?" page should have no accessibility violations
    When I choose to complete "What is the person's name?" page
    Then the "What is the person's date of birth?" page should have no accessibility violations
    When I choose to complete "What is the person's date of birth?" page
    Then the "What is the person's approximate age?" page should have no accessibility violations
    When I choose to complete "What is the person's approximate age?" page
    Then the "What is the person's nationality?" page should have no accessibility violations
    When I choose to complete "What is the person's nationality?" page
    Then the "What is the person's place of birth?" page should have no accessibility violations
    When I choose to complete "What is the person's place of birth?" page
    Then the "What is the person's gender?" page should have no accessibility violations
    When I choose to complete "What is the person's gender?" page
    Then the "What are the person's forms of identification?" page should have no accessibility violations
    When I choose to complete "What are the person's forms of identification?" page
    Then the "Where is the person now?" page should have no accessibility violations
    When I choose to complete "Where is the person now?" page
    Then the "What is the person's address (UK)?" page should have no accessibility violations

    When I choose to complete "What is the person's address (UK)?" page
    Then the "What type of address is it?" page should have no accessibility violations

    When I choose to complete "What type of address is it?" page
    Then the "What is the person's contact details (if known)" page should have no accessibility violations

    When I choose to complete "What is the person's contact details (if known)" page
    Then the "Do you know if the person has a job?" page should have no accessibility violations

    When I choose to complete "Do you know if the person has a job?" page
    Then the "What type of job or occupation does the person have?" page should have no accessibility violations
    
    When I choose to complete "What type of job or occupation does the person have?" page
    Then the "What hours of the day does the person work?" page should have no accessibility violations

    When I choose to complete "What hours of the day does the person work?" page
    Then the "What days does the person work?" page should have no accessibility violations

    When I choose to complete "What days does the person work?" page
    Then the "Do you know where the person works?" page should have no accessibility violations

    When I choose to complete "Do you know where the person works?" page
    Then the "What is the name of the company the person works at?" page should have no accessibility violations
    
    When I choose to complete "What is the name of the company the person works at?" page
    Then the "What is the company's contact details (if known)?" page should have no accessibility violations

    When I choose to complete "What is the company's contact details (if known)?" page
    Then the "Company Owner" page should have no accessibility violations

    When I choose to complete "Company Owner" page
    Then the "Does the person study?" page should have no accessibility violations

    When I choose to complete "Does the person study?" page
    Then the "Do you know the course or the subject of study?" page should have no accessibility violations
    
    When I choose to complete "Do you know the course or the subject of study?" page
    Then the "Does the person study in the UK?" page should have no accessibility violations

    When I choose to complete "Does the person study in the UK?" page
    Then the "What hours of the day does the person study?" page should have no accessibility violations

    When I choose to complete "What hours of the day does the person study?" page
    Then the "What days does the person study?" page should have no accessibility violations

    When I choose to complete "What days does the person study?" page
    Then the "Do you know where in the UK the person studies?" page should have no accessibility violations
    
    When I choose to complete "Do you know where in the UK the person studies?" page
    Then the "What is the name of college or university?" page should have no accessibility violations

    When I choose to complete "What is the name of college or university?" page
    Then the "What is the institution's address (if known)?" page should have no accessibility violations

    When I choose to complete "What is the institution's address (if known)?" page
    Then the "What is the institution's contact details (if known)?" page should have no accessibility violations

    When I choose to complete "What is the institution's contact details (if known)?" page
    Then the "Institution Owner" page should have no accessibility violations
    
    When I choose to complete "Institution Owner" page
    Then the "Does the person own a car or other vehicle?" page should have no accessibility violations

     When I choose to complete "Does the person own a car or other vehicle?" page
    Then the "What is the vehicle type?" page should have no accessibility violations

    When I choose to complete "What is the vehicle type?" page
    Then the "What are the vehicle's details?" page should have no accessibility violations
    
    When I choose to complete "What are the vehicle's details?" page
    Then the "Please tell us anything else about the person you are reporting that you think we should know" page should have no accessibility violations

    When I choose to complete "Please tell us anything else about the person you are reporting that you think we should know" page
    Then the "Do you want to tell us about another person who is involved in the same crime?" page should have no accessibility violations

    When I choose to complete "Do you want to tell us about another person who is involved in the same crime?" page
    Then the "What is the person's name?" page should have no accessibility violations
    
    When I choose to complete "What is the person's name?" page
    Then the "What is the person's date of birth?" page should have no accessibility violations

    When I choose to complete "What is the person's date of birth?" page
    Then the "What is the person's approximate age?" page should have no accessibility violations

    When I choose to complete "What is the person's approximate age?" page
    Then the "What is the person's nationality?" page should have no accessibility violations
    
    When I choose to complete "What is the person's nationality?" page
    Then the "What is the person's gender?" page should have no accessibility violations

    When I choose to complete "What is the person's gender?" page
    Then the "What are the person's forms of identification?" page should have no accessibility violations

    When I choose to complete "What are the person's forms of identification?" page
    Then the "The Organisation" page should have no accessibility violations

    When I choose to complete "The Organisation" page
    Then the "What is the company, business or education provider (if known)?" page should have no accessibility violations

    When I choose to complete "What is the company, business or education provider (if known)?" page
    Then the "What is the address of the company, business or education provider (if known)?" page should have no accessibility violations

    When I choose to complete "What is the address of the company, business or education provider (if known)?" page
    Then the "Enter the company, business or education provider's contact details (if known)" page should have no accessibility violations
    
    When I choose to complete "Enter the company, business or education provider's contact details (if known)" page
    Then the "What is the type of company, business or education provider?" page should have no accessibility violations

    When I choose to complete "What is the type of company, business or education provider?" page
    Then the "Company owner" page should have no accessibility violations

    When I choose to complete "Company owner" page
    Then the "Please tell us anything else about the company, business or education provider that you think we should know" page should have no accessibility violations
    
    When I choose to complete "Please tell us anything else about the company, business or education provider that you think we should know" page
    Then the "Do you want to tell us about another company, business or education provider that is involved in the same crime?" page should have no accessibility violations

    When I choose to complete "Do you want to tell us about another company, business or education provider that is involved in the same crime?" page
    Then the "Other information" page should have no accessibility violations

    When I choose to complete "Other information" page
    Then the "Do you want to report another crime by the same person or business?" page should have no accessibility violations
    
    When I choose to complete "Do you want to report another crime by the same person or business?" page
    Then the "Please attach any documents which may help us investigate this crime" page should have no accessibility violations

    When I choose to complete "Please attach any documents which may help us investigate this crime" page
    Then the "About You" page should have no accessibility violations

    When I choose to complete "About You" page
    Then the "Does anyone else know about the crime?" page should have no accessibility violations

    When I choose to complete "Does anyone else know about the crime?" page
    Then the "Have you reported the crime before?" page should have no accessibility violations
    
    When I choose to complete "Have you reported the crime before?" page
    Then the "How do you know this person/ these people?" page should have no accessibility violations    

    When I choose to complete "How do you know this person/ these people?" page
    Then the "Can we act on this information without putting you or others at risk?" page should have no accessibility violations

    When I choose to complete "Can we act on this information without putting you or others at risk?" page
    Then the "Please provide your details." page should have no accessibility violations
    
    When I choose to complete "Please provide your details." page
    Then the "What is your date of birth?" page should have no accessibility violations

    When I choose to complete "What is your date of birth?" page
    Then the "What is your nationality?" page should have no accessibility violations

    When I choose to complete "What is your nationality?" page
    Then the "What is your gender?" page should have no accessibility violations
    
    When I choose to complete "What is your gender?" page
    Then the "Can we contact you if required, to discuss the information you have provided?" page should have no accessibility violations

    When I choose to complete "Can we contact you if required, to discuss the information you have provided?" page
    Then the "Are you over 18?" page should have no accessibility violations

    When I choose to complete "Are you over 18?" page
    Then the "Check your answers before submitting your application." page should have no accessibility violations