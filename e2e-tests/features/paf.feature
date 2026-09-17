@PafRegressionCI
@PafRegression
Feature: PAF - Public Allegations Form

  Background:
    Given Test data has been created for "PAF" scenarios


  Scenario Outline: PAF - Public Allegations Form - E2E scenarios
    Given   I selected the data for scenario "<Scenario ID>" - "<Description>"
    Given   I visit the Public Allegations Form page
    And     I fill out my answers for the Public Allegations Form
    Then    I am able to submit my answers to the Public Allegations Form
    Examples:
      | Scenario ID | Description                               |
      | 1           | Immigration crime - Select all checkboxes |


  Scenario Outline: PAF - Public Allegations Form - E2E scenarios
    Given   I selected the data for scenario "<Scenario ID>" - "<Description>"
    Given   I visit the Public Allegations Form page
    And     I fill out my answers for the Public Allegations Form 2
    Then    I am able to submit my answers to the Public Allegations Form
    Examples:
      | Scenario ID | Description                       |
      | 2           | Smuggling - Select all checkboxes |


  Scenario Outline: PAF - Public Allegations Form - E2E scenarios
    Given   I selected the data for scenario "<Scenario ID>" - "<Description>"
    Given   I visit the Public Allegations Form page
    And     I fill out my answers for the Public Allegations Form 3
    Then    I am able to submit my answers to the Public Allegations Form
    Examples:
      | Scenario ID | Description                               |
      | 3           | Immigration crime - Select all checkboxes |


  Scenario Outline: PAF - Public Allegations Form - E2E scenarios
    Given   I selected the data for scenario "<Scenario ID>" - "<Description>"
    Given   I visit the Public Allegations Form page
    And     I fill out my answers for the Public Allegations Form 4
    Then    I am able to submit my answers to the Public Allegations Form
    Examples:
      | Scenario ID | Description                       |
      | 4           | Smuggling - Select all checkboxes |


  Scenario Outline: PAF - Public Allegations Form - E2E scenarios
    Given   I selected the data for scenario "<Scenario ID>" - "<Description>"
    Given   I visit the Public Allegations Form page
    And     I fill out my answers for the Public Allegations Form 5
    Then    I am able to submit my answers to the Public Allegations Form
    Examples:
      | Scenario ID | Description                                                                         |
      | 5           | Immigration crime - Illegal workers, lied on application & other immigration crimes |