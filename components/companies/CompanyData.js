// Company data - First set
export const companies = [
  {
    id: 1,
    name: 'IQ International',
    category: 'Chemical',
    description: 'Supplying high-quality chemicals and raw materials to industries worldwide.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Industrial Chemicals', 'Specialty Chemicals', 'Pharmaceutical Intermediates', 'Agricultural Chemicals']
  },
  {
    id: 2,
    name: 'IQ Minerals & Metals',
    category: 'Minerals and Metals',
    description: 'Global supplier of premium minerals and metals for various industrial applications.',
    image: 'https://images.unsplash.com/photo-1605559911160-e31bfb0875b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Precious Metals', 'Base Metals', 'Industrial Minerals', 'Rare Earth Elements']
  },
  {
    id: 3,
    name: 'IQ Coal & Coke',
    category: 'Carbon Materials',
    description: 'Specialized in high-quality carbon materials for energy and metallurgical industries.',
    image: 'https://images.unsplash.com/photo-1617770187085-acfdcaa932f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
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
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    commodities: ['Ferro Silicon', 'Ferro Manganese', 'Silico Manganese', 'Ferro Chrome']
  },
  {
    id: 5,
    name: 'IQ Noble Alloys',
    category: 'Noble Alloys',
    description: 'Specialized in manufacturing and supplying premium noble alloys for advanced technological applications.',
    image: 'https://images.unsplash.com/photo-1594737959857-b9ee1667af9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    commodities: ['Titanium Alloys', 'Nickel Alloys', 'Cobalt Alloys', 'Platinum Group Metals']
  },
  {
    id: 6,
    name: 'IQ Green Energy',
    category: 'Renewable Energy Solutions',
    description: 'Providing sustainable energy solutions with cutting-edge technology and innovative designs.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    commodities: [
      'UE 42 plus / 5.1 KW',
      'UE 42 / 4.2 KW',
      'UE 33 / 3.3 KW',
      'UE 15 Plus / 1.8 KW',
      'UE 15 / 1.5 KW',
      'UE 6 / 650 W'
    ]
  }
];

// Third set of companies
export const companiesThirdSet = [
  {
    id: 7,
    name: 'IQ Angel Investments',
    category: 'Venture Capital',
    description: 'We are a venture intended to promote investments in various types of businesses at their beginning or developmental stage. We look for ventures with dedication and desire to develop extraordinary value in the concerned industry.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80',
    commodities: ['Early Stage Startups', 'Growth Capital', 'Strategic Investments', 'Business Development']
  },
  {
    id: 8,
    name: 'Dab WorldWide',
    category: 'Marketing & Innovation',
    description: 'We are an exclusive innovative product marketing company that achieves marketing supremacy for various startups, who have amazing innovative ideas and products.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    commodities: ['Product Marketing', 'Brand Strategy', 'Market Research', 'Digital Campaigns', 'Growth Hacking']
  }
];

// Combine all companies into one array for mobile carousel
export const allCompanies = [
  ...companies,
  ...companiesSecondSet,
  ...companiesThirdSet
]; 