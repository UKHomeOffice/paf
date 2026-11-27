import { basePage } from './base-page';

export class pafAdditionalPersonDetailsPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Additional People – GOV.UK"
      : "Additional People – GOV.UK";
  }
}
