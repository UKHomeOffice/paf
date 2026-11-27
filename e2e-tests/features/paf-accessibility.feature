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

