// Company data - First set
export const companies = [
  {
    id: 1,
    name: 'IQ International',
    category: 'Chemicals',
    description: 'Supplying high-quality chemicals and raw materials to industries worldwide.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Industrial Chemicals', 'Specialty Chemicals', 'Pharmaceutical Intermediates', 'Agricultural Chemicals']
  },
  {
    id: 2,
    name: 'IQ Minerals & Metals',
    category: 'Minerals',
    description: 'Global supplier of premium minerals for various industrial applications.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/SiliconCroda.jpg',
    commodities: ['Industrial Minerals', 'Rare Earth Elements', 'Silica', 'Limestone']
  },
  {
    id: 3,
    name: 'IQ Coal & Coke',
    category: 'Coal',
    description: 'Specialized in high-quality carbon materials for energy and metallurgical industries.',
    image: 'https://www.iqgroup.in/image/banner/carbon.jpg',
    commodities: ['Metallurgical Coal', 'Thermal Coal', 'Petroleum Coke', 'Carbon Additives']
  }
];

// Company data - Second set
export const companiesSecondSet = [
  {
    id: 4,
    name: 'IQ Ferro Alloys',
    category: 'Ferro Alloys',
    description: 'Leading supplier of high-quality ferro alloys for steel manufacturing and various industrial applications.',
    image: 'https://zxferroalloy.com/wp-content/uploads/2023/07/high-carbon-ferro-manganese.jpg',
    commodities: ['Ferro Silicon', 'Ferro Manganese', 'Silico Manganese', 'Ferro Chrome']
  },
  {
    id: 5,
    name: 'IQ Noble Alloys',
    category: 'Noble Alloys',
    description: 'exclusive raw material distribution company dealing in noble alloys.',
    image: 'https://www.iqgroup.in/image/banner/nobel.jpg',
    commodities: ['Ferro Titanium', 'Ferro Niobium', 'Ferro Vanadium', 'Molybdenum']
  },
  
];

// Third set of companies
export const companiesThirdSet = [
  {
    id: 7,
    name: 'IQ Angel Investments',
    category: 'Investments',
    description: 'We are a venture intended to promote investments in various types of businesses at their beginning or developmental stage. We look for ventures with dedication and desire to develop extraordinary value in the concerned industry.',
    image: 'https://www.iqgroup.in/image/banner/angel.jpg',
    commodities: ['Early Stage Startups', 'Growth Capital', 'Strategic Investments', 'Business Development']
  },
  // {
  //   id: 8,
  //   name: 'Dab WorldWide',
  //   category: 'Metals',
  //   description: 'We are an exclusive innovative product marketing company that achieves marketing supremacy for various startups, who have amazing innovative ideas and products.',
  //   image: 'https://www.iqgroup.in/image/banner/dab-worldwide.jpg',
  //   commodities: ['Product Marketing', 'Brand Strategy', 'Market Research', 'Digital Campaigns', 'Growth Hacking']
  // }
];

// Combine all companies into one array for mobile carousel
export const allCompanies = [
  ...companies,
  ...companiesSecondSet,
  ...companiesThirdSet
]; 