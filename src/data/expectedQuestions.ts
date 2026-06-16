export type ExpectedQuestion = {
  num: number;
  q: string;
  answer: string;
};

export type ExpectedQuestionSection = {
  id: string;
  titleAr: string;
  titleEn: string;
  questions: ExpectedQuestion[];
};

export const EXPECTED_QUESTION_SECTIONS: ExpectedQuestionSection[] = [
  {
    id: 'abbreviations',
    titleAr: 'اختصارات',
    titleEn: 'Abbreviations',
    questions: [
      { num: 1, q: 'Power supply converts 115V AC or 220V AC into what?', answer: '3.3V DC, 5V DC, 12V DC' },
      { num: 2, q: 'CPU stands for?', answer: 'Central Processing Unit' },
      { num: 3, q: 'RAM stands for?', answer: 'Random Access Memory' },
      { num: 4, q: 'ROM stands for?', answer: 'Read Only Memory' },
      { num: 5, q: 'CMOS stands for?', answer: 'Complementary Metal Oxide Semiconductor' },
      { num: 6, q: 'POST stands for?', answer: 'Power On Self Test' },
      { num: 7, q: 'HDD stands for?', answer: 'Hard Disk Drive' },
      { num: 8, q: 'SSD stands for?', answer: 'Solid State Drive' },
      { num: 9, q: 'BIOS stands for?', answer: 'Basic Input/Output System' },
      { num: 10, q: 'HDMI stands for?', answer: 'High Definition Multimedia Interface' },
    ],
  },
  {
    id: 'conversions',
    titleAr: 'التحويلات — مهمة جدًا',
    titleEn: 'Conversions — very important',
    questions: [
      { num: 11, q: 'Convert decimal 60 to binary.', answer: '111100' },
      { num: 12, q: 'Convert decimal 56 to binary.', answer: '111000' },
      { num: 13, q: 'Convert decimal 35 to binary.', answer: '100011' },
      { num: 14, q: 'Convert decimal 48 to binary.', answer: '110000' },
      { num: 15, q: 'Convert decimal 71 to binary.', answer: '1000111' },
      { num: 16, q: 'Convert decimal 99 to binary.', answer: '1100011' },
      { num: 17, q: 'Convert binary 11100 to decimal.', answer: '28' },
      { num: 18, q: 'Convert binary 11001110 to decimal.', answer: '206' },
      { num: 19, q: 'Convert binary 00001100 to decimal.', answer: '12' },
      { num: 20, q: 'Convert binary 00011110 to decimal.', answer: '30' },
      { num: 21, q: 'Convert hexadecimal 4B to binary.', answer: '1001011' },
      { num: 22, q: 'Convert hexadecimal 4F to binary.', answer: '1001111' },
      { num: 23, q: 'Convert decimal 255 to hexadecimal.', answer: 'FF' },
      { num: 24, q: 'In hexadecimal, A-F system is used in which number system?', answer: 'Hexadecimal' },
      { num: 25, q: 'For decimal to binary conversion, the number is divided by?', answer: '2' },
    ],
  },
  {
    id: 'components',
    titleAr: 'مكونات الكمبيوتر',
    titleEn: 'Computer components',
    questions: [
      { num: 26, q: 'Which part of the CPU does math operations?', answer: 'ALU / Arithmetic and Logic Unit' },
      { num: 27, q: 'Which component is considered the brain of the computer?', answer: 'CPU' },
      { num: 28, q: 'Which component is called the spine of the computer?', answer: 'Motherboard' },
      { num: 29, q: 'What does the motherboard do?', answer: 'Connects all computer components' },
      { num: 30, q: 'Which component stores BIOS settings?', answer: 'CMOS' },
      { num: 31, q: 'Which memory loses data when power is off?', answer: 'RAM' },
      { num: 32, q: 'Which memory is non-volatile?', answer: 'ROM' },
      { num: 33, q: 'Which memory is used in laptops?', answer: 'SO-DIMM' },
      { num: 34, q: 'DIMM is mainly used in?', answer: 'Desktop computers' },
      { num: 35, q: 'SODIMM stands for?', answer: 'Small Outline DIMM' },
    ],
  },
  {
    id: 'storage',
    titleAr: 'Storage / Disk',
    titleEn: 'Storage / Disk',
    questions: [
      { num: 36, q: 'What is the main purpose of a storage device?', answer: 'To store programs and data until needed' },
      { num: 37, q: 'What is the physical component where data is stored in HDD?', answer: 'Platter' },
      { num: 38, q: 'What is the basic storage unit used in drives?', answer: 'Sector' },
      { num: 39, q: 'Which storage device uses magnetic disks?', answer: 'HDD' },
      { num: 40, q: 'Which is generally more expensive, HDD or SSD?', answer: 'SSD' },
      { num: 41, q: 'Which is heavier, HDD or SSD?', answer: 'HDD' },
    ],
  },
  {
    id: 'boot',
    titleAr: 'Boot / BIOS / Troubleshooting',
    titleEn: 'Boot / BIOS / Troubleshooting',
    questions: [
      { num: 42, q: 'Which key is commonly used to enter BIOS/UEFI?', answer: 'Del or F2' },
      { num: 43, q: 'What is the first process in the boot sequence?', answer: 'POST' },
      { num: 44, q: 'Which process loads the operating system into memory?', answer: 'Booting' },
      { num: 45, q: 'If "Missing Operating System" appears, what is the likely cause?', answer: 'Incorrect boot order or disconnected drive' },
      { num: 46, q: 'First step when troubleshooting hardware problem?', answer: 'Identify and define the problem' },
      { num: 47, q: 'Continuous system reboots are often caused by?', answer: 'Faulty drivers or incorrect configurations' },
      { num: 48, q: 'Blue Screen of Death often means check which component first?', answer: 'RAM' },
    ],
  },
  {
    id: 'networking',
    titleAr: 'Networking / Security',
    titleEn: 'Networking / Security',
    questions: [
      { num: 49, q: 'What is the function of a firewall?', answer: 'Monitor and control incoming and outgoing network traffic' },
      { num: 50, q: 'What is the main function of a router?', answer: 'Route data packets between different networks' },
    ],
  },
];

export const MEMORIZE_CONVERSIONS = [
  '60 = 111100',
  '56 = 111000',
  '35 = 100011',
  '48 = 110000',
  '71 = 1000111',
  '99 = 1100011',
  '11001110 = 206',
  '00001100 = 12',
  '00011110 = 30',
  '255 = FF',
] as const;
