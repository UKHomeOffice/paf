import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { Pages, test } from '../fixture/fixtures';

export const { Given, Then, When } = createBdd(test);

Given('I visit the Public Allegations Form page', async ({ pages }) => {
    await pages.pafHomePage.openPaf();
});


/// ******************************************************** Start ********************************************************
When('I select continue', async ({ pages, page }) => {
    await pages.basePage.clickContinueButton();
});

Then('I should see {string} error message displayed', async ({ pages }, expectedErrorMessage: string) => {
    const actualErrorMessageLocator = await pages.basePage.getThereIsAProblemTextErrorText();
    expect(expectedErrorMessage).toEqual(actualErrorMessageLocator!);
});

Then('I should see {string} error summary', async ({ pages }, expectedErrorMessage: string) => {
    const expectedErrorArray = expectedErrorMessage.trim().split('¬');

    const actualText = await pages.basePage.getErrorSummaryListText();
    const actualErrorArray = actualText!
        .replaceAll('\t', '') // remove ALL tabs
        .trim()             // remove leading/trailing whitespace
        .split(/\r?\n/);    // handle all newline types

    expect(actualErrorArray).toEqual(expectedErrorArray);
});


Then('the {string} page should have no accessibility violations', async ({ pages }, arg: string) => {
    await pages.basePage.assertAccessibility();
});


When('I choose to complete {string} page', async ({ pages }, pageName: string) => {
    switch (pageName) {
        case 'Report an immigration or customs crime':
            await pages.pafHomePage.start();
            break;
        case 'What is the crime you are reporting?':
            await pages.pafCrimeTypePage.answerCrimeType('Immigration all');
            break;
        case 'Are there children involved? (A child is anyone under 18 years of age)':
            await pages.pafCrimeChildrenPage.answerChildrenInvolved('Yes');
            break;
        case 'When is the crime happening?':
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Already happened');
            break;
        case 'Does the crime involve any vehicles, transport or travel?':
            await pages.pafCrimeTransportPage.answerTransportInvolvement('All');
            break;
        case 'What is the vehicle type?':
            await pages.pafCrimeTransportVehicleTypePage.answerVehicleType('Coach');
            break;
        case 'What are the vehicle details?':
            await pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
            break;
        case 'What is the boat type?':
            await pages.pafCrimeTransportBoatTypePage.answerBoatType('Containership');
            break;
        case 'What are the boat details?':
            await pages.pafCrimeTransportBoatDetailsPage.answerBoatDetails();
            break;
        case 'What are the train details?':
            await pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
            break;
        case 'What are the aeroplane details?':
            await pages.pafCrimeTransportAeroplaneDetailsPage.answerAeroplaneDetails();
            break;
        case 'Tell us which of the following the crime involves:':
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('Freight or cargo');
            break;
        case 'Do you know where the crime takes place, took place or will take place?':
            await pages.pafCrimeLocationPage.answerCrimeLocation('Yes');
            break;
        case 'Do you want to tell us about another location where the crime is taking place?':
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('Yes');
            break;
        case 'The Person':
            await pages.pafPersonReportPage.answerReportIndividual('Yes');
            break;
        case "What is the person's name?":
            await pages.pafPersonNamePage.answerPersonName();
            break;
        case "What is the person's date of birth?":
            await pages.pafPersonDobPage.answerPersonDateOfBirth();
            break;
        case "What is the person's approximate age?":
            await pages.pafPersonAgePage.answerPersonAge('35-44');
            break;
        default:
            throw new Error(`Unknown PAF scenario description: ${pageName}`);
    }
});


/// ******************************************************** End ********************************************************


When('I fill out my answers for the Public Allegations Form journey pertaining to {string}', async ({ pages }, testScenarios: string) => {
    await pages.pafHomePage.start();
    switch (testScenarios) {
        case 'Immigration crime - Select all checkboxes (with person details and organisation)':
            await pages.pafCrimeTypePage.answerCrimeType('Immigration all');
            await pages.pafCrimeChildrenPage.answerChildrenInvolved('Yes');
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Already happened');
            await pages.pafCrimeTransportPage.answerTransportInvolvement('All');
            await pages.pafCrimeTransportVehicleTypePage.answerVehicleType('Coach');
            await pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
            await pages.pafCrimeTransportBoatTypePage.answerBoatType('Containership');
            await pages.pafCrimeTransportBoatDetailsPage.answerBoatDetails();
            await pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
            await pages.pafCrimeTransportAeroplaneDetailsPage.answerAeroplaneDetails();
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('Freight or cargo');
            await pages.pafCrimeLocationPage.answerCrimeLocation('Yes');
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('Yes');
            await pages.pafPersonReportPage.answerReportIndividual('Yes');
            await pages.pafPersonNamePage.answerPersonName();
            await pages.pafPersonDobPage.answerPersonDateOfBirth();
            await pages.pafPersonAgePage.answerPersonAge('35-44');
            await pages.pafPersonNationalityPage.answerPersonNationality();
            await pages.pafPersonPlaceOfBirthPage.answerPersonPlaceOfBirth();
            await pages.pafPersonGenderPage.answerPersonGender('Female');
            await pages.pafPersonIdPage.answerPersonIdentification();
            await pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation('In the UK');
            await pages.pafPersonAddressUkPage.answerPersonAddressUk();
            await pages.pafPersonWhatTypeOfAddressIsItPage.answerPersonAddressType('Home address');
            await pages.pafPersonContactDetailsPage.answerPersonContactDetails();
            await pages.pafPersonOccupationPage.answerJobStatus('Yes');
            await pages.pafPersonOccupationTypePage.answerOccupationType();
            await pages.pafPersonOccupationHoursPage.answerWorkHours();
            await pages.pafPersonOccupationDaysPage.answerWorkDays();
            await pages.pafPersonOccupationWherePage.answerWorkLocationKnown('Yes');
            await pages.pafPersonOccupationCompanyNamePage.answerEmployerCompanyName();
            await pages.pafPersonOccupationCompanyAddressPage.answerEmployerCompanyContactDetails();
            await pages.pafPersonOccupationCompanyOwnerPage.answerCompanyOwnerKnowledge('Yes');
            await pages.pafPersonStudyPage.answerStudyStatus('Yes');
            await pages.pafPersonStudySubjectPage.answerStudySubject();
            await pages.pafPersonStudyInTheUkPage.answerStudyInUk('Yes');
            await pages.pafPersonStudyHoursPage.answerStudyHours();
            await pages.pafPersonStudyDaysPage.answerStudyDays();
            await pages.pafPersonStudyWherePage.answerStudyLocationKnown('Yes');
            await pages.pafPersonStudyNamePage.answerInstitutionName();
            await pages.pafPersonStudyAddressPage.answerInstitutionAddress();
            await pages.pafPersonStudyContactPage.answerInstitutionContactDetails();
            await pages.pafPersonStudyInstitutionOwnerPage.answerInstitutionOwnerKnowledge('Yes');
            await pages.pafPersonTransportPage.answerPersonOwnsVehicle('Yes');
            await pages.pafPersonTransportVehicleTypePage.answerPersonVehicleType('Motorbike');
            await pages.pafPersonTransportVehicleDetailsPage.answerPersonVehicleDetails();
            await pages.pafPersonAnythingElsePage.answerAdditionalPersonInformation();
            await pages.pafPersonAdditionalPeoplePage.answerAnotherPersonInvolved('Yes');
            await pages.pafAdditionalPersonNamePage.answerAdditionalPersonName();
            await pages.pafAdditionalPersonDobPage.answerAdditionalPersonDateOfBirth();
            await pages.pafAdditionalPersonAgePage.answerAdditionalPersonAge('45-54');
            await pages.pafAdditionalPersonNationalityPage.answerAdditionalPersonNationality();
            await pages.pafAdditionalPersonGenderPage.answerAdditionalPersonGender('Female');
            await pages.pafAdditionalPersonIdPage.answerAdditionalPersonIdentification();
            await pages.pafOrganisationPage.answerReportOrganisation('Yes');
            await pages.pafOrganisationCompanyNamePage.answerOrganisationName();
            await pages.pafOrganisationCompanyAddressPage.answerOrganisationAddress();
            await pages.pafOrganisationCompanyContactPage.answerOrganisationContactDetails();
            await pages.pafOrganisationCompanyTypePage.answerOrganisationType();
            await pages.pafOrganisationCompanyOwnerPage.answerOrganisationOwnerKnowledge('Yes');
            await pages.pafOrganisationCompanyOtherInfoPage.answerAdditionalOrganisationInformation();
            await pages.pafOrganisationCompanyAnotherCompanyPage.answerAnotherOrganisationInvolved('Yes');
            await pages.pafOtherInformationPage.answerOtherInformation();
            await pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime('Yes');
            await pages.pafOtherInformationFileUploadPage.answerAttachments('3');
            await pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
            await pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
            await pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
            await pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
            await pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk('Yes');
            await pages.pafAboutYouDetailsPage.answerAboutYouDetails();
            await pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
            await pages.pafAboutYouNationalityPage.answerAboutYouNationality();
            await pages.pafAboutYouGenderPage.answerAboutYouGender('Male');
            await pages.pafAboutYouContactPage.answerAboutYouContactDetails();
            await pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18('Yes');
            break;
        case 'Smuggling - Select all checkboxes (travelling person)':
            await pages.pafCrimeTypePage.answerCrimeType('Smuggling all');
            await pages.pafCrimeChildrenPage.answerChildrenInvolved('Yes');
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Happening now');
            await pages.pafCrimeTransportPage.answerTransportInvolvement('Vehicle, Train');
            await pages.pafCrimeTransportVehicleTypePage.answerVehicleType('Unaccompanied trailer');
            await pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
            await pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('Post');
            await pages.pafCrimeLocationPage.answerCrimeLocation('Yes');
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('No');
            await pages.pafPersonReportPage.answerReportIndividual('Yes');
            await pages.pafPersonNamePage.answerPersonName();
            await pages.pafPersonDobPage.answerPersonDateOfBirth();
            await pages.pafPersonAgePage.answerPersonAge('0-17');
            await pages.pafPersonNationalityPage.answerPersonNationality();
            await pages.pafPersonPlaceOfBirthPage.answerPersonPlaceOfBirth();
            await pages.pafPersonGenderPage.answerPersonGender('Female');
            await pages.pafPersonIdPage.answerPersonIdentification();
            await pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation('Travelling to the UK');
            await pages.pafPersonTravellingToTheUkPage.answerPersonTravellingFrom();
            await pages.pafPersonOccupationPage.answerJobStatus('Yes');
            await pages.pafPersonOccupationTypePage.answerOccupationType();
            await pages.pafPersonOccupationHoursPage.answerWorkHours();
            await pages.pafPersonOccupationDaysPage.answerWorkDays();
            await pages.pafPersonOccupationWherePage.answerWorkLocationKnown('Yes');
            await pages.pafPersonOccupationCompanyNamePage.answerEmployerCompanyName();
            await pages.pafPersonOccupationCompanyAddressPage.answerEmployerCompanyContactDetails();
            await pages.pafPersonOccupationCompanyOwnerPage.answerCompanyOwnerKnowledge('Yes');
            await pages.pafPersonStudyPage.answerStudyStatus('Yes');
            await pages.pafPersonStudySubjectPage.answerStudySubject();
            await pages.pafPersonStudyInTheUkPage.answerStudyInUk('Yes');
            await pages.pafPersonStudyHoursPage.answerStudyHours();
            await pages.pafPersonStudyDaysPage.answerStudyDays();
            await pages.pafPersonStudyWherePage.answerStudyLocationKnown('Yes');
            await pages.pafPersonStudyNamePage.answerInstitutionName();
            await pages.pafPersonStudyAddressPage.answerInstitutionAddress();
            await pages.pafPersonStudyContactPage.answerInstitutionContactDetails();
            await pages.pafPersonStudyInstitutionOwnerPage.answerInstitutionOwnerKnowledge('Yes');
            await pages.pafPersonTransportPage.answerPersonOwnsVehicle('Yes');
            await pages.pafPersonTransportVehicleTypePage.answerPersonVehicleType('Motorbike');
            await pages.pafPersonTransportVehicleDetailsPage.answerPersonVehicleDetails();
            await pages.pafPersonAnythingElsePage.answerAdditionalPersonInformation();
            await pages.pafPersonAdditionalPeoplePage.answerAnotherPersonInvolved('Yes');
            await pages.pafAdditionalPersonNamePage.answerAdditionalPersonName();
            await pages.pafAdditionalPersonDobPage.answerAdditionalPersonDateOfBirth();
            await pages.pafAdditionalPersonAgePage.answerAdditionalPersonAge('45-54');
            await pages.pafAdditionalPersonNationalityPage.answerAdditionalPersonNationality();
            await pages.pafAdditionalPersonGenderPage.answerAdditionalPersonGender('Male');
            await pages.pafAdditionalPersonIdPage.answerAdditionalPersonIdentification();
            await pages.pafOrganisationPage.answerReportOrganisation('Yes');
            await pages.pafOrganisationCompanyNamePage.answerOrganisationName();
            await pages.pafOrganisationCompanyAddressPage.answerOrganisationAddress();
            await pages.pafOrganisationCompanyContactPage.answerOrganisationContactDetails();
            await pages.pafOrganisationCompanyTypePage.answerOrganisationType();
            await pages.pafOrganisationCompanyOwnerPage.answerOrganisationOwnerKnowledge('Yes');
            await pages.pafOrganisationCompanyOtherInfoPage.answerAdditionalOrganisationInformation();
            await pages.pafOrganisationCompanyAnotherCompanyPage.answerAnotherOrganisationInvolved('Yes');
            await pages.pafOtherInformationPage.answerOtherInformation();
            await pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime('Yes');
            await pages.pafOtherInformationFileUploadPage.answerAttachments('2');
            await pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
            await pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
            await pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
            await pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
            await pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk('Yes');
            await pages.pafAboutYouDetailsPage.answerAboutYouDetails();
            await pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
            await pages.pafAboutYouNationalityPage.answerAboutYouNationality();
            await pages.pafAboutYouGenderPage.answerAboutYouGender('Other');
            await pages.pafAboutYouContactPage.answerAboutYouContactDetails();
            await pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18('Yes');
            break;
        case 'Immigration crime - Select all checkboxes (no person or organisation)':
            await pages.pafCrimeTypePage.answerCrimeType('Immigration all');
            await pages.pafCrimeChildrenPage.answerChildrenInvolved('No');
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Ongoing');
            await pages.pafCrimeTransportPage.answerTransportInvolvement('Aeroplane');
            await pages.pafCrimeTransportAeroplaneDetailsPage.answerAeroplaneDetails();
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('Express mail/courier');
            await pages.pafCrimeLocationPage.answerCrimeLocation('No');
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('N/A');
            await pages.pafPersonReportPage.answerReportIndividual('No');
            await pages.pafOrganisationPage.answerReportOrganisation('No');
            await pages.pafOtherInformationPage.answerOtherInformation();
            await pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime('No');
            await pages.pafOtherInformationFileUploadPage.answerAttachments('1');
            await pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
            await pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
            await pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
            await pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
            await pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk('No');
            await pages.pafAboutYouDetailsPage.answerAboutYouDetails();
            await pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
            await pages.pafAboutYouNationalityPage.answerAboutYouNationality();
            await pages.pafAboutYouGenderPage.answerAboutYouGender('Female');
            await pages.pafAboutYouContactPage.answerAboutYouContactDetails();
            await pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18('No');
            break;
        case 'Smuggling - Select all checkboxes (future crime, no person or organisation)':
            await pages.pafCrimeTypePage.answerCrimeType('Smuggling all');
            await pages.pafCrimeChildrenPage.answerChildrenInvolved('No');
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Not yet happened');
            await pages.pafCrimeWhenWillCrimeHappenPage.answerWhenCrimeWillHappen('In the next 24 hours');
            await pages.pafCrimeTransportPage.answerTransportInvolvement('Boat, Train, Vehicle');
            await pages.pafCrimeTransportVehicleTypePage.answerVehicleType('HGV tanker');
            await pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
            await pages.pafCrimeTransportBoatTypePage.answerBoatType('Dinghy');
            await pages.pafCrimeTransportBoatDetailsPage.answerBoatDetails();
            await pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('None of these');
            await pages.pafCrimeLocationPage.answerCrimeLocation('No');
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('N/A');
            await pages.pafPersonReportPage.answerReportIndividual('No');
            await pages.pafOrganisationPage.answerReportOrganisation('No');
            await pages.pafOtherInformationPage.answerOtherInformation();
            await pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime('No');
            await pages.pafOtherInformationFileUploadPage.answerAttachments('1');
            await pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
            await pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
            await pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
            await pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
            await pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk('No');
            await pages.pafAboutYouDetailsPage.answerAboutYouDetails();
            await pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
            await pages.pafAboutYouNationalityPage.answerAboutYouNationality();
            await pages.pafAboutYouGenderPage.answerAboutYouGender('Prefer not to say');
            await pages.pafAboutYouContactPage.answerAboutYouContactDetails();
            await pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18('No');
            break;
        case 'Immigration crime - Illegal workers, lied on application & other immigration crimes':
            await pages.pafCrimeTypePage.answerCrimeType('Immigration Crime - Illegal workers, Lied on application, Other immigration crimes');
            await pages.pafCrimeChildrenPage.answerChildrenInvolved("I don't know");
            await pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens('Not yet happened');
            await pages.pafCrimeWhenWillCrimeHappenPage.answerWhenCrimeWillHappen('Date more than 24 hours in the future');
            await pages.pafCrimeDateTimeCrimeWillHappenPage.answerCrimeDateTime();
            await pages.pafCrimeMoreInformationPage.answerAdditionalCrimeTimeInformation();
            await pages.pafCrimeTransportPage.answerTransportInvolvement('Vehicle');
            await pages.pafCrimeTransportVehicleTypePage.answerVehicleType('Van (other)');
            await pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
            await pages.pafCrimeDeliveryPage.answerDeliveryInvolvement('Freight or cargo');
            await pages.pafCrimeLocationPage.answerCrimeLocation('Yes');
            await pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation('Yes');
            await pages.pafPersonReportPage.answerReportIndividual('Yes');
            await pages.pafPersonNamePage.answerPersonName();
            await pages.pafPersonDobPage.answerPersonDateOfBirth();
            await pages.pafPersonAgePage.answerPersonAge('25-34');
            await pages.pafPersonNationalityPage.answerPersonNationality();
            await pages.pafPersonPlaceOfBirthPage.answerPersonPlaceOfBirth();
            await pages.pafPersonGenderPage.answerPersonGender('Other');
            await pages.pafPersonIdPage.answerPersonIdentification();
            await pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation('Outside the UK');
            await pages.pafPersonAddressOutsideUkPage.answerPersonAddressOutsideUk();
            await pages.pafPersonWhatTypeOfAddressIsItOutsideUkPage.answerPersonAddressTypeOutsideUk('Relative');
            await pages.pafPersonContactDetailsOutsideUkPage.answerPersonContactDetailsOutsideUk();
            await pages.pafPersonOccupationPage.answerJobStatus('Yes');
            await pages.pafPersonOccupationTypePage.answerOccupationType();
            await pages.pafPersonOccupationHoursPage.answerWorkHours();
            await pages.pafPersonOccupationDaysPage.answerWorkDays();
            await pages.pafPersonOccupationWherePage.answerWorkLocationKnown('Yes');
            await pages.pafPersonOccupationCompanyNamePage.answerEmployerCompanyName();
            await pages.pafPersonOccupationCompanyAddressPage.answerEmployerCompanyContactDetails();
            await pages.pafPersonOccupationCompanyOwnerPage.answerCompanyOwnerKnowledge('Yes');
            await pages.pafPersonStudyPage.answerStudyStatus('Yes');
            await pages.pafPersonStudySubjectPage.answerStudySubject();
            await pages.pafPersonStudyInTheUkPage.answerStudyInUk('Yes');
            await pages.pafPersonStudyHoursPage.answerStudyHours();
            await pages.pafPersonStudyDaysPage.answerStudyDays();
            await pages.pafPersonStudyWherePage.answerStudyLocationKnown('Yes');
            await pages.pafPersonStudyNamePage.answerInstitutionName();
            await pages.pafPersonStudyAddressPage.answerInstitutionAddress();
            await pages.pafPersonStudyContactPage.answerInstitutionContactDetails();
            await pages.pafPersonStudyInstitutionOwnerPage.answerInstitutionOwnerKnowledge('Yes');
            await pages.pafPersonTransportPage.answerPersonOwnsVehicle('Yes');
            await pages.pafPersonTransportVehicleTypePage.answerPersonVehicleType('Caravan');
            await pages.pafPersonTransportVehicleDetailsPage.answerPersonVehicleDetails();
            await pages.pafPersonAnythingElsePage.answerAdditionalPersonInformation();
            await pages.pafPersonAdditionalPeoplePage.answerAnotherPersonInvolved('Yes');
            await pages.pafAdditionalPersonNamePage.answerAdditionalPersonName();
            await pages.pafAdditionalPersonDobPage.answerAdditionalPersonDateOfBirth();
            await pages.pafAdditionalPersonAgePage.answerAdditionalPersonAge('55-64');
            await pages.pafAdditionalPersonNationalityPage.answerAdditionalPersonNationality();
            await pages.pafAdditionalPersonGenderPage.answerAdditionalPersonGender('Other');
            await pages.pafAdditionalPersonIdPage.answerAdditionalPersonIdentification();
            await pages.pafOrganisationPage.answerReportOrganisation('Yes');
            await pages.pafOrganisationCompanyNamePage.answerOrganisationName();
            await pages.pafOrganisationCompanyAddressPage.answerOrganisationAddress();
            await pages.pafOrganisationCompanyContactPage.answerOrganisationContactDetails();
            await pages.pafOrganisationCompanyTypePage.answerOrganisationType();
            await pages.pafOrganisationCompanyOwnerPage.answerOrganisationOwnerKnowledge('Yes');
            await pages.pafOrganisationCompanyOtherInfoPage.answerAdditionalOrganisationInformation();
            await pages.pafOrganisationCompanyAnotherCompanyPage.answerAnotherOrganisationInvolved('Yes');
            await pages.pafOtherInformationPage.answerOtherInformation();
            await pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime('Yes');
            await pages.pafOtherInformationFileUploadPage.answerAttachments('None');
            await pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
            await pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
            await pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
            await pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
            await pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk('Yes');
            await pages.pafAboutYouDetailsPage.answerAboutYouDetails();
            await pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
            await pages.pafAboutYouNationalityPage.answerAboutYouNationality();
            await pages.pafAboutYouGenderPage.answerAboutYouGender('Male');
            await pages.pafAboutYouContactPage.answerAboutYouContactDetails();
            await pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18('Yes');
            break;
        default:
            throw new Error(`Unknown PAF scenario description: ${testScenarios}`);
    }

    await pages.pafCheckYourAnswersPage.clickConfirmSubmission();
    await pages.pafDeclarationPage.submitApplication();
});

Then('I am able to submit my answers to the Public Allegations Form', async ({ pages }) => {

    await pages.pafDeclarationPage.assertApplicationSuccessful();
});