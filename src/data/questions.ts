export type McqQuestion = {
  q: string;
  a: number;
} & (
  | { tf: boolean; o?: string[] }
  | { o: string[]; tf?: never }
);

export const ALL_QUESTIONS: McqQuestion[] = [
  {
    "q": "Power supply converts 115 V AC or 220 V AC into _____.",
    "o": [
      "3V DC, 4.3V DC, 5V DC",
      "5.3V DC, 6V DC, 14V DC",
      "1V DC, 2.3V DC, 3V DC",
      "3.3V DC, 5V DC, 12V DC"
    ],
    "a": 3
  },
  {
    "q": "_______ are attached to a computer to expand its capabilities.",
    "o": [
      "Audio Devices",
      "Peripheral Devices",
      "Communication Devices",
      "Video Devices"
    ],
    "a": 1
  },
  {
    "q": "When a computer powers on but there is no display and no POST beep, which issue could be related to the processor?",
    "o": [
      "Faulty CPU installation or missing thermal paste",
      "Faulty keyboard connection",
      "Corrupted operating system",
      "Loose monitor cable"
    ],
    "a": 0
  },
  {
    "q": "Which device allows you to enter data and instructions into a computer?",
    "o": [
      "CPU",
      "Input device",
      "ALU",
      "Output device"
    ],
    "a": 1
  },
  {
    "q": "CMOS stands for ____",
    "o": [
      "Complementary Metal Oxide Semiconductor",
      "Converted Metal Oxide System",
      "Converted Metal Oxide Semiconductor",
      "Complementary Metal Oxide System"
    ],
    "a": 0
  },
  {
    "q": "Conversion of decimal number 60 to its binary number equivalent is",
    "o": [
      "111000",
      "111100",
      "110011",
      "111101"
    ],
    "a": 1
  },
  {
    "q": "A laptop powers on but the screen remains dark even though you can faintly see the desktop under a light. What is the most likely cause?",
    "o": [
      "Faulty hard drive",
      "Broken motherboard",
      "Defective backlight or inverter",
      "Corrupted video driver"
    ],
    "a": 2
  },
  {
    "q": "In the CPU, which of the following is responsible for doing math?",
    "o": [
      "Control Unit",
      "Arithmetic and Logical Unit",
      "User",
      "Output"
    ],
    "a": 1
  },
  {
    "q": "The two widely used forms of modern RAM are _____.",
    "o": [
      "CD RAM and Parallel RAM",
      "Parallel RAM and Static RAM",
      "Electronic RAM and Dynamic RAM",
      "Static RAM and Dynamic RAM"
    ],
    "a": 3
  },
  {
    "q": "A-F system is used in which of the following number systems?",
    "o": [
      "Octal",
      "Decimal",
      "Binary",
      "Hexa-Decimal"
    ],
    "a": 3
  },
  {
    "q": "Memory Physical slots SODIMM stands for _____.",
    "o": [
      "Sign Over DIMM",
      "Solid Outline DIMM",
      "Small Outline DIMM",
      "Small Over DIMM"
    ],
    "a": 2
  },
  {
    "q": "Which one is based on semiconductor?",
    "o": [
      "None of the choices",
      "CD",
      "Floppy",
      "Flash"
    ],
    "a": 3
  },
  {
    "q": "For converting a number in decimal to binary, remainders are recorded after successive division by:",
    "o": [
      "10",
      "3",
      "2",
      "11"
    ],
    "a": 2
  },
  {
    "q": "The decimal equivalent of 11100 is",
    "o": [
      "30",
      "27",
      "29",
      "28"
    ],
    "a": 3
  },
  {
    "q": "Convert (56)10 into a binary number",
    "o": [
      "101001",
      "111001",
      "101000",
      "111000"
    ],
    "a": 3
  },
  {
    "q": "What is the primary function of an output device?",
    "o": [
      "Input data into the computer",
      "Store data for future use",
      "Display or present data to the user",
      "Transfer data between devices"
    ],
    "a": 2
  },
  {
    "q": "Which of the following is the binary equivalent of the decimal number 35?",
    "o": [
      "100101",
      "100011",
      "100001",
      "100010"
    ],
    "a": 1
  },
  {
    "q": "Which of the following falls under SDRAM?",
    "o": [
      "DIMM",
      "RAM",
      "DDR4",
      "ROM"
    ],
    "a": 2
  },
  {
    "q": "HDD stands for _____.",
    "o": [
      "Has Drive Disk",
      "Hard Drive Disk",
      "Has Disk Drive",
      "Hard Disk Drive"
    ],
    "a": 3
  },
  {
    "q": "Which of the following is NOT a benefit of laptop design?",
    "o": [
      "Portability",
      "Desktop replacement",
      "Processor Performance",
      "Built-in touchpad"
    ],
    "a": 2
  },
  {
    "q": "DIMM stands for _____.",
    "o": [
      "Dual Inline Memory Module",
      "Design Inline Memory Money",
      "Dynamin Inline Memory Money",
      "Drive Inline Memory Module"
    ],
    "a": 0
  },
  {
    "q": "Which of the following is NOT a positional number system?",
    "o": [
      "Octal Number System",
      "Hexadecimal Number System",
      "Roman Number System",
      "Binary Number System"
    ],
    "a": 2
  },
  {
    "q": "What will be the decimal equivalent for binary number 11001110?",
    "o": [
      "135",
      "206",
      "115",
      "200"
    ],
    "a": 1
  },
  {
    "q": "Convert decimal to binary (48)10",
    "o": [
      "101001",
      "111001",
      "101000",
      "110000"
    ],
    "a": 3
  },
  {
    "q": "Impact printers create pictures and figures by:",
    "o": [
      "Striking a ribbon or paper",
      "Without any connections",
      "Laser",
      "Heat and pressure"
    ],
    "a": 0
  },
  {
    "q": "A device that allows users to feed data into a computer and give commands is called _____.",
    "o": [
      "Memory",
      "Output device",
      "Input device",
      "Both Input and Output"
    ],
    "a": 2
  },
  {
    "q": "What is the unit of power?",
    "o": [
      "Hertz",
      "Watts",
      "Volts",
      "Coulomb"
    ],
    "a": 1
  },
  {
    "q": "Which part of the computer fetches, decodes, and executes the programming instructions?",
    "o": [
      "Printer",
      "Case",
      "PC",
      "Central Processing Unit"
    ],
    "a": 3
  },
  {
    "q": "SSD stands for _____.",
    "o": [
      "Solid Solide Drive",
      "State State Drive",
      "State Solide Drive",
      "Solid State Drive"
    ],
    "a": 3
  },
  {
    "q": "The main ATX motherboard power connector typically consists of ______ pins.",
    "o": [
      "22",
      "23",
      "24",
      "20"
    ],
    "a": 2
  },
  {
    "q": "How is the size of RAM normally measured nowadays?",
    "o": [
      "In MB",
      "In GB",
      "In KB",
      "With a tape measure"
    ],
    "a": 1
  },
  {
    "q": "What kind of peripheral device is a hard disk drive?",
    "o": [
      "Storage device",
      "Printer",
      "Input device",
      "Output device"
    ],
    "a": 0
  },
  {
    "q": "RAM stands for _____.",
    "o": [
      "Read Only Memory",
      "Random Access Memory",
      "Random Analogue Memory",
      "Random Origin Memory"
    ],
    "a": 1
  },
  {
    "q": "______ are output devices.",
    "o": [
      "Barcode Reader and Scanner",
      "Printer and Speaker",
      "Monitor and Microphone",
      "Touchpad and Printer"
    ],
    "a": 1
  },
  {
    "q": "Which laptop input device is a flat surface you slide across with your finger to control the cursor?",
    "o": [
      "Point stick",
      "Mouse",
      "Trackball",
      "Touchpad"
    ],
    "a": 3
  },
  {
    "q": "ROM stands for _____.",
    "o": [
      "Read Origin Memory",
      "Random Access Memory",
      "Read Only Memory",
      "Random Origin Memory"
    ],
    "a": 2
  },
  {
    "q": "______ is used to provide power for internal disk drives.",
    "o": [
      "Molex connector",
      "SATA connector",
      "HDMI cable",
      "USB drive"
    ],
    "a": 0
  },
  {
    "q": "POST stands for",
    "o": [
      "Power On Self Test",
      "Power On Switch Turnoff",
      "Problem On Self Test",
      "Power On Switch Turn-on"
    ],
    "a": 0
  },
  {
    "q": "It can accept and calculate two independent sets of instructions simultaneously",
    "o": [
      "Simulation",
      "Hyper threading",
      "Throttling",
      "Single process system"
    ],
    "a": 1
  },
  {
    "q": "What is the main disadvantage of an integrated system board?",
    "o": [
      "It is difficult to upgrade RAM modules",
      "It consumes more power than modular boards",
      "When one component fails, the entire board must be replaced",
      "It requires external cooling for stability"
    ],
    "a": 2
  },
  {
    "q": "Which of the following statements about CPU cache is true?",
    "o": [
      "L2 cache has higher priority than L1 cache",
      "L1 cache has higher priority than L2 cache",
      "Both L1 and L2 cache must be located outside the CPU",
      "L2 cache must be located inside the CPU"
    ],
    "a": 1
  },
  {
    "q": "The process by which the processor slows down to conserve power is officially called:",
    "o": [
      "Disengaging",
      "Under-clocking",
      "Throttling",
      "Cooling"
    ],
    "a": 2
  },
  {
    "q": "If the OS fails to load and displays 'Missing Operating System' error, what is the most likely cause?",
    "o": [
      "Incorrect boot order or disconnected drive",
      "Faulty power supply",
      "Defective keyboard",
      "CPU overheating"
    ],
    "a": 0
  },
  {
    "q": "Which of the following interfaces allows audio to be sent over the same cabling as video?",
    "o": [
      "Composite",
      "HDMI",
      "DVI",
      "VGA"
    ],
    "a": 1
  },
  {
    "q": "Which statement correctly describes the difference between Server OS and Desktop OS?",
    "o": [
      "None of the choices",
      "Both provide identical services",
      "A Server OS provides network and data services to clients",
      "A Desktop OS provides network and data services to clients"
    ],
    "a": 2
  },
  {
    "q": "Which of the following represents the two main categories of computer cables?",
    "o": [
      "VGA cable and DVI cable",
      "Ethernet cable and SATA cable",
      "DC cable and AC cable",
      "Data cable and Power cable"
    ],
    "a": 3
  },
  {
    "q": "Which computer component houses bays, slots, and connectors for drives, circuit boards, and I/O devices?",
    "o": [
      "Computer Case",
      "Printer",
      "Central Processing Unit",
      "Operating System"
    ],
    "a": 0
  },
  {
    "q": "What is the primary function of a modem?",
    "o": [
      "To convert digital signals to analog and vice versa for Internet communication",
      "To store Internet browsing history",
      "To manage wired LAN connections",
      "To encrypt data before storage"
    ],
    "a": 0
  },
  {
    "q": "What is the basic storage unit used in drives?",
    "o": [
      "None of the other choices",
      "Security",
      "Booting process",
      "Sector"
    ],
    "a": 3
  },
  {
    "q": "Which of the following is true about the clock speed?",
    "o": [
      "Clock speed is determined by the CPU seller",
      "Clock speed is determined by the CPU user",
      "Clock speed is determined by the system administrator",
      "Clock speed is determined by the CPU manufacturer"
    ],
    "a": 3
  },
  {
    "q": "All data-handling components and optional data devices are connected to the external data bus.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Which of the following will you require to hear music on your computer?",
    "o": [
      "Video Card",
      "Joy Stick",
      "Mouse",
      "Sound Card"
    ],
    "a": 3
  },
  {
    "q": "Which of these is the speed of the CPU?",
    "o": [
      "Internal clock speed",
      "External clock speed",
      "System bus speed",
      "FSB"
    ],
    "a": 0
  },
  {
    "q": "How are SODIMMs installed on a laptop?",
    "o": [
      "On a 90-degree angle",
      "By pressing straight down",
      "On a 45-degree angle",
      "Into a ZIF socket"
    ],
    "a": 2
  },
  {
    "q": "Which method can be used to reset a forgotten BIOS supervisor password?",
    "o": [
      "Access the BIOS by pressing F2",
      "Remove the CMOS battery",
      "Extract the .EXE contents to a floppy",
      "Remove the P1 connector"
    ],
    "a": 1
  },
  {
    "q": "It is a block of metal that sits on top of the CPU with metal fins and uses conduction to direct heat away from the CPU.",
    "o": [
      "Heat Sink",
      "Thermal Compound",
      "Fans",
      "Cooling Liquid"
    ],
    "a": 0
  },
  {
    "q": "It is the electrical interface between the CPU and the motherboard, attached directly to the motherboard and houses the CPU.",
    "o": [
      "Socket",
      "Fans",
      "Buses",
      "Interface"
    ],
    "a": 0
  },
  {
    "q": "Most of the functions of CPU is done by?",
    "o": [
      "Serial Buses",
      "Data bus",
      "Chipset",
      "Motherboard"
    ],
    "a": 2
  },
  {
    "q": "Mouse is an ____________ device?",
    "o": [
      "Process",
      "Input and output",
      "Input",
      "Output"
    ],
    "a": 2
  },
  {
    "q": "Name any two storage devices?",
    "o": [
      "Hard Disk Drive, CD-ROM Drive",
      "Hard disk drive, virtual drive",
      "Floppy drive, expansion drive",
      "Hard disk drive, Network drive"
    ],
    "a": 0
  },
  {
    "q": "Which of the following video connectors uses a mini-DIN 4-pin or 7-pin connector for transmitting analog video signals?",
    "o": [
      "VGA",
      "DVI",
      "S-Video",
      "HDMI"
    ],
    "a": 2
  },
  {
    "q": "The most common interfaces used in PCs today?",
    "o": [
      "Parallel, Serial, USB, IEEE1394 only",
      "Serial, Parallel only",
      "USB, HDMI, Bluetooth",
      "USB, Infrared only"
    ],
    "a": 2
  },
  {
    "q": "Active heat sinks incorporate which of the following into their design?",
    "o": [
      "Grease",
      "Gas",
      "Fans",
      "Water"
    ],
    "a": 2
  },
  {
    "q": "The process by which the processor slows down to conserve power is officially called?",
    "o": [
      "Throttling",
      "Cooling",
      "Underclocking",
      "Disengaging"
    ],
    "a": 0
  },
  {
    "q": "The spine of the computer is ______________",
    "o": [
      "Memory",
      "Motherboard",
      "Processor",
      "Hard disk"
    ],
    "a": 1
  },
  {
    "q": "What is the main function of a network switch?",
    "o": [
      "To connect multiple networks together",
      "To assign IP addresses to network devices",
      "To connect multiple devices within the same network",
      "To convert wired connections into wireless signals"
    ],
    "a": 2
  },
  {
    "q": "Which component connects the memory controller hub (Northbridge) to the processor?",
    "o": [
      "Cache",
      "CPU",
      "Front Side Bus (FSB)",
      "Socket"
    ],
    "a": 2
  },
  {
    "q": "To implement a secure boot process, which device should be listed first in Boot Device Priority?",
    "o": [
      "Floppy drive",
      "USB",
      "CD-ROM",
      "Hard drive"
    ],
    "a": 3
  },
  {
    "q": "What are the two main types of Laptop memories?",
    "o": [
      "SODIMM and Micro DIMM",
      "DIMM and DD3",
      "DDR and DDR2",
      "SIMM and DIMM"
    ],
    "a": 0
  },
  {
    "q": "What do storage units provide?",
    "o": [
      "A place to type data",
      "A place to print information",
      "A place to store information and instructions when they are not being used in memory"
    ],
    "a": 2
  },
  {
    "q": "What is a possible reason for having black lines show up on printouts?",
    "o": [
      "Damaged transfer corona wire",
      "Scratch on the laser printer drum",
      "Damaged roller",
      "Scratch on the fusing assembly"
    ],
    "a": 1
  },
  {
    "q": "VGA stands for:",
    "o": [
      "Versatile Graphic Audio",
      "Video Graphic Audio",
      "Video Graphic Array"
    ],
    "a": 2
  },
  {
    "q": "What is a possible symptom of a failing CPU?",
    "o": [
      "BIOS reports low temperatures within the case",
      "CPU is beyond the recommended voltage range",
      "Computer will not boot",
      "Spyware is installed into the browser"
    ],
    "a": 1
  },
  {
    "q": "What is the main purpose of a storage device?",
    "o": [
      "To print hard copies in readable form",
      "To save time while working on the computer",
      "To sort information for later use",
      "To store programs and data until they are needed"
    ],
    "a": 3
  },
  {
    "q": "Which of the following is NOT one of the stages of computing?",
    "o": [
      "Heating",
      "Input",
      "Processing",
      "Output"
    ],
    "a": 0
  },
  {
    "q": "Which printer contains a wheel that looks like a flower with raised letters and symbols on each petal?",
    "o": [
      "LASER printers",
      "Daisy wheel printers",
      "Bubble jet printers",
      "Dot matrix printers"
    ],
    "a": 1
  },
  {
    "q": "What is the primary function of a Wireless Access Point (WAP)?",
    "o": [
      "To convert wired signals to wireless for network access",
      "To route packets between different networks",
      "To store Wi-Fi passwords",
      "To manage firewall rules"
    ],
    "a": 0
  },
  {
    "q": "Which of the following are examples of display devices?",
    "o": [
      "DEL, CDL",
      "LED, DC",
      "LCD, CRT",
      "VCD, CTR"
    ],
    "a": 2
  },
  {
    "q": "______ controls and directs all activities in a computer system",
    "o": [
      "CPU",
      "Power Supply",
      "Motherboard",
      "Memory"
    ],
    "a": 0
  },
  {
    "q": "POST is a series of system checks performed by the _______",
    "o": [
      "BIOS",
      "Motherboard",
      "OS",
      "CPU"
    ],
    "a": 0
  },
  {
    "q": "DIMM and RIMM are the form of ____________",
    "o": [
      "BIOS",
      "CPU",
      "Motherboard",
      "Memory Package"
    ],
    "a": 3
  },
  {
    "q": "VGA based video technologies use what type of signal between the adaptor and monitor?",
    "o": [
      "Compressed",
      "Digital",
      "Composite",
      "Analog"
    ],
    "a": 3
  },
  {
    "q": "What is the function of the LASER in the LASER printer?",
    "o": [
      "It charges the paper so it will attract toner",
      "It heats up the toner so it adheres to the page",
      "It cleans the drum before a page is printed",
      "It creates an image of the page on the drum"
    ],
    "a": 3
  },
  {
    "q": "What is the maximum speed of USB 2.0 in Mbps?",
    "o": [
      "60",
      "1.5",
      "12",
      "480"
    ],
    "a": 3
  },
  {
    "q": "What is the physical component where data are stored in a HDD?",
    "o": [
      "Read/write head",
      "Cluster",
      "Sector",
      "Platter"
    ],
    "a": 3
  },
  {
    "q": "What kind of device uses unique physical traits of the user to authenticate their access?",
    "o": [
      "Biometric device",
      "Touch screen",
      "Keyboard",
      "Barcode reader"
    ],
    "a": 0
  },
  {
    "q": "Conversion of binary number 00001100 to decimal number is",
    "o": [
      "22",
      "12",
      "24",
      "208"
    ],
    "a": 1
  },
  {
    "q": "What type of expansion slot is preferred today for high-performance graphics adapters?",
    "o": [
      "PCIe",
      "ISA",
      "PCI",
      "AGP"
    ],
    "a": 0
  },
  {
    "q": "What is the main difference between an ATX and Mini-ATX motherboard?",
    "o": [
      "Mini-ATX has more expansion slots than ATX",
      "Mini-ATX supports higher-end CPUs than ATX",
      "Mini-ATX is smaller in size and offers fewer expansion slots than ATX",
      "ATX motherboards do not support discrete GPUs"
    ],
    "a": 2
  },
  {
    "q": "Which motherboard design style is most widely implemented?",
    "o": [
      "Baby ATX",
      "AT",
      "NLX",
      "ATX"
    ],
    "a": 3
  },
  {
    "q": "Which motherboard form factor places expansion slots on a special riser card and is used in low-profile PCs?",
    "o": [
      "AT",
      "ATX",
      "NLX",
      "Baby AT"
    ],
    "a": 2
  },
  {
    "q": "Which of the following are considered integrated I/O ports?",
    "o": [
      "Serial port",
      "All of these options are correct",
      "USB port",
      "Ethernet port"
    ],
    "a": 1
  },
  {
    "q": "Which of the following is NOT considered a system component found inside the computer?",
    "o": [
      "RAM",
      "PCIe graphics adapter",
      "CPU",
      "Motherboard"
    ],
    "a": 1
  },
  {
    "q": "Conversion of binary number 00011110 to decimal number is",
    "o": [
      "39",
      "339",
      "139",
      "30"
    ],
    "a": 3
  },
  {
    "q": "Which of the following is used to store documents and programs for repeated use?",
    "o": [
      "Hard drive",
      "ROM",
      "RAM",
      "Internal cache memory"
    ],
    "a": 0
  },
  {
    "q": "Which of the following loses its contents when you shut down the computer?",
    "o": [
      "USB flash drive",
      "Hard disk drive",
      "Random access memory (RAM)",
      "Read-only memory (ROM)"
    ],
    "a": 2
  },
  {
    "q": "Which of the following memory types has the smallest form factors?",
    "o": [
      "DIMM",
      "RIMM",
      "SIMM",
      "MicroDIMM"
    ],
    "a": 3
  },
  {
    "q": "Conversion of hexadecimal number 4B to binary number is",
    "o": [
      "110011",
      "1001011",
      "1101101",
      "111010"
    ],
    "a": 1
  },
  {
    "q": "Accelerated Graphics Port (AGP) slots are usually in which color?",
    "o": [
      "Black",
      "Brown",
      "White",
      "Red"
    ],
    "a": 1
  },
  {
    "q": "An application or program runs in",
    "o": [
      "Secondary Memory",
      "RAM",
      "Hard Disk",
      "ROM"
    ],
    "a": 1
  },
  {
    "q": "CD-ROM stands for",
    "o": [
      "Computer Read Only Memory",
      "Compressed Disk Read Only Memory",
      "Compact Disk Read Only Memory",
      "Compact Data Read Only Memory"
    ],
    "a": 2
  },
  {
    "q": "Conversion of hexadecimal number 4F to binary number is",
    "o": [
      "1001101",
      "110111",
      "1001110",
      "1001111"
    ],
    "a": 3
  },
  {
    "q": "Conversion of decimal number 99 to its binary number equivalent is",
    "o": [
      "111101",
      "11001110",
      "11111",
      "1100011"
    ],
    "a": 3
  },
  {
    "q": "Conversion of decimal number 71 to its binary number equivalent is",
    "o": [
      "11111111",
      "1",
      "1000111",
      "10101010"
    ],
    "a": 2
  },
  {
    "q": "On an Intel based motherboard, which chipset enables the CPU to interact with RAM?",
    "o": [
      "Super I/O",
      "Southbridge",
      "Northbridge",
      "Memorybridge"
    ],
    "a": 2
  },
  {
    "q": "If you are unable to display a given resolution on a monitor, which might explain why?",
    "o": [
      "You are using CRT with a single fixed resolution",
      "The video display unit does not have enough memory installed",
      "The graphics adapter does not have enough memory installed",
      "You have the refresh rate set too high"
    ],
    "a": 2
  },
  {
    "q": "Which component is responsible for processing and rendering graphics on a computer?",
    "o": [
      "A barcode reader",
      "Graphics Processing Unit (GPU)",
      "A MIDI device",
      "A TV tuner card"
    ],
    "a": 1
  },
  {
    "q": "When replacing a power supply, which of the following must be chosen properly to support all connected devices?",
    "o": [
      "Resistance",
      "Voltage",
      "Amperage",
      "Wattage"
    ],
    "a": 3
  },
  {
    "q": "Which computer components contain all the circuits necessary for other components to communicate?",
    "o": [
      "Motherboard",
      "Hard drive",
      "Adapter card",
      "Expansion Slot"
    ],
    "a": 0
  },
  {
    "q": "We can connect Mouse by using _______",
    "o": [
      "Parallel Port",
      "IEEE1394",
      "RJ45",
      "PS/2 and USB"
    ],
    "a": 3
  },
  {
    "q": "Which device in a bubble-jet printer contains the printhead?",
    "o": [
      "daisy wheel",
      "Toner cartridge",
      "Ink cartridge",
      "paper tray"
    ],
    "a": 2
  },
  {
    "q": "Which one of the following is NOT a function of firewall?",
    "o": [
      "Packet filtering",
      "Block traffic to specific address",
      "Coding and decoding the message",
      "Isolate one network to others"
    ],
    "a": 2
  },
  {
    "q": "Barcode readers can use _________ to scan one- or two-dimensional barcodes.",
    "o": [
      "LCD or CRT",
      "LED or Laser",
      "Mouse or Keyboard",
      "OMR or Scanner"
    ],
    "a": 1
  },
  {
    "q": "Daisy wheel and Dot Matrix are two types of ___________",
    "o": [
      "Impact Printers",
      "Plotters",
      "Jet Printers",
      "Laser Printers"
    ],
    "a": 0
  },
  {
    "q": "Motherboard form factor where expansion slots are placed sideways on a special riser card.",
    "o": [
      "MicroATX",
      "NLX",
      "BLX",
      "ATX"
    ],
    "a": 1
  },
  {
    "q": "HDMI stands for",
    "o": [
      "High Definition Movie Interconnection",
      "High Definition Multimedia Interface",
      "High Degree Multimedia Interface",
      "High Definition Musical Interface"
    ],
    "a": 1
  },
  {
    "q": "LANs connect computers and peripheral devices.",
    "tf": true,
    "a": 1
  },
  {
    "q": "A computer case is also known as a computer chassis.",
    "tf": true,
    "a": 1
  },
  {
    "q": "A CPU consists of the Control Unit and the Arithmetic and Logic Unit (ALU).",
    "tf": true,
    "a": 1
  },
  {
    "q": "ROM (Read-Only Memory) provides permanent data storage.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Computer case minimizes electrical interference to other electronic devices in the area.",
    "tf": true,
    "a": 1
  },
  {
    "q": "HDDs produce more noise than SSDs because they contain moving mechanical parts.",
    "tf": true,
    "a": 1
  },
  {
    "q": "HDDs are more durable than SSDs.",
    "tf": false,
    "a": 2
  },
  {
    "q": "SSDs are generally more expensive than HDDs.",
    "tf": true,
    "a": 1
  },
  {
    "q": "A power supply unit converts DC (Direct Current) power to AC (Alternate Current).",
    "tf": false,
    "a": 2
  },
  {
    "q": "RAM is considered non-volatile memory.",
    "tf": false,
    "a": 2
  },
  {
    "q": "ROM allows data to be written faster than other types of memory.",
    "tf": false,
    "a": 2
  },
  {
    "q": "The main components of a Hard Disk Drive (HDD) are made primarily of metal.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Most computer power supplies have output capacities ranging from 300 watts to 1000 watts.",
    "tf": true,
    "a": 1
  },
  {
    "q": "The Operating System (OS) serves as the interface between the user and the computer hardware.",
    "tf": true,
    "a": 1
  },
  {
    "q": "In the main motherboard power (ATX), the on-off power controls circuit board is built outside the motherboard.",
    "tf": false,
    "a": 2
  },
  {
    "q": "Which of the following is NOT a commonly used computer operating system?",
    "o": [
      "Windows",
      "macOS",
      "Linux",
      "BIOS"
    ],
    "a": 3
  },
  {
    "q": "ROM has temporary storage.",
    "tf": false,
    "a": 2
  },
  {
    "q": "ROM is used for startup process of computer.",
    "tf": true,
    "a": 1
  },
  {
    "q": "One of the key functions of an Operating System is to manage the booting process.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Which of the following best describes encryption?",
    "o": [
      "The process of converting data into a readable format",
      "The process of converting readable data into a coded form to protect it",
      "A method used to delete unwanted data",
      "The act of backing up user files"
    ],
    "a": 1
  },
  {
    "q": "Which key is commonly pressed during system startup to access the BIOS/UEFI setup utility?",
    "o": [
      "Del or F2",
      "F5",
      "Esc",
      "Ctrl + Alt + Delete"
    ],
    "a": 0
  },
  {
    "q": "OS has a lot of functions, example: Memory Management.",
    "tf": true,
    "a": 1
  },
  {
    "q": "DIMM modules are primarily used in desktop computers, while laptops use SO-DIMM modules.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Computer security encompasses multiple branches, including Information Security and Network Security.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Which of the following statements about thermal printers is true?",
    "o": [
      "They use ink cartridges to print on plain paper",
      "They use heat to produce images on specially coated paper",
      "They are slower than dot matrix printers",
      "They use toner to create images"
    ],
    "a": 1
  },
  {
    "q": "What is the primary purpose of a router in a network?",
    "o": [
      "To route data packets between different networks",
      "To connect devices using MAC addresses",
      "To extend wireless signal coverage",
      "To provide power to network devices"
    ],
    "a": 0
  },
  {
    "q": "The goal of computer security is to maximize computer freezing and crashes.",
    "tf": false,
    "a": 2
  },
  {
    "q": "HDD is heavier than SSD.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Implementing computer security measures helps in safeguarding and efficiently managing critical information.",
    "tf": true,
    "a": 1
  },
  {
    "q": "What is the first step when troubleshooting a hardware problem?",
    "o": [
      "Replace the hardware immediately",
      "Restart the computer",
      "Identify and define the problem",
      "Format the hard drive"
    ],
    "a": 2
  },
  {
    "q": "Cryptographic algorithms are used to encode a message from its clear-text state into an encrypted message.",
    "tf": true,
    "a": 1
  },
  {
    "q": "Continuous system reboots are often caused by faulty drivers or incorrect system configurations.",
    "tf": true,
    "a": 1
  },
  {
    "q": "When a computer frequently crashes or displays a BSOD, which component should be checked first?",
    "o": [
      "Hard disk",
      "RAM",
      "Graphics card",
      "Power supply"
    ],
    "a": 1
  },
  {
    "q": "What is the primary function of a firewall?",
    "o": [
      "To improve system performance",
      "To detect and remove viruses automatically",
      "To monitor and control incoming and outgoing network traffic for security",
      "To convert analog signals to digital"
    ],
    "a": 2
  },
  {
    "q": "What is a common symptom of a failing hard disk?",
    "o": [
      "Continuous beeping sound",
      "Distorted display on the monitor",
      "Clicking or grinding noise",
      "The computer runs faster than usual"
    ],
    "a": 2
  },
  {
    "q": "What does BIOS stand for?",
    "o": [
      "Basic Input/Output System",
      "Binary Integrated Operating System",
      "Basic Integrated Output Structure",
      "Binary Input Operating System"
    ],
    "a": 0
  },
  {
    "q": "Which peripheral device is used to convert physical documents into digital form?",
    "o": [
      "Monitor",
      "Scanner",
      "Keyboard",
      "Printer"
    ],
    "a": 1
  },
  {
    "q": "What type of bus architecture is commonly used for expansion cards?",
    "o": [
      "PCIe",
      "USB",
      "SATA",
      "HDMI"
    ],
    "a": 0
  },
  {
    "q": "What is the primary function of a UPS?",
    "o": [
      "Increase processing speed",
      "Provide backup power",
      "Enhance network security",
      "Optimize graphics performance"
    ],
    "a": 1
  },
  {
    "q": "What component is primarily responsible for storing the BIOS settings?",
    "o": [
      "CMOS",
      "Hard Drive",
      "RAM",
      "Power Supply"
    ],
    "a": 0
  },
  {
    "q": "Which type of CPU allows simultaneous execution of multiple instructions?",
    "o": [
      "Single-core",
      "Multi-core",
      "Static CPU",
      "Dual-core"
    ],
    "a": 1
  },
  {
    "q": "What type of cache is closest to the CPU core?",
    "o": [
      "L1 Cache",
      "L2 Cache",
      "L3 Cache",
      "Virtual Cache"
    ],
    "a": 0
  },
  {
    "q": "What is the purpose of a CPU socket?",
    "o": [
      "Connect peripherals",
      "Attach the CPU to the motherboard",
      "Store power supply settings",
      "Cool the CPU"
    ],
    "a": 1
  },
  {
    "q": "Hyper-threading is a technology used to:",
    "o": [
      "Increase clock speed",
      "Enable multiple threads per core",
      "Reduce power consumption",
      "Enhance GPU performance"
    ],
    "a": 1
  },
  {
    "q": "What cooling method uses liquid to dissipate heat?",
    "o": [
      "Passive Cooling",
      "Liquid Cooling",
      "Thermal Paste",
      "Heat Sink"
    ],
    "a": 1
  },
  {
    "q": "What unit measures CPU clock speed?",
    "o": [
      "Hertz (Hz)",
      "Watts (W)",
      "Bytes (B)",
      "Ohms"
    ],
    "a": 0
  },
  {
    "q": "What is the hexadecimal representation of the decimal number 255?",
    "o": [
      "FF",
      "AF",
      "0",
      "11"
    ],
    "a": 0
  },
  {
    "q": "Which memory type is non-volatile?",
    "o": [
      "RAM",
      "ROM",
      "Cache",
      "DDR"
    ],
    "a": 1
  },
  {
    "q": "What does RAID stand for?",
    "o": [
      "Redundant Array of Independent Disks",
      "Random Access Interface Data",
      "Rapid Access Information Drive",
      "Reliable Array of Integrated Disks"
    ],
    "a": 0
  },
  {
    "q": "Which statement correctly compares a laptop component to its desktop counterpart?",
    "o": [
      "Laptop processors typically consume more power and generate more heat than desktop processors",
      "Laptop RAM modules are usually smaller in size and known as SO-DIMM, while desktops use DIMM modules",
      "Laptop hard drives are larger in physical size than desktop hard drives",
      "Laptop motherboards can easily be replaced with any standard desktop motherboard"
    ],
    "a": 1
  },
  {
    "q": "What is the first process in the boot sequence?",
    "o": [
      "Loading the operating system",
      "POST (Power-On Self-Test)",
      "Initializing drivers",
      "Displaying the login screen"
    ],
    "a": 1
  },
  {
    "q": "What type of removable storage is commonly used in smartphones?",
    "o": [
      "USB drive",
      "SD Card",
      "External HDD",
      "Floppy Disk"
    ],
    "a": 1
  },
  {
    "q": "Which file system is used by Windows?",
    "o": [
      "NTFS",
      "EXT4",
      "FAT32",
      "HFS+"
    ],
    "a": 0
  },
  {
    "q": "What is the main purpose of a backup system?",
    "o": [
      "To enhance overall computer performance",
      "To protect important data against loss or corruption",
      "To increase total storage capacity",
      "To speed up data transfer between devices"
    ],
    "a": 1
  },
  {
    "q": "Which software helps to detect and remove malware?",
    "o": [
      "Firewall",
      "Antivirus",
      "Operating System",
      "BIOS"
    ],
    "a": 1
  },
  {
    "q": "A firewall primarily works by:",
    "o": [
      "Encrypting all data",
      "Blocking unauthorized access",
      "Increasing CPU performance",
      "Managing power supply"
    ],
    "a": 1
  },
  {
    "q": "Which process improves system performance by storing frequently used data?",
    "o": [
      "Caching",
      "Booting",
      "Formatting",
      "Partitioning"
    ],
    "a": 0
  },
  {
    "q": "What type of authentication uses fingerprints?",
    "o": [
      "Password",
      "Biometric",
      "Encryption",
      "Token-based"
    ],
    "a": 1
  },
  {
    "q": "Which is a secure way to manage user access?",
    "o": [
      "Using shared passwords",
      "Authentication",
      "Disabling firewalls",
      "Granting admin rights to all users"
    ],
    "a": 1
  },
  {
    "q": "What type of printer uses toner to produce images?",
    "o": [
      "Inkjet",
      "Dot Matrix",
      "Laser",
      "Thermal"
    ],
    "a": 2
  },
  {
    "q": "What component supplies power to all parts of the computer?",
    "o": [
      "Motherboard",
      "CPU",
      "Power Supply Unit",
      "BIOS"
    ],
    "a": 2
  },
  {
    "q": "What is the primary function of a CPU?",
    "o": [
      "Data Storage",
      "Processing instructions",
      "Display output",
      "Connecting devices"
    ],
    "a": 1
  },
  {
    "q": "What does L2 Cache do?",
    "o": [
      "Stores long-term data",
      "Temporarily stores frequently accessed data",
      "Manages power supply settings",
      "Controls input devices"
    ],
    "a": 1
  },
  {
    "q": "What CPU socket type is used for AMD processors?",
    "o": [
      "PGA",
      "LGA",
      "ZIF",
      "BGA"
    ],
    "a": 0
  },
  {
    "q": "Which RAID level provides redundancy by storing identical copies of data on two drives?",
    "o": [
      "RAID 0",
      "RAID 1",
      "RAID 5",
      "RAID 10"
    ],
    "a": 1
  },
  {
    "q": "Which storage device uses magnetic disks to store data?",
    "o": [
      "SSD",
      "HDD",
      "Optical Drive",
      "Flash Drive"
    ],
    "a": 1
  },
  {
    "q": "Which backup media is commonly used for long-term archival storage?",
    "o": [
      "USB Drives",
      "Cloud Storage",
      "Magnetic Tape",
      "SD Card"
    ],
    "a": 2
  },
  {
    "q": "Which process loads the operating system into memory during startup?",
    "o": [
      "POST",
      "Booting",
      "Formatting",
      "Initialising"
    ],
    "a": 1
  },
  {
    "q": "Which device translates physical movements into cursor movement?",
    "o": [
      "Keyboard",
      "Mouse",
      "Touchscreen",
      "Scanner"
    ],
    "a": 1
  },
  {
    "q": "What is the most commonly used interface for connecting external drives?",
    "o": [
      "HDMI",
      "USB",
      "Ethernet",
      "VGA"
    ],
    "a": 1
  },
  {
    "q": "What device acts as an intermediary between a computer and a network?",
    "o": [
      "Central Processing Unit",
      "Network Interface Card",
      "PSU",
      "Random Access Memory"
    ],
    "a": 1
  },
  {
    "q": "Which technology is used to protect data on storage devices?",
    "o": [
      "RAID",
      "Cache",
      "Formatting",
      "De-fragmentation"
    ],
    "a": 0
  },
  {
    "q": "What is decryption?",
    "o": [
      "Converting coded data back into its original readable form",
      "Locking files to prevent access",
      "Storing data on external drives",
      "Formatting encrypted files"
    ],
    "a": 0
  },
  {
    "q": "What is the primary function of the motherboard?",
    "o": [
      "Power supply to the CPU",
      "Storage for data",
      "Connecting all computer components",
      "Displaying video output"
    ],
    "a": 2
  },
  {
    "q": "Which component stores the settings for the date, time, and hardware configuration?",
    "o": [
      "BIOS",
      "CMOS",
      "RAM",
      "HDD"
    ],
    "a": 1
  },
  {
    "q": "What does PCIe stand for?",
    "o": [
      "Peripheral Component Interchange Express",
      "Peripheral Component Interconnect Express",
      "Parallel Component Interchange Express",
      "Primary Component Interconnect Express"
    ],
    "a": 1
  },
  {
    "q": "Which bus architecture is specifically used for graphics cards?",
    "o": [
      "PCI",
      "AGP",
      "USB",
      "ISA"
    ],
    "a": 1
  },
  {
    "q": "What is the primary purpose of the address bus?",
    "o": [
      "Specify the memory location for data transfer",
      "Transfer data between peripherals",
      "Control hardware devices",
      "Store data temporarily"
    ],
    "a": 0
  },
  {
    "q": "Which bus is responsible for communication between the CPU and external devices?",
    "o": [
      "Data Bus",
      "Address Bus",
      "Control Bus",
      "I/O Bus"
    ],
    "a": 3
  },
  {
    "q": "Which of the following is an open-source operating system?",
    "o": [
      "Windows",
      "Linux",
      "macOS",
      "Solaris"
    ],
    "a": 1
  },
  {
    "q": "Which of the following is a form of malware designed to replicate itself?",
    "o": [
      "Trojan Horse",
      "Worm",
      "Ransomware",
      "Rootkit"
    ],
    "a": 1
  },
  {
    "q": "What does encryption do to data?",
    "o": [
      "Deletes it permanently",
      "Converts it into a secure, unreadable format",
      "Compresses it to save space",
      "Sends it directly to the cloud"
    ],
    "a": 1
  },
  {
    "q": "Which component is considered the brain of the computer?",
    "o": [
      "Motherboard",
      "CPU",
      "RAM",
      "Hard Drive"
    ],
    "a": 1
  },
  {
    "q": "__________ biometrics identify individuals based on unique physical traits, while __________ biometrics rely on behavioral traits.",
    "o": [
      "Physiological, Behavioral",
      "Medical",
      "Digital, Analog",
      "Static, Dynamic"
    ],
    "a": 0
  }
];
