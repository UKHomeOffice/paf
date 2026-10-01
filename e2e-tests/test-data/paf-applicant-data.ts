export type PafApplicant = {
  scenarioId: string;
  description: string;
  whatIsTheCrimeYouAreReporting: string;
  areThereChildrenInvolved: string;
  whenIsTheCrimeHappening: string;
  whenWillTheCrimeHappen: string;
  tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: string;
  ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: string;
  doesTheCrimeInvolveAnyVehiclesTransportOrTravel: string;
  whatIsTheVehicleType: string;
  whatIsTheBoatType: string;
  tellUsWhichOfTheFollowingTheCrimeInvolves: string;
  doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: string;
  doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: string;
  doYouWantToReportAnIndividual: string;
  whatIsThePersonsApproximateAge: string;
  whatIsThePersonsGender: string;
  whereIsThePersonNow: string;
  whatTypeOfAddressIsIt: string;
  doYouKnowIfThePersonHasAJob: string;
  doYouKnowWhereThePersonWorks: string;
  whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: string;
  doesThePersonStudy: string;
  doesThePersonStudyInTheUk: string;
  doYouKnowWhereInTheUkThePersonStudies: string;
  whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: string;
  doesThePersonOwnACarOrOtherVehicle: string;
  whatIsTheVehicleTypePerson: string;
  doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: string;
  whatIsTheAdditionalPersonsApproximateAgePerson: string;
  whatIsTheAdditionalPersonsGenderPerson: string;
  doYouWishToReportACompanyBusinessOrEducationProvider: string;
  whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: string;
  doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: string;
  doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: string;
  pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: string;
  canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: string;
  whatIsYourGender: string;
  canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: string;
  areYouOver18: string;
};

export const pafApplicants: Record<string, PafApplicant> = {
  '1': {
    scenarioId: '1',
    description: 'Immigration crime - Select all checkboxes',
    whatIsTheCrimeYouAreReporting: 'Immigration all',
    areThereChildrenInvolved: 'Yes',
    whenIsTheCrimeHappening: 'Already happened',
    whenWillTheCrimeHappen: 'N/A',
    tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: 'N/A',
    ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: 'N/A',
    doesTheCrimeInvolveAnyVehiclesTransportOrTravel: 'All',
    whatIsTheVehicleType: 'Coach',
    whatIsTheBoatType: 'Containership',
    tellUsWhichOfTheFollowingTheCrimeInvolves: 'Freight or cargo',
    doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: 'Yes',
    doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: 'Yes',
    doYouWantToReportAnIndividual: 'Yes',
    whatIsThePersonsApproximateAge: '35-44',
    whatIsThePersonsGender: 'Female',
    whereIsThePersonNow: 'In the UK',
    whatTypeOfAddressIsIt: 'Home address',
    doYouKnowIfThePersonHasAJob: 'Yes',
    doYouKnowWhereThePersonWorks: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonStudy: 'Yes',
    doesThePersonStudyInTheUk: 'Yes',
    doYouKnowWhereInTheUkThePersonStudies: 'Yes',
    whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonOwnACarOrOtherVehicle: 'Yes',
    whatIsTheVehicleTypePerson: 'Motorbike',
    doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: 'Yes',
    whatIsTheAdditionalPersonsApproximateAgePerson: '45-54',
    whatIsTheAdditionalPersonsGenderPerson: 'Female',
    doYouWishToReportACompanyBusinessOrEducationProvider: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: 'Yes',
    doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: 'Yes',
    doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: 'Yes',
    pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: '3',
    canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: 'Yes',
    whatIsYourGender: 'Male',
    canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: 'Yes',
    areYouOver18: 'Yes',
  },
  '2': {
    scenarioId: '2',
    description: 'Smuggling - Select all checkboxes',
    whatIsTheCrimeYouAreReporting: 'Smuggling all',
    areThereChildrenInvolved: 'Yes',
    whenIsTheCrimeHappening: 'Happening now',
    whenWillTheCrimeHappen: 'N/A',
    tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: 'N/A',
    ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: 'N/A',
    doesTheCrimeInvolveAnyVehiclesTransportOrTravel: 'Vehicle, Train',
    whatIsTheVehicleType: 'Unaccompanied trailer',
    whatIsTheBoatType: 'N/A',
    tellUsWhichOfTheFollowingTheCrimeInvolves: 'Post',
    doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: 'Yes',
    doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: 'No',
    doYouWantToReportAnIndividual: 'Yes',
    whatIsThePersonsApproximateAge: '0-17',
    whatIsThePersonsGender: 'Female',
    whereIsThePersonNow: 'Travelling to the UK',
    whatTypeOfAddressIsIt: 'Home address',
    doYouKnowIfThePersonHasAJob: 'Yes',
    doYouKnowWhereThePersonWorks: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonStudy: 'Yes',
    doesThePersonStudyInTheUk: 'Yes',
    doYouKnowWhereInTheUkThePersonStudies: 'Yes',
    whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonOwnACarOrOtherVehicle: 'Yes',
    whatIsTheVehicleTypePerson: 'Motorbike',
    doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: 'Yes',
    whatIsTheAdditionalPersonsApproximateAgePerson: '45-54',
    whatIsTheAdditionalPersonsGenderPerson: 'Male',
    doYouWishToReportACompanyBusinessOrEducationProvider: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: 'Yes',
    doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: 'Yes',
    doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: 'Yes',
    pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: '2',
    canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: 'Yes',
    whatIsYourGender: 'Other',
    canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: 'Yes',
    areYouOver18: 'Yes',
  },
  '3': {
    scenarioId: '3',
    description: 'Immigration crime - Select all checkboxes',
    whatIsTheCrimeYouAreReporting: 'Immigration all',
    areThereChildrenInvolved: 'No',
    whenIsTheCrimeHappening: 'Ongoing',
    whenWillTheCrimeHappen: 'N/A',
    tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: 'N/A',
    ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: 'N/A',
    doesTheCrimeInvolveAnyVehiclesTransportOrTravel: 'Aeroplane',
    whatIsTheVehicleType: 'N/A',
    whatIsTheBoatType: 'N/A',
    tellUsWhichOfTheFollowingTheCrimeInvolves: 'Express mail/courier',
    doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: 'No',
    doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: 'N/A',
    doYouWantToReportAnIndividual: 'No',
    whatIsThePersonsApproximateAge: 'N/A',
    whatIsThePersonsGender: 'N/A',
    whereIsThePersonNow: 'N/A',
    whatTypeOfAddressIsIt: 'N/A',
    doYouKnowIfThePersonHasAJob: 'N/A',
    doYouKnowWhereThePersonWorks: 'N/A',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: 'N/A',
    doesThePersonStudy: 'N/A',
    doesThePersonStudyInTheUk: 'N/A',
    doYouKnowWhereInTheUkThePersonStudies: 'N/A',
    whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: 'N/A',
    doesThePersonOwnACarOrOtherVehicle: 'N/A',
    whatIsTheVehicleTypePerson: 'N/A',
    doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: 'N/A',
    whatIsTheAdditionalPersonsApproximateAgePerson: 'N/A',
    whatIsTheAdditionalPersonsGenderPerson: 'N/A',
    doYouWishToReportACompanyBusinessOrEducationProvider: 'No',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: 'N/A',
    doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: 'N/A',
    doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: 'No',
    pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: '1',
    canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: 'No',
    whatIsYourGender: 'Female',
    canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: 'No',
    areYouOver18: 'N/A',
  },
  '4': {
    scenarioId: '4',
    description: 'Smuggling - Select all checkboxes',
    whatIsTheCrimeYouAreReporting: 'Smuggling all',
    areThereChildrenInvolved: 'No',
    whenIsTheCrimeHappening: 'Not yet happened',
    whenWillTheCrimeHappen: 'In the next 24 hours',
    tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: 'N/A',
    ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: 'N/A',
    doesTheCrimeInvolveAnyVehiclesTransportOrTravel: 'Boat, Train, Vehicle',
    whatIsTheVehicleType: 'HGV tanker',
    whatIsTheBoatType: 'Dinghy',
    tellUsWhichOfTheFollowingTheCrimeInvolves: 'None of these',
    doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: 'No',
    doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: 'N/A',
    doYouWantToReportAnIndividual: 'No',
    whatIsThePersonsApproximateAge: 'N/A',
    whatIsThePersonsGender: 'N/A',
    whereIsThePersonNow: 'N/A',
    whatTypeOfAddressIsIt: 'N/A',
    doYouKnowIfThePersonHasAJob: 'N/A',
    doYouKnowWhereThePersonWorks: 'N/A',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: 'N/A',
    doesThePersonStudy: 'N/A',
    doesThePersonStudyInTheUk: 'N/A',
    doYouKnowWhereInTheUkThePersonStudies: 'N/A',
    whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: 'N/A',
    doesThePersonOwnACarOrOtherVehicle: 'N/A',
    whatIsTheVehicleTypePerson: 'N/A',
    doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: 'N/A',
    whatIsTheAdditionalPersonsApproximateAgePerson: 'N/A',
    whatIsTheAdditionalPersonsGenderPerson: 'N/A',
    doYouWishToReportACompanyBusinessOrEducationProvider: 'No',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: 'N/A',
    doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: 'N/A',
    doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: 'No',
    pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: '1',
    canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: 'No',
    whatIsYourGender: 'Prefer not to say',
    canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: 'No',
    areYouOver18: 'N/A',
  },
  '5': {
    scenarioId: '5',
    description: 'Immigration crime - Illegal workers, lied on application & other immigration crimes',
    whatIsTheCrimeYouAreReporting: 'Immigration Crime - Illegal workers, Lied on application, Other immigration crimes',
    areThereChildrenInvolved: "I don't know",
    whenIsTheCrimeHappening: 'Not yet happened',
    whenWillTheCrimeHappen: 'Date more than 24 hours in the future',
    tellUsTheTimeAndDateTheCrimeWillHappenIfYouKnowThem: 'Day, Month, Year & Time',
    ifYouHaveAnyMoreInformationAboutWhenTheCrimeIsHappeningPleaseTellUsHere: 'Text Input',
    doesTheCrimeInvolveAnyVehiclesTransportOrTravel: 'Vehicle',
    whatIsTheVehicleType: 'Van (other)',
    whatIsTheBoatType: 'Fishing boat',
    tellUsWhichOfTheFollowingTheCrimeInvolves: 'Freight or cargo',
    doYouKnowWhereTheCrimeTakesPlaceTookPlaceOrWillTakePlace: 'Yes',
    doYouWantToTellUsAboutAnotherLocationWhereTheCrimeIsTakingPlace: 'Yes',
    doYouWantToReportAnIndividual: 'Yes',
    whatIsThePersonsApproximateAge: '25-34',
    whatIsThePersonsGender: 'Other',
    whereIsThePersonNow: 'Outside the UK',
    whatTypeOfAddressIsIt: 'Relative',
    doYouKnowIfThePersonHasAJob: 'Yes',
    doYouKnowWhereThePersonWorks: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonStudy: 'Yes',
    doesThePersonStudyInTheUk: 'Yes',
    doYouKnowWhereInTheUkThePersonStudies: 'Yes',
    whoOwnsOrManagesTheInsitutionDoesTheOwnerOrManagerKnowAboutTheCrime: 'Yes',
    doesThePersonOwnACarOrOtherVehicle: 'Yes',
    whatIsTheVehicleTypePerson: 'Caravan',
    doYouWantToTellUsAboutAnotherPersonWhoIsInvolvedInTheSameCrime: 'Yes',
    whatIsTheAdditionalPersonsApproximateAgePerson: '55-64',
    whatIsTheAdditionalPersonsGenderPerson: 'Other',
    doYouWishToReportACompanyBusinessOrEducationProvider: 'Yes',
    whoOwnsOrManagesTheCompanyDoesTheOwnerOrManagerKnowAboutTheCrime2: 'Yes',
    doYouWantToTellUsAboutAnotherCompanyBusinessOrEducationProviderThatIsInvolvedInTheSameCrime: 'Yes',
    doYouWantToReportAnotherCrimeByTheSamePersonOrBusiness: 'Yes',
    pleaseAttachAnyDocumentsWhichMayHelpUsInvestigateThisCrime: 'None',
    canWeActOnThisInformationWithoutPuttingYouOrOthersAtRisk: 'Yes',
    whatIsYourGender: 'Male',
    canWeContactYouIfRequiredToDiscussTheInformationYouHaveProvided: 'Yes',
    areYouOver18: 'No',
  },
};

export function getPafApplicant(scenarioId: string, description: string): PafApplicant {
  const applicant = pafApplicants[scenarioId];

  if (!applicant) {
    throw new Error(`No PAF applicant data found for scenario ${scenarioId} - ${description}`);
  }

  if (applicant.description !== description) {
    throw new Error(`PAF applicant description mismatch for scenario ${scenarioId}: expected '${applicant.description}', got '${description}'`);
  }

  return applicant;
}