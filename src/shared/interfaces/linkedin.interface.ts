export interface ILinkedInApi {
  LiteProfile: ILiteProfile;
}

export interface ILiteProfile {
  localizedLastName: string;
  profilePicture: {
    displayImage: string;
  };
  firstName: {
    localized: {
      en_US: string;
    };
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  lastName: {
    localized: {
      en_US: string;
    };
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  id: string;
  localizedFirstName: string;
}

export interface ILinkedInEmailAddress {
  elements: Array<{
    handle: string;
    type: string;
    'handle~': {
      emailAddress: string;
      primary: boolean;
    };
  }>;
}
