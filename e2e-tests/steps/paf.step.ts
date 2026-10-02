import { createBdd } from 'playwright-bdd';
import { Pages, test } from '../fixture/fixtures';
import { getPafApplicant, PafApplicant } from '../test-data/paf-applicant-data';

export const { Given, Then, When } = createBdd(test);

let applicant: PafApplicant;

Given('Test data has been created for {string} scenarios', async ({ }, _serviceName: string) => {
});

Given('I visit the Public Allegations Form page', async ({ pages }) => {
    await pages.pafHomePage.openPaf();
    await pages.pafHomePage.start();
});

When('I fill out my answers for the Public Allegations Form journey 1 pertaining to {string}', async ({ pages }, description: string) => {
    applicant = getPafApplicant('1', description);
    await new pafStepLib(pages, applicant).completeScenario('1');
});

When('I fill out my answers for the Public Allegations Form journey 2 pertaining to {string}', async ({ pages }, description: string) => {
    applicant = getPafApplicant('2', description);
    await new pafStepLib(pages, applicant).completeScenario('2');
});

When('I fill out my answers for the Public Allegations Form journey 3 pertaining to {string}', async ({ pages }, description: string) => {
    applicant = getPafApplicant('3', description);
    await new pafStepLib(pages, applicant).completeScenario('3');
});

When('I fill out my answers for the Public Allegations Form journey 4 pertaining to {string}', async ({ pages }, description: string) => {
    applicant = getPafApplicant('4', description);
    await new pafStepLib(pages, applicant).completeScenario('4');
});

When('I fill out my answers for the Public Allegations Form journey 5 pertaining to {string}', async ({ pages }, description: string) => {
    applicant = getPafApplicant('5', description);
    await new pafStepLib(pages, applicant).completeScenario('5');
});

Then('I am able to submit my answers to the Public Allegations Form', async ({ pages }) => {
    await new pafStepLib(pages, applicant).submitPublicAllegationsForm();
});

type CrimeTransport = 'vehicle' | 'boat' | 'train' | 'aeroplane';

export class pafStepLib {
    constructor(private readonly pages: Pages, private readonly applicant: PafApplicant) { }

    async completeScenario(journeyId: string) {
        switch (journeyId) {
            case '1':
                await this.completeCrimeSection(['vehicle', 'boat', 'train', 'aeroplane']);
                await this.completeFullPersonInUkSection();
                await this.completeFullOrganisationSection();
                break;
            case '2':
                await this.completeCrimeSection(['vehicle', 'train']);
                await this.completeFullPersonTravellingSection();
                await this.completeFullOrganisationSection();
                break;
            case '3':
                await this.pages.pafCrimeTypePage.answerCrimeType(this.applicant.whatIsTheCrimeYouAreReporting);
                await this.pages.pafCrimeChildrenPage.answerChildrenInvolved(this.applicant.areThereChildrenInvolved);
                await this.pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens(this.applicant.whenIsTheCrimeHappening);
                await this.pages.pafCrimeTransportPage.answerTransportInvolvement(this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel);
                await this.pages.pafCrimeTransportAeroplaneDetailsPage.answerAeroplaneDetails();
                await this.pages.pafCrimeDeliveryPage.answerDeliveryInvolvement(this.applicant.tellUsWhichOfTheFollowingTheCrimeInvolves);
                await this.pages.pafCrimeLocationPage.answerCrimeLocation(this.applicant.doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace);
                await this.pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace);
                await this.pages.pafPersonReportPage.answerReportIndividual(this.applicant.doYouWantToReportAnIndividual);
                await this.pages.pafOrganisationPage.answerReportOrganisation(this.applicant.doYouWishToReportACompanyBusinessOrEducationProvider);
                break;
            case '4':
                await this.pages.pafCrimeTypePage.answerCrimeType(this.applicant.whatIsTheCrimeYouAreReporting);
                await this.pages.pafCrimeChildrenPage.answerChildrenInvolved(this.applicant.areThereChildrenInvolved);
                await this.pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens(this.applicant.whenIsTheCrimeHappening);
                await this.pages.pafCrimeWhenWillCrimeHappenPage.answerWhenCrimeWillHappen(this.applicant.whenWillTheCrimeHappen);
                await this.pages.pafCrimeTransportPage.answerTransportInvolvement(this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel);
                await this.pages.pafCrimeTransportVehicleTypePage.answerVehicleType(this.applicant.whatIsTheVehicleType);
                await this.pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
                await this.pages.pafCrimeTransportBoatTypePage.answerBoatType(this.applicant.whatIsTheBoatType);
                await this.pages.pafCrimeTransportBoatDetailsPage.answerBoatDetails();
                await this.pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
                await this.pages.pafCrimeDeliveryPage.answerDeliveryInvolvement(this.applicant.tellUsWhichOfTheFollowingTheCrimeInvolves);
                await this.pages.pafCrimeLocationPage.answerCrimeLocation(this.applicant.doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace);
                await this.pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace);
                await this.pages.pafPersonReportPage.answerReportIndividual(this.applicant.doYouWantToReportAnIndividual);
                await this.pages.pafOrganisationPage.answerReportOrganisation(this.applicant.doYouWishToReportACompanyBusinessOrEducationProvider);
                break;
            case '5':
                await this.pages.pafCrimeTypePage.answerCrimeType(this.applicant.whatIsTheCrimeYouAreReporting);
                await this.pages.pafCrimeChildrenPage.answerChildrenInvolved(this.applicant.areThereChildrenInvolved);
                await this.pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens(this.applicant.whenIsTheCrimeHappening);
                await this.pages.pafCrimeWhenWillCrimeHappenPage.answerWhenCrimeWillHappen(this.applicant.whenWillTheCrimeHappen);
                await this.pages.pafCrimeDateTimeCrimeWillHappenPage.answerCrimeDateTime();
                await this.pages.pafCrimeMoreInformationPage.answerAdditionalCrimeTimeInformation();
                await this.pages.pafCrimeTransportPage.answerTransportInvolvement(this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel);
                await this.pages.pafCrimeTransportVehicleTypePage.answerVehicleType(this.applicant.whatIsTheVehicleType);
                await this.pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
                await this.pages.pafCrimeDeliveryPage.answerDeliveryInvolvement(this.applicant.tellUsWhichOfTheFollowingTheCrimeInvolves);
                await this.pages.pafCrimeLocationPage.answerCrimeLocation(this.applicant.doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace);
                await this.pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace);
                await this.completeFullPersonOutsideUkSection();
                await this.completeFullOrganisationSection();
                break;
            default:
                throw new Error(`Unknown PAF journey: ${journeyId}`);
        }
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async submitPublicAllegationsForm() {
        await this.pages.pafCheckYourAnswersPage.clickConfirmSubmission();
        await this.pages.pafDeclarationPage.submitApplication();
        await this.pages.pafDeclarationPage.assertApplicationSuccessful();
    }

    private async completeCrimeSection(transports: CrimeTransport[]) {
        await this.pages.pafCrimeTypePage.answerCrimeType(this.applicant.whatIsTheCrimeYouAreReporting);
        await this.pages.pafCrimeChildrenPage.answerChildrenInvolved(this.applicant.areThereChildrenInvolved);
        await this.pages.pafCrimeWhenCrimeHappenedPage.answerWhenCrimeHappens(this.applicant.whenIsTheCrimeHappening);
        await this.pages.pafCrimeTransportPage.answerTransportInvolvement(this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel);

        if (transports.includes('vehicle')) {
            await this.pages.pafCrimeTransportVehicleTypePage.answerVehicleType(this.applicant.whatIsTheVehicleType);
            await this.pages.pafCrimeTransportVehicleDetailsPage.answerVehicleDetails();
        }

        if (transports.includes('boat')) {
            await this.pages.pafCrimeTransportBoatTypePage.answerBoatType(this.applicant.whatIsTheBoatType);
            await this.pages.pafCrimeTransportBoatDetailsPage.answerBoatDetails();
        }

        if (transports.includes('train')) {
            await this.pages.pafCrimeTransportTrainDetailsPage.answerTrainDetails();
        }

        if (transports.includes('aeroplane')) {
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.answerAeroplaneDetails();
        }

        await this.pages.pafCrimeDeliveryPage.answerDeliveryInvolvement(this.applicant.tellUsWhichOfTheFollowingTheCrimeInvolves);
        await this.pages.pafCrimeLocationPage.answerCrimeLocation(this.applicant.doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace);
        await this.pages.pafCrimeAnotherLocationPage.answerAnotherCrimeLocation(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace);
    }

    private async completeFullPersonInUkSection() {
        await this.completePersonIdentitySection();
        await this.pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation(this.applicant.whereIsThePersonNow);
        await this.pages.pafPersonAddressUkPage.answerPersonAddressUk();
        await this.pages.pafPersonWhatTypeOfAddressIsItPage.answerPersonAddressType(this.applicant.whatTypeOfAddressIsIt);
        await this.pages.pafPersonContactDetailsPage.answerPersonContactDetails();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completeFullPersonTravellingSection() {
        await this.completePersonIdentitySection();
        await this.pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation(this.applicant.whereIsThePersonNow);
        await this.pages.pafPersonTravellingToTheUkPage.answerPersonTravellingFrom();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completeFullPersonOutsideUkSection() {
        await this.completePersonIdentitySection();
        await this.pages.pafPersonWhereIsThePersonNowPage.answerPersonCurrentLocation(this.applicant.whereIsThePersonNow);
        await this.pages.pafPersonAddressOutsideUkPage.answerPersonAddressOutsideUk();
        await this.pages.pafPersonWhatTypeOfAddressIsItOutsideUkPage.answerPersonAddressTypeOutsideUk(this.applicant.whatTypeOfAddressIsIt);
        await this.pages.pafPersonContactDetailsOutsideUkPage.answerPersonContactDetailsOutsideUk();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completePersonIdentitySection() {
        await this.pages.pafPersonReportPage.answerReportIndividual(this.applicant.doYouWantToReportAnIndividual);
        await this.pages.pafPersonNamePage.answerPersonName();
        await this.pages.pafPersonDobPage.answerPersonDateOfBirth();
        await this.pages.pafPersonAgePage.answerPersonAge(this.applicant.whatIsThePersonsApproximateAge);
        await this.pages.pafPersonNationalityPage.answerPersonNationality();
        await this.pages.pafPersonPlaceOfBirthPage.answerPersonPlaceOfBirth();
        await this.pages.pafPersonGenderPage.answerPersonGender(this.applicant.whatIsThePersonsGender);
        await this.pages.pafPersonIdPage.answerPersonIdentification();
    }

    private async completePersonWorkStudyVehicleAndAdditionalPersonSection() {
        await this.pages.pafPersonOccupationPage.answerJobStatus(this.applicant.doYouKnowIfThePersonHasAJob);
        await this.pages.pafPersonOccupationTypePage.answerOccupationType();
        await this.pages.pafPersonOccupationHoursPage.answerWorkHours();
        await this.pages.pafPersonOccupationDaysPage.answerWorkDays();
        await this.pages.pafPersonOccupationWherePage.answerWorkLocationKnown(this.applicant.doYouKnowWhereThePersonWorks);
        await this.pages.pafPersonOccupationCompanyNamePage.answerEmployerCompanyName();
        await this.pages.pafPersonOccupationCompanyAddressPage.answerEmployerCompanyContactDetails();
        await this.pages.pafPersonOccupationCompanyOwnerPage.answerCompanyOwnerKnowledge(this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime);
        await this.pages.pafPersonStudyPage.answerStudyStatus(this.applicant.doesThePersonStudy);
        await this.pages.pafPersonStudySubjectPage.answerStudySubject();
        await this.pages.pafPersonStudyInTheUkPage.answerStudyInUk(this.applicant.doesThePersonStudyInTheUk);
        await this.pages.pafPersonStudyHoursPage.answerStudyHours();
        await this.pages.pafPersonStudyDaysPage.answerStudyDays();
        await this.pages.pafPersonStudyWherePage.answerStudyLocationKnown(this.applicant.doYouKnowWhereInTheUkThePersonStudies);
        await this.pages.pafPersonStudyNamePage.answerInstitutionName();
        await this.pages.pafPersonStudyAddressPage.answerInstitutionAddress();
        await this.pages.pafPersonStudyContactPage.answerInstitutionContactDetails();
        await this.pages.pafPersonStudyInstitutionOwnerPage.answerInstitutionOwnerKnowledge(this.applicant.whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime);
        await this.pages.pafPersonTransportPage.answerPersonOwnsVehicle(this.applicant.doesThePersonOwnACarOrOtherVehicle);
        await this.pages.pafPersonTransportVehicleTypePage.answerPersonVehicleType(this.applicant.whatIsTheVehicleTypePerson);
        await this.pages.pafPersonTransportVehicleDetailsPage.answerPersonVehicleDetails();
        await this.pages.pafPersonAnythingElsePage.answerAdditionalPersonInformation();
        await this.pages.pafPersonAdditionalPeoplePage.answerAnotherPersonInvolved(this.applicant.doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime);
        await this.pages.pafAdditionalPersonNamePage.answerAdditionalPersonName();
        await this.pages.pafAdditionalPersonDobPage.answerAdditionalPersonDateOfBirth();
        await this.pages.pafAdditionalPersonAgePage.answerAdditionalPersonAge(this.applicant.whatIsTheAdditionalPersonsApproximateAgePerson);
        await this.pages.pafAdditionalPersonNationalityPage.answerAdditionalPersonNationality();
        await this.pages.pafAdditionalPersonGenderPage.answerAdditionalPersonGender(this.applicant.whatIsTheAdditionalPersonsGenderPerson);
        await this.pages.pafAdditionalPersonIdPage.answerAdditionalPersonIdentification();
    }

    private async completeFullOrganisationSection() {
        await this.pages.pafOrganisationPage.answerReportOrganisation(this.applicant.doYouWishToReportACompanyBusinessOrEducationProvider);
        await this.pages.pafOrganisationCompanyNamePage.answerOrganisationName();
        await this.pages.pafOrganisationCompanyAddressPage.answerOrganisationAddress();
        await this.pages.pafOrganisationCompanyContactPage.answerOrganisationContactDetails();
        await this.pages.pafOrganisationCompanyTypePage.answerOrganisationType();
        await this.pages.pafOrganisationCompanyOwnerPage.answerOrganisationOwnerKnowledge(this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2);
        await this.pages.pafOrganisationCompanyOtherInfoPage.answerAdditionalOrganisationInformation();
        await this.pages.pafOrganisationCompanyAnotherCompanyPage.answerAnotherOrganisationInvolved(this.applicant.doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime);
    }

    private async completeOtherInformationSection() {
        await this.pages.pafOtherInformationPage.answerOtherInformation();
        await this.pages.pafOtherInformationAnotherCrimePage.answerAnotherCrime(this.applicant.doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness);
        await this.pages.pafOtherInformationFileUploadPage.answerAttachments(this.applicant.pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime);
    }

    private async completeAboutYouSection() {
        await this.pages.pafAboutYouPage.answerHowDidYouFindOutAboutTheCrime();
        await this.pages.pafAboutYouDoesAnyoneElseKnowPage.answerDoesAnyoneElseKnow();
        await this.pages.pafAboutYouHaveYouReportedBeforePage.answerHaveYouReportedBefore();
        await this.pages.pafAboutYouHowDoYouKnowThePersonPage.answerHowDoYouKnowThePerson();
        await this.pages.pafAboutYouCanUseInfoWithoutRiskPage.answerCanActWithoutRisk(this.applicant.canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk);
        await this.pages.pafAboutYouDetailsPage.answerAboutYouDetails();
        await this.pages.pafAboutYouDobPage.answerAboutYouDateOfBirth();
        await this.pages.pafAboutYouNationalityPage.answerAboutYouNationality();
        await this.pages.pafAboutYouGenderPage.answerAboutYouGender(this.applicant.whatIsYourGender);
        await this.pages.pafAboutYouContactPage.answerAboutYouContactDetails();
        await this.pages.pafAboutYouAreYouOver18Page.answerAboutYouOver18(this.applicant.canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided);
    }
}