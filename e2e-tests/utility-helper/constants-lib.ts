export const ConstantsLib = {
    PAF_SERVICE_NAME: 'PAF',
    TEXT: 'Text',
    FIRST_NAME: 'Firstname',
    LAST_NAME: 'Lastname',
    NICKNAME: 'Nickname',
    ADDRESS_LINE_1: '49 Sydenham Road',
    ADDRESS_LINE_2: 'Croydon',
    TOWN_OR_CITY: 'Croydon',
    COUNTY: 'Surrey',
    POSTCODE: 'CR0 2EE',
    COUNTRY: 'Poland',
    TELEPHONE: '02087364536',
    SAS_HOF_EMAIL: requiredEnv('SAS_HOF_EMAIL'),
    WEBSITE: 'https://www.example.com',
    DOB: '01/01/1980',
    FUTURE_DATE: '01/01/2099',
    TIME_HOUR: '13',
    TIME_MINUTE: '45',
} as const;


function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}