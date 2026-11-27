import { basePage } from './base-page';
import { ConstantsLib } from '../utility-helper/constants-lib';

export class pafOtherInformationFileUploadPage extends basePage {
  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? "Error: Please attach any documents which may help us investigate this crime – GOV.UK"
      : "Please attach any documents which may help us investigate this crime – GOV.UK";
  }
  readonly pageHeading = this.headerText;

  async answerAttachments(value: string) {
    await this.assertPageTitle(await this.expectedPageTitle());

    switch (value.toLowerCase()) {
      case '1':
        return this.uploadFiles(1, ConstantsLib.UPLOAD_FILE);
      case '2':
        return this.uploadFiles(2, ConstantsLib.UPLOAD_FILE);
      case '3':
        return this.uploadFiles(3, ConstantsLib.UPLOAD_FILE);
      case 'none':
        return this.clickContinueButton();
      default:
        throw new Error(`Invalid document type: ${value}`);
    }
  }

  private async uploadFiles(totalUploads: number, filePath: string) {
    for (let uploadIndex = 1; uploadIndex <= totalUploads; uploadIndex += 1) {
      await this.page.locator('#other-info-file-upload').setInputFiles(filePath);
      await this.clickContinueButton();
      await this.selectAndContinue(uploadIndex === totalUploads ? 'No' : 'Yes');
    }
  }
}
