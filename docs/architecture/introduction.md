---
title: Introduction
layout: default
collection: architecture
permalink: /architecture/introduction/
---

# 

# **Introduction** {#introduction}

Modern smart factories are increasingly complex, comprising on-site power generation, warehousing, and multiple floors of manufacturing equipment. Each floor typically includes environmental and lighting controls, several assembly lines, and orchestration systems that balance workloads across production units.

At the heart of these factories are machines—specialized devices that perform tasks such as welding, machining, or forming. These machines are coordinated by line controllers, which manage operations within each assembly line. While machines of the same type often share common interfaces (e.g., CNC machines using G-Code), machines across different types are rarely interchangeable. This architecture is shown in **Figure 1** below.

| ![][image1] |
| :---- |
| **Figure 1:** Representative Smart Factory |

Factory operators currently face significant challenges when customizing or reconfiguring production lines. Machines from different vendors often use proprietary interfaces, making integration difficult and limiting flexibility. As a result, adapting to new production requirements or scaling operations can be slow and costly.

Previous developments have advanced partial Linux solutions for orchestration machines, and data models for management (e.g. Redfish from DMTF) however, a critical component of open source software is still missing: communications with microcontrollers, which interface directly with sensors and motors.  

Working within the existing open-sourced ecosystem, IoTFoundry targets to eliminate this gap by providing tools and library code at the microcontroller communication layer.  Thus enabling factory operators to build custom machines and assembly lines using standardized, interoperable building blocks. 

A completely integrated vertical software stack for Industrial Internet of Things will benefit factory operators by providing: 

* **Greater deployment agility**: Rapid integration and reconfiguration of machines.  
* **Improved customization**: Tailored systems that meet specific production needs.  
* **Scalable orchestration**: Seamless coordination across machines, lines, and factory-wide systems.

## **Project Scope and Description** {#project-scope-and-description}

The IoTFoundry project aims to fill a critical gap in the open-source Industrial IoT (IIoT) software stack by enabling standardized communication between Linux-based orchestration systems and microcontroller-driven endpoints. 

A key focus of the project is to assess the current state of MCTP (Management Component Transport Protocol) and PLDM (Platform Level Data Model) support within the Linux kernel. This involves identifying functional gaps and submitting targeted pull requests to the kernel that address these shortcomings. All proposed changes will be developed in close collaboration with the Linux community to ensure they align with both user needs and the DMTF specifications for PLDM and MCTP.

In addition to kernel-level contributions, IoTFoundry will extend or develop Linux-based tools for enumerating MCTP and PLDM endpoints in IIoT environments. These tools will provide visibility into endpoint topology and status, facilitating seamless integration and orchestration across factory systems. 

To accelerate the development of compliant endpoints, IoTFoundry will also produce communications libraries tailored to commonly deployed microcontroller families. These libraries will support MCTP and PLDM protocols and will be distributed in formats compatible with existing toolchains such as Arduino, PlatformIO, Zephyr, and STM32Cube, minimizing friction for developers.

Recognizing the rapid evolution of microcontroller hardware, IoTFoundry envisions this final component as an ongoing effort. As new microcontroller families are introduced, the project will continue to expand its library coverage, maintaining a modular and extensible architecture that accommodates future protocol updates and hardware capabilities. Through these efforts, IoTFoundry seeks to empower factory operators with a fully open, vertically integrated IIoT stack that supports agility, customization, and scalable orchestration.
