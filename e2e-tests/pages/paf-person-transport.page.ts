import { basePage } from './base-page';

export class pafPersonTransportPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Does the person own a car or other vehicle? – GOV.UK"
      : "Does the person own a car or other vehicle? – GOV.UK";
  }

  async answerPersonOwnsVehicle(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());
    await this.answerYesNoUnknown(value);
  }
}
