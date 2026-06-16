import json
import os

topics = [
    "Introduction to Embedded Systems",
    "Embedded System Architecture",
    "Microcontrollers vs Microprocessors",
    "Embedded C Programming",
    "GPIO Programming",
    "Timers and Counters",
    "Interrupts",
    "UART Communication",
    "SPI Communication",
    "I2C Communication",
    "ADC and DAC",
    "Sensors and Actuators",
    "PWM Techniques",
    "RTOS Fundamentals",
    "Device Drivers",
    "ARM Cortex-M Architecture",
    "Embedded Linux Basics",
    "IoT with Embedded Systems",
    "Power Management in Embedded Systems",
    "Embedded Project Development Lifecycle"
]

output_dir = r"d:\Geonixa Platform\frontend\public\data\embedded-topics"
os.makedirs(output_dir, exist_ok=True)

content_templates = {
    "Introduction to Embedded Systems": {
        "topic_overview": "An embedded system is a combination of computer hardware and software designed for a specific function within a larger system. They are pervasive in modern electronics, from household appliances to industrial machines.",
        "core_concepts": [
            "Hardware-software codesign: Developing software and hardware simultaneously.",
            "Real-time constraints: Systems must often respond within strict time limits.",
            "Reliability: Expected to run for years without errors.",
            "Resource constraints: Limited memory, processing power, and energy."
        ],
        "architecture_working_principle": "An embedded system typically consists of a microcontroller or microprocessor, memory (RAM/ROM), input devices (sensors), and output devices (actuators). The software runs in an infinite loop, processing inputs and generating outputs based on the programmed logic.",
        "real_world_applications": [
            "Home appliances (Microwaves, Washing machines)",
            "Automotive systems (Engine control units, ABS)",
            "Medical devices (Pacemakers, MRI machines)"
        ],
        "advantages": [
            "Highly optimized for specific tasks.",
            "Low power consumption compared to general-purpose computers.",
            "Compact size and low cost for mass production."
        ],
        "limitations": [
            "Difficult to upgrade hardware or software.",
            "Limited processing power and memory.",
            "Development requires specialized knowledge."
        ],
        "industry_use_cases": "In the automotive industry, embedded systems control everything from infotainment to critical safety features. In healthcare, they enable portable diagnostics and monitoring equipment.",
        "best_practices": [
            "Design for testability and maintainability.",
            "Optimize power usage at both hardware and software levels.",
            "Use watchdog timers to recover from software hangs."
        ],
        "interview_questions": [
            {"q": "What is the difference between an embedded system and a general-purpose computer?", "a": "An embedded system is dedicated to a specific task, often with real-time constraints, while a general-purpose computer can perform a wide variety of tasks."}
        ],
        "learning_outcomes": [
            "Understand the defining characteristics of embedded systems.",
            "Identify the key components of an embedded system.",
            "Recognize common applications of embedded systems in various industries."
        ]
    },
    "Embedded System Architecture": {
        "topic_overview": "Embedded system architecture describes the structural organization of hardware and software components that make up an embedded system, detailing how they interact to achieve the system's goals.",
        "core_concepts": [
            "Von Neumann vs. Harvard Architecture.",
            "Memory Hierarchy: Cache, RAM, ROM/Flash.",
            "Buses: Address, Data, and Control buses.",
            "Peripherals: Built-in hardware modules like timers, ADCs, and communication interfaces."
        ],
        "architecture_working_principle": "The central processing unit (CPU) fetches instructions from program memory via buses, executes them, and reads/writes data to data memory or peripherals. The architecture dictates the efficiency of this data flow.",
        "real_world_applications": [
            "Designing custom SoCs (System on Chip) for smartphones.",
            "Architecting highly reliable flight control systems.",
            "Developing low-power wearable devices."
        ],
        "advantages": [
            "Provides a blueprint for system design and optimization.",
            "Allows trade-offs between performance, power, and cost.",
            "Facilitates hardware-software partitioning."
        ],
        "limitations": [
            "Complex architectures increase design time and cost.",
            "Choosing the wrong architecture can lead to performance bottlenecks."
        ],
        "industry_use_cases": "Semiconductor companies design specific architectures (like ARM Cortex-M) optimized for different tiers of embedded applications, from ultra-low power to high-performance.",
        "best_practices": [
            "Select architecture based on power, performance, and cost constraints.",
            "Utilize hardware accelerators for computationally intensive tasks.",
            "Ensure adequate memory bandwidth for required data throughput."
        ],
        "interview_questions": [
            {"q": "Explain the difference between Von Neumann and Harvard architectures.", "a": "Von Neumann uses a single memory space and bus for both instructions and data, causing a bottleneck. Harvard uses separate memory spaces and buses, allowing simultaneous access to instructions and data."}
        ],
        "learning_outcomes": [
            "Describe the basic components of an embedded system architecture.",
            "Compare different memory architectures.",
            "Understand the role of buses and peripherals."
        ]
    },
    "Microcontrollers vs Microprocessors": {
        "topic_overview": "This topic explores the fundamental differences between microcontrollers (MCUs) and microprocessors (MPUs), focusing on their architecture, integration, and typical use cases.",
        "core_concepts": [
            "Microcontroller (MCU): A 'computer on a chip' integrating CPU, memory (RAM/ROM), and peripherals.",
            "Microprocessor (MPU): A CPU that requires external memory and peripherals.",
            "Integration: MCUs have high integration; MPUs have low integration.",
            "Processing Power: MPUs are generally much more powerful than MCUs."
        ],
        "architecture_working_principle": "An MCU contains everything needed to run a simple application on a single piece of silicon. An MPU requires a motherboard with RAM, ROM, and I/O chips connected via external buses to function.",
        "real_world_applications": [
            "MCU: Remote controls, microwave ovens, simple sensors.",
            "MPU: Personal computers, smartphones, complex networking equipment."
        ],
        "advantages": [
            "MCUs: Low cost, low power, compact size, easy to use for simple control tasks.",
            "MPUs: High performance, large memory capacity, capable of running complex OS like Linux or Windows."
        ],
        "limitations": [
            "MCUs: Limited processing power and memory space.",
            "MPUs: Higher cost, higher power consumption, requires more complex PCB design."
        ],
        "industry_use_cases": "IoT edge nodes typically use MCUs to gather sensor data and transmit it, while IoT gateways use MPUs to process data from multiple nodes and handle secure cloud communication.",
        "best_practices": [
            "Choose an MCU for cost-sensitive, power-constrained control applications.",
            "Choose an MPU for applications requiring complex data processing, high-resolution graphics, or a full OS."
        ],
        "interview_questions": [
            {"q": "When would you choose a microprocessor over a microcontroller?", "a": "When the application requires significant processing power, large amounts of RAM (e.g., for video processing), or needs to run a complex operating system like Linux."}
        ],
        "learning_outcomes": [
            "Differentiate between the architecture of an MCU and an MPU.",
            "Understand the trade-offs in power, performance, and cost.",
            "Select the appropriate processor type for a given application."
        ]
    },
    "Embedded C Programming": {
        "topic_overview": "Embedded C is a set of language extensions for the C Programming language by the C Standards Committee to address commonality issues that exist between C extensions for different embedded systems.",
        "core_concepts": [
            "Cross-compilation: Compiling code on a host machine for a different target architecture.",
            "Bit manipulation: Setting, clearing, and toggling individual bits in registers.",
            "Volatile keyword: Telling the compiler that a variable's value can change unexpectedly (e.g., hardware register).",
            "Memory mapping: Accessing hardware peripherals through specific memory addresses."
        ],
        "architecture_working_principle": "Embedded C code is compiled into machine code specific to the target microcontroller. The code directly manipulates hardware registers mapped to memory addresses to control peripherals like GPIOs, timers, and communication interfaces.",
        "real_world_applications": [
            "Firmware for consumer electronics.",
            "Control software for automotive ECUs.",
            "Software for industrial automation controllers."
        ],
        "advantages": [
            "Provides low-level hardware access while maintaining high-level language structures.",
            "Highly efficient and compact code generation.",
            "Wide availability of compilers for almost all microcontroller architectures."
        ],
        "limitations": [
            "Requires a deep understanding of the target hardware.",
            "Memory leaks and pointer errors can easily crash the system.",
            "Less abstraction compared to modern object-oriented languages."
        ],
        "industry_use_cases": "Embedded C is the industry standard for developing firmware for resource-constrained microcontrollers in almost every domain, from aerospace to consumer goods.",
        "best_practices": [
            "Use the `volatile` keyword for hardware registers and variables modified in ISRs.",
            "Avoid dynamic memory allocation (`malloc`/`free`) to prevent fragmentation.",
            "Use bitwise operators efficiently for register manipulation."
        ],
        "interview_questions": [
            {"q": "Why is the `volatile` keyword important in Embedded C?", "a": "It prevents the compiler from optimizing away memory accesses to variables that can change outside the normal program flow, such as hardware registers or variables updated by an Interrupt Service Routine (ISR)."}
        ],
        "learning_outcomes": [
            "Write C code to manipulate hardware registers.",
            "Understand the build process for embedded software.",
            "Apply best practices for writing reliable embedded firmware."
        ]
    },
    "GPIO Programming": {
        "topic_overview": "General-Purpose Input/Output (GPIO) pins are the fundamental interface between a microcontroller and the external physical world. They can be configured dynamically as either inputs to read digital signals or outputs to drive digital signals.",
        "core_concepts": [
            "Pin Configuration: Setting the direction (input or output).",
            "Digital I/O: Reading states (High/Low) or driving states.",
            "Pull-up/Pull-down Resistors: Defining a default state for floating input pins.",
            "Alternate Functions: Multiplexing GPIO pins for other peripherals (e.g., UART TX/RX)."
        ],
        "architecture_working_principle": "GPIO pins are controlled via memory-mapped registers (e.g., Direction Register, Output Data Register, Input Data Register). Writing specific bit patterns to these registers configures the hardware circuitry of the pin to act as a digital driver or receiver.",
        "real_world_applications": [
            "Blinking LEDs for status indication.",
            "Reading states of mechanical buttons or switches.",
            "Controlling relays to switch high-power loads."
        ],
        "advantages": [
            "Extremely versatile and simple to use.",
            "Provides direct control over digital signals.",
            "Essential for bit-banging communication protocols if hardware peripherals are unavailable."
        ],
        "limitations": [
            "Can only handle digital (binary) signals natively.",
            "Driving high current loads requires external circuitry (like transistors or relays).",
            "Software polling of inputs wastes CPU cycles."
        ],
        "industry_use_cases": "GPIOs are used in almost every embedded design, from simple user interfaces (buttons/LEDs) to controlling complex motor drivers and interfacing with digital sensors.",
        "best_practices": [
            "Always enable internal pull-up/pull-down resistors for inputs connected to mechanical switches to avoid floating states.",
            "Use bitwise operations to change specific pin states without affecting others on the same port.",
            "Implement debouncing (software or hardware) when reading mechanical switches."
        ],
        "interview_questions": [
            {"q": "How do you configure a specific pin as an output without affecting other pins on the same port in C?", "a": "Using a bitwise OR operation. For example, `PORT_DIR_REG |= (1 << PIN_NUMBER);` sets the specific bit to 1, configuring it as an output, while leaving other bits unchanged."}
        ],
        "learning_outcomes": [
            "Configure microcontroller pins as digital inputs or outputs.",
            "Write code to read digital sensors and drive actuators.",
            "Understand the necessity of pull resistors and debouncing."
        ]
    },
    "Timers and Counters": {
        "topic_overview": "Timers and counters are specialized hardware peripherals within a microcontroller used to measure time intervals, count external events, or generate precise timing signals.",
        "core_concepts": [
            "Prescaler: Divides the system clock frequency to provide the timer's input clock.",
            "Timer Register: A hardware register that increments (or decrements) at the rate of the timer clock.",
            "Overflow/Underflow: Occurs when the timer reaches its maximum (or minimum) value and wraps around.",
            "Compare Match: An event generated when the timer value matches a predefined value in a compare register."
        ],
        "architecture_working_principle": "A timer is essentially a digital counter driven by a clock source. If driven by the internal system clock (often divided by a prescaler), it measures time. If driven by an external pin transition, it counts events. Interrupts can be configured to trigger on overflow or compare match events.",
        "real_world_applications": [
            "Generating precise delays without blocking the CPU.",
            "Measuring the frequency of an external signal.",
            "Creating Pulse Width Modulation (PWM) signals for motor control.",
            "Providing a system 'tick' for Real-Time Operating Systems (RTOS)."
        ],
        "advantages": [
            "Hardware-based timing is much more precise and deterministic than software loops.",
            "Frees the CPU to perform other tasks while time is being measured.",
            "Essential for generating complex waveforms."
        ],
        "limitations": [
            "Resolution is limited by the timer's bit-width (e.g., 8-bit, 16-bit) and the system clock frequency.",
            "Complex configurations can be difficult to manage across multiple timer channels."
        ],
        "industry_use_cases": "Timers are crucial in automotive engine control for precise spark timing, in consumer electronics for generating audio tones, and in industrial automation for controlling stepper motors.",
        "best_practices": [
            "Use hardware timers instead of software delay loops (`for`/`while`) for accurate timing.",
            "Calculate prescaler and compare values carefully based on the system clock frequency.",
            "Use interrupts to handle timer events asynchronously."
        ],
        "interview_questions": [
            {"q": "How do you calculate the time it takes for a 16-bit timer to overflow, given a system clock of 16MHz and a prescaler of 64?", "a": "Timer Clock = 16MHz / 64 = 250kHz. One tick takes 1 / 250kHz = 4us. A 16-bit timer overflows after 2^16 (65536) ticks. Overflow time = 65536 * 4us = 262.144 ms."}
        ],
        "learning_outcomes": [
            "Configure timers to generate specific delays.",
            "Understand the relationship between system clock, prescaler, and timer resolution.",
            "Use timers to count external events."
        ]
    },
    "Interrupts": {
        "topic_overview": "Interrupts provide a mechanism for the hardware to signal the CPU that an event requires immediate attention, causing the CPU to pause its current task and execute an Interrupt Service Routine (ISR).",
        "core_concepts": [
            "Interrupt Vector Table (IVT): A memory table mapping interrupt sources to the addresses of their corresponding ISRs.",
            "Interrupt Service Routine (ISR): A function executed in response to an interrupt.",
            "Interrupt Priority: Determines which interrupt is serviced first if multiple occur simultaneously.",
            "Masking: Disabling specific interrupts or all interrupts globally."
        ],
        "architecture_working_principle": "When an interrupt occurs (e.g., a timer overflows, data arrives on UART), the hardware sets an interrupt flag. If enabled, the CPU finishes the current instruction, saves its context (registers, program counter) to the stack, and jumps to the ISR address found in the IVT. After the ISR completes, the CPU restores its context and resumes the interrupted task.",
        "real_world_applications": [
            "Handling urgent asynchronous events like a user pressing an emergency stop button.",
            "Receiving data from communication interfaces (UART, SPI) without polling.",
            "Context switching in a Real-Time Operating System (RTOS)."
        ],
        "advantages": [
            "Eliminates the need for continuous polling, saving significant CPU cycles and power.",
            "Provides deterministic response times for critical events.",
            "Allows the system to handle asynchronous events efficiently."
        ],
        "limitations": [
            "Complex to debug; timing-dependent bugs can be difficult to reproduce.",
            "ISRs that take too long can starve the main program or cause other interrupts to be missed.",
            "Shared resources between main code and ISRs require careful synchronization."
        ],
        "industry_use_cases": "Interrupts are fundamental to real-time systems. In automotive braking systems (ABS), wheel speed sensor inputs trigger interrupts to calculate slip and modulate brake pressure instantly.",
        "best_practices": [
            "Keep ISRs as short and fast as possible. Do minimal processing; set a flag and defer heavy processing to the main loop.",
            "Declare variables shared between an ISR and main code as `volatile`.",
            "Avoid blocking calls or loops inside an ISR."
        ],
        "interview_questions": [
            {"q": "What happens if an interrupt occurs while another interrupt is currently being serviced?", "a": "This depends on the architecture and configuration. In simple systems, global interrupts are disabled upon entering an ISR, so the second interrupt becomes pending. In systems supporting nested interrupts, a higher-priority interrupt can preempt a lower-priority ISR."}
        ],
        "learning_outcomes": [
            "Understand the interrupt handling mechanism.",
            "Write efficient Interrupt Service Routines.",
            "Manage shared resources between main code and ISRs."
        ]
    },
    "UART Communication": {
        "topic_overview": "Universal Asynchronous Receiver-Transmitter (UART) is a hardware communication protocol that uses asynchronous serial communication with configurable speed. It's one of the oldest and most widely used protocols for device-to-device communication.",
        "core_concepts": [
            "Asynchronous: No shared clock signal between devices.",
            "Baud Rate: The speed of data transmission in bits per second (bps). Both devices must agree on this.",
            "Data Frame: Consists of a start bit, data bits (usually 8), an optional parity bit, and stop bit(s).",
            "TX/RX Pins: Transmit (TX) and Receive (RX) lines. TX of one device connects to RX of the other."
        ],
        "architecture_working_principle": "The transmitting UART converts parallel data from the CPU into a serial bit stream, adding start/stop framing bits. It shifts this data out on the TX pin at the specified baud rate. The receiving UART samples the RX pin at the same baud rate, reconstructs the parallel data, and notifies the CPU.",
        "real_world_applications": [
            "Debugging and logging output to a terminal (PC).",
            "Communication between microcontrollers and modules like GPS or Bluetooth.",
            "RS-232 and RS-485 serial interfaces (using external transceivers)."
        ],
        "advantages": [
            "Requires only two wires (TX, RX) plus ground for full-duplex communication.",
            "Simple protocol supported by almost all microcontrollers.",
            "Long-distance communication possible with appropriate transceivers (like RS-485)."
        ],
        "limitations": [
            "Slower compared to synchronous protocols like SPI.",
            "Requires strict baud rate matching; slight clock variations can cause data corruption.",
            "Typically limited to point-to-point communication (unless using RS-485)."
        ],
        "industry_use_cases": "UART is heavily used for system diagnostics, communicating with legacy industrial equipment (via RS-232), and interfacing with wireless modules like GSM or Wi-Fi (ESP8266).",
        "best_practices": [
            "Ensure both communicating devices are configured with the exact same baud rate, data bits, parity, and stop bits.",
            "Use hardware flow control (RTS/CTS) or software flow control (XON/XOFF) if data loss occurs at high speeds.",
            "Use interrupts or DMA for receiving data to avoid dropping bytes."
        ],
        "interview_questions": [
            {"q": "How does the receiver in UART know when a new byte is arriving since there is no clock?", "a": "The receiver constantly monitors the RX line. A transition from High (idle state) to Low signifies the 'Start Bit'. The receiver then samples the line at the middle of each subsequent bit period based on the agreed-upon baud rate."}
        ],
        "learning_outcomes": [
            "Configure a UART peripheral with a specific baud rate and frame format.",
            "Transmit and receive data using polling and interrupt methods.",
            "Understand the structure of a UART data frame."
        ]
    },
    "SPI Communication": {
        "topic_overview": "Serial Peripheral Interface (SPI) is a synchronous, full-duplex serial communication protocol used primarily for short-distance communication in embedded systems. It uses a master-slave architecture.",
        "core_concepts": [
            "Master-Slave: One master device controls communication with one or more slave devices.",
            "Synchronous: The master generates a clock signal (SCLK) that synchronizes data transfer.",
            "Four Wires: MOSI (Master Out Slave In), MISO (Master In Slave Out), SCLK (Serial Clock), SS/CS (Slave Select/Chip Select).",
            "Clock Polarity and Phase (CPOL/CPHA): Defines the clock idle state and on which edge data is sampled."
        ],
        "architecture_working_principle": "The master selects a specific slave by pulling its SS line low. It then generates the clock signal. During each clock cycle, the master shifts out one bit on the MOSI line while simultaneously shifting in one bit from the MISO line. It acts like a distributed shift register.",
        "real_world_applications": [
            "Interfacing with high-speed sensors (e.g., accelerometers, gyroscopes).",
            "Communicating with external memory (SD cards, flash memory).",
            "Driving graphical LCD/OLED displays."
        ],
        "advantages": [
            "High data transfer rates (often several megabits per second).",
            "Full-duplex communication (simultaneous transmit and receive).",
            "Simple hardware implementation without complex framing or addressing overhead."
        ],
        "limitations": [
            "Requires more pins than I2C or UART (4 wires + 1 extra wire per slave).",
            "Typically limited to short distances on a single PCB.",
            "No formal standard acknowledgment mechanism; the master assumes the slave received data."
        ],
        "industry_use_cases": "SPI is the protocol of choice when throughput is critical, such as reading uncompressed audio data from an SD card or rapidly updating pixels on an LCD screen.",
        "best_practices": [
            "Verify the CPOL and CPHA requirements of the slave device datasheet and configure the master accordingly.",
            "Manage Slave Select (SS) lines carefully in software, ensuring only one slave is selected at a time.",
            "Keep SPI traces short on the PCB to minimize parasitic capacitance and noise at high speeds."
        ],
        "interview_questions": [
            {"q": "What happens if you have multiple SPI slaves but the microcontroller doesn't have enough hardware SS pins?", "a": "You can use any General Purpose I/O (GPIO) pin as a software-controlled Slave Select. You simply pull the specific GPIO low before starting the SPI transfer and pull it high when finished."}
        ],
        "learning_outcomes": [
            "Understand the SPI master-slave architecture and signal lines.",
            "Configure SPI clock polarity and phase to match a peripheral.",
            "Implement SPI communication to read/write from a sensor or memory device."
        ]
    },
    "I2C Communication": {
        "topic_overview": "Inter-Integrated Circuit (I2C) is a synchronous, half-duplex serial communication protocol that allows multiple masters and multiple slaves to communicate over just two wires.",
        "core_concepts": [
            "Two Wires: SDA (Serial Data) and SCL (Serial Clock). Both require pull-up resistors.",
            "Addressing: Each slave device has a unique 7-bit (or 10-bit) address.",
            "Open-Drain: Devices can only pull lines low; resistors pull them high. Prevents short circuits.",
            "ACK/NACK: An acknowledgment bit is sent after every byte transferred."
        ],
        "architecture_working_principle": "The master initiates communication by generating a Start condition, followed by the 7-bit address of the target slave and a Read/Write bit. The addressed slave responds with an ACK. Data bytes are then transferred, with the receiver acknowledging each byte. The master terminates communication with a Stop condition.",
        "real_world_applications": [
            "Interfacing with slow-speed peripherals like RTCs (Real-Time Clocks), EEPROMs.",
            "Connecting multiple sensors on a single bus (temperature, humidity, ambient light).",
            "Reading configuration data from monitor displays."
        ],
        "advantages": [
            "Requires only two wires regardless of the number of devices on the bus.",
            "Built-in addressing and acknowledgment mechanisms.",
            "Supports multi-master configurations."
        ],
        "limitations": [
            "Slower data transfer rates compared to SPI (typically 100 kHz to 400 kHz, up to a few MHz in specific modes).",
            "Half-duplex communication (cannot transmit and receive simultaneously).",
            "Bus capacitance limits the maximum number of devices and bus length."
        ],
        "industry_use_cases": "I2C is ubiquitous for connecting peripheral ICs on a motherboard or embedded system board where conserving pin count is more important than raw speed.",
        "best_practices": [
            "Calculate pull-up resistor values carefully based on bus capacitance and desired speed.",
            "Ensure unique addresses for all devices on the bus. Some devices have configurable address pins.",
            "Implement software timeouts for I2C operations to prevent the system from hanging if the bus gets stuck."
        ],
        "interview_questions": [
            {"q": "What is 'Clock Stretching' in I2C?", "a": "Clock stretching is a mechanism where a slow slave device holds the SCL line low after receiving a byte to pause communication, giving itself time to process the data before releasing SCL to allow the master to continue."}
        ],
        "learning_outcomes": [
            "Understand the I2C bus topology and open-drain concept.",
            "Explain the I2C frame structure including Start, Address, Data, ACK, and Stop.",
            "Interface an I2C sensor and read its registers."
        ]
    },
    "ADC and DAC": {
         "topic_overview": "Analog-to-Digital Converters (ADCs) and Digital-to-Analog Converters (DACs) are essential interfaces that bridge the physical continuous world (analog) with the discrete computational world (digital).",
         "core_concepts": [
             "Resolution: The number of bits used to represent the signal (e.g., 10-bit, 12-bit). Higher resolution means finer detail.",
             "Sampling Rate: How frequently the analog signal is measured. Must obey the Nyquist theorem.",
             "Reference Voltage: The maximum analog voltage that corresponds to the maximum digital value.",
             "Conversion Time: The time it takes for the ADC to perform one conversion."
         ],
         "architecture_working_principle": "An ADC samples a continuous voltage and assigns it a binary value relative to a reference voltage. A DAC takes a binary value and generates a corresponding continuous voltage or current. Common ADC architectures include Successive Approximation Register (SAR) and Delta-Sigma.",
         "real_world_applications": [
             "ADC: Reading temperature sensors, recording audio via microphones, measuring battery voltage.",
             "DAC: Generating audio signals for speakers, controlling analog motor drives, creating signal generators."
         ],
         "advantages": [
             "Allows microcontrollers to interact with physical real-world phenomena.",
             "High-resolution ADCs/DACs provide excellent precision for measurement and control."
         ],
         "limitations": [
             "Quantization error: The inherent loss of information when converting continuous to discrete values.",
             "Aliasing: High-frequency signals appearing as low frequencies if sampled too slowly.",
             "Susceptible to electrical noise."
         ],
         "industry_use_cases": "In medical devices, ADCs convert tiny electrical signals from the heart (ECG) into digital data for analysis. In audio equipment, DACs convert digital audio files back into sound waves.",
         "best_practices": [
             "Use an anti-aliasing (low-pass) filter before an ADC to remove high frequencies.",
             "Ensure a stable and clean reference voltage, as noise here directly affects measurement accuracy.",
             "Use multiple samples and average them in software to reduce random noise."
         ],
         "interview_questions": [
             {"q": "What is the Nyquist sampling theorem?", "a": "It states that to accurately reconstruct an analog signal, the sampling rate must be at least twice the highest frequency component present in the signal."}
         ],
         "learning_outcomes": [
             "Understand the concepts of sampling, quantization, and resolution.",
             "Configure an ADC to read analog voltage values.",
             "Calculate the physical voltage based on the digital ADC reading."
         ]
     },
     "Sensors and Actuators": {
         "topic_overview": "Sensors and actuators are the hardware components that allow an embedded system to perceive its environment and take physical action. Sensors convert physical phenomena into electrical signals, while actuators do the reverse.",
         "core_concepts": [
             "Transducer: A device that converts one form of energy to another (both sensors and actuators are transducers).",
             "Digital vs. Analog Sensors: Analog sensors output a continuous voltage; digital sensors output discrete data via protocols like I2C/SPI.",
             "Calibration: Adjusting sensor readings to match known standard values.",
             "Drive Capability: Microcontrollers cannot usually drive actuators directly; they require amplifiers or drivers (like motor drivers or relays)."
         ],
         "architecture_working_principle": "A sensor detects a physical change (temperature, light, motion) and alters an electrical property (resistance, voltage), which the MCU reads via ADC or digital protocols. The MCU executes control logic and sends signals to actuators (motors, heaters, LEDs) via GPIO, PWM, or DAC to effect change in the environment.",
         "real_world_applications": [
             "Thermostat: Temperature sensor (Thermistor) and Heating/Cooling actuator (Relay).",
             "Robotics: Proximity sensors (Ultrasonic) and movement actuators (Servo/Stepper Motors).",
             "Smartphones: Orientation sensors (Accelerometer/Gyroscope) and haptic feedback (Vibration Motor)."
         ],
         "advantages": [
             "Enables automation and intelligent interaction with the physical world.",
             "Vast variety of sensors available for almost any physical parameter."
         ],
         "limitations": [
             "Sensors suffer from noise, drift, and non-linearity.",
             "Actuators often require significant power and complex drive circuitry.",
             "Mechanical components in actuators are prone to wear and tear."
         ],
         "industry_use_cases": "Industrial automation relies heavily on sensors (pressure, flow, position) and actuators (pneumatic cylinders, heavy-duty motors) to run manufacturing lines efficiently and safely.",
         "best_practices": [
             "Implement sensor fusion (combining data from multiple sensors) to improve accuracy (e.g., combining accelerometer and gyroscope).",
             "Always use optical isolation or flyback diodes when driving inductive actuators like motors or relays to protect the microcontroller.",
             "Implement calibration routines in software to account for manufacturing variations in sensors."
         ],
         "interview_questions": [
             {"q": "Why do you need a flyback diode when controlling a relay with a microcontroller?", "a": "A relay coil is an inductor. When the current is abruptly turned off, the inductor generates a massive voltage spike (back EMF) that can destroy the switching transistor or microcontroller. The diode provides a safe path for this current to dissipate."}
         ],
         "learning_outcomes": [
             "Interface basic analog and digital sensors with a microcontroller.",
             "Understand the circuitry required to drive common actuators.",
             "Apply signal conditioning and calibration techniques."
         ]
     },
     "PWM Techniques": {
         "topic_overview": "Pulse Width Modulation (PWM) is a technique for getting analog results with digital means. Digital control is used to create a square wave, a signal switched between on and off.",
         "core_concepts": [
             "Duty Cycle: The percentage of one period in which a signal is active (high).",
             "Frequency/Period: How often the PWM cycle repeats.",
             "Resolution: The number of discrete steps the duty cycle can be divided into.",
             "Average Voltage: The perceived analog voltage, calculated as (Duty Cycle * High Voltage)."
         ],
         "architecture_working_principle": "Hardware timers in the microcontroller are configured to count up to a period value and reset. A compare register is used to toggle the output pin state when the counter matches it. Changing the compare register value changes the duty cycle, thereby changing the average power delivered.",
         "real_world_applications": [
             "Dimming LEDs smoothly.",
             "Controlling the speed of DC motors.",
             "Positioning servo motors.",
             "Generating audio signals or basic analog voltages (when passed through a low-pass filter)."
         ],
         "advantages": [
             "Highly efficient power control; switching elements (like transistors) are either fully on or fully off, minimizing power dissipation.",
             "Requires only digital output pins, saving expensive DAC components."
         ],
         "limitations": [
             "Generates electromagnetic interference (EMI) due to rapid switching.",
             "Not a true analog voltage; requires filtering if a smooth DC voltage is needed."
         ],
         "industry_use_cases": "PWM is the standard method for motor control in electric vehicles, drones, and industrial robotics due to its high power efficiency.",
         "best_practices": [
             "Choose a PWM frequency high enough to avoid flickering in LEDs or audible whining in motors, but low enough to minimize switching losses in power electronics.",
             "Use hardware PWM peripherals rather than software 'bit-banging' for stable, jitter-free signals.",
             "Be mindful of the timer resolution; lower frequencies allow for higher duty cycle resolution."
         ],
         "interview_questions": [
             {"q": "How does changing the duty cycle of a PWM signal affect the speed of a DC motor?", "a": "The motor's speed is proportional to the average voltage applied to it. Increasing the duty cycle increases the average voltage, providing more power and thus increasing the speed."}
         ],
         "learning_outcomes": [
             "Configure a microcontroller timer to generate a PWM signal.",
             "Understand the relationship between frequency, duty cycle, and average voltage.",
             "Control motor speed and LED brightness using PWM."
         ]
     },
     "RTOS Fundamentals": {
         "topic_overview": "A Real-Time Operating System (RTOS) is an OS intended to serve real-time applications that process data as it comes in, typically without buffering delays. Processing time requirements are measured in tenths of seconds or shorter increments of time.",
         "core_concepts": [
             "Task/Thread: A semi-independent segment of an application executing its own logic.",
             "Scheduler: The core of the RTOS that decides which task runs at any given time (usually preemptive priority-based).",
             "Context Switch: The process of saving the state of the currently running task and restoring the state of the next task to run.",
             "Synchronization Primitives: Semaphores, Mutexes, and Queues used for task communication and resource management."
         ],
         "architecture_working_principle": "Instead of a single infinite `while(1)` loop, an RTOS divides the application into multiple tasks, each with an assigned priority. A hardware timer provides a 'tick' interrupt. On each tick, the scheduler evaluates task priorities. If a higher priority task is ready to run, it preempts the currently running lower priority task.",
         "real_world_applications": [
             "Complex industrial control systems requiring deterministic timing.",
             "IoT gateways managing multiple network connections and sensor readings simultaneously.",
             "Medical equipment where delays in processing can be life-threatening."
         ],
         "advantages": [
             "Simplifies the design of complex applications by breaking them into manageable, isolated tasks.",
             "Provides deterministic behavior; critical tasks are guaranteed execution time.",
             "Provides built-in mechanisms for inter-task communication and synchronization."
         ],
         "limitations": [
             "Overhead: Context switching and RTOS data structures consume CPU cycles and memory (RAM).",
             "Complexity: Introduces risks like deadlocks, priority inversion, and race conditions if synchronization is not handled correctly.",
             "Steep learning curve compared to bare-metal programming."
         ],
         "industry_use_cases": "FreeRTOS is widely used in IoT devices to manage Wi-Fi stacks, sensor reading, and cloud communication concurrently. VxWorks is used in aerospace (e.g., Mars rovers) for ultra-reliable hard real-time performance.",
         "best_practices": [
             "Keep critical sections (where interrupts are disabled or mutexes are held) as short as possible.",
             "Avoid unbounded priority inversion by using Mutexes with Priority Inheritance.",
             "Size task stacks appropriately to avoid stack overflows, a common RTOS crash cause."
         ],
         "interview_questions": [
             {"q": "What is Priority Inversion and how is it solved?", "a": "Priority inversion happens when a high-priority task is blocked waiting for a resource held by a low-priority task, and a medium-priority task preempts the low-priority task. This delays the high-priority task indefinitely. It is solved using Priority Inheritance, where the low-priority task temporarily inherits the high priority until it releases the resource."}
         ],
         "learning_outcomes": [
             "Understand the difference between bare-metal programming and an RTOS.",
             "Create and schedule tasks with different priorities.",
             "Use queues and semaphores to communicate safely between tasks."
         ]
     },
     "Device Drivers": {
         "topic_overview": "A device driver is a specialized software component that acts as a translator between an operating system (or main application) and a hardware device. It abstracts the hardware specifics, providing a standard interface for the software.",
         "core_concepts": [
             "Abstraction layer: Hides the complex register-level details of the hardware.",
             "API (Application Programming Interface): Standardized functions (e.g., `init()`, `read()`, `write()`) exposed to upper layers.",
             "Hardware Abstraction Layer (HAL): Often provided by chip vendors, it's a lower-level driver that abstracts the MCU's internal peripherals.",
             "Interrupt Handling: Drivers often contain the ISRs for the hardware they manage."
         ],
         "architecture_working_principle": "When an application needs to interact with hardware (e.g., read a temperature), it calls a driver API function (like `sensor_read()`). The driver then performs the necessary low-level operations—setting configuration registers, initiating SPI/I2C communication, waiting for data, and formatting the result before returning it to the application.",
         "real_world_applications": [
             "Writing a driver for a new I2C OLED display.",
             "Developing a driver for a custom FPGA interface.",
             "Creating a generic UART driver that works across different microcontrollers in a family."
         ],
         "advantages": [
             "Code Reusability: A well-written driver can be used in multiple projects.",
             "Portability: Application code doesn't change when hardware changes; only the driver needs updating.",
             "Readability: Main application code is much cleaner without hardware-specific register manipulations."
         ],
         "limitations": [
             "Adding abstraction layers can slightly reduce execution speed and increase code size.",
             "Writing robust drivers requires deep understanding of the hardware datasheet."
         ],
         "industry_use_cases": "In Linux embedded systems, writing custom device drivers (kernel modules) is essential to integrate custom hardware peripherals with the OS so user-space applications can access them via standard file operations (e.g., `/dev/i2c-1`).",
         "best_practices": [
             "Design drivers to be non-blocking. Use state machines or interrupts instead of busy-wait loops.",
             "Provide clear, well-documented APIs.",
             "Decouple the driver logic from hardware specifics by using an underlying HAL."
         ],
         "interview_questions": [
             {"q": "What is the purpose of a Hardware Abstraction Layer (HAL)?", "a": "A HAL provides a standard programming interface for a microcontroller's peripherals, allowing software to be written in a portable way. If the MCU is changed to another in the same family, the application code utilizing the HAL remains mostly unchanged."}
         ],
         "learning_outcomes": [
             "Understand the purpose and structure of a device driver.",
             "Design clear APIs for hardware abstraction.",
             "Write a modular driver for an external sensor or display."
         ]
     },
     "ARM Cortex-M Architecture": {
         "topic_overview": "The ARM Cortex-M architecture is a group of 32-bit RISC ARM processor cores optimized for low-cost and energy-efficient microcontrollers. It dominates the modern 32-bit embedded market.",
         "core_concepts": [
             "Thumb-2 Instruction Set: A mix of 16-bit and 32-bit instructions providing high code density and performance.",
             "NVIC (Nested Vectored Interrupt Controller): Highly deterministic and low-latency interrupt handling built into the core.",
             "SysTick Timer: A standard 24-bit system timer, ideal for RTOS ticks.",
             "Memory Protection Unit (MPU): Hardware to enforce memory access rules, increasing system reliability."
         ],
         "architecture_working_principle": "Cortex-M uses a Harvard architecture with a 3-stage pipeline (fetch, decode, execute). The NVIC handles interrupts in hardware, automatically saving state and supporting tail-chaining (handling back-to-back interrupts without restoring state in between) for minimal latency.",
         "real_world_applications": [
             "Brain of smart home IoT devices.",
             "Motor control in drones and robotics.",
             "Wearable fitness trackers requiring ultra-low power consumption."
         ],
         "advantages": [
             "Exceptional performance-to-power ratio.",
             "Standardized architecture across many vendors (STMicroelectronics, NXP, TI) making code highly portable.",
             "Vast ecosystem of compilers, debuggers, and RTOS support."
         ],
         "limitations": [
             "More complex to initially set up and understand compared to simple 8-bit architectures like AVR or 8051.",
             "Lacks a Memory Management Unit (MMU), so it cannot run full desktop operating systems like standard Linux."
         ],
         "industry_use_cases": "The Cortex-M4 and M7 (with DSP extensions and Floating Point Units) are heavily used in audio processing and motor control applications where complex math is required quickly.",
         "best_practices": [
             "Utilize the CMSIS (Cortex Microcontroller Software Interface Standard) library provided by ARM for portable hardware access.",
             "Leverage the NVIC's priority grouping and tail-chaining features for efficient interrupt management.",
             "Use sleep modes extensively to maximize battery life."
         ],
         "interview_questions": [
             {"q": "What is the primary function of the NVIC in ARM Cortex-M?", "a": "The Nested Vectored Interrupt Controller manages all interrupts and exceptions. It provides low-latency exception entry/exit, prioritizes interrupts, handles nesting (higher priority interrupting lower priority), and supports tail-chaining for efficiency."}
         ],
         "learning_outcomes": [
             "Understand the key features of the Cortex-M processor core.",
             "Utilize CMSIS for portable code development.",
             "Explain the advantages of the NVIC."
         ]
     },
     "Embedded Linux Basics": {
         "topic_overview": "Embedded Linux involves using the Linux kernel and various open-source software components in embedded devices. It provides a robust, scalable, and feature-rich environment for complex systems.",
         "core_concepts": [
             "Bootloader (e.g., U-Boot): Initializes hardware and loads the kernel into RAM.",
             "Linux Kernel: Manages hardware, memory, scheduling, and provides drivers.",
             "Root Filesystem (rootfs): Contains the libraries, binaries, and configuration files needed by the system.",
             "Device Tree: A data structure describing the hardware topology, allowing a single kernel binary to support multiple boards."
         ],
         "architecture_working_principle": "Power on -> Boot ROM loads Bootloader -> Bootloader initializes RAM and loads Kernel and Device Tree -> Kernel initializes drivers based on Device Tree and mounts Rootfs -> Kernel starts 'init' process -> 'init' launches user-space applications.",
         "real_world_applications": [
             "Smart TVs and set-top boxes.",
             "Automotive infotainment systems.",
             "Industrial IoT gateways and routers."
         ],
         "advantages": [
             "Access to a vast ecosystem of open-source software and networking protocols.",
             "Hardware abstraction makes application development easier and highly portable.",
             "Memory protection and multi-threading capabilities for complex applications."
         ],
         "limitations": [
             "Requires microprocessors with MMUs and significant memory (RAM/Flash), increasing hardware cost.",
             "Boot time is longer than RTOS or bare-metal systems.",
             "Not suitable for hard real-time requirements without specific kernel patches (like PREEMPT_RT)."
         ],
         "industry_use_cases": "Raspberry Pi and BeagleBone are popular development boards showcasing Embedded Linux. Industry uses tools like Yocto Project or Buildroot to create custom, minimal Linux distributions tailored precisely to their hardware.",
         "best_practices": [
             "Use build systems like Yocto or Buildroot for reproducible builds instead of manually assembling distributions.",
             "Write applications in user-space; only write kernel modules when direct hardware access is absolutely necessary.",
             "Optimize boot time by removing unused kernel modules and delaying non-critical services."
         ],
         "interview_questions": [
             {"q": "What is the purpose of the Device Tree in Embedded Linux?", "a": "The Device Tree is a data structure that describes the hardware components of a specific board (like memory addresses, interrupts for peripherals). It allows the Linux kernel to discover the hardware configuration dynamically, meaning one compiled kernel can run on many different hardware boards."}
         ],
         "learning_outcomes": [
             "Identify the main components of an Embedded Linux system.",
             "Understand the boot process from power-on to user space.",
             "Explain the role of the Device Tree."
         ]
     },
     "IoT with Embedded Systems": {
         "topic_overview": "The Internet of Things (IoT) involves connecting physical embedded devices to the internet, allowing them to collect data, communicate with cloud services, and be controlled remotely.",
         "core_concepts": [
             "Edge Nodes: The physical devices (sensors/actuators) gathering data.",
             "Gateway: A device that aggregates data from nodes and bridges them to the internet.",
             "Communication Protocols: MQTT, CoAP, HTTP for cloud communication; BLE, Zigbee, LoRa for local node communication.",
             "Security: TLS/SSL encryption, secure boot, and mutual authentication."
         ],
         "architecture_working_principle": "An embedded device (node) collects sensor data, formats it into a lightweight protocol payload (like JSON over MQTT), and transmits it via a wireless module (Wi-Fi, Cellular) to a cloud broker. Cloud applications process the data and can send commands back down to the device to trigger actuators.",
         "real_world_applications": [
             "Smart Home automation (smart thermostats, lights).",
             "Precision agriculture (monitoring soil moisture and weather).",
             "Industrial predictive maintenance (monitoring machine vibrations)."
         ],
         "advantages": [
             "Enables remote monitoring, control, and data analytics on a massive scale.",
             "Facilitates new business models (e.g., predictive maintenance as a service)."
         ],
         "limitations": [
             "Security is a major concern; devices are often targeted by hackers.",
             "Power consumption is critical for battery-operated nodes communicating wirelessly.",
             "Interoperability issues due to fragmented standards and protocols."
         ],
         "industry_use_cases": "AWS IoT Core and Azure IoT Hub provide cloud infrastructure tailored for managing millions of connected embedded devices, handling secure messaging and device twin synchronization.",
         "best_practices": [
             "Always use encrypted communication (TLS) when transmitting data over the internet.",
             "Implement Over-The-Air (OTA) update capabilities to patch security vulnerabilities in deployed devices.",
             "Use lightweight protocols like MQTT which are optimized for constrained devices."
         ],
         "interview_questions": [
             {"q": "Why is MQTT preferred over HTTP for IoT devices?", "a": "MQTT is a lightweight publish-subscribe protocol with a much smaller header overhead than HTTP. It maintains a persistent connection, uses less bandwidth, consumes less power, and handles unreliable networks better, making it ideal for constrained embedded devices."}
         ],
         "learning_outcomes": [
             "Understand IoT architectures (Node, Gateway, Cloud).",
             "Compare different IoT communication protocols.",
             "Recognize the critical importance of security in IoT."
         ]
     },
     "Power Management in Embedded Systems": {
         "topic_overview": "Power management involves designing hardware and software strategies to minimize energy consumption, crucial for battery-operated devices to maximize their operational lifespan.",
         "core_concepts": [
             "Active Power: Power consumed when the CPU is running.",
             "Static Power (Leakage): Power consumed even when idle, significant in modern small-geometry silicon.",
             "Sleep Modes: Hardware states that disable parts of the chip (clocks, peripherals, CPU) to save power.",
             "Wakeup Sources: Interrupts (timers, GPIO, communication) configured to bring the system out of sleep."
         ],
         "architecture_working_principle": "The microcontroller is kept in its lowest possible power state for the majority of the time. It briefly wakes up via an RTC timer or external interrupt, quickly performs its required task (e.g., reads a sensor, transmits data), and immediately goes back to sleep. This is called a duty-cycling approach.",
         "real_world_applications": [
             "Wireless sensor nodes running for years on a coin cell battery.",
             "Smartwatches managing power between display, Bluetooth, and sensors.",
             "Implantable medical devices."
         ],
         "advantages": [
             "Dramatically extends battery life.",
             "Reduces thermal output, sometimes eliminating the need for heatsinks.",
             "Allows the use of smaller, cheaper batteries."
         ],
         "limitations": [
             "Entering and exiting deep sleep modes takes time and consumes a burst of energy.",
             "Deep sleep modes often turn off RAM, requiring state to be saved to non-volatile memory or re-initialized.",
             "Software complexity increases significantly."
         ],
         "industry_use_cases": "Bluetooth Low Energy (BLE) beacons utilize aggressive power management, broadcasting a tiny packet of data periodically and sleeping for the rest of the time, allowing them to run for years on small batteries.",
         "best_practices": [
             "Use an event-driven architecture (interrupts) instead of polling.",
             "Turn off peripherals (ADC, UART) and their clocks completely before entering sleep.",
             "Design the system to execute tasks at the highest clock speed possible to finish quickly, then immediately enter deep sleep (Race-to-Sleep strategy)."
         ],
         "interview_questions": [
             {"q": "What is the 'Race-to-Sleep' strategy in power management?", "a": "It involves running the microcontroller at a high clock speed to complete a task as fast as possible, and then immediately entering a deep sleep state. Because the active time is extremely short, the overall energy consumed is often less than running slowly for a longer period."}
         ],
         "learning_outcomes": [
             "Identify the sources of power consumption in an embedded system.",
             "Utilize microcontroller sleep modes to reduce power.",
             "Implement event-driven software architectures for low power."
         ]
     },
     "Embedded Project Development Lifecycle": {
         "topic_overview": "The Embedded Project Development Lifecycle outlines the systematic process of designing, developing, testing, and deploying an embedded system, encompassing both hardware and software disciplines.",
         "core_concepts": [
             "Requirements Engineering: Defining exactly what the system must do, including constraints (size, power, cost).",
             "Architecture Design: Partitioning tasks between hardware and software; selecting major components (MCU, sensors).",
             "Implementation: Parallel development of custom hardware (PCB design) and software (firmware).",
             "Integration & Testing: Combining hardware and software, debugging, and verifying against requirements.",
             "Maintenance: Bug fixes, adding features, or OTA updates post-deployment."
         ],
         "architecture_working_principle": "Unlike pure software development, embedded systems require a co-design approach. The V-Model is often used, where the left side represents design down to implementation, and the right side represents testing up through system validation.",
         "real_world_applications": [
             "Developing a new consumer smart home product.",
             "Creating a custom medical diagnostic tool.",
             "Building a flight control system for a UAV."
         ],
         "advantages": [
             "Provides a structured approach, reducing risks and costly hardware iterations.",
             "Ensures both hardware and software teams are aligned.",
             "Improves product quality and reliability."
         ],
         "limitations": [
             "Hardware fabrication times (PCB manufacturing) introduce significant delays in the cycle.",
             "Changes in hardware design late in the cycle are extremely expensive and time-consuming."
         ],
         "industry_use_cases": "Companies developing safety-critical systems (automotive, medical) must strictly follow rigorous development lifecycles and documentation standards (like ISO 26262 for automotive) for regulatory compliance.",
         "best_practices": [
             "Use development boards and software simulators early in the cycle before custom hardware is ready.",
             "Implement automated testing (Hardware-in-the-Loop) to verify firmware against simulated hardware scenarios.",
             "Design for Testability (DFT) and Manufacturability (DFM) from the beginning."
         ],
         "interview_questions": [
             {"q": "What is 'Hardware-in-the-Loop' (HIL) testing?", "a": "HIL testing involves connecting the actual embedded system hardware to a simulator that mimics the real-world environment and physical plant. It allows for rigorous, automated testing of the firmware in extreme or dangerous scenarios without needing the actual physical machinery."}
         ],
         "learning_outcomes": [
             "Understand the phases of the embedded development lifecycle.",
             "Appreciate the challenges of hardware-software co-design.",
             "Recognize the importance of structured testing methodologies."
         ]
     }
}

for title in topics:
    if title not in content_templates:
        continue
    
    data = content_templates[title]
    
    json_structure = {
        "title": title,
        "topic_overview": data["topic_overview"],
        "core_concepts": data["core_concepts"],
        "architecture_working_principle": data["architecture_working_principle"],
        "real_world_applications": data["real_world_applications"],
        "advantages": data["advantages"],
        "limitations": data["limitations"],
        "industry_use_cases": data["industry_use_cases"],
        "best_practices": data["best_practices"],
        "interview_questions": data["interview_questions"],
        "learning_outcomes": data["learning_outcomes"]
    }
    
    filename = os.path.join(output_dir, f"{title}.json")
    with open(filename, 'w') as f:
        json.dump(json_structure, f, indent=4)
    print(f"Generated {filename}")

