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
        cpf
        page
      }
    }
  }
`;

export const GET_PROFILE_FIELDS = function(fields) {
  return gql`
  query getSomeFieldsFromProfile($token: String!) {
    getProfile(token: $token) {
      ${fields}
    }
  }
`;
};

export const GET_PROFILE = gql`
  query getProfileQuery($token: String!) {
    getProfile(token: $token) {
      isAdvisor
      level
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
      advisors {
        id
        fullname
        register
        company
        cpf
        mainAdvisor
      }
      lifeLine {
        masterLine {
          periods
          amount
        }
      }
    }
  }
`;

export const GET_CLIENT_PROFILE = gql`
  query getProfileQuery($token: String!, $cpf: String) {
    getProfile(token: $token, cpf: $cpf) {
      isAdvisor
      level
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
      advisors {
        id
        fullname
        register
        company
        cpf
        mainAdvisor
      }
      lifeLine {
        masterLine {
          periods
          amount
        }
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
  query getAdvisorsPortfolioQuery(
    $token: String!
    $page: Int
    $containing: String
  ) {
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

export const GET_ANY_PROFILE = gql`
  query getAnyProfileQuery($token: String!, $containing: String!) {
    getAnyProfile(token: $token, containing: $containing) {
      totalCount
      profiles {
        id
        email
        cpf
        fullname
      }
    }
  }
`;

export const GET_PROSPECT_PROFILE = gql`
  query getProspectProfileQuery(
    $token: String!
    $page: Int
    $containing: String
  ) {
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

export const ADD_ADVISOR_TO_CLIENT = gql`
  mutation addAdvisorToProfileMutation(
    $token: String!
    $profile_id: Int
    $advisor_id: Int
  ) {
    addAdvisorToProfile(
      token: $token
      advisorId: $advisor_id
      profileId: $profile_id
    ) {
      message {
        id
        text
      }
    }
  }
`;

export const REMOVE_ADVISOR_FROM_PROFILE = gql`
  mutation removeAdvisorFromProfileMutation(
    $token: String!
    $profile_id: Int
    $advisor_id: Int
  ) {
    removeAdvisorFromProfile(
      token: $token
      advisorId: $advisor_id
      profileId: $profile_id
    ) {
      message {
        id
        text
      }
    }
  }
`;

export const CHANGE_MAIN_ADVISOR_OF_PROFILE = gql`
  mutation changeMainAdvisorOfProfileMutation(
    $token: String!
    $profile_id: Int
    $advisor_id: Int
  ) {
    changeMainAdvisorOfProfile(
      token: $token
      advisorId: $advisor_id
      profileId: $profile_id
    ) {
      message {
        id
        text
      }
    }
  }
`;

export const GET_ADVISOR_PORTFOLIO_BY_CPF = gql`
  query getClientsPortfolioFromAdvisorQuery(
    $token: String!
    $cpf: String
    $containing: String
  ) {
    getClientsPortfolioFromAdvisor(
      token: $token
      cpf: $cpf
      containing: $containing
    ) {
      portfolio {
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
        businessEmail
        businessKind
        businessField
        businessPhones
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
          fullname
          register
          company
          cpf
        }
        acceptFinancialAdvisorContact
        page
      }
      advisors {
        id
        fullname
        register
        company
        cpf
        mainAdvisor
      }
      lifeLine {
        masterLine {
          periods
          amount
        }
      }
    }
  }
`;
