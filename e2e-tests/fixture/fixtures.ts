import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { pafAboutYouAreYouOver18Page } from '../pages/paf-about-you-are-you-over18.page';
import { pafAboutYouCanUseInfoWithoutRiskPage } from '../pages/paf-about-you-can-use-info-without-risk.page';
import { pafAboutYouContactPage } from '../pages/paf-about-you-contact.page';
import { pafAboutYouDetailsPage } from '../pages/paf-about-you-details.page';
import { pafAboutYouDobPage } from '../pages/paf-about-you-dob.page';
import { pafAboutYouDoesAnyoneElseKnowPage } from '../pages/paf-about-you-does-anyone-else-know.page';
import { pafAboutYouGenderPage } from '../pages/paf-about-you-gender.page';
import { pafAboutYouHaveYouReportedBeforePage } from '../pages/paf-about-you-have-you-reported-before.page';
import { pafAboutYouHowDoYouKnowThePersonPage } from '../pages/paf-about-you-how-do-you-know-the-person.page';
import { pafAboutYouNationalityPage } from '../pages/paf-about-you-nationality.page';
import { pafAboutYouPage } from '../pages/paf-about-you.page';
import { pafAdditionalPersonAgePage } from '../pages/paf-additional-person-age.page';
import { pafAdditionalPersonDetailsPage } from '../pages/paf-additional-person-details.page';
import { pafAdditionalPersonDobPage } from '../pages/paf-additional-person-dob.page';
import { pafAdditionalPersonGenderPage } from '../pages/paf-additional-person-gender.page';
import { pafAdditionalPersonIdPage } from '../pages/paf-additional-person-id.page';
import { pafAdditionalPersonNamePage } from '../pages/paf-additional-person-name.page';
import { pafAdditionalPersonNationalityPage } from '../pages/paf-additional-person-nationality.page';
import { pafCheckYourAnswersPage } from '../pages/paf-check-your-answers.page';
import { pafCrimeAnotherLocationPage } from '../pages/paf-crime-another-location.page';
import { pafCrimeChildrenPage } from '../pages/paf-crime-children.page';
import { pafCrimeDateTimeCrimeWillHappenPage } from '../pages/paf-crime-date-time-crime-will-happen.page';
import { pafCrimeDeliveryPage } from '../pages/paf-crime-delivery.page';
import { pafCrimeLocationPage } from '../pages/paf-crime-location.page';
import { pafCrimeMoreInformationPage } from '../pages/paf-crime-more-information.page';
import { pafCrimeTransportAeroplaneDetailsPage } from '../pages/paf-crime-transport-aeroplane-details.page';
import { pafCrimeTransportBoatDetailsPage } from '../pages/paf-crime-transport-boat-details.page';
import { pafCrimeTransportBoatTypePage } from '../pages/paf-crime-transport-boat-type.page';
import { pafCrimeTransportPage } from '../pages/paf-crime-transport.page';
import { pafCrimeTransportTrainDetailsPage } from '../pages/paf-crime-transport-train-details.page';
import { pafCrimeTransportVehicleDetailsPage } from '../pages/paf-crime-transport-vehicle-details.page';
import { pafCrimeTransportVehicleTypePage } from '../pages/paf-crime-transport-vehicle-type.page';
import { pafCrimeTypePage } from '../pages/paf-crime-type.page';
import { pafCrimeWhenCrimeHappenedPage } from '../pages/paf-crime-when-crime-happened.page';
import { pafCrimeWhenWillCrimeHappenPage } from '../pages/paf-crime-when-will-crime-happen.page';
import { pafDeclarationPage } from '../pages/paf-declaration.page';
import { pafHomePage } from '../pages/paf-home.page';
import { pafOrganisationCompanyAddressPage } from '../pages/paf-organisation-company-address.page';
import { pafOrganisationCompanyAnotherCompanyPage } from '../pages/paf-organisation-company-another-company.page';
import { pafOrganisationCompanyContactPage } from '../pages/paf-organisation-company-contact.page';
import { pafOrganisationCompanyNamePage } from '../pages/paf-organisation-company-name.page';
import { pafOrganisationCompanyOtherInfoPage } from '../pages/paf-organisation-company-other-info.page';
import { pafOrganisationCompanyOwnerPage } from '../pages/paf-organisation-company-owner.page';
import { pafOrganisationCompanyTypePage } from '../pages/paf-organisation-company-type.page';
import { pafOrganisationPage } from '../pages/paf-organisation.page';
import { pafOtherInformationAnotherCrimePage } from '../pages/paf-other-information-another-crime.page';
import { pafOtherInformationFileUploadPage } from '../pages/paf-other-information-file-upload.page';
import { pafOtherInformationPage } from '../pages/paf-other-information.page';
import { pafPersonAdditionalPeoplePage } from '../pages/paf-person-additional-people.page';
import { pafPersonAddressOutsideUkPage } from '../pages/paf-person-address-outside-uk.page';
import { pafPersonAddressUkPage } from '../pages/paf-person-address-uk.page';
import { pafPersonAgePage } from '../pages/paf-person-age.page';
import { pafPersonAnythingElsePage } from '../pages/paf-person-anything-else.page';
import { pafPersonContactDetailsOutsideUkPage } from '../pages/paf-person-contact-details-outside-uk.page';
import { pafPersonContactDetailsPage } from '../pages/paf-person-contact-details.page';
import { pafPersonDobPage } from '../pages/paf-person-dob.page';
import { pafPersonGenderPage } from '../pages/paf-person-gender.page';
import { pafPersonIdPage } from '../pages/paf-person-id.page';
import { pafPersonNamePage } from '../pages/paf-person-name.page';
import { pafPersonNationalityPage } from '../pages/paf-person-nationality.page';
import { pafPersonOccupationCompanyAddressPage } from '../pages/paf-person-occupation-company-address.page';
import { pafPersonOccupationCompanyNamePage } from '../pages/paf-person-occupation-company-name.page';
import { pafPersonOccupationCompanyOwnerPage } from '../pages/paf-person-occupation-company-owner.page';
import { pafPersonOccupationDaysPage } from '../pages/paf-person-occupation-days.page';
import { pafPersonOccupationHoursPage } from '../pages/paf-person-occupation-hours.page';
import { pafPersonOccupationPage } from '../pages/paf-person-occupation.page';
import { pafPersonOccupationTypePage } from '../pages/paf-person-occupation-type.page';
import { pafPersonOccupationWherePage } from '../pages/paf-person-occupation-where.page';
import { pafPersonPlaceOfBirthPage } from '../pages/paf-person-place-of-birth.page';
import { pafPersonReportPage } from '../pages/paf-person-report.page';
import { pafPersonStudyAddressPage } from '../pages/paf-person-study-address.page';
import { pafPersonStudyContactPage } from '../pages/paf-person-study-contact.page';
import { pafPersonStudyDaysPage } from '../pages/paf-person-study-days.page';
import { pafPersonStudyHoursPage } from '../pages/paf-person-study-hours.page';
import { pafPersonStudyInstitutionOwnerPage } from '../pages/paf-person-study-institution-owner.page';
import { pafPersonStudyInTheUkPage } from '../pages/paf-person-study-in-the-uk.page';
import { pafPersonStudyNamePage } from '../pages/paf-person-study-name.page';
import { pafPersonStudyPage } from '../pages/paf-person-study.page';
import { pafPersonStudySubjectPage } from '../pages/paf-person-study-subject.page';
import { pafPersonStudyWherePage } from '../pages/paf-person-study-where.page';
import { pafPersonTransportPage } from '../pages/paf-person-transport.page';
import { pafPersonTransportVehicleDetailsPage } from '../pages/paf-person-transport-vehicle-details.page';
import { pafPersonTransportVehicleTypePage } from '../pages/paf-person-transport-vehicle-type.page';
import { pafPersonTravellingToTheUkPage } from '../pages/paf-person-travelling-to-the-uk.page';
import { pafPersonWhatTypeOfAddressIsItOutsideUkPage } from '../pages/paf-person-what-type-of-address-is-it-outside-uk.page';
import { pafPersonWhatTypeOfAddressIsItPage } from '../pages/paf-person-what-type-of-address-is-it.page';
import { pafPersonWhereIsThePersonNowPage } from '../pages/paf-person-where-is-the-person-now.page';

export type Pages = {
  basePage: basePage;
  pafHomePage: pafHomePage;
  pafCrimeTypePage: pafCrimeTypePage;
  pafCrimeChildrenPage: pafCrimeChildrenPage;
  pafCrimeWhenCrimeHappenedPage: pafCrimeWhenCrimeHappenedPage;
  pafCrimeWhenWillCrimeHappenPage: pafCrimeWhenWillCrimeHappenPage;
  pafCrimeDateTimeCrimeWillHappenPage: pafCrimeDateTimeCrimeWillHappenPage;
  pafCrimeMoreInformationPage: pafCrimeMoreInformationPage;
  pafCrimeTransportPage: pafCrimeTransportPage;
  pafCrimeTransportVehicleTypePage: pafCrimeTransportVehicleTypePage;
  pafCrimeTransportVehicleDetailsPage: pafCrimeTransportVehicleDetailsPage;
  pafCrimeTransportBoatTypePage: pafCrimeTransportBoatTypePage;
  pafCrimeTransportBoatDetailsPage: pafCrimeTransportBoatDetailsPage;
  pafCrimeTransportTrainDetailsPage: pafCrimeTransportTrainDetailsPage;
  pafCrimeTransportAeroplaneDetailsPage: pafCrimeTransportAeroplaneDetailsPage;
  pafCrimeDeliveryPage: pafCrimeDeliveryPage;
  pafCrimeLocationPage: pafCrimeLocationPage;
  pafCrimeAnotherLocationPage: pafCrimeAnotherLocationPage;
  pafPersonReportPage: pafPersonReportPage;
  pafPersonNamePage: pafPersonNamePage;
  pafPersonDobPage: pafPersonDobPage;
  pafPersonAgePage: pafPersonAgePage;
  pafPersonNationalityPage: pafPersonNationalityPage;
  pafPersonPlaceOfBirthPage: pafPersonPlaceOfBirthPage;
  pafPersonGenderPage: pafPersonGenderPage;
  pafPersonIdPage: pafPersonIdPage;
  pafPersonWhereIsThePersonNowPage: pafPersonWhereIsThePersonNowPage;
  pafPersonAddressUkPage: pafPersonAddressUkPage;
  pafPersonAddressOutsideUkPage: pafPersonAddressOutsideUkPage;
  pafPersonTravellingToTheUkPage: pafPersonTravellingToTheUkPage;
  pafPersonWhatTypeOfAddressIsItPage: pafPersonWhatTypeOfAddressIsItPage;
  pafPersonWhatTypeOfAddressIsItOutsideUkPage: pafPersonWhatTypeOfAddressIsItOutsideUkPage;
  pafPersonContactDetailsPage: pafPersonContactDetailsPage;
  pafPersonContactDetailsOutsideUkPage: pafPersonContactDetailsOutsideUkPage;
  pafPersonOccupationPage: pafPersonOccupationPage;
  pafPersonOccupationTypePage: pafPersonOccupationTypePage;
  pafPersonOccupationHoursPage: pafPersonOccupationHoursPage;
  pafPersonOccupationDaysPage: pafPersonOccupationDaysPage;
  pafPersonOccupationWherePage: pafPersonOccupationWherePage;
  pafPersonOccupationCompanyNamePage: pafPersonOccupationCompanyNamePage;
  pafPersonOccupationCompanyAddressPage: pafPersonOccupationCompanyAddressPage;
  pafPersonOccupationCompanyOwnerPage: pafPersonOccupationCompanyOwnerPage;
  pafPersonStudyPage: pafPersonStudyPage;
  pafPersonStudySubjectPage: pafPersonStudySubjectPage;
  pafPersonStudyInTheUkPage: pafPersonStudyInTheUkPage;
  pafPersonStudyHoursPage: pafPersonStudyHoursPage;
  pafPersonStudyDaysPage: pafPersonStudyDaysPage;
  pafPersonStudyWherePage: pafPersonStudyWherePage;
  pafPersonStudyNamePage: pafPersonStudyNamePage;
  pafPersonStudyAddressPage: pafPersonStudyAddressPage;
  pafPersonStudyContactPage: pafPersonStudyContactPage;
  pafPersonStudyInstitutionOwnerPage: pafPersonStudyInstitutionOwnerPage;
  pafPersonTransportPage: pafPersonTransportPage;
  pafPersonTransportVehicleTypePage: pafPersonTransportVehicleTypePage;
  pafPersonTransportVehicleDetailsPage: pafPersonTransportVehicleDetailsPage;
  pafPersonAnythingElsePage: pafPersonAnythingElsePage;
  pafPersonAdditionalPeoplePage: pafPersonAdditionalPeoplePage;
  pafAdditionalPersonNamePage: pafAdditionalPersonNamePage;
  pafAdditionalPersonDobPage: pafAdditionalPersonDobPage;
  pafAdditionalPersonAgePage: pafAdditionalPersonAgePage;
  pafAdditionalPersonNationalityPage: pafAdditionalPersonNationalityPage;
  pafAdditionalPersonGenderPage: pafAdditionalPersonGenderPage;
  pafAdditionalPersonIdPage: pafAdditionalPersonIdPage;
  pafAdditionalPersonDetailsPage: pafAdditionalPersonDetailsPage;
  pafOrganisationPage: pafOrganisationPage;
  pafOrganisationCompanyNamePage: pafOrganisationCompanyNamePage;
  pafOrganisationCompanyAddressPage: pafOrganisationCompanyAddressPage;
  pafOrganisationCompanyContactPage: pafOrganisationCompanyContactPage;
  pafOrganisationCompanyTypePage: pafOrganisationCompanyTypePage;
  pafOrganisationCompanyOwnerPage: pafOrganisationCompanyOwnerPage;
  pafOrganisationCompanyOtherInfoPage: pafOrganisationCompanyOtherInfoPage;
  pafOrganisationCompanyAnotherCompanyPage: pafOrganisationCompanyAnotherCompanyPage;
  pafOtherInformationPage: pafOtherInformationPage;
  pafOtherInformationAnotherCrimePage: pafOtherInformationAnotherCrimePage;
  pafOtherInformationFileUploadPage: pafOtherInformationFileUploadPage;
  pafAboutYouPage: pafAboutYouPage;
  pafAboutYouDoesAnyoneElseKnowPage: pafAboutYouDoesAnyoneElseKnowPage;
  pafAboutYouHaveYouReportedBeforePage: pafAboutYouHaveYouReportedBeforePage;
  pafAboutYouHowDoYouKnowThePersonPage: pafAboutYouHowDoYouKnowThePersonPage;
  pafAboutYouCanUseInfoWithoutRiskPage: pafAboutYouCanUseInfoWithoutRiskPage;
  pafAboutYouDetailsPage: pafAboutYouDetailsPage;
  pafAboutYouDobPage: pafAboutYouDobPage;
  pafAboutYouNationalityPage: pafAboutYouNationalityPage;
  pafAboutYouGenderPage: pafAboutYouGenderPage;
  pafAboutYouContactPage: pafAboutYouContactPage;
  pafAboutYouAreYouOver18Page: pafAboutYouAreYouOver18Page;
  pafCheckYourAnswersPage: pafCheckYourAnswersPage;
  pafDeclarationPage: pafDeclarationPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      pafHomePage: new pafHomePage(page),
      pafCrimeTypePage: new pafCrimeTypePage(page),
      pafCrimeChildrenPage: new pafCrimeChildrenPage(page),
      pafCrimeWhenCrimeHappenedPage: new pafCrimeWhenCrimeHappenedPage(page),
      pafCrimeWhenWillCrimeHappenPage: new pafCrimeWhenWillCrimeHappenPage(page),
      pafCrimeDateTimeCrimeWillHappenPage: new pafCrimeDateTimeCrimeWillHappenPage(page),
      pafCrimeMoreInformationPage: new pafCrimeMoreInformationPage(page),
      pafCrimeTransportPage: new pafCrimeTransportPage(page),
      pafCrimeTransportVehicleTypePage: new pafCrimeTransportVehicleTypePage(page),
      pafCrimeTransportVehicleDetailsPage: new pafCrimeTransportVehicleDetailsPage(page),
      pafCrimeTransportBoatTypePage: new pafCrimeTransportBoatTypePage(page),
      pafCrimeTransportBoatDetailsPage: new pafCrimeTransportBoatDetailsPage(page),
      pafCrimeTransportTrainDetailsPage: new pafCrimeTransportTrainDetailsPage(page),
      pafCrimeTransportAeroplaneDetailsPage: new pafCrimeTransportAeroplaneDetailsPage(page),
      pafCrimeDeliveryPage: new pafCrimeDeliveryPage(page),
      pafCrimeLocationPage: new pafCrimeLocationPage(page),
      pafCrimeAnotherLocationPage: new pafCrimeAnotherLocationPage(page),
      pafPersonReportPage: new pafPersonReportPage(page),
      pafPersonNamePage: new pafPersonNamePage(page),
      pafPersonDobPage: new pafPersonDobPage(page),
      pafPersonAgePage: new pafPersonAgePage(page),
      pafPersonNationalityPage: new pafPersonNationalityPage(page),
      pafPersonPlaceOfBirthPage: new pafPersonPlaceOfBirthPage(page),
      pafPersonGenderPage: new pafPersonGenderPage(page),
      pafPersonIdPage: new pafPersonIdPage(page),
      pafPersonWhereIsThePersonNowPage: new pafPersonWhereIsThePersonNowPage(page),
      pafPersonAddressUkPage: new pafPersonAddressUkPage(page),
      pafPersonAddressOutsideUkPage: new pafPersonAddressOutsideUkPage(page),
      pafPersonTravellingToTheUkPage: new pafPersonTravellingToTheUkPage(page),
      pafPersonWhatTypeOfAddressIsItPage: new pafPersonWhatTypeOfAddressIsItPage(page),
      pafPersonWhatTypeOfAddressIsItOutsideUkPage: new pafPersonWhatTypeOfAddressIsItOutsideUkPage(page),
      pafPersonContactDetailsPage: new pafPersonContactDetailsPage(page),
      pafPersonContactDetailsOutsideUkPage: new pafPersonContactDetailsOutsideUkPage(page),
      pafPersonOccupationPage: new pafPersonOccupationPage(page),
      pafPersonOccupationTypePage: new pafPersonOccupationTypePage(page),
      pafPersonOccupationHoursPage: new pafPersonOccupationHoursPage(page),
      pafPersonOccupationDaysPage: new pafPersonOccupationDaysPage(page),
      pafPersonOccupationWherePage: new pafPersonOccupationWherePage(page),
      pafPersonOccupationCompanyNamePage: new pafPersonOccupationCompanyNamePage(page),
      pafPersonOccupationCompanyAddressPage: new pafPersonOccupationCompanyAddressPage(page),
      pafPersonOccupationCompanyOwnerPage: new pafPersonOccupationCompanyOwnerPage(page),
      pafPersonStudyPage: new pafPersonStudyPage(page),
      pafPersonStudySubjectPage: new pafPersonStudySubjectPage(page),
      pafPersonStudyInTheUkPage: new pafPersonStudyInTheUkPage(page),
      pafPersonStudyHoursPage: new pafPersonStudyHoursPage(page),
      pafPersonStudyDaysPage: new pafPersonStudyDaysPage(page),
      pafPersonStudyWherePage: new pafPersonStudyWherePage(page),
      pafPersonStudyNamePage: new pafPersonStudyNamePage(page),
      pafPersonStudyAddressPage: new pafPersonStudyAddressPage(page),
      pafPersonStudyContactPage: new pafPersonStudyContactPage(page),
      pafPersonStudyInstitutionOwnerPage: new pafPersonStudyInstitutionOwnerPage(page),
      pafPersonTransportPage: new pafPersonTransportPage(page),
      pafPersonTransportVehicleTypePage: new pafPersonTransportVehicleTypePage(page),
      pafPersonTransportVehicleDetailsPage: new pafPersonTransportVehicleDetailsPage(page),
      pafPersonAnythingElsePage: new pafPersonAnythingElsePage(page),
      pafPersonAdditionalPeoplePage: new pafPersonAdditionalPeoplePage(page),
      pafAdditionalPersonNamePage: new pafAdditionalPersonNamePage(page),
      pafAdditionalPersonDobPage: new pafAdditionalPersonDobPage(page),
      pafAdditionalPersonAgePage: new pafAdditionalPersonAgePage(page),
      pafAdditionalPersonNationalityPage: new pafAdditionalPersonNationalityPage(page),
      pafAdditionalPersonGenderPage: new pafAdditionalPersonGenderPage(page),
      pafAdditionalPersonIdPage: new pafAdditionalPersonIdPage(page),
      pafAdditionalPersonDetailsPage: new pafAdditionalPersonDetailsPage(page),
      pafOrganisationPage: new pafOrganisationPage(page),
      pafOrganisationCompanyNamePage: new pafOrganisationCompanyNamePage(page),
      pafOrganisationCompanyAddressPage: new pafOrganisationCompanyAddressPage(page),
      pafOrganisationCompanyContactPage: new pafOrganisationCompanyContactPage(page),
      pafOrganisationCompanyTypePage: new pafOrganisationCompanyTypePage(page),
      pafOrganisationCompanyOwnerPage: new pafOrganisationCompanyOwnerPage(page),
      pafOrganisationCompanyOtherInfoPage: new pafOrganisationCompanyOtherInfoPage(page),
      pafOrganisationCompanyAnotherCompanyPage: new pafOrganisationCompanyAnotherCompanyPage(page),
      pafOtherInformationPage: new pafOtherInformationPage(page),
      pafOtherInformationAnotherCrimePage: new pafOtherInformationAnotherCrimePage(page),
      pafOtherInformationFileUploadPage: new pafOtherInformationFileUploadPage(page),
      pafAboutYouPage: new pafAboutYouPage(page),
      pafAboutYouDoesAnyoneElseKnowPage: new pafAboutYouDoesAnyoneElseKnowPage(page),
      pafAboutYouHaveYouReportedBeforePage: new pafAboutYouHaveYouReportedBeforePage(page),
      pafAboutYouHowDoYouKnowThePersonPage: new pafAboutYouHowDoYouKnowThePersonPage(page),
      pafAboutYouCanUseInfoWithoutRiskPage: new pafAboutYouCanUseInfoWithoutRiskPage(page),
      pafAboutYouDetailsPage: new pafAboutYouDetailsPage(page),
      pafAboutYouDobPage: new pafAboutYouDobPage(page),
      pafAboutYouNationalityPage: new pafAboutYouNationalityPage(page),
      pafAboutYouGenderPage: new pafAboutYouGenderPage(page),
      pafAboutYouContactPage: new pafAboutYouContactPage(page),
      pafAboutYouAreYouOver18Page: new pafAboutYouAreYouOver18Page(page),
      pafCheckYourAnswersPage: new pafCheckYourAnswersPage(page),
      pafDeclarationPage: new pafDeclarationPage(page),
    });
  },
});

export const expect = test.expect;
