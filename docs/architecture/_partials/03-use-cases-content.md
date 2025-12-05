# Use Cases and Requirements

This page describes key roles, primary use cases, and high-level requirements that drive the IoTFoundry project.

## Key Roles

- **Factory Operator:** Runs production and interacts with HMIs.
- **Automation Engineer:** Designs orchestration and optimization logic.
- **Firmware Engineer:** Implements device firmware and protocol support.
- **System Integrator:** Assembles and commissions machines from components.

## Primary Use Cases

- Endpoint enumeration and diagnostics — discover and assess endpoints.
- Process orchestration and optimization — coordinate machines and collect telemetry.
- Machine-level integration and commissioning — assemble and validate machines.
- Custom equipment development — prototype with standardized building blocks.
- Firmware development for endpoint devices — provide protocol libraries and examples.
- Performance monitoring and data collection — telemetry for analytics and operations.

## High-Level Requirements

- REQ1: Support for MCTP and PLDM across Linux and microcontrollers.
- REQ2: Linux-based enumeration and diagnostic tools.
- REQ3: Modular firmware libraries for microcontroller toolchains.
- REQ4: Unified data representation (PLDM → Redfish transformability).
- REQ5: Plug-and-play hardware integration and predictable commissioning.
- REQ6: Extensible architecture for future hardware and protocol changes.
- REQ7: Support for orchestration and optimization use cases.
- REQ8: Telemetry access for monitoring and analytics.
- REQ9: Role-based interaction models for operators, integrators, engineers.
- REQ10: Open collaboration and upstream engagement with Linux, DMTF, PICMG.
