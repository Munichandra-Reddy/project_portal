const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public', 'diagrams');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const svgs = {
  "32-bit-alu-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">32-bit ALU Architecture</text>
      <rect x="300" y="80" width="200" height="200" fill="#e2e8f0" stroke="#475569" stroke-width="2" />
      <text x="400" y="120" font-family="monospace" font-size="16" text-anchor="middle">ALU Core</text>
      
      <rect x="320" y="140" width="160" height="40" fill="#cbd5e1" stroke="#334155" />
      <text x="400" y="165" font-family="monospace" font-size="14" text-anchor="middle">Arithmetic Unit</text>

      <rect x="320" y="190" width="160" height="40" fill="#cbd5e1" stroke="#334155" />
      <text x="400" y="215" font-family="monospace" font-size="14" text-anchor="middle">Logic Unit</text>

      <rect x="320" y="240" width="160" height="30" fill="#94a3b8" stroke="#334155" />
      <text x="400" y="260" font-family="monospace" font-size="12" text-anchor="middle">Multiplexer</text>

      <!-- Inputs -->
      <path d="M 200 120 L 290 120" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow)" />
      <text x="250" y="110" font-family="monospace" font-size="14" text-anchor="middle">Operand A</text>

      <path d="M 200 180 L 290 180" stroke="#1e293b" stroke-width="2" marker-end="url(#arrow)" />
      <text x="250" y="170" font-family="monospace" font-size="14" text-anchor="middle">Operand B</text>

      <!-- Control -->
      <path d="M 400 350 L 400 290" stroke="#dc2626" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)" />
      <text x="400" y="370" font-family="monospace" font-size="14" text-anchor="middle" fill="#dc2626">Control Signals</text>

      <!-- Output -->
      <path d="M 500 180 L 590 180" stroke="#1e293b" stroke-width="4" marker-end="url(#arrow)" />
      <text x="550" y="170" font-family="monospace" font-size="14" text-anchor="middle">Result Bus</text>
    </svg>
  `,
  "risc-processor-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">RISC Processor Architecture</text>
      
      <rect x="100" y="100" width="120" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2" rx="4"/>
      <text x="160" y="145" font-family="monospace" font-size="14" text-anchor="middle">IF Unit</text>

      <rect x="250" y="100" width="120" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2" rx="4"/>
      <text x="310" y="145" font-family="monospace" font-size="14" text-anchor="middle">ID Unit</text>

      <rect x="400" y="100" width="120" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2" rx="4"/>
      <text x="460" y="145" font-family="monospace" font-size="14" text-anchor="middle">Reg File</text>

      <rect x="550" y="100" width="120" height="80" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2" rx="4"/>
      <text x="610" y="145" font-family="monospace" font-size="14" text-anchor="middle">ALU</text>

      <rect x="550" y="250" width="120" height="80" fill="#bbf7d0" stroke="#15803d" stroke-width="2" rx="4"/>
      <text x="610" y="295" font-family="monospace" font-size="14" text-anchor="middle">Memory Unit</text>

      <rect x="250" y="250" width="120" height="80" fill="#fecaca" stroke="#b91c1c" stroke-width="2" rx="4"/>
      <text x="310" y="295" font-family="monospace" font-size="14" text-anchor="middle">Control Unit</text>

      <path d="M 220 140 L 250 140" stroke="#000" stroke-width="2"/>
      <path d="M 370 140 L 400 140" stroke="#000" stroke-width="2"/>
      <path d="M 520 140 L 550 140" stroke="#000" stroke-width="2"/>
      <path d="M 610 180 L 610 250" stroke="#000" stroke-width="2"/>

      <!-- Pipeline markers -->
      <line x1="235" y1="80" x2="235" y2="200" stroke="#94a3b8" stroke-dasharray="4"/>
      <line x1="385" y1="80" x2="385" y2="200" stroke="#94a3b8" stroke-dasharray="4"/>
      <line x1="535" y1="80" x2="535" y2="200" stroke="#94a3b8" stroke-dasharray="4"/>
    </svg>
  `,
  "fir-filter-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">FIR Filter Block Diagram</text>

      <path d="M 100 120 L 200 120" stroke="#000" stroke-width="2"/>
      <rect x="200" y="100" width="60" height="40" fill="#fde047" stroke="#854d0e" stroke-width="2" />
      <text x="230" y="125" font-family="monospace" font-size="16" text-anchor="middle">Z⁻¹</text>

      <path d="M 260 120 L 360 120" stroke="#000" stroke-width="2"/>
      <rect x="360" y="100" width="60" height="40" fill="#fde047" stroke="#854d0e" stroke-width="2" />
      <text x="390" y="125" font-family="monospace" font-size="16" text-anchor="middle">Z⁻¹</text>

      <path d="M 420 120 L 520 120" stroke="#000" stroke-width="2"/>
      <rect x="520" y="100" width="60" height="40" fill="#fde047" stroke="#854d0e" stroke-width="2" />
      <text x="550" y="125" font-family="monospace" font-size="16" text-anchor="middle">Z⁻¹</text>

      <circle cx="150" cy="200" r="20" fill="#fed7aa" stroke="#c2410c" stroke-width="2" />
      <text x="150" y="205" font-family="monospace" font-size="18" text-anchor="middle">X</text>
      
      <circle cx="310" cy="200" r="20" fill="#fed7aa" stroke="#c2410c" stroke-width="2" />
      <text x="310" y="205" font-family="monospace" font-size="18" text-anchor="middle">X</text>

      <circle cx="470" cy="200" r="20" fill="#fed7aa" stroke="#c2410c" stroke-width="2" />
      <text x="470" y="205" font-family="monospace" font-size="18" text-anchor="middle">X</text>

      <!-- Adders -->
      <circle cx="310" cy="280" r="20" fill="#bbf7d0" stroke="#15803d" stroke-width="2" />
      <text x="310" y="285" font-family="monospace" font-size="18" text-anchor="middle">+</text>

      <circle cx="470" cy="280" r="20" fill="#bbf7d0" stroke="#15803d" stroke-width="2" />
      <text x="470" y="285" font-family="monospace" font-size="18" text-anchor="middle">+</text>

      <path d="M 150 120 L 150 180" stroke="#000" stroke-width="2"/>
      <path d="M 310 120 L 310 180" stroke="#000" stroke-width="2"/>
      <path d="M 470 120 L 470 180" stroke="#000" stroke-width="2"/>

      <path d="M 150 220 L 150 280 L 290 280" stroke="#000" stroke-width="2"/>
      <path d="M 310 220 L 310 260" stroke="#000" stroke-width="2"/>
      <path d="M 330 280 L 450 280" stroke="#000" stroke-width="2"/>
      <path d="M 470 220 L 470 260" stroke="#000" stroke-width="2"/>
      <path d="M 490 280 L 600 280" stroke="#000" stroke-width="2"/>
      <text x="630" y="285" font-family="monospace" font-size="18" text-anchor="middle">Output</text>
    </svg>
  `,
  "uart-controller-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">UART Controller Block Diagram</text>
      <rect x="200" y="100" width="400" height="250" fill="#e0e7ff" stroke="#3730a3" stroke-width="2" rx="8"/>
      
      <rect x="220" y="130" width="160" height="80" fill="#c7d2fe" stroke="#312e81" stroke-width="2"/>
      <text x="300" y="175" font-family="monospace" font-size="14" text-anchor="middle">Transmitter (TX)</text>

      <rect x="420" y="130" width="160" height="80" fill="#c7d2fe" stroke="#312e81" stroke-width="2"/>
      <text x="500" y="175" font-family="monospace" font-size="14" text-anchor="middle">Receiver (RX)</text>

      <rect x="320" y="250" width="160" height="60" fill="#a5b4fc" stroke="#312e81" stroke-width="2"/>
      <text x="400" y="285" font-family="monospace" font-size="14" text-anchor="middle">Baud Rate Gen</text>

      <path d="M 100 170 L 220 170" stroke="#000" stroke-width="2"/>
      <text x="160" y="160" font-family="monospace" font-size="12" text-anchor="middle">Data Bus</text>

      <path d="M 300 130 L 300 80 L 700 80" stroke="#b91c1c" stroke-width="2"/>
      <text x="600" y="70" font-family="monospace" font-size="12" fill="#b91c1c" text-anchor="middle">TXD (Serial Out)</text>

      <path d="M 700 200 L 500 200 L 500 170" stroke="#15803d" stroke-width="2"/>
      <text x="600" y="190" font-family="monospace" font-size="12" fill="#15803d" text-anchor="middle">RXD (Serial In)</text>
    </svg>
  `,
  "memory-controller-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">Memory Controller Architecture</text>
      
      <rect x="150" y="150" width="120" height="100" fill="#fed7aa" stroke="#9a3412" stroke-width="2"/>
      <text x="210" y="205" font-family="monospace" font-size="16" text-anchor="middle">CPU/Bus</text>

      <rect x="350" y="100" width="140" height="200" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
      <text x="420" y="140" font-family="monospace" font-size="14" text-anchor="middle">Memory Controller</text>

      <rect x="370" y="160" width="100" height="40" fill="#cbd5e1" stroke="#334155"/>
      <text x="420" y="185" font-family="monospace" font-size="12" text-anchor="middle">Arbiter</text>

      <rect x="370" y="220" width="100" height="40" fill="#cbd5e1" stroke="#334155"/>
      <text x="420" y="245" font-family="monospace" font-size="12" text-anchor="middle">Refresh Logic</text>

      <rect x="580" y="120" width="120" height="160" fill="#d8b4fe" stroke="#6b21a8" stroke-width="2"/>
      <text x="640" y="205" font-family="monospace" font-size="16" text-anchor="middle">SDRAM / DDR</text>

      <path d="M 270 170 L 350 170" stroke="#000" stroke-width="2"/>
      <path d="M 270 200 L 350 200" stroke="#000" stroke-width="2"/>
      <path d="M 270 230 L 350 230" stroke="#000" stroke-width="2"/>

      <path d="M 490 150 L 580 150" stroke="#b91c1c" stroke-width="2"/>
      <text x="535" y="140" font-family="monospace" font-size="12" text-anchor="middle">Address</text>
      
      <path d="M 490 200 L 580 200" stroke="#1d4ed8" stroke-width="2"/>
      <text x="535" y="190" font-family="monospace" font-size="12" text-anchor="middle">Data</text>

      <path d="M 490 250 L 580 250" stroke="#15803d" stroke-width="2"/>
      <text x="535" y="240" font-family="monospace" font-size="12" text-anchor="middle">Control</text>
    </svg>
  `,
  "traffic-light-controller-using-verilog": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">Traffic Light Controller FSM Diagram</text>

      <circle cx="200" cy="200" r="40" fill="#fecaca" stroke="#b91c1c" stroke-width="2"/>
      <text x="200" y="205" font-family="monospace" font-size="14" text-anchor="middle">State 1 (RED)</text>

      <circle cx="400" cy="100" r="40" fill="#bbf7d0" stroke="#15803d" stroke-width="2"/>
      <text x="400" y="105" font-family="monospace" font-size="14" text-anchor="middle">State 2 (GRN)</text>

      <circle cx="600" cy="200" r="40" fill="#fef08a" stroke="#a16207" stroke-width="2"/>
      <text x="600" y="205" font-family="monospace" font-size="14" text-anchor="middle">State 3 (YEL)</text>

      <path d="M 230 170 Q 300 120 360 110" fill="none" stroke="#000" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M 440 110 Q 500 120 570 170" fill="none" stroke="#000" stroke-width="2" marker-end="url(#arrow)"/>
      <path d="M 570 230 Q 400 320 230 230" fill="none" stroke="#000" stroke-width="2" marker-end="url(#arrow)"/>

      <rect x="340" y="300" width="120" height="60" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
      <text x="400" y="335" font-family="monospace" font-size="14" text-anchor="middle">Timer Module</text>

      <path d="M 400 300 L 400 200" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
    </svg>
  `,
  "spi-protocol-implementation": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">SPI Protocol Architecture</text>
      
      <rect x="150" y="100" width="200" height="200" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="2" rx="8"/>
      <text x="250" y="130" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">SPI Master</text>
      
      <rect x="450" y="100" width="200" height="200" fill="#bbf7d0" stroke="#15803d" stroke-width="2" rx="8"/>
      <text x="550" y="130" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">SPI Slave</text>

      <rect x="180" y="160" width="140" height="40" fill="#93c5fd" stroke="#1e3a8a"/>
      <text x="250" y="185" font-family="monospace" font-size="14" text-anchor="middle">Shift Register</text>

      <rect x="480" y="160" width="140" height="40" fill="#86efac" stroke="#14532d"/>
      <text x="550" y="185" font-family="monospace" font-size="14" text-anchor="middle">Shift Register</text>

      <path d="M 350 170 L 450 170" stroke="#b91c1c" stroke-width="2"/>
      <text x="400" y="160" font-family="monospace" font-size="12" text-anchor="middle">MOSI</text>

      <path d="M 450 190 L 350 190" stroke="#1d4ed8" stroke-width="2"/>
      <text x="400" y="210" font-family="monospace" font-size="12" text-anchor="middle">MISO</text>

      <path d="M 350 240 L 450 240" stroke="#000" stroke-width="2"/>
      <text x="400" y="235" font-family="monospace" font-size="12" text-anchor="middle">SCLK</text>

      <path d="M 350 270 L 450 270" stroke="#000" stroke-width="2"/>
      <text x="400" y="265" font-family="monospace" font-size="12" text-anchor="middle">SS / CS</text>
    </svg>
  `,
  "pipelined-processor-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">5-Stage Pipelined Processor Architecture</text>

      <rect x="50" y="150" width="100" height="100" fill="#e2e8f0" stroke="#475569" stroke-width="2" rx="4"/>
      <text x="100" y="205" font-family="monospace" font-size="16" text-anchor="middle">IF</text>

      <rect x="200" y="150" width="100" height="100" fill="#cbd5e1" stroke="#475569" stroke-width="2" rx="4"/>
      <text x="250" y="205" font-family="monospace" font-size="16" text-anchor="middle">ID</text>

      <rect x="350" y="150" width="100" height="100" fill="#94a3b8" stroke="#475569" stroke-width="2" rx="4"/>
      <text x="400" y="205" font-family="monospace" font-size="16" text-anchor="middle">EX</text>

      <rect x="500" y="150" width="100" height="100" fill="#64748b" stroke="#475569" stroke-width="2" rx="4"/>
      <text x="550" y="205" font-family="monospace" font-size="16" fill="white" text-anchor="middle">MEM</text>

      <rect x="650" y="150" width="100" height="100" fill="#475569" stroke="#0f172a" stroke-width="2" rx="4"/>
      <text x="700" y="205" font-family="monospace" font-size="16" fill="white" text-anchor="middle">WB</text>

      <!-- Pipeline Registers -->
      <rect x="170" y="130" width="10" height="140" fill="#b91c1c"/>
      <rect x="320" y="130" width="10" height="140" fill="#b91c1c"/>
      <rect x="470" y="130" width="10" height="140" fill="#b91c1c"/>
      <rect x="620" y="130" width="10" height="140" fill="#b91c1c"/>

      <!-- Data Paths -->
      <path d="M 150 200 L 170 200" stroke="#000" stroke-width="2"/>
      <path d="M 180 200 L 200 200" stroke="#000" stroke-width="2"/>
      
      <path d="M 300 200 L 320 200" stroke="#000" stroke-width="2"/>
      <path d="M 330 200 L 350 200" stroke="#000" stroke-width="2"/>
      
      <path d="M 450 200 L 470 200" stroke="#000" stroke-width="2"/>
      <path d="M 480 200 L 500 200" stroke="#000" stroke-width="2"/>
      
      <path d="M 600 200 L 620 200" stroke="#000" stroke-width="2"/>
      <path d="M 630 200 L 650 200" stroke="#000" stroke-width="2"/>

      <path d="M 750 200 L 780 200 L 780 100 L 250 100 L 250 150" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="5"/>
      <text x="500" y="90" font-family="monospace" font-size="14" fill="#2563eb" text-anchor="middle">Data Hazard / Forwarding</text>
    </svg>
  `,
  "low-power-vlsi-design": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">Low Power Op-Amp Block Diagram</text>
      
      <rect x="150" y="100" width="140" height="80" fill="#fef08a" stroke="#ca8a04" stroke-width="2" rx="4"/>
      <text x="220" y="145" font-family="monospace" font-size="14" text-anchor="middle">Differential Pair</text>

      <rect x="350" y="100" width="140" height="80" fill="#fef08a" stroke="#ca8a04" stroke-width="2" rx="4"/>
      <text x="420" y="145" font-family="monospace" font-size="14" text-anchor="middle">Gain Stage</text>

      <rect x="550" y="100" width="140" height="80" fill="#fef08a" stroke="#ca8a04" stroke-width="2" rx="4"/>
      <text x="620" y="145" font-family="monospace" font-size="14" text-anchor="middle">Output Stage</text>

      <rect x="150" y="250" width="340" height="60" fill="#bfdbfe" stroke="#2563eb" stroke-width="2" rx="4"/>
      <text x="320" y="285" font-family="monospace" font-size="14" text-anchor="middle">Current Mirrors / Bias Circuit</text>

      <path d="M 290 140 L 350 140" stroke="#000" stroke-width="2"/>
      <path d="M 490 140 L 550 140" stroke="#000" stroke-width="2"/>

      <path d="M 220 250 L 220 180" stroke="#b91c1c" stroke-width="2" stroke-dasharray="4"/>
      <path d="M 420 250 L 420 180" stroke="#b91c1c" stroke-width="2" stroke-dasharray="4"/>
    </svg>
  `,
  "digital-clock-using-verilog": `
    <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f4f4f4" />
      <text x="400" y="40" font-family="monospace" font-size="24" font-weight="bold" text-anchor="middle">Digital Clock Verilog Architecture</text>

      <rect x="100" y="150" width="100" height="100" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
      <text x="150" y="200" font-family="monospace" font-size="14" text-anchor="middle">Clk Divider</text>

      <rect x="250" y="150" width="100" height="100" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
      <text x="300" y="200" font-family="monospace" font-size="14" text-anchor="middle">Seconds</text>

      <rect x="400" y="150" width="100" height="100" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
      <text x="450" y="200" font-family="monospace" font-size="14" text-anchor="middle">Minutes</text>

      <rect x="550" y="150" width="100" height="100" fill="#64748b" stroke="#475569" stroke-width="2"/>
      <text x="600" y="200" font-family="monospace" font-size="14" fill="white" text-anchor="middle">Hours</text>

      <path d="M 200 200 L 250 200" stroke="#000" stroke-width="2"/>
      <path d="M 350 200 L 400 200" stroke="#000" stroke-width="2"/>
      <path d="M 500 200 L 550 200" stroke="#000" stroke-width="2"/>

      <rect x="250" y="280" width="400" height="60" fill="#bbf7d0" stroke="#16a34a" stroke-width="2"/>
      <text x="450" y="315" font-family="monospace" font-size="14" text-anchor="middle">7-Segment Display Decoder</text>

      <path d="M 300 250 L 300 280" stroke="#000" stroke-width="2" stroke-dasharray="4"/>
      <path d="M 450 250 L 450 280" stroke="#000" stroke-width="2" stroke-dasharray="4"/>
      <path d="M 600 250 L 600 280" stroke="#000" stroke-width="2" stroke-dasharray="4"/>
    </svg>
  `
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dirPath, name + '.svg'), content.trim());
}

console.log("SVGs successfully generated in public/diagrams/");
