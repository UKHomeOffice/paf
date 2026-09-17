import { basePage } from './base-page';
import * as path from 'path';
import { Locator, Page } from '@playwright/test';

export class pafOtherInformationFileUploadPage extends basePage {
  readonly expectedPageTitle = 'Please attach any documents which may help us investigate this crime';
  readonly pageHeading = this.headerText;
  private readonly uploadFile = path.join(__dirname, '..', 'test-data', 'VPN_Guide_7.36MB.pdf');

  async answerFileUpload1() { await this.uploadFiles(1); }
  async answerFileUpload2() { await this.uploadFiles(2); }
  async answerFileUpload3() { await this.uploadFiles(3); }

  private async uploadFiles(totalUploads: number) {
    for (let uploadIndex = 1; uploadIndex <= totalUploads; uploadIndex += 1) {
      await this.page.locator('#other-info-file-upload').setInputFiles(this.uploadFile);
      await this.clickContinueButton();
      await this.selectAndContinue(uploadIndex === totalUploads ? 'No' : 'Yes');
    }
  }
}


