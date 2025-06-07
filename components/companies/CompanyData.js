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
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200',
    commodities: ['Precious Metals', 'Base Metals', 'Industrial Minerals', 'Rare Earth Elements']
  },
  {
    id: 3,
    name: 'IQ Coal & Coke',
    category: 'Carbon Materials',
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
    image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200',
    commodities: ['Ferro Silicon', 'Ferro Manganese', 'Silico Manganese', 'Ferro Chrome']
  },
  {
    id: 5,
    name: 'IQ Noble Alloys',
    category: 'Noble Alloys',
    description: 'Specialized in manufacturing and supplying premium noble alloys for advanced technological applications.',
    image: 'https://www.iqgroup.in/image/banner/nobel.jpg',
    commodities: ['Titanium Alloys', 'Nickel Alloys', 'Cobalt Alloys', 'Platinum Group Metals']
  },
  {
    id: 6,
    name: 'IQ Green Energy',
    category: 'Renewable Energy Solutions',
    description: 'Providing sustainable energy solutions with cutting-edge technology and innovative designs.',
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200',
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
    image: 'https://www.iqgroup.in/image/banner/angel.jpg',
    commodities: ['Early Stage Startups', 'Growth Capital', 'Strategic Investments', 'Business Development']
  },
  {
    id: 8,
    name: 'Dab WorldWide',
    category: 'Marketing & Innovation',
    description: 'We are an exclusive innovative product marketing company that achieves marketing supremacy for various startups, who have amazing innovative ideas and products.',
    image: 'https://www.iqgroup.in/image/banner/dab-worldwide.jpg',
    commodities: ['Product Marketing', 'Brand Strategy', 'Market Research', 'Digital Campaigns', 'Growth Hacking']
  }
];

// Combine all companies into one array for mobile carousel
export const allCompanies = [
  ...companies,
  ...companiesSecondSet,
  ...companiesThirdSet
]; 