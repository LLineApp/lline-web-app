const state = {
  data: {
    page: 0,
    fullname: "Usuário",
    isAdvisor: false,
    additionalInfo: "",
    children: [
      {
        key: 0,
        fullname: "",
        birthdate: null,
        occupationTraining: "",
        additionalInfo: "",
      },
    ],
    cpf: "",
    email: "",
    birthdate: null,
    phones: [],
    preferredContact: "",
    acceptFinancialAdvisorContact: false,
    advisors: [{
      fullname: "",
      register: "",
      company: "",
      cpf: "",
      mainAdvisor: false,
    }],
    financialAdvisor: {
      fullname: "",
      register: "0",
      company: "",
    },
    monthlyExpenses: null,
    costsWithDependents: null,
    howMuchYouSave: null,
    debtLoans: null,
    partnerInCompany: null,
    fixedIncomeSecurities: [
      {
        key: 0,
        kind: "",
        value: null,
        tx: null,
      },
    ],
    health: "",
    immovableProperties: [
      {
        key: 0,
        description: "",
        value: 0,
        rented: false,
        funded: false,
        insuranceValue: 0,
        insuranceCompany: "",
      },
    ],
    insurances: [],
    accepted: false,
    investmentPortfolios: [
      {
        key: 0,
        kind: "",
        value: null,
        tx: null,
        txType: "Taxa fixa",
      },
    ],
    investorExperiences: [],
    currentInvestmentProcess: "",
    followEconomicNews: null,
    acceptsInfoAboutCourses: null,
    haveFinancialConcerns: null,
    maritalStatus: "",
    maritalHowManyYears: null,
    spouseName: "",
    spouseOccupation: "",
    parentsAreThemSupportedByYou: false,
    parentsHowMuchYouSuportThem: 0.0,
    parentsIsThereAPossibilityOfInheritance: false,
    parentsOfWhom: "",
    parentsWhatIsTheEstimatedValue: 0.0,
    personalPrivateSecurities: [
      {
        key: 0,
        bank: "",
        enterprise: false,
        cooperative: false,
        survival: "",
        table: "",
        balance: null,
      },
    ],
    plansAndProjects: "",
    occupation: "",
    role: "",
    companyName: "",
    businessPhones: "",
    businessEmail: "",
    businessKind: "",
    businessField: "",
    incomeTaxDeclarationType: "",
    companyHasPrivateInsurance: false,
    socialSecurityValue: null,
    privateSecurityYourValue: null,
    privateSecurityCompanyValue: null,
    privateSecurityCurrentBalance: null,
  },
};

const mutations = {
  updateProfileData(state, payload) {
    Object.assign(state.data, payload.updates);
  },
};

const actions = {
  updateProfileData({ commit }, payload) {
    commit("updateProfileData", payload);
  },
};

const getters = {
  profileData: (state) => {
    return state.data;
  },
};

export const profileData = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
