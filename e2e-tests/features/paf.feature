@PafRegressionCI
@PafRegression
Feature: PAF - Public Allegations Form

  Scenario Outline: PAF - Public Allegations Form - E2E scenarios 1
    Given I visit the Public Allegations Form page
    When I fill out my answers for the Public Allegations Form journey pertaining to "<Test Scenarios>"
    Then I am able to submit my answers to the Public Allegations Form
    Examples:
      | Test Scenarios                                                                      |
      | Immigration crime - Select all checkboxes (with person details and organisation)    |
      | Smuggling - Select all checkboxes (travelling person)                               |
      | Immigration crime - Select all checkboxes (no person or organisation)               |
      | Smuggling - Select all checkboxes (future crime, no person or organisation)         |
      | Immigration crime - Illegal workers, lied on application & other immigration crimes |