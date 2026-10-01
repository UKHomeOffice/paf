import { pafPersonAgePage } from './paf-person-age.page';

export class pafAdditionalPersonAgePage extends pafPersonAgePage {
  readonly expectedPageTitle = "What is the person's approximate age?";
  readonly pageHeading = this.headerText;
}
