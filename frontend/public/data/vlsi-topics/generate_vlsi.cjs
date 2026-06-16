const fs = require('fs');
const path = require('path');

const VLSI_TOPICS = [
  "VLSI Design - Home", "VLSI Design - Digital System", "VLSI Design - FPGA Technology",
  "VLSI Design - MOS Transistor", "VLSI Design - MOS Inverter", "Combinational MOS Logic Circuits",
  "Sequential MOS Logic Circuits", "VHDL - Introduction", "VHDL - Combinational Circuits",
  "VHDL - Sequential Circuits", "Verilog HDL - Introduction", "Verilog HDL - Combinational Logic",
  "Verilog HDL - Sequential Logic", "CMOS Technology", "ASIC Design Flow", "FPGA Design Flow",
  "Logic Gates", "Flip-Flops", "Counters", "Shift Registers", "Memory Design", "SRAM", "DRAM",
  "FinFET Technology", "Low Power VLSI Design", "Physical Design", "Static Timing Analysis (STA)",
  "DFT (Design for Testability)", "RTL Design", "Synthesis", "Floor Planning", "Placement & Routing",
  "Clock Tree Synthesis", "Sign-Off Verification", "VLSI Interview Questions"
];

const dir = path.join(__dirname);
const fallbackPath = path.join(dir, 'Fallback.json');
const fallbackData = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));

const TOPIC_DATA = {
  "VLSI Design - FPGA Technology": {
    "introduction": {
      "definition": "Field-Programmable Gate Arrays (FPGAs) are semiconductor devices based around a matrix of configurable logic blocks (CLBs) connected via programmable interconnects.",
      "purpose": "To enable rapid prototyping and flexible hardware acceleration that can be reprogrammed in the field after manufacturing.",
      "importance": "FPGAs bridge the gap between software flexibility and hardware performance, heavily used in 5G, AI inference, and prototyping ASIC designs."
    },
    "detailed_theory": "FPGA architecture primarily relies on Look-Up Tables (LUTs) to implement combinational logic, and Flip-Flops for sequential logic. These elements are grouped into Configurable Logic Blocks (CLBs). Modern FPGAs also contain Block RAM (BRAM), DSP slices, and high-speed transceivers.\n\nUnlike ASICs, FPGAs do not require a costly manufacturing tape-out process. Instead, developers use synthesis tools (like Xilinx Vivado or Intel Quartus) to compile Verilog/VHDL into a bitstream. This bitstream configures the SRAM-based routing switches and LUTs on the FPGA at power-up.",
    "working_principle": {
      "steps": ["Specification: Define hardware requirements.", "RTL Design: Code in Verilog/VHDL.", "Synthesis: Map RTL to FPGA LUTs/Registers.", "Implementation: Place and Route (P&R) on the specific FPGA fabric.", "Bitstream Generation: Create binary configuration file.", "Programming: Load bitstream onto FPGA."],
      "internal_operation": "LUTs function as tiny memory units that output a pre-calculated result for any given input combination. The routing matrix connects these LUTs to form complex circuits.",
      "signal_flow": "Input Pin -> I/O Block -> Routing Matrix -> CLB (LUT -> Flip-Flop) -> Routing Matrix -> Output Pin."
    },
    "architecture": {
      "description": "An island-style architecture with CLBs surrounded by routing channels and I/O blocks at the periphery.",
      "block_diagram_text": "+--------------------------------+\n|      I/O Blocks (IOB)          |\n|  +---+ +---+ +---+ +---+       |\n|  |CLB| |CLB| |CLB| |CLB|       |\n|  +---+ +---+ +---+ +---+       |\n|   Programmable Interconnect    |\n|  +---+ +---+ +---+ +---+       |\n+--------------------------------+",
      "components": ["CLB: Configurable Logic Block containing LUTs.", "Interconnect: Programmable routing switches.", "DSP Slices: Dedicated hardware multipliers.", "BRAM: Block RAM for data storage."]
    },
    "hdl_code": {
      "vhdl": "-- FPGA Blinking LED\nentity blink is port(clk: in bit; led: out bit); end blink;\narchitecture rtl of blink is signal cnt: integer; begin\nprocess(clk) begin if clk'event and clk='1' then cnt <= cnt + 1; led <= cnt(24); end if; end process; end rtl;",
      "verilog": "module blink(input clk, output led);\n  reg [24:0] cnt;\n  always @(posedge clk) cnt <= cnt + 1;\n  assign led = cnt[24];\nendmodule",
      "explanation": "A simple counter running on the FPGA's clock. The 25th bit toggles slowly enough to be visible on an LED."
    },
    "examples": [{"level":"Basic","title":"LUT Implementation","code":"assign Y = (A & B) | C;","output":"Mapped to a single 3-input LUT.","explanation":"The synthesis tool converts the boolean equation into a truth table stored in the LUT."}],
    "design_errors": [{"title":"High Routing Congestion","description":"Too much logic packed into a small area.","cause":"Complex interconnects exceeding available routing tracks.","fix":"Optimize RTL, increase pipelining, or use a larger FPGA."}],
    "fpga_asic_applications": "FPGA: ASIC Prototyping, Radar/Sonar, HFT (High-Frequency Trading), Video Processing.",
    "summary": ["FPGAs consist of CLBs, LUTs, and programmable routing.", "They are reprogrammable, offering lower NRE costs than ASICs.", "Tools like Vivado and Quartus map RTL to FPGA resources.", "Ideal for low-volume production and rapid prototyping."]
  },
  "VLSI Design - MOS Transistor": {
    "introduction": {
      "definition": "The Metal-Oxide-Semiconductor Field-Effect Transistor (MOSFET) is a four-terminal device that controls current flow using an applied electric field.",
      "purpose": "To act as the fundamental electronic switch in all modern digital integrated circuits.",
      "importance": "The miniaturization of the MOS transistor according to Moore's Law has driven the digital revolution, enabling billions of transistors on a single chip."
    },
    "detailed_theory": "A MOS transistor consists of a Gate, Drain, Source, and Body (Substrate). In an NMOS, an N-type channel forms in a P-type substrate when a positive voltage is applied to the gate, allowing electrons to flow from source to drain. PMOS works conversely with holes.\n\nThe transistor operates in three main regions: Cut-off (switch is OFF), Linear/Triode (acts as a resistor), and Saturation (acts as a constant current source, switch is fully ON). The Threshold Voltage (Vth) is the minimum gate voltage required to create the conducting channel. Drain current equations vary depending on the operating region.",
    "working_principle": {
      "steps": ["Apply voltage (Vgs) to the Gate terminal.", "If Vgs < Vth, the transistor is in Cut-off (OFF).", "If Vgs > Vth, an inversion layer (channel) forms.", "Apply voltage (Vds) across Drain and Source.", "Current flows through the channel (ON state)."],
      "internal_operation": "The gate acts as a capacitor. Applying voltage accumulates charge, repelling majority carriers and attracting minority carriers to form a conductive channel.",
      "signal_flow": "Gate Voltage controls Channel Conductivity -> Source/Drain Voltage drives Current -> Current forms Output Signal."
    },
    "architecture": {
      "description": "Cross-sectional structure of a planar MOSFET.",
      "block_diagram_text": "       Gate (Poly)\n        |---|\n      --|Ox |--\nSource [N+]   [N+] Drain\n-----------------------\n    P-Type Substrate",
      "components": ["Gate: Controls the channel.", "Oxide (SiO2): Insulates gate from substrate.", "Source/Drain: Highly doped terminals.", "Substrate (Body): Base material."]
    },
    "hdl_code": {
      "vhdl": "-- Behavioral model of MOS switch\nentity nmos is port(g, d, s: inout bit); end nmos;",
      "verilog": "// Switch-level Verilog\nmodule mos_switch(in, out, ctrl);\n  tranif1 n1(in, out, ctrl);\nendmodule",
      "explanation": "At the HDL level, transistors are rarely modeled individually except in switch-level simulation. `tranif1` models an NMOS pass transistor."
    },
    "summary": ["MOSFETs are the building blocks of digital logic.", "NMOS conducts with High gate, PMOS conducts with Low gate.", "Regions: Cut-off, Linear, Saturation.", "Scaling challenges include short-channel effects."]
  },
  "VLSI Design - MOS Inverter": {
    "introduction": {
      "definition": "The CMOS Inverter is the simplest logic gate, consisting of one PMOS and one NMOS transistor, outputting the logical complement of its input.",
      "purpose": "To invert a digital signal and restore signal integrity across logic stages.",
      "importance": "It forms the foundation of all CMOS logic design. Understanding its VTC, delay, and power characteristics is crucial for VLSI design."
    },
    "detailed_theory": "In a CMOS inverter, the PMOS source is tied to VDD and the NMOS source to GND. When Input = 0 (0V), NMOS is OFF and PMOS is ON, pulling the Output to VDD (Logic 1). When Input = 1 (VDD), PMOS is OFF and NMOS is ON, pulling Output to GND (Logic 0).\n\nThe Voltage Transfer Characteristic (VTC) curve shows the output voltage versus input voltage. Key points include VIL, VIH, VOL, and VOH, which define the Noise Margins. The switching threshold is where Vin = Vout. Power dissipation consists of dynamic power (charging/discharging capacitors) and static power (leakage current).",
    "working_principle": {
      "steps": ["Input changes from 0 to 1.", "PMOS turns off, cutting off VDD.", "NMOS turns on, creating path to GND.", "Output capacitance discharges to 0V.", "Input changes from 1 to 0: NMOS off, PMOS on, output charges to VDD."],
      "internal_operation": "The complementary action ensures that a direct path from VDD to GND only exists briefly during switching, resulting in near-zero static power dissipation.",
      "signal_flow": "Input Node -> Transistor Gates -> Transistor Channels toggle -> Output Node charges/discharges."
    },
    "architecture": {
      "description": "Schematic of a standard CMOS Inverter.",
      "block_diagram_text": "   VDD\n    |\n  |PMOS|\n    |---- Output\n  |NMOS|\n    |\n   GND",
      "components": ["PMOS Pull-up Network (PUN).", "NMOS Pull-down Network (PDN).", "Input terminal connected to both gates.", "Output terminal connected to both drains."]
    },
    "hdl_code": {
      "vhdl": "entity inverter is port(a: in bit; y: out bit); end inverter;\narchitecture rtl of inverter is begin y <= not a; end rtl;",
      "verilog": "module inverter(input a, output y);\n  assign y = ~a;\nendmodule",
      "explanation": "Behavioral representation using the logical NOT operator. The synthesis tool will map this to a standard cell CMOS inverter."
    },
    "summary": ["CMOS inverter uses complementary PMOS and NMOS.", "It provides full rail-to-rail output swing.", "Static power is near zero; dynamic power dominates.", "Noise margins determine robustness against interference."]
  },
  "Combinational MOS Logic Circuits": {
    "introduction": {
      "definition": "Combinational logic circuits are circuits whose outputs are solely determined by the present values of their inputs, with no memory of past states.",
      "purpose": "To perform Boolean logic operations such as AND, OR, NAND, NOR, and XOR.",
      "importance": "They form the datapath elements of a processor, including ALUs, multiplexers, and decoders."
    },
    "detailed_theory": "In CMOS combinational logic, a Pull-Up Network (PUN) of PMOS transistors connects the output to VDD, and a Pull-Down Network (PDN) of NMOS transistors connects the output to GND. The PUN and PDN are logical duals.\n\nFor a NAND gate, NMOS transistors are in series and PMOS are in parallel. For a NOR gate, NMOS are in parallel and PMOS are in series. Complex logic gates (AOI - AND-OR-Invert) can be designed by combining series/parallel transistor structures to implement arbitrary Boolean functions in a single stage.",
    "working_principle": {
      "steps": ["Inputs apply logic levels to transistor gates.", "Transistors in PUN and PDN turn ON or OFF.", "If PDN conducts, output is pulled to GND (Logic 0).", "If PUN conducts, output is pulled to VDD (Logic 1).", "PUN and PDN are mutually exclusive."],
      "internal_operation": "Transistors act as switches. Series connection requires ALL inputs to be ON (AND logic). Parallel connection requires ANY input to be ON (OR logic).",
      "signal_flow": "Inputs -> Transistor Networks -> Output Node Evaluation."
    },
    "architecture": {
      "description": "General structure of CMOS Combinational Logic.",
      "block_diagram_text": "    VDD\n     |\n  [ PUN (PMOS) ]\n     |---- Output\n  [ PDN (NMOS) ]\n     |\n    GND",
      "components": ["PUN: PMOS transistors passing Logic 1.", "PDN: NMOS transistors passing Logic 0.", "Inputs: Drive gates of both networks."]
    },
    "hdl_code": {
      "vhdl": "architecture rtl of gates is begin\n  y_nand <= not (a and b);\n  y_nor <= not (a or b);\nend rtl;",
      "verilog": "module gates(input a, b, output y_nand, y_nor);\n  assign y_nand = ~(a & b);\n  assign y_nor = ~(a | b);\nendmodule",
      "explanation": "Bitwise operators represent the logic. Synthesis maps these directly to NAND/NOR standard cells."
    },
    "summary": ["Output depends only on current inputs.", "Implemented using dual PUN (PMOS) and PDN (NMOS) networks.", "NAND and NOR are universal gates.", "Timing analysis focuses on longest propagation delay."]
  },
  "Sequential MOS Logic Circuits": {
    "introduction": {
      "definition": "Sequential logic circuits are circuits whose outputs depend on both current inputs and the past sequence of inputs, requiring memory elements.",
      "purpose": "To store state information and synchronize data flow across clock cycles.",
      "importance": "They are the basis for registers, memory, counters, and Finite State Machines (FSMs)."
    },
    "detailed_theory": "Sequential circuits use bistable elements like Latches and Flip-Flops. A latch is level-sensitive (transparent when clock is high), while a flip-flop is edge-triggered (captures data only on clock transition).\n\nThe most common element is the D-type Master-Slave Flip-Flop, which uses back-to-back latches to prevent race conditions. Proper operation requires meeting Setup Time (data stable before clock edge) and Hold Time (data stable after clock edge). Violations lead to metastability, where the output oscillates or settles unpredictably.",
    "working_principle": {
      "steps": ["Data arrives at the D input.", "Clock edge transitions (e.g., Low to High).", "Master latch captures input, Slave latch outputs it.", "Output Q reflects D at the moment of the clock edge.", "Output remains stable until the next clock edge."],
      "internal_operation": "Feedback loops (cross-coupled inverters) retain the logical state indefinitely as long as power is maintained.",
      "signal_flow": "Combinational Logic -> Setup -> Clock Edge -> Flip-Flop Captures State -> Output Feedback."
    },
    "architecture": {
      "description": "D Flip-Flop constructed from Master and Slave Latches.",
      "block_diagram_text": "  D ---> [Master Latch] ---> [Slave Latch] ---> Q\n           ^                   ^\n CLK ------|---(Inverter)------|",
      "components": ["Master Latch: Transparent when CLK=0.", "Slave Latch: Transparent when CLK=1.", "Clock Inverter: Ensures only one latch is transparent at a time."]
    },
    "hdl_code": {
      "vhdl": "process(clk) begin\n  if rising_edge(clk) then\n    q <= d;\n  end if;\nend process;",
      "verilog": "always @(posedge clk) begin\n  q <= d;\nend",
      "explanation": "The 'posedge' or 'rising_edge' keyword infers an edge-triggered flip-flop during synthesis."
    },
    "summary": ["Sequential logic incorporates memory.", "Latches are level-sensitive, Flip-Flops are edge-triggered.", "Subject to Setup and Hold timing constraints.", "Used to build registers, counters, and FSMs."]
  },
  "VHDL - Introduction": {
    "introduction": {
      "definition": "VHDL (VHSIC Hardware Description Language) is a strongly typed, concurrent programming language used to model electronic systems.",
      "purpose": "To describe the behavior and structure of digital logic circuits for simulation and synthesis.",
      "importance": "Standardized by IEEE, it is widely used in defense, aerospace, and telecommunications for highly reliable FPGA and ASIC design."
    },
    "detailed_theory": "A VHDL design is composed of an 'Entity' and an 'Architecture'. The Entity defines the interface (ports), while the Architecture defines the internal behavior or structure.\n\nVHDL supports different modeling styles: Dataflow (using concurrent signal assignments), Behavioral (using processes and sequential statements like if/case), and Structural (instantiating and wiring other entities). Signals in VHDL represent physical wires and are updated at the end of a simulation delta cycle, modeling concurrent hardware execution.",
    "working_principle": {
      "steps": ["Define Entity: Specify input and output ports.", "Define Architecture: Write the logic.", "Compile: Tool checks syntax and strong typing.", "Simulate: Verify timing and functionality using a Testbench.", "Synthesize: Map VHDL to physical gates."],
      "internal_operation": "Simulation operates on an event-driven engine. Processes suspend until signals in their sensitivity list change, triggering re-evaluation.",
      "signal_flow": "Testbench Stimulus -> Entity Ports -> Architecture Logic -> Output Ports -> Assertion Checks."
    },
    "architecture": {
      "description": "VHDL design file structure.",
      "block_diagram_text": "LIBRARY IEEE;\nUSE IEEE.STD_LOGIC_1164.ALL;\n\nENTITY my_module IS\n  PORT ( a : IN STD_LOGIC; b : OUT STD_LOGIC );\nEND my_module;\n\nARCHITECTURE behavior OF my_module IS\nBEGIN\n  b <= NOT a;\nEND behavior;",
      "components": ["Library/Use clauses: Import standard types.", "Entity: Interface declaration.", "Architecture: Implementation details.", "Process: Sequential execution block."]
    },
    "hdl_code": {
      "vhdl": "entity half_adder is\n port(a, b: in bit; sum, carry: out bit);\nend half_adder;\narchitecture dataflow of half_adder is\nbegin\n sum <= a xor b;\n carry <= a and b;\nend dataflow;",
      "verilog": "// Equivalent Verilog\nmodule half_adder(input a, b, output sum, carry);\n assign sum = a ^ b;\n assign carry = a & b;\nendmodule",
      "explanation": "This shows a Dataflow VHDL architecture. Concurrent signal assignments execute simultaneously, accurately representing parallel hardware."
    },
    "summary": ["VHDL is strongly typed and highly deterministic.", "An Entity defines ports; Architecture defines logic.", "Supports Dataflow, Behavioral, and Structural modeling.", "Uses processes for sequential, clock-driven logic."]
  },
  "VHDL - Combinational Circuits": {
    "introduction": {
      "definition": "VHDL combinational circuit design involves modeling logic where outputs react immediately to input changes without clocks.",
      "purpose": "To implement decoders, multiplexers, ALUs, and encoders in VHDL.",
      "importance": "Combinational logic forms the data transformation pathways between registers in digital systems."
    },
    "detailed_theory": "In VHDL, combinational logic can be modeled using concurrent assignment statements (`<=`), `when...else` clauses, `with...select` statements, or within a `process` using `if...then...else` or `case` statements.\n\nWhen using a process for combinational logic, ALL inputs read by the process must be included in the sensitivity list. Failure to do so leads to simulation-synthesis mismatch. Furthermore, all possible execution paths must assign a value to the output signals to avoid inferring unwanted latches.",
    "working_principle": {
      "steps": ["Inputs change state.", "Concurrent assignments re-evaluate automatically.", "Processes trigger if inputs are in sensitivity list.", "Logic conditions (if/case) determine output.", "Outputs update immediately (after delta delay)."],
      "internal_operation": "No clock edge is required. The logic flows continuously from input ports to output ports.",
      "signal_flow": "Input Ports -> Combinational Equations -> Output Ports."
    },
    "architecture": {
      "description": "Multiplexer VHDL implementation.",
      "block_diagram_text": "SEL = 0 -> Pass A to Y\nSEL = 1 -> Pass B to Y\n\n  A --\\___ Y\n  B --/",
      "components": ["Inputs: A, B.", "Select Line: SEL.", "Output: Y.", "Logic: 2-to-1 routing."]
    },
    "hdl_code": {
      "vhdl": "architecture mux of mux21 is\nbegin\n  process(a, b, sel)\n  begin\n    if sel = '0' then y <= a;\n    else y <= b;\n    end if;\n  end process;\nend mux;",
      "verilog": "// Equivalent Verilog\nassign y = sel ? b : a;",
      "explanation": "A process-based multiplexer. Note that 'a', 'b', and 'sel' are all in the sensitivity list, ensuring purely combinational behavior without latches."
    },
    "summary": ["Modeled using concurrent statements or processes.", "Sensitivity lists must be complete.", "Avoid incomplete assignments to prevent latches.", "Used for routing, arithmetic, and logic operations."]
  },
  "VHDL - Sequential Circuits": {
    "introduction": {
      "definition": "VHDL sequential circuit design involves modeling logic that changes state based on a clock signal.",
      "purpose": "To design registers, counters, and Finite State Machines (FSMs) in VHDL.",
      "importance": "Proper modeling of clock edges and resets is critical for synthesis into flip-flops and stable synchronous designs."
    },
    "detailed_theory": "Sequential logic in VHDL is exclusively modeled using `process` blocks. The sensitivity list typically contains only the clock signal (and an asynchronous reset, if used). The `rising_edge(clk)` or `clk'event and clk='1'` condition is used to infer edge-triggered flip-flops.\n\nVariables (using `:=`) within a process update immediately, while Signals (using `<=`) update at the end of the process execution. Understanding this difference is crucial for writing correct sequential VHDL. State machines are typically written using multi-process architectures (one for state register, one for next-state logic).",
    "working_principle": {
      "steps": ["Clock transitions from '0' to '1'.", "Process triggers and evaluates the `rising_edge` condition.", "Statements inside the block execute.", "RHS values are evaluated.", "Signals update to new values at the end of the delta cycle."],
      "internal_operation": "The synthesis tool recognizes the clock condition template and maps the signals assigned within the block to the Q outputs of D flip-flops.",
      "signal_flow": "Clock Edge -> Evaluate Next State Logic -> Update Flip-Flop Registers."
    },
    "architecture": {
      "description": "Synchronous Counter VHDL implementation.",
      "block_diagram_text": "       +-----(+1)-----+ \n       |              | \n  CLK -> [ Register ] --+--> Count Output\n         | \n  RST ---+",
      "components": ["Clock: Triggers updates.", "Reset: Synchronous or Asynchronous clear.", "Register: Stores current count.", "Adder: Computes next count."]
    },
    "hdl_code": {
      "vhdl": "process(clk, areset)\nbegin\n  if areset = '1' then\n    q <= '0';\n  elsif rising_edge(clk) then\n    q <= d;\n  end if;\nend process;",
      "verilog": "always @(posedge clk or posedge areset) begin\n  if (areset) q <= 1'b0;\n  else q <= d;\nend",
      "explanation": "This VHDL process infers a D Flip-Flop with an asynchronous active-high reset. 'areset' is in the sensitivity list because it must trigger the process immediately, independently of the clock."
    },
    "summary": ["Modeled using processes with clock edge conditions.", "Sensitivity list contains only clk and async resets.", "Signals update at the end of the process.", "Used for state retention, counters, and pipelines."]
  },
  "Verilog HDL - Introduction": {
    "introduction": {
      "definition": "Verilog HDL is a hardware description language with a C-like syntax used to model electronic systems at various levels of abstraction.",
      "purpose": "To design, simulate, and synthesize digital circuits efficiently.",
      "importance": "Verilog is the dominant HDL in the ASIC industry and forms the basis for SystemVerilog, the modern verification standard."
    },
    "detailed_theory": "A Verilog design is encapsulated in a `module`, which communicates with the outside world through `ports` (input, output, inout). Internal signals are declared as `wire` (for combinational nets) or `reg` (for variables storing values in procedural blocks, not necessarily hardware registers).\n\nVerilog supports structural modeling (instantiating gates/modules), dataflow modeling (using `assign` statements), and behavioral modeling (using `always` and `initial` blocks). Blocking (`=`) assignments execute sequentially, while non-blocking (`<=`) assignments execute concurrently, a crucial distinction when modeling sequential logic.",
    "working_principle": {
      "steps": ["Module Definition: Declare name and ports.", "Internal Declarations: Define wires and regs.", "Behavioral Blocks: Write `always` blocks for logic.", "Continuous Assignments: Write `assign` statements.", "Testbench: Instantiate module and apply stimulus."],
      "internal_operation": "Simulators evaluate continuous assignments immediately when RHS changes, and `always` blocks when signals in the sensitivity list (`@(...)`) change.",
      "signal_flow": "Inputs -> Wires/Assigns (Dataflow) -> Always Blocks (Behavioral) -> Outputs."
    },
    "architecture": {
      "description": "Basic Verilog Module Structure.",
      "block_diagram_text": "module my_design (\n  input wire clk,\n  output reg out_val\n);\n  // Internal Logic\nendmodule",
      "components": ["Module: The fundamental block.", "Ports: input, output, inout.", "Data Types: wire, reg.", "Procedural Blocks: always, initial."]
    },
    "hdl_code": {
      "vhdl": "-- Equivalent VHDL\nentity mux is port(s, a, b: in bit; y: out bit); end mux;\narchitecture rtl of mux is begin y <= b when s='1' else a; end rtl;",
      "verilog": "module mux21 (input sel, a, b, output y);\n  assign y = sel ? b : a;\nendmodule",
      "explanation": "A simple 2-to-1 multiplexer using the conditional ternary operator in a continuous assignment. 'y' is a wire type by default."
    },
    "summary": ["Verilog has C-like syntax and is industry-standard.", "Modules are the basic building blocks.", "Uses 'assign' for combinational, 'always' for procedural.", "Non-blocking '<=' for sequential, blocking '=' for combinational logic inside always blocks."]
  },
  "ASIC Design Flow": {
    "introduction": {
      "definition": "The Application-Specific Integrated Circuit (ASIC) Design Flow is a structured methodology for designing custom chips tailored to a specific application.",
      "purpose": "To take a design from concept to a manufactured silicon die meeting Power, Performance, and Area (PPA) goals.",
      "importance": "A flawless flow is critical due to massive Non-Recurring Engineering (NRE) costs; a bug in manufactured silicon cannot be patched like software."
    },
    "detailed_theory": "The flow starts with Architecture Specification and RTL Design. Next, Functional Verification ensures logical correctness. Logic Synthesis translates RTL into a gate-level netlist using a foundry's Standard Cell Library.\n\nThe Physical Design phase (Backend) involves Floorplanning (defining chip size/macro placement), Power Planning, Placement of standard cells, Clock Tree Synthesis (CTS) for synchronous timing, and Routing of metal layers. Finally, Sign-off checks including Static Timing Analysis (STA), Design Rule Checking (DRC), and Layout Vs Schematic (LVS) confirm the design is ready for Tape-Out.",
    "working_principle": {
      "steps": ["Specification: Define architecture.", "RTL Design: Verilog/VHDL coding.", "Verification: Testbenches and UVM.", "Synthesis: RTL to Gate Netlist.", "Physical Design: Floorplan, Place, CTS, Route.", "Sign-off: STA, DRC, LVS.", "Tape-Out: Send GDSII file to Foundry."],
      "internal_operation": "Each step uses specialized EDA tools (e.g., Synopsys, Cadence) that optimize the design and verify against the previous stage's constraints.",
      "signal_flow": "Concept -> Code (RTL) -> Gates (Netlist) -> Polygons (GDSII) -> Silicon Chip."
    },
    "architecture": {
      "description": "The progression from Front-End to Back-End design.",
      "block_diagram_text": "[Front-End]\nSpec -> RTL Code -> Verification -> Synthesis\n       |\n       v\n[Back-End (Physical Design)]\nFloorplan -> Placement -> CTS -> Routing\n       |\n       v\n[Sign-Off] -> Tape-Out (GDSII)",
      "components": ["Front-End: Logic design and verification.", "Synthesis: Translation to gates.", "Back-End: Physical layout.", "Sign-Off: Final physical/timing checks."]
    },
    "hdl_code": {
      "vhdl": "-- Not applicable to flow level",
      "verilog": "// Example Synthesis Constraint (SDC)\ncreate_clock -name sys_clk -period 10.0 [get_ports clk]\nset_max_delay 5.0 -from [get_ports in] -to [get_ports out]",
      "explanation": "SDC (Synopsys Design Constraints) is used to guide the synthesis and physical design tools in the ASIC flow to meet timing targets."
    },
    "summary": ["ASIC flow involves Front-End logic and Back-End physical design.", "Synthesis converts RTL to standard cells.", "Physical design places cells and routes metal wires.", "Rigorous verification prevents costly silicon respins."]
  },
  "Static Timing Analysis (STA)": {
    "introduction": {
      "definition": "Static Timing Analysis (STA) is a method of validating the timing performance of a digital circuit without requiring dynamic simulation vectors.",
      "purpose": "To prove that all paths in a circuit meet setup and hold timing constraints across all conditions.",
      "importance": "STA is mandatory for sign-off. If a chip fails timing, it will fail functionally on silicon or operate at reduced frequencies."
    },
    "detailed_theory": "STA calculates the delay of every possible path from a source (e.g., launch flip-flop) to a destination (e.g., capture flip-flop). It compares the Arrival Time (AT) of the data against the Required Time (RT).\n\nSlack is the difference: Slack = RT - AT. Positive slack means the path meets timing; negative slack indicates a violation. Setup analysis ensures data doesn't arrive too late (max delay), while Hold analysis ensures data doesn't disappear too quickly (min delay). STA accounts for Clock Skew, logic gate delays, and wire interconnect delays using models like Liberty (.lib) and SPEF.",
    "working_principle": {
      "steps": ["Break design into timing paths.", "Calculate delay of logic gates and wires on each path.", "Compute Data Arrival Time (AT).", "Compute Data Required Time (RT) based on clock.", "Calculate Slack = RT - AT.", "Report paths with Negative Slack (Violations)."],
      "internal_operation": "STA uses topological graph traversal to find the worst-case delays quickly, avoiding the exponential time required by exhaustive functional simulation.",
      "signal_flow": "Launch Flip-Flop (CLK->Q) -> Combinational Logic -> Interconnect -> Capture Flip-Flop (D)."
    },
    "architecture": {
      "description": "Standard Register-to-Register Timing Path.",
      "block_diagram_text": " CLK_Launch      Data Path      CLK_Capture\n   |                 |               |\n[ FF1 ] -------->[ Logic ]-------->[ FF2 ]\n  TCQ              TLogic             TSetup",
      "components": ["Launch Register: Sends data.", "Combinational Logic: Processes data.", "Capture Register: Receives data.", "Clock Tree: Delivers clock to both registers."]
    },
    "hdl_code": {
      "vhdl": "-- Example of a path that might fail setup if mult is too slow\nprocess(clk) begin\n  if rising_edge(clk) then\n    q_out <= a * b * c * d;\n  end if;\nend process;",
      "verilog": "always @(posedge clk) begin\n  q_out <= a * b * c * d; // Long delay path\nend",
      "explanation": "Complex combinational operations like multiple multipliers between registers create deep logic paths, increasing TLogic, which reduces Setup Slack and leads to timing violations."
    },
    "summary": ["STA mathematically proves timing closure without simulation vectors.", "Analyzes Setup (max delay) and Hold (min delay).", "Slack must be positive for the chip to function.", "Considers gate delay, wire delay, and clock skew."]
  }
};

let created = 0, modified = 0, skipped = 0;

VLSI_TOPICS.forEach(topic => {
  const filePath = path.join(dir, `${topic}.json`);
  let fileData = JSON.parse(JSON.stringify(fallbackData));
  
  if (TOPIC_DATA[topic]) {
    // Merge the custom specific data
    const specialized = TOPIC_DATA[topic];
    fileData.title = topic;
    fileData.introduction = { ...fileData.introduction, ...specialized.introduction };
    if (specialized.detailed_theory) fileData.detailed_theory = specialized.detailed_theory;
    if (specialized.working_principle) fileData.working_principle = { ...fileData.working_principle, ...specialized.working_principle };
    if (specialized.architecture) fileData.architecture = { ...fileData.architecture, ...specialized.architecture };
    if (specialized.hdl_code) fileData.hdl_code = { ...fileData.hdl_code, ...specialized.hdl_code };
    if (specialized.examples) fileData.examples = specialized.examples;
    if (specialized.design_errors) fileData.design_errors = specialized.design_errors;
    if (specialized.summary) fileData.summary = specialized.summary;
    
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
    modified++;
    console.log(`MODIFIED SPECIFIC: ${topic}`);
  } else {
    if (!fs.existsSync(filePath)) {
      fileData.title = topic;
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
      console.log(`CREATED FALLBACK: ${topic}`);
      created++;
    } else {
      skipped++;
    }
  }
});

console.log(`\nDone. Modified specific: ${modified}, Created fallback: ${created}, Skipped: ${skipped}`);
