@PafRegressionCI @PafRegression
Feature: PAF validation

  Scenario: Validate required answers and the future crime date
    Given I visit the Public Allegations Form page
    When I choose to complete "Report an immigration or customs crime" page

# What is the crime you are reporting?
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "You must tell us what the criminals are planning or doing. This will help us to send the information to the right team immediately." error summary
    When I choose to complete "What is the crime you are reporting?" page

    # Are there children involved? (A child is anyone under 18 years of age)
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "We need to know if any children are involved in the crime. They may be committing the crime or victims of it. With this information, we can make sure that we handle the case in the right way." error summary
    When I choose to complete "Are there children involved? (A child is anyone under 18 years of age)" page
