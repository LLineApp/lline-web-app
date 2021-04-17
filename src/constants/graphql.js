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

export const GET_PROFILE_FIELDS = function(fields){
  return gql`
  query getSomeFieldsFromProfile($token: String!) {
    getProfile(token: $token) {
      ${fields}
    }
  }
`};

export const GET_PROFILE = gql`
  query getProfileQuery($token: String!) {
    getProfile(token: $token) {
      isAdvisor 
      page
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
        txType
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

export const GET_CLIENT_PROFILE = gql`
  query getProfileQuery($token: String!, $cpf: String) {
    getProfile(token: $token, cpf: $cpf) {
      isAdvisor 
      page
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
        txType
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

export const GET_ADVISORS_PORTFOLIO = gql`
  query getAdvisorsPortfolioQuery($token: String!, $page: Int, $containing: String) {
    getAdvisorsPortfolio(token: $token, page: $page, containing: $containing) {
      totalCount
      totalPages
      currentPage
      itemsPerPage
      portfolio {
        id
        cpf
        email
        fullname
        preferredContact
      }
    }
  }
`;

export const GET_PROSPECT_PROFILE = gql`
  query getProspectProfileQuery($token: String!, $page: Int, $containing: String) {
    getProspectProfile(token: $token, page: $page, containing: $containing) {
      totalCount
      totalPages
      currentPage
      itemsPerPage
      portfolio {
        id
        cpf
        email
        fullname
      }
    }
  }
`;

export const GET_ADVISOR_LINK = gql`
  mutation setAdvisorsLink($token: String!) {
    setAdvisorsLink(token: $token) {
      advisorsLinkData {
        link
      }
    }
  }
`;

export const GET_ADVISORS = gql`
  query getAdvisorsQuery($token: String!, $page: Int, $containing: String) {
    getAdvisors(token: $token, page: $page, containing: $containing) {
      totalCount
      totalPages
      currentPage
      itemsPerPage
      advisorsList {
        id
        fullname
        cpf
        register
        company
      }
    }
  }
`;
