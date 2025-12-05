# Introduction

Modern smart factories are increasingly complex, comprising on-site power generation, warehousing, and multiple floors of manufacturing equipment. Each floor typically includes environmental and lighting controls, several assembly lines, and orchestration systems that balance workloads across production units.

Machines are coordinated by line controllers and expose diverse interfaces. While machines of the same type often share common interfaces (for example CNC machines using G-Code), machines across different types are rarely interchangeable. This creates integration challenges when reconfiguring production lines.

IoTFoundry targets the gap in open-source IIoT stacks: communications with microcontrollers that interface directly with sensors and motors. The project provides kernel and userspace work in Linux plus microcontroller-facing libraries to enable standardized, interoperable building blocks for machine builders and system integrators.

## Project Scope

- Assess and contribute MCTP and PLDM support in the Linux kernel.
- Provide Linux userspace tools for enumeration, diagnostics, and orchestration.
- Publish modular microcontroller libraries for common toolchains (STM32Cube, Zephyr, PlatformIO, Arduino).

## Benefits

- Greater deployment agility: faster integration and reconfiguration.
- Improved customization: tailored systems using standardized blocks.
- Scalable orchestration: seamless coordination across machines and lines.
