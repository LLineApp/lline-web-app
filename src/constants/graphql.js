import gql from 'graphql-tag'

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery($first: Int, $skip: Int, $orderBy: LinkOrderBy) {
    allLinks(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
    _allLinksMeta {
      count
    }
  }
`

export const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(filter: {
      OR: [{
        url_contains: $searchText
      }, {
        description_contains: $searchText
      }]
    }) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(
      description: $description,
      url: $url,
      postedById: $postedById
    ) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation ($cpf: String!, $password: String!) {
    createUser (cpf: $cpf, password: $password) {
      user {
        id
        cpf
      }
    }
  }
`

export const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    Link(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    Vote(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`
export const TOKEN_AUTH_MUTATION = gql`
  mutation TokenAuthMutation($cpf: String!, $password: String!) {
    tokenAuth(
      cpf: $cpf,
      password: $password
    ) {
      token
    }
  }
`

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
`
