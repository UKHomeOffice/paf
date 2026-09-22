import { createBdd } from 'playwright-bdd';
import { Pages, test } from '../fixture/fixtures';
import { getPafApplicant, PafApplicant } from '../test-data/paf-applicant-data';

export const { Given, Then } = createBdd(test);

let applicant: PafApplicant;

Given('Test data has been created for {string} scenarios', async ({ }, _serviceName: string) => {
});

Given('I selected the data for scenario {string} - {string}', async ({ }, scenarioId: string, description: string) => {
    applicant = getPafApplicant(scenarioId, description);
});

Given('I visit the Public Allegations Form page', async ({ pages }) => {
    await pages.pafHomePage.openPaf();
    await pages.pafHomePage.start();
});

Given('I fill out my answers for the Public Allegations Form', async ({ pages }) => {
    await new pafStepLib(pages, applicant).completePublicAllegationsForm();
});

Given('I fill out my answers for the Public Allegations Form 2', async ({ pages }) => {
    await new pafStepLib(pages, applicant).completePublicAllegationsForm2();
});

Given('I fill out my answers for the Public Allegations Form 3', async ({ pages }) => {
    await new pafStepLib(pages, applicant).completePublicAllegationsForm3();
});

Given('I fill out my answers for the Public Allegations Form 4', async ({ pages }) => {
    await new pafStepLib(pages, applicant).completePublicAllegationsForm4();
});

Given('I fill out my answers for the Public Allegations Form 5', async ({ pages }) => {
    await new pafStepLib(pages, applicant).completePublicAllegationsForm5();
});

Then('I am able to submit my answers to the Public Allegations Form', async ({ pages }) => {
    await new pafStepLib(pages, applicant).submitPublicAllegationsForm();
});

type CrimeTransport = 'vehicle' | 'boat' | 'train' | 'aeroplane';

export class pafStepLib {
    constructor(private readonly pages: Pages, private readonly applicant: PafApplicant) { }

    async completePublicAllegationsForm() {
        await this.completeCrimeSection(['vehicle', 'boat', 'train', 'aeroplane']);
        await this.completeFullPersonInUkSection();
        await this.completeFullOrganisationSection();
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async completePublicAllegationsForm2() {
        await this.completeCrimeSection(['vehicle', 'train']);
        await this.completeFullPersonTravellingSection();
        await this.completeFullOrganisationSection();
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async completePublicAllegationsForm3() {
        await this.answerWhatIsTheCrimeYouAreReporting();
        await this.answerAreThereChildrenInvolved();
        await this.answerWhenIsTheCrimeHappening();
        await this.answerDoesTheCrimeInvolveAnyVehiclesTransportOrTravel();
        await this.answerWhatAreTheAeroplaneDetails();
        await this.answerTellUsWhichOfTheFollowingTheCrimeInvolves();
        await this.answerDoYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace();
        await this.answerDoYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace();
        await this.answerDoYouWantToReportAnIndividual();
        await this.answerDoYouWishToReportACompanyBusinessOrEducationProvider();
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async completePublicAllegationsForm4() {
        await this.answerWhatIsTheCrimeYouAreReporting();
        await this.answerAreThereChildrenInvolved();
        await this.answerWhenIsTheCrimeHappening();
        await this.answerWhenWillTheCrimeHappen();
        await this.answerDoesTheCrimeInvolveAnyVehiclesTransportOrTravel();
        await this.answerWhatIsTheVehicleType();
        await this.answerWhatAreTheVehicleDetails();
        await this.answerWhatIsTheBoatType();
        await this.answerWhatAreTheBoatDetails();
        await this.answerWhatAreTheTrainDetails();
        await this.answerTellUsWhichOfTheFollowingTheCrimeInvolves();
        await this.answerDoYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace();
        await this.answerDoYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace();
        await this.answerDoYouWantToReportAnIndividual();
        await this.answerDoYouWishToReportACompanyBusinessOrEducationProvider();
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async completePublicAllegationsForm5() {
        await this.answerWhatIsTheCrimeYouAreReporting();
        await this.answerAreThereChildrenInvolved();
        await this.answerWhenIsTheCrimeHappening();
        await this.answerWhenWillTheCrimeHappen();
        await this.answerTellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem();
        await this.answerIfYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere();
        await this.answerDoesTheCrimeInvolveAnyVehiclesTransportOrTravel();
        await this.answerWhatIsTheVehicleType();
        await this.answerWhatAreTheVehicleDetails();
        await this.answerTellUsWhichOfTheFollowingTheCrimeInvolves();
        await this.answerDoYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace();
        await this.answerDoYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace();
        await this.completeFullPersonOutsideUkSection();
        await this.completeFullOrganisationSection();
        await this.completeOtherInformationSection();
        await this.completeAboutYouSection();
    }

    async submitPublicAllegationsForm() {
        await this.pages.pafCheckYourAnswersPage.clickConfirmSubmission();
        await this.pages.pafDeclarationPage.submitApplication();
        await this.pages.pafDeclarationPage.assertApplicationSuccessful();
    }

    async answerWhatIsTheCrimeYouAreReporting() {
        await this.pages.pafCrimeTypePage.assertPageTitle(this.pages.pafCrimeTypePage.expectedPageTitle);

        switch (this.applicant.whatIsTheCrimeYouAreReporting) {
            case 'Immigration all':
                await this.pages.pafCrimeTypePage.answerImmigrationCrime();
                await this.pages.pafCrimeTypePage.answerNoPermissionToStayInTheUk();
                await this.pages.pafCrimeTypePage.answerIllegalWorking();
                await this.pages.pafCrimeTypePage.answerEmployerEmployingIllegalWorkers();
                await this.pages.pafCrimeTypePage.answerStudentWorkingFullTime();
                await this.pages.pafCrimeTypePage.answerFakeMarriage();
                await this.pages.pafCrimeTypePage.answerFakeOrFalseDocuments();
                await this.pages.pafCrimeTypePage.answerHelpingPeopleToEnterOrStayInTheUkIllegally();
                await this.pages.pafCrimeTypePage.answerLiedOnApplication();
                await this.pages.pafCrimeTypePage.answerHumanTraffickingSmugglingSlavery();
                await this.pages.pafCrimeTypePage.answerOtherImmigrationCrimes();
                break;
            case 'Smuggling all':
                await this.pages.pafCrimeTypePage.answerSmuggling();
                await this.pages.pafCrimeTypePage.answerDrugSmuggling();
                await this.pages.pafCrimeTypePage.answerCashSmuggling();
                await this.pages.pafCrimeTypePage.answerCigaretteAndTobaccoSmuggling();
                await this.pages.pafCrimeTypePage.answerFirearmsSmuggling();
                await this.pages.pafCrimeTypePage.answerAlcoholSmuggling();
                await this.pages.pafCrimeTypePage.answerOtherSmuggling();
                break;
            case 'Immigration Crime - Illegal workers, Lied on application, Other immigration crimes':
                await this.pages.pafCrimeTypePage.answerImmigrationCrime();
                await this.pages.pafCrimeTypePage.answerEmployerEmployingIllegalWorkers();
                await this.pages.pafCrimeTypePage.answerLiedOnApplication();
                await this.pages.pafCrimeTypePage.answerOtherImmigrationCrimes();
                break;
            default:
                throw new Error(`Crime type not understood: ${this.applicant.whatIsTheCrimeYouAreReporting}`);
        }

        await this.pages.basePage.clickContinueButton();
    }

    async answerAreThereChildrenInvolved() {
        await this.assertThenAnswer(this.pages.pafCrimeChildrenPage, () =>
            this.pages.pafCrimeChildrenPage.answerYesNoUnknown(this.applicant.areThereChildrenInvolved));
    }

    async answerWhenIsTheCrimeHappening() {
        await this.pages.pafCrimeWhenCrimeHappenedPage.assertPageTitle(
            this.pages.pafCrimeWhenCrimeHappenedPage.expectedPageTitle
        );

        switch (this.applicant.whenIsTheCrimeHappening) {
            case 'Happening now':
                return this.pages.pafCrimeWhenCrimeHappenedPage.crimeHappeningNowAnswer();
            case 'Ongoing':
                return this.pages.pafCrimeWhenCrimeHappenedPage.crimeOngoingAnswer();
            case 'Already happened':
                return this.pages.pafCrimeWhenCrimeHappenedPage.crimeAlreadyHappenedAnswer();
            case 'Not yet happened':
                return this.pages.pafCrimeWhenCrimeHappenedPage.crimeNotYetHappenedAnswer();
            case "I don't know":
                return this.pages.pafCrimeWhenCrimeHappenedPage.crimeIdontKnowAnswer();
            default:
                throw new Error(`Invalid when crime happened: ${this.applicant.whenIsTheCrimeHappening}`);
        }
    }

    async answerWhenWillTheCrimeHappen() {
        await this.pages.pafCrimeWhenWillCrimeHappenPage.assertPageTitle(
            this.pages.pafCrimeWhenWillCrimeHappenPage.expectedPageTitle
        );

        switch (this.applicant.whenWillTheCrimeHappen) {
            case 'In the next 24 hours':
                return this.pages.pafCrimeWhenWillCrimeHappenPage.answerCrimeHappenNext24Hours();
            case 'Date more than 24 hours in the future':
                return this.pages.pafCrimeWhenWillCrimeHappenPage.answerCrimeHappenDateMoreThan24Hours();
            case "I don't know":
                return this.pages.pafCrimeWhenWillCrimeHappenPage.answerCrimeHappenIdontKnow();
            default:
                throw new Error(`Invalid when will crime happen: ${this.applicant.whenWillTheCrimeHappen}`);
        }
    }

    async answerTellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem() {
        await this.assertThenAnswer(this.pages.pafCrimeDateTimeCrimeWillHappenPage, () =>
            this.pages.pafCrimeDateTimeCrimeWillHappenPage.crimeDateTimeAnswer());
    }

    async answerIfYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere() {
        await this.assertThenAnswer(this.pages.pafCrimeMoreInformationPage, () =>
            this.pages.pafCrimeMoreInformationPage.crimeMoreInformationAnswer());
    }

    async answerDoesTheCrimeInvolveAnyVehiclesTransportOrTravel() {
        await this.pages.pafCrimeTransportPage.assertPageTitle(this.pages.pafCrimeTransportPage.expectedPageTitle);

        switch (this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel) {
            case "I don't know":
                return this.pages.pafCrimeTransportPage.crimeTransportIdontKnowAnswer();
            case 'No':
                return this.pages.pafCrimeTransportPage.crimeTransportNoAnswer();
            case 'Vehicle':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportVehicleAnswer();
                break;
            case 'Boat':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportBoatAnswer();
                break;
            case 'Train':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportTrainAnswer();
                break;
            case 'Aeroplane':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportAeroplaneAnswer();
                break;
            case 'All':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportVehicleAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportBoatAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportTrainAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportAeroplaneAnswer();
                break;
            case 'Vehicle, Train':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportVehicleAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportTrainAnswer();
                break;
            case 'Boat, Train, Vehicle':
                await this.pages.pafCrimeTransportPage.selectByLabel('Yes');
                await this.pages.pafCrimeTransportPage.crimeTransportBoatAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportTrainAnswer();
                await this.pages.pafCrimeTransportPage.crimeTransportVehicleAnswer();
                break;
            default:
                throw new Error(`Invalid transport type: ${this.applicant.doesTheCrimeInvolveAnyVehiclesTransportOrTravel}`);
        }

        await this.pages.basePage.clickContinueButton();
    }

    async answerWhatIsTheVehicleType() {
        await this.selectVehicleType(this.applicant.whatIsTheVehicleType, false);
    }

    async answerWhatAreTheVehicleDetails() {
        await this.assertThenAnswer(this.pages.pafCrimeTransportVehicleDetailsPage, () =>
            this.pages.pafCrimeTransportVehicleDetailsPage.crimeVehicleDetailsAnswer());
    }

    async answerWhatIsTheBoatType() {
        await this.selectBoatType(this.applicant.whatIsTheBoatType);
    }

    async answerWhatAreTheBoatDetails() {
        await this.assertThenAnswer(this.pages.pafCrimeTransportBoatDetailsPage, async () => {
            await this.pages.pafCrimeTransportBoatDetailsPage.crimeBoatNameAnswer();
            await this.pages.pafCrimeTransportBoatDetailsPage.crimeBoatCountryDepartureAnswer();
            await this.pages.pafCrimeTransportBoatDetailsPage.crimePortDepartureAnswer();
            await this.pages.pafCrimeTransportBoatDetailsPage.crimePortArrivalAnswer();
            await this.pages.pafCrimeTransportBoatDetailsPage.crimePortDepartureTimeAnswer();
            await this.pages.pafCrimeTransportBoatDetailsPage.crimePortArrivalTimeAnswer();
            await this.pages.basePage.clickContinueButton();
        });
    }

    async answerWhatAreTheTrainDetails() {
        await this.assertThenAnswer(this.pages.pafCrimeTransportTrainDetailsPage, async () => {
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeTrainCompanyAnswer();
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeTrainCountryDepartureAnswer();
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeStationDepartureAnswer();
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeStationArrivalAnswer();
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeStationDepartureTimeAnswer();
            await this.pages.pafCrimeTransportTrainDetailsPage.crimeStationArrivalTimeAnswer();
            await this.pages.basePage.clickContinueButton();
        });
    }

    async answerWhatAreTheAeroplaneDetails() {
        await this.assertThenAnswer(this.pages.pafCrimeTransportAeroplaneDetailsPage, async () => {
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirlineCompanyAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirlineFlightNumberAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirlineCountryDepartureAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirportDepartureAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirportArrivalAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirportDepartureTimeAnswer();
            await this.pages.pafCrimeTransportAeroplaneDetailsPage.crimeAirportArrivalTimeAnswer();
            await this.pages.basePage.clickContinueButton();
        });
    }

    async answerTellUsWhichOfTheFollowingTheCrimeInvolves() {
        await this.assertThenAnswer(this.pages.pafCrimeDeliveryPage, () =>
            this.pages.pafCrimeDeliveryPage.selectAndContinue(this.applicant.tellUsWhichOfTheFollowingTheCrimeInvolves));
    }

    async answerDoYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace() {
        await this.assertThenAnswer(this.pages.pafCrimeLocationPage, () =>
            this.yes(this.applicant.doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace)
                ? this.pages.pafCrimeLocationPage.crimeLocationYesAnswer()
                : this.pages.pafCrimeLocationPage.crimeLocationNoAnswer());
    }

    async answerDoYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace() {
        if (this.na(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace)) return;

        await this.assertThenAnswer(this.pages.pafCrimeAnotherLocationPage, () =>
            this.yes(this.applicant.doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace)
                ? this.pages.pafCrimeAnotherLocationPage.crimeAnotherLocationYesAnswer()
                : this.pages.pafCrimeAnotherLocationPage.crimeAnotherLocationNoAnswer());
    }

    async answerDoYouWantToReportAnIndividual() {
        await this.assertThenAnswer(this.pages.pafPersonReportPage, () =>
            this.pages.pafPersonReportPage.answerYesNoUnknown(this.applicant.doYouWantToReportAnIndividual));
    }

    async answerWhatIsThePersonsName() {
        await this.assertThenAnswer(this.pages.pafPersonNamePage, () =>
            this.pages.pafPersonNamePage.personReportNameAnswer());
    }

    async answerWhatIsThePersonsDateOfBirth() {
        await this.assertThenAnswer(this.pages.pafPersonDobPage, () =>
            this.pages.pafPersonDobPage.personReportDobAnswer());
    }

    async answerWhatIsThePersonsApproximateAge() {
        await this.selectAge(this.applicant.whatIsThePersonsApproximateAge, false);
    }

    async answerWhatIsThePersonsNationality() {
        await this.assertThenAnswer(this.pages.pafPersonNationalityPage, () =>
            this.pages.pafPersonNationalityPage.personReportNationalityAnswer());
    }

    async answerWhatIsThePersonsPlaceOfBirth() {
        await this.assertThenAnswer(this.pages.pafPersonPlaceOfBirthPage, () =>
            this.pages.pafPersonPlaceOfBirthPage.personReportPlaceOfBirthAnswer());
    }

    async answerWhatIsThePersonsGender() {
        await this.selectGender(this.applicant.whatIsThePersonsGender, false);
    }

    async answerWhatAreThePersonsFormOfIdentification() {
        await this.assertThenAnswer(this.pages.pafPersonIdPage, () =>
            this.pages.pafPersonIdPage.personReportIdAnswer());
    }

    async answerWhereIsThePersonNow() {
        await this.assertThenAnswer(this.pages.pafPersonWhereIsThePersonNowPage, () =>
            this.pages.pafPersonWhereIsThePersonNowPage.selectAndContinue(this.applicant.whereIsThePersonNow));
    }

    async answerWhatIsThePersonsAddressUk() {
        await this.assertThenAnswer(this.pages.pafPersonAddressUkPage, () =>
            this.pages.pafPersonAddressUkPage.personAddressUkAnswer());
    }

    async answerWhatCountryIsThePersonTravellingFrom() {
        await this.assertThenAnswer(this.pages.pafPersonTravellingToTheUkPage, () =>
            this.pages.pafPersonTravellingToTheUkPage.personTravellingToUkAnswer());
    }

    async answerWhatIsThePersonsAddressOutsideUk() {
        await this.assertThenAnswer(this.pages.pafPersonAddressOutsideUkPage, () =>
            this.pages.pafPersonAddressOutsideUkPage.personAddressOutsideUkAnswer());
    }

    async answerWhatTypeOfAddressIsIt() {
        await this.assertThenAnswer(this.pages.pafPersonWhatTypeOfAddressIsItPage, () =>
            this.pages.pafPersonWhatTypeOfAddressIsItPage.selectAndContinue(
                this.addressLabel(this.applicant.whatTypeOfAddressIsIt)
            ));
    }

    async answerWhatTypeOfAddressIsItOutsideUk() {
        await this.assertThenAnswer(this.pages.pafPersonWhatTypeOfAddressIsItOutsideUkPage, () =>
            this.pages.pafPersonWhatTypeOfAddressIsItOutsideUkPage.selectAndContinue(
                this.addressLabel(this.applicant.whatTypeOfAddressIsIt)
            ));
    }

    async answerWhatIsThePersonsContactDetails() {
        await this.assertThenAnswer(this.pages.pafPersonContactDetailsPage, () =>
            this.pages.pafPersonContactDetailsPage.personContactDetailsAnswer());
    }

    async answerWhatIsThePersonsContactDetailsOutsideUk() {
        await this.assertThenAnswer(this.pages.pafPersonContactDetailsOutsideUkPage, () =>
            this.pages.pafPersonContactDetailsOutsideUkPage.personContactDetailsOutsideUkAnswer());
    }

    async answerDoYouKnowIfThePersonHasAJob() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationPage, () =>
            this.pages.pafPersonOccupationPage.answerYesNoUnknown(this.applicant.doYouKnowIfThePersonHasAJob));
    }

    async answerWhatTypeOfJobOrOccupationDoesThePersonHave() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationTypePage, () =>
            this.pages.pafPersonOccupationTypePage.personOccupationTypeAnswer());
    }

    async answerWhatHoursOfTheDayDoesThePersonWork() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationHoursPage, () =>
            this.pages.pafPersonOccupationHoursPage.personOccupationHoursAnswer());
    }

    async answerWhatDaysDoesThePersonWork() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationDaysPage, () =>
            this.pages.pafPersonOccupationDaysPage.personOccupationDaysAnswer());
    }

    async answerDoYouKnowWhereThePersonWorks() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationWherePage, () =>
            this.pages.pafPersonOccupationWherePage.answerYesNoUnknown(this.applicant.doYouKnowWhereThePersonWorks));
    }

    async answerWhatIsTheNameOfTheCompanyThePersonWorksAt() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationCompanyNamePage, () =>
            this.pages.pafPersonOccupationCompanyNamePage.personOccupationCompanyNameAnswer());
    }

    async answerWhatIsTheCompanysContactDetails() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationCompanyAddressPage, () =>
            this.pages.pafPersonOccupationCompanyAddressPage.personOccupationCompanyAddressUkAnswer());
    }

    async answerWhoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime() {
        await this.assertThenAnswer(this.pages.pafPersonOccupationCompanyOwnerPage, () =>
            this.yes(this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime)
                ? this.pages.pafPersonOccupationCompanyOwnerPage.personOccupationCompanyOwnerYesAnswer()
                : this.pages.pafPersonOccupationCompanyOwnerPage.answerYesNoUnknown(
                    this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime
                ));
    }

    async answerDoesThePersonStudy() {
        await this.assertThenAnswer(this.pages.pafPersonStudyPage, () =>
            this.pages.pafPersonStudyPage.answerYesNoUnknown(this.applicant.doesThePersonStudy));
    }

    async answerDoYouKnowTheCourseOrTheSubjectOfStudy() {
        await this.assertThenAnswer(this.pages.pafPersonStudySubjectPage, () =>
            this.pages.pafPersonStudySubjectPage.personStudySubjectAnswer());
    }

    async answerDoesThePersonStudyInTheUk() {
        await this.assertThenAnswer(this.pages.pafPersonStudyInTheUkPage, () =>
            this.pages.pafPersonStudyInTheUkPage.answerYesNoUnknown(this.applicant.doesThePersonStudyInTheUk));
    }

    async answerWhatHoursOfTheDayDoesThePersonStudy() {
        await this.assertThenAnswer(this.pages.pafPersonStudyHoursPage, () =>
            this.pages.pafPersonStudyHoursPage.personOccupationHoursAnswer());
    }

    async answerWhatDaysDoesThePersonStudy() {
        await this.assertThenAnswer(this.pages.pafPersonStudyDaysPage, () =>
            this.pages.pafPersonStudyDaysPage.personOccupationDaysAnswer());
    }

    async answerDoYouKnowWhereInTheUkThePersonStudies() {
        await this.assertThenAnswer(this.pages.pafPersonStudyWherePage, () =>
            this.pages.pafPersonStudyWherePage.answerYesNoUnknown(this.applicant.doYouKnowWhereInTheUkThePersonStudies));
    }

    async answerWhatIsTheNameOfTheCollegeOrUniversity() {
        await this.assertThenAnswer(this.pages.pafPersonStudyNamePage, () =>
            this.pages.pafPersonStudyNamePage.personStudyNameAnswer());
    }

    async answerWhatIsTheInstitutionsAddress() {
        await this.assertThenAnswer(this.pages.pafPersonStudyAddressPage, () =>
            this.pages.pafPersonStudyAddressPage.personStudyAddressAnswer());
    }

    async answerWhatIsTheInstitutionsContactDetails() {
        await this.assertThenAnswer(this.pages.pafPersonStudyContactPage, () =>
            this.pages.pafPersonStudyContactPage.personStudyContactDetailsAnswer());
    }

    async answerWhoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime() {
        await this.assertThenAnswer(this.pages.pafPersonStudyInstitutionOwnerPage, () =>
            this.yes(this.applicant.whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime)
                ? this.pages.pafPersonStudyInstitutionOwnerPage.personStudyInstitutionOwnerYesAnswer()
                : this.pages.pafPersonStudyInstitutionOwnerPage.answerYesNoUnknown(
                    this.applicant.whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime
                ));
    }

    async answerDoesThePersonOwnACarOrOtherVehicle() {
        await this.assertThenAnswer(this.pages.pafPersonTransportPage, () =>
            this.pages.pafPersonTransportPage.answerYesNoUnknown(this.applicant.doesThePersonOwnACarOrOtherVehicle));
    }

    async answerWhatIsTheVehicleTypePerson() {
        await this.selectVehicleType(this.applicant.whatIsTheVehicleTypePerson, true);
    }

    async answerWhatAreTheVehicleDetailsPerson() {
        await this.assertThenAnswer(this.pages.pafPersonTransportVehicleDetailsPage, () =>
            this.pages.pafPersonTransportVehicleDetailsPage.personVehicleDetailsAnswer());
    }

    async answerPleaseTellUsAnythingElseAboutThePersonYouAreReportingThatYouThinkWeShouldKnow() {
        await this.assertThenAnswer(this.pages.pafPersonAnythingElsePage, () =>
            this.pages.pafPersonAnythingElsePage.personAnythingElseAnswer());
    }

    async answerDoYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime() {
        await this.assertThenAnswer(this.pages.pafPersonAdditionalPeoplePage, () =>
            this.pages.pafPersonAdditionalPeoplePage.answerYesNoUnknown(
                this.applicant.doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime
            ));
    }

    async answerWhatIsTheAdditionalPersonsName() {
        await this.assertThenAnswer(this.pages.pafAdditionalPersonNamePage, () =>
            this.pages.pafAdditionalPersonNamePage.additionalPersonReportNameAnswer());
    }

    async answerWhatIsTheAdditionalPersonsDateOfBirth() {
        await this.assertThenAnswer(this.pages.pafAdditionalPersonDobPage, () =>
            this.pages.pafAdditionalPersonDobPage.additionalPersonReportDobAnswer());
    }

    async answerWhatIsTheAdditionalPersonsApproximateAge() {
        await this.selectAge(this.applicant.whatIsTheAdditionalPersonsApproximateAgePerson, true);
    }

    async answerWhatIsTheAdditionalPersonsNationality() {
        await this.assertThenAnswer(this.pages.pafAdditionalPersonNationalityPage, () =>
            this.pages.pafAdditionalPersonNationalityPage.additionalPersonReportNationalityAnswer());
    }

    async answerWhatIsTheAdditionalPersonsGender() {
        await this.selectGender(this.applicant.whatIsTheAdditionalPersonsGenderPerson, true);
    }

    async answerWhatAreTheAdditionalPersonsFormOfIdentification() {
        await this.assertThenAnswer(this.pages.pafAdditionalPersonIdPage, async () => {
            await this.pages.pafAdditionalPersonIdPage.additionalPersonReportIdAnswer();
            await this.pages.pafAdditionalPersonDetailsPage.clickContinueButton();
        });
    }

    async answerDoYouWishToReportACompanyBusinessOrEducationProvider() {
        await this.assertThenAnswer(this.pages.pafOrganisationPage, () =>
            this.pages.pafOrganisationPage.answerYesNoUnknown(
                this.applicant.doYouWishToReportACompanyBusinessOrEducationProvider
            ));
    }

    async answerWhatIsTheCompanyBusinessOrEducationProvider() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyNamePage, () =>
            this.pages.pafOrganisationCompanyNamePage.organisationCompanyNameAnswer());
    }

    async answerWhatIsTheAddressOfTheCompanyBusinessOrEducationProvider() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyAddressPage, () =>
            this.pages.pafOrganisationCompanyAddressPage.organisationCompanyAddressAnswer());
    }

    async answerEnterTheCompanyBusinessOrEducationProvidersContactDetails() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyContactPage, () =>
            this.pages.pafOrganisationCompanyContactPage.organisationContactDetailsAnswer());
    }

    async answerWhatIsTheTypeOfCompanyBusinessOrEducationProvider() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyTypePage, () =>
            this.pages.pafOrganisationCompanyTypePage.organisationCompanyTypeAnswer());
    }

    async answerWhoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyOwnerPage, () =>
            this.yes(this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2)
                ? this.pages.pafOrganisationCompanyOwnerPage.organisationCompanyOwnerYesAnswer()
                : this.pages.pafOrganisationCompanyOwnerPage.answerYesNoUnknown(
                    this.applicant.whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2
                ));
    }

    async answerPleaseTellUsAnythingElseAboutTheCompanyBusinessOrEducationProviderThatYouThinkWeShouldKnow() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyOtherInfoPage, () =>
            this.pages.pafOrganisationCompanyOtherInfoPage.organisationCompanyOtherInfoAnswer());
    }

    async answerDoYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime() {
        await this.assertThenAnswer(this.pages.pafOrganisationCompanyAnotherCompanyPage, () =>
            this.pages.pafOrganisationCompanyAnotherCompanyPage.answerYesNoUnknown(
                this.applicant.doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime
            ));
    }

    async answerOtherInformation() {
        await this.assertThenAnswer(this.pages.pafOtherInformationPage, () =>
            this.pages.pafOtherInformationPage.otherInformationAnswer());
    }

    async answerDoYouWantToReportAnotherCrimeByTheSamePersonOrBusiness() {
        await this.assertThenAnswer(this.pages.pafOtherInformationAnotherCrimePage, () =>
            this.yes(this.applicant.doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness)
                ? this.pages.pafOtherInformationAnotherCrimePage.otherInformationAnotherCrimeYesAnswer()
                : this.pages.pafOtherInformationAnotherCrimePage.otherInformationAnotherCrimeNoAnswer());
    }

    async answerPleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime() {
        await this.pages.pafOtherInformationFileUploadPage.assertPageTitle(
            this.pages.pafOtherInformationFileUploadPage.expectedPageTitle
        );

        switch (this.applicant.pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime.toLowerCase()) {
            case '1':
                return this.pages.pafOtherInformationFileUploadPage.answerFileUpload1();
            case '2':
                return this.pages.pafOtherInformationFileUploadPage.answerFileUpload2();
            case '3':
                return this.pages.pafOtherInformationFileUploadPage.answerFileUpload3();
            case 'none':
                return this.pages.basePage.clickContinueButton();
            default:
                throw new Error(
                    `Invalid document type: ${this.applicant.pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime}`
                );
        }
    }

    async answerHowDidYouFindOutAboutTheCrime() {
        await this.assertThenAnswer(this.pages.pafAboutYouPage, () =>
            this.pages.pafAboutYouPage.aboutYouAnswer());
    }

    async answerDoesAnyoneElseKnowAboutTheCrime() {
        await this.assertThenAnswer(this.pages.pafAboutYouDoesAnyoneElseKnowPage, () =>
            this.pages.pafAboutYouDoesAnyoneElseKnowPage.aboutYouDoesAnyoneElseKnowAnswer());
    }

    async answerHaveYouReportedTheCrimeBefore() {
        await this.assertThenAnswer(this.pages.pafAboutYouHaveYouReportedBeforePage, () =>
            this.pages.pafAboutYouHaveYouReportedBeforePage.aboutYouHaveYouEverReportedBeforeAnswer());
    }

    async answerHowDoYouKnowThisPersonthesePeople() {
        await this.assertThenAnswer(this.pages.pafAboutYouHowDoYouKnowThePersonPage, () =>
            this.pages.pafAboutYouHowDoYouKnowThePersonPage.aboutYouHowDoYouKnowThePersonAnswer());
    }

    async answerCanWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk() {
        await this.assertThenAnswer(this.pages.pafAboutYouCanUseInfoWithoutRiskPage, () =>
            this.pages.pafAboutYouCanUseInfoWithoutRiskPage.answerYesNoUnknown(
                this.applicant.canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk
            ));
    }

    async answerPleaseProvideYourDetails() {
        await this.assertThenAnswer(this.pages.pafAboutYouDetailsPage, () =>
            this.pages.pafAboutYouDetailsPage.aboutYouDetailsAnswer());
    }

    async answerWhatIsYourDateOfBirth() {
        await this.assertThenAnswer(this.pages.pafAboutYouDobPage, () =>
            this.pages.pafAboutYouDobPage.aboutYouDobAnswer());
    }

    async answerWhatIsYourNationality() {
        await this.assertThenAnswer(this.pages.pafAboutYouNationalityPage, () =>
            this.pages.pafAboutYouNationalityPage.aboutYouNationalityAnswer());
    }

    async answerWhatIsYourGender() {
        await this.assertThenAnswer(this.pages.pafAboutYouGenderPage, () =>
            this.pages.pafAboutYouGenderPage.selectAndContinue(this.applicant.whatIsYourGender));
    }

    async answerCanWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided() {
        await this.assertThenAnswer(this.pages.pafAboutYouContactPage, () =>
            this.pages.pafAboutYouContactPage.aboutYouYesAnswer());
    }

    async answerAreYouOver18() {
        await this.assertThenAnswer(this.pages.pafAboutYouAreYouOver18Page, () =>
            this.yes(this.applicant.canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided)
                ? this.pages.pafAboutYouAreYouOver18Page.aboutYouOver18YesAnswer()
                : this.pages.pafAboutYouAreYouOver18Page.aboutYouOver18NoAnswer());
    }

    private async completeCrimeSection(transports: CrimeTransport[]) {
        await this.answerWhatIsTheCrimeYouAreReporting();
        await this.answerAreThereChildrenInvolved();
        await this.answerWhenIsTheCrimeHappening();
        await this.answerDoesTheCrimeInvolveAnyVehiclesTransportOrTravel();

        if (transports.includes('vehicle')) {
            await this.answerWhatIsTheVehicleType();
            await this.answerWhatAreTheVehicleDetails();
        }

        if (transports.includes('boat')) {
            await this.answerWhatIsTheBoatType();
            await this.answerWhatAreTheBoatDetails();
        }

        if (transports.includes('train')) {
            await this.answerWhatAreTheTrainDetails();
        }

        if (transports.includes('aeroplane')) {
            await this.answerWhatAreTheAeroplaneDetails();
        }

        await this.answerTellUsWhichOfTheFollowingTheCrimeInvolves();
        await this.answerDoYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace();
        await this.answerDoYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace();
    }

    private async completeFullPersonInUkSection() {
        await this.completePersonIdentitySection();
        await this.answerWhereIsThePersonNow();
        await this.answerWhatIsThePersonsAddressUk();
        await this.answerWhatTypeOfAddressIsIt();
        await this.answerWhatIsThePersonsContactDetails();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completeFullPersonTravellingSection() {
        await this.completePersonIdentitySection();
        await this.answerWhereIsThePersonNow();
        await this.answerWhatCountryIsThePersonTravellingFrom();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completeFullPersonOutsideUkSection() {
        await this.completePersonIdentitySection();
        await this.answerWhereIsThePersonNow();
        await this.answerWhatIsThePersonsAddressOutsideUk();
        await this.answerWhatTypeOfAddressIsItOutsideUk();
        await this.answerWhatIsThePersonsContactDetailsOutsideUk();
        await this.completePersonWorkStudyVehicleAndAdditionalPersonSection();
    }

    private async completePersonIdentitySection() {
        await this.answerDoYouWantToReportAnIndividual();
        await this.answerWhatIsThePersonsName();
        await this.answerWhatIsThePersonsDateOfBirth();
        await this.answerWhatIsThePersonsApproximateAge();
        await this.answerWhatIsThePersonsNationality();
        await this.answerWhatIsThePersonsPlaceOfBirth();
        await this.answerWhatIsThePersonsGender();
        await this.answerWhatAreThePersonsFormOfIdentification();
    }

    private async completePersonWorkStudyVehicleAndAdditionalPersonSection() {
        await this.answerDoYouKnowIfThePersonHasAJob();
        await this.answerWhatTypeOfJobOrOccupationDoesThePersonHave();
        await this.answerWhatHoursOfTheDayDoesThePersonWork();
        await this.answerWhatDaysDoesThePersonWork();
        await this.answerDoYouKnowWhereThePersonWorks();
        await this.answerWhatIsTheNameOfTheCompanyThePersonWorksAt();
        await this.answerWhatIsTheCompanysContactDetails();
        await this.answerWhoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime();
        await this.answerDoesThePersonStudy();
        await this.answerDoYouKnowTheCourseOrTheSubjectOfStudy();
        await this.answerDoesThePersonStudyInTheUk();
        await this.answerWhatHoursOfTheDayDoesThePersonStudy();
        await this.answerWhatDaysDoesThePersonStudy();
        await this.answerDoYouKnowWhereInTheUkThePersonStudies();
        await this.answerWhatIsTheNameOfTheCollegeOrUniversity();
        await this.answerWhatIsTheInstitutionsAddress();
        await this.answerWhatIsTheInstitutionsContactDetails();
        await this.answerWhoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime();
        await this.answerDoesThePersonOwnACarOrOtherVehicle();
        await this.answerWhatIsTheVehicleTypePerson();
        await this.answerWhatAreTheVehicleDetailsPerson();
        await this.answerPleaseTellUsAnythingElseAboutThePersonYouAreReportingThatYouThinkWeShouldKnow();
        await this.answerDoYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime();
        await this.answerWhatIsTheAdditionalPersonsName();
        await this.answerWhatIsTheAdditionalPersonsDateOfBirth();
        await this.answerWhatIsTheAdditionalPersonsApproximateAge();
        await this.answerWhatIsTheAdditionalPersonsNationality();
        await this.answerWhatIsTheAdditionalPersonsGender();
        await this.answerWhatAreTheAdditionalPersonsFormOfIdentification();
    }

    private async completeFullOrganisationSection() {
        await this.answerDoYouWishToReportACompanyBusinessOrEducationProvider();
        await this.answerWhatIsTheCompanyBusinessOrEducationProvider();
        await this.answerWhatIsTheAddressOfTheCompanyBusinessOrEducationProvider();
        await this.answerEnterTheCompanyBusinessOrEducationProvidersContactDetails();
        await this.answerWhatIsTheTypeOfCompanyBusinessOrEducationProvider();
        await this.answerWhoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2();
        await this.answerPleaseTellUsAnythingElseAboutTheCompanyBusinessOrEducationProviderThatYouThinkWeShouldKnow();
        await this.answerDoYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime();
    }

    private async completeOtherInformationSection() {
        await this.answerOtherInformation();
        await this.answerDoYouWantToReportAnotherCrimeByTheSamePersonOrBusiness();
        await this.answerPleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime();
    }

    private async completeAboutYouSection() {
        await this.answerHowDidYouFindOutAboutTheCrime();
        await this.answerDoesAnyoneElseKnowAboutTheCrime();
        await this.answerHaveYouReportedTheCrimeBefore();
        await this.answerHowDoYouKnowThisPersonthesePeople();
        await this.answerCanWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk();
        await this.answerPleaseProvideYourDetails();
        await this.answerWhatIsYourDateOfBirth();
        await this.answerWhatIsYourNationality();
        await this.answerWhatIsYourGender();
        await this.answerCanWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided();
        await this.answerAreYouOver18();
    }

    private async selectVehicleType(vehicleType: string, isPersonVehicle: boolean) {
        const page = isPersonVehicle
            ? this.pages.pafPersonTransportVehicleTypePage
            : this.pages.pafCrimeTransportVehicleTypePage;
        const parentLabel = this.vehicleParentLabel(vehicleType);

        await page.assertPageTitle(page.expectedPageTitle);

        if (parentLabel) {
            await page.selectByLabel(parentLabel);
        }

        await page.selectAndContinue(vehicleType);
    }

    private vehicleParentLabel(vehicleType: string) {
        if (['Car transporter'].includes(vehicleType)) return 'Car';
        if (['HGV canvas sided', 'HGV flatbed', 'HGV hard sided', 'HGV refrigerated', 'HGV tanker'].includes(vehicleType)) return 'HGV';
        if (['Lorry and drag'].includes(vehicleType)) return 'Lorry';
        if (['Van and trailer', 'Van (other)', '7.5 tonne van'].includes(vehicleType)) return 'Van';
        return '';
    }

    private async selectBoatType(boatType: string) {
        await this.pages.pafCrimeTransportBoatTypePage.assertPageTitle(
            this.pages.pafCrimeTransportBoatTypePage.expectedPageTitle
        );
        await this.pages.pafCrimeTransportBoatTypePage.selectAndContinue(boatType.replace(' (Boat)', ''));
    }

    private async selectAge(ageRange: string, isAdditionalPerson: boolean) {
        const page = isAdditionalPerson ? this.pages.pafAdditionalPersonAgePage : this.pages.pafPersonAgePage;

        await page.assertPageTitle(page.expectedPageTitle);
        await page.selectAndContinue(ageRange);
    }

    private async selectGender(gender: string, isAdditionalPerson: boolean) {
        const page = isAdditionalPerson ? this.pages.pafAdditionalPersonGenderPage : this.pages.pafPersonGenderPage;

        await page.assertPageTitle(page.expectedPageTitle);
        await page.selectAndContinue(gender);
    }

    private async assertThenAnswer(
        page: { expectedPageTitle: string; assertPageTitle: (title: string) => Promise<void> },
        action: () => Promise<void>
    ) {
        await page.assertPageTitle(page.expectedPageTitle);
        await action();
    }

    private addressLabel(addressType: string) {
        return addressType.toLowerCase() === 'relative' ? "Relative's address" : addressType;
    }

    private yes(value: string) {
        return value.trim().toLowerCase() === 'yes';
    }

    private na(value: string) {
        return value.trim().toLowerCase() === 'n/a';
    }
}
