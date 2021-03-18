import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation($cpf: String!, $password: String!) {
    createUser(cpf: $cpf, password: $password) {
      user {
        id
        cpf
      }
    }
  }
`;

export const TOKEN_AUTH_MUTATION = gql`
  mutation TokenAuthMutation($cpf: String!, $password: String!) {
    tokenAuth(cpf: $cpf, password: $password) {
      token
    }
  }
`;

export const SET_PROFILE = gql`
  mutation setProfile($token: String!, $profileData: ProfileInput!) {
    setProfile(token: $token, profileData: $profileData) {
      profile {
        id
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfileQuery($token: String!) {
    getProfile(token: $token) {
      id
      cpf
      email
      fullname
      birthdate
      preferredContact
      maritalStatus
      maritalHowManyYears
      spouseName
      spouseOccupation
      parentsAreThemSupportedByYou
      parentsHowMuchYouSuportThem
      parentsIsThereAPossibilityOfInheritance
      parentsOfWhom
      parentsWhatIsTheEstimatedValue
      occupation
      role
      companyName
      businessPhones
      businessEmail
      businessKind
      businessField
      companyHasPrivateInsurance
      socialSecurityValue
      privateSecurityYourValue
      privateSecurityCompanyValue
      privateSecurityCurrentBalance
      incomeTaxDeclarationType
      monthlyExpenses
      costsWithDependents
      howMuchYouSave
      debtLoans
      partnerInCompany
      health
      plansAndProjects
      currentInvestmentProcess
      followEconomicNews
      acceptsInfoAboutCourses
      haveFinancialConcerns
      additionalInfo
      portfolioIncome
      financialAdvisor {
        id
      }
      acceptFinancialAdvisorContact
      phones
      children {
        fullname
        birthdate
        occupationTraining
        additionalInfo
      }
      immovableProperties {
        description
        value
        rented
        funded
        insuranceValue
        insuranceCompany
      }
      investorExperiences {
        kind
        value
      }
      insurances {
        kind
        value
        monthlyFee
        coverage
        company
      }
      investmentPortfolios {
        kind
        value
        tx
      }
      personalPrivateSecurities {
        bank
        enterprise
        cooperative
        survival
        table
        balance
      }
      fixedIncomeSecurities {
        kind
        value
        tx
      }
    }
  }
`;

export const GET_ADVISOR_BY_LINK = gql`
  mutation setAdvisorsLink($token: String!, $link: String) {
    setAdvisorsLink(token: $token, link: $link) {
      advisorsLinkData {
        advisor {
          id
          fullname
          register
          company
          cpf
        }
      }
    }
  }
`;
