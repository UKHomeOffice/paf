import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class pafOtherInformationFileUploadPage extends basePage {
  readonly expectedPageTitle = 'Please attach any documents which may help us investigate this crime';
  readonly pageHeading = this.headerText;

  async answerAttachments(value: string) {
    await this.assertPageTitle(this.expectedPageTitle);

    switch (value.toLowerCase()) {
      case '1':
        return this.answerFileUpload1(c.UPLOAD_FILE);
      case '2':
        return this.answerFileUpload2(c.UPLOAD_FILE);
      case '3':
        return this.answerFileUpload3(c.UPLOAD_FILE);
      case 'none':
        return this.clickContinueButton();
      default:
        throw new Error(`Invalid document type: ${value}`);
    }
  }

  async answerFileUpload1(filePath: string) {
    await this.uploadFiles(1, filePath);
  }
  async answerFileUpload2(filePath: string) {
    await this.uploadFiles(2, filePath);
  }
  async answerFileUpload3(filePath: string) {
    await this.uploadFiles(3, filePath);
  }

  private async uploadFiles(totalUploads: number, filePath: string) {
    for (let uploadIndex = 1; uploadIndex <= totalUploads; uploadIndex += 1) {
      await this.page.locator('#other-info-file-upload').setInputFiles(filePath);
      await this.clickContinueButton();
      await this.selectAndContinue(uploadIndex === totalUploads ? 'No' : 'Yes');
    }
  }
}
