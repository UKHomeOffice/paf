@PafRegressionCI
@PafRegression
Feature: PAF - Public Allegations Form

  Background:
    Given Test data has been created for "PAF" scenarios

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 1
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey 1 pertaining to "<Description>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Description                               |
      | Immigration crime - Select all checkboxes |

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 2
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey 2 pertaining to "<Description>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Description                       |
      | Smuggling - Select all checkboxes |

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 3
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey 3 pertaining to "<Description>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Description                               |
      | Immigration crime - Select all checkboxes |

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 4
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey 4 pertaining to "<Description>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Description                       |
      | Smuggling - Select all checkboxes |

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 5
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey 5 pertaining to "<Description>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Description                                                                         |
      | Immigration crime - Illegal workers, lied on application & other immigration crimes |