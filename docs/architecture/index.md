---
title: Architecture
layout: default
collection: architecture
permalink: /architecture/
---

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

## **References** {#references}

This section includes resources that may be helpful when interpreting or implementing the IoTFoundry architecture.

| Name | Definition | Website |
| ----- | ----- | ----- |
| **Linux Kernel** | The core component of the Linux operating system that manages hardware, system resources, and kernel-level services including networking and device drivers. | [kernel.org](https://www.kernel.org) [github.com/torvalds/linux](https://github.com/torvalds/linux)  |
| **MCTP Specification** | Defines the Management Component Transport Protocol, a lightweight transport protocol for platform management communications between components. | [www.dmtf.org/dsp/DSP0236](https://www.dmtf.org/dsp/DSP0236)  |
| **PICMG IoT.1 Firmware Specification** | A specification from PICMG that standardizes firmware interfaces for sensors, effecters, and control domains in industrial IoT environments. | [picmg.org](http://picmg.org)  |
| **PLDM Specification** | Defines the Platform Level Data Model, a protocol for structured data exchange and device management in platform environments. | [www.dmtf.org/dsp/DSP0248](https://www.dmtf.org/dsp/DSP0248)  |
| **Redfish Specification** | A RESTful interface standard for platform management, enabling system-level control, telemetry access, and configuration via web-based APIs. | [redfish.dmtf.org](https://redfish.dmtf.org) |


---
# **Use Cases and Requirements** {#system-requirements}

This section defines the system requirements for the IoTFoundry project, offering a structured overview of its intended operational context. Rather than addressing implementation-level details, the purpose here is to articulate the roles of anticipated users, the primary use cases, and the essential functional requirements that the system must satisfy. 

By clarifying the interactions between factory operators, automation engineers, firmware developers, and system integrators, this section establishes a foundation for understanding how IoTFoundry will be utilized within diverse Industrial IoT environments. The use cases presented will illustrate the practical scenarios in which the system is expected to operate, while the requirements will reflect the capabilities necessary to ensure reliability, scalability, and interoperability across heterogeneous manufacturing systems.

## **Key Roles** {#key-roles}

IoTFoundry facilitates the coordinated efforts of multiple stakeholders, each contributing distinct expertise to the development, deployment, and operation of Industrial IoT systems. This section defines the key roles involved in the ecosystem, clarifying their responsibilities and interactions within the broader framework. These role definitions serve as a foundation for aligning technical capabilities with operational and development needs.

A summary of these roles is given in **Table 1** below.  More detailed descriptions of each are provided in further subsections.

**Table 1 — Roles Summary**

| Role | Description | Primary Domain of Involvement |
| ----- | ----- | ----- |
| **Factory Operator** | Oversees run-time operations of the manufacturing environment using HMIs to monitor workflows, respond to alerts, and make real-time adjustments. Provides feedback that informs system refinement. | Production Monitoring and Operational Feedback |
| **Automation Engineer** | Designs and optimizes control systems and orchestration logic across machines and production lines. Focuses on process automation, machine coordination, and performance tuning using standardized protocols. | Process Automation and System-Level Optimization |
| **Firmware Engineer** | Develops low-level software for microcontrollers, sensors, and motors using standardized communication libraries. Ensures devices are interoperable, discoverable, and telemetry-ready within IIoT systems. | Device-Level Functionality and Protocol Compliance |
| **System Integrator** | Assembles and configures hardware components into functional machines. Validates communication and data representation standards to ensure seamless integration with orchestration systems. | Machine-Level Integration and Deployment |

### **Factory Operator**

Factory operators are primarily responsible for the run-time operations of the manufacturing environment. Their duties focus on supervising production workflows, maintaining throughput, and ensuring that machines and assembly lines operate within defined parameters. Operators interact with human-machine interfaces (HMIs) located on line controllers or directly on the machines themselves. These interfaces provide access to operational controls, status indicators, and alerts, allowing operators to manage production without engaging directly with the underlying hardware or software layers.

A central aspect of their role involves initiating and monitoring automated sequences, responding to system notifications, and making real-time adjustments to maintain efficiency and product quality. IoTFoundry’s support for standardized endpoint sensing and control features provides a unified method for accessing data in these HMIs, enabling operators to quickly identify issues and coordinate with technical teams when intervention is required.

Operators also play a key role in observing environmental and machine-level conditions during production. Through sensor data surfaced via microcontroller endpoints and presented through HMIs, they can monitor factors such as temperature, vibration, and energy consumption. This information supports proactive decision-making and helps prevent disruptions due to equipment wear or environmental drift.

While factory operators do not interact directly with microcontrollers or low-level communication protocols, their feedback is essential to the continuous improvement of the system. By reporting anomalies, inefficiencies, or usability concerns, they inform automation engineers and system integrators who refine orchestration logic and endpoint configurations. IoTFoundry’s emphasis on interoperability and transparency ensures that operators remain empowered to manage complex production environments effectively, without requiring deep technical expertise.

### **Automation Engineer**

Automation engineers are responsible for designing, implementing, and optimizing the control systems that govern factory operations. Their primary focus lies in process automation—ensuring that machines, line controllers, and orchestration systems work together seamlessly to execute complex production workflows. While system integrators concentrate on assembling and configuring individual machines, automation engineers are concerned with how those machines interact, coordinate, and contribute to overall factory performance.

Within the IoTFoundry framework, automation engineers develop orchestration logic that defines task sequences, manages interdependencies, and balances workloads across production units. They rely on standardized protocols such as PLDM and MCTP to interface with machine-level endpoints, while higher-level orchestration may leverage protocols like DMTF’s Redfish. IoTFoundry’s Linux-based tools for endpoint enumeration and diagnostics provide automation engineers with consistent visibility into device behavior, enabling them to design resilient and scalable automation strategies.

As factories evolve toward greater flexibility and intelligence under the Factory 4.0 paradigm, automation engineers increasingly participate in machine customization and performance tuning. By leveraging standardized hardware/software building blocks and interoperable communication libraries, they can tailor equipment to specific production goals and rapidly adapt to changing requirements. IoTFoundry’s emphasis on consistent data representation further supports this effort, allowing engineers to gather and analyze performance metrics—such as cycle times, energy consumption, and fault rates—with minimal integration overhead.

Automation engineers also serve as a critical interface between runtime operations and technical development. They collaborate with factory operators to interpret operational feedback and with firmware developers to ensure endpoint behavior aligns with orchestration needs. Through this cross-functional engagement, automation engineers help maintain a highly coordinated, data-driven manufacturing environment—one that is empowered by the open standards and extensible architecture provided by IoTFoundry.

### **Firmware Developers**

Firmware engineers are responsible for developing and maintaining the low-level software that enables microcontrollers, smart sensors, and smart motors to function as intelligent endpoints within industrial systems. Unlike factory operators or automation engineers, firmware engineers are often employed by component manufacturers or third-party solution providers rather than the factory itself. Their work is foundational to the Industrial Internet of Things (IIoT), as it ensures that hardware building blocks can communicate reliably, perform designated tasks, and integrate seamlessly into larger automation frameworks.

Within the IoTFoundry ecosystem, firmware engineers focus on implementing solutions based on standardized protocols such as MCTP and PLDM on microcontroller platforms. By utilizing standardized communications, they help ensure that devices can be discovered, enumerated, and orchestrated by Linux-based systems. 

Firmware engineers also play a critical role in enabling data acquisition and control at the edge of the factory network. They design firmware that interfaces with sensors and actuators, manages real-time operations, and exposes telemetry in standardized formats. This consistency in data representation is essential for downstream analytics, diagnostics, and optimization. By adhering to open specifications and contributing reusable modules, firmware engineers accelerate the deployment of IIoT endpoints and reduce the integration burden for automation teams.

Although they may not be directly involved in factory operations, firmware engineers are key contributors to the broader IIoT supply chain. Their work ensures that the components delivered to factories are not only functional but also interoperable and extensible. Through collaboration with the IoTFoundry project, they help establish a common foundation for endpoint behavior, enabling scalable and flexible manufacturing systems built on open standards.

### **System Integrator**

System integrators are responsible for assembling and deploying complete machine systems by combining hardware components—such as microcontrollers, sensors, actuators, and motors—with embedded software and communication interfaces. Their primary focus is on integrating these elements into functional, reliable machines that can be deployed within factory environments. While automation engineers concentrate on orchestrating and optimizing how machines interact within a production line, system integrators ensure that each individual machine is correctly constructed, configured, and capable of participating in that broader automation framework.

In the context of IoTFoundry, system integrators work with standardized hardware/software building blocks to streamline the integration of components into machines. This includes implementing support for protocols such as MCTP and PLDM at the device level, validating endpoint behavior, and ensuring compatibility with Linux-based orchestration systems. Whether employed directly by the factory or by third-party equipment suppliers, integrators play a critical role in ensuring that machines conform to open standards and are discoverable and manageable within the IIoT ecosystem.

System integrators also collaborate with firmware engineers to incorporate communication libraries into microcontroller platforms, enabling devices to expose telemetry, respond to control commands, and participate in machine-level orchestration. Their work ensures that machines are not only mechanically sound but also digitally interoperable. By adhering to IoTFoundry’s standardized data models and communication protocols, integrators reduce the complexity of downstream integration and facilitate smoother deployment into production environments.

Although their scope is typically limited to the machine level, system integrators provide the foundation upon which automation engineers build process logic and optimization strategies. Together, these roles form a complementary partnership: integrators deliver robust, standards-compliant machines, while automation engineers ensure those machines operate harmoniously within dynamic, scalable production systems.

## **Use Cases** {#use-cases}

The IoTFoundry architecture is designed to support a wide range of industrial automation scenarios through standardized communication protocols, data models, and tooling. This section outlines the primary use cases that drive adoption and implementation across the ecosystem. Each use case reflects the practical needs of key stakeholders—automation engineers, system integrators, firmware developers, and factory operators—and demonstrates how IoTFoundry enables scalable, interoperable, and intelligent manufacturing systems. By aligning technical capabilities with operational goals, these use cases form the foundation for deploying robust IIoT solutions in diverse factory environments.

A summary of these use cases is given in **Table 2** below.  More detailed descriptions of each are provided in further subsections.

**Table 2 — Use Case Summary**

| Use Case | Brief Description | Roles Involved |
| ----- | ----- | ----- |
| **Endpoint Enumeration and Diagnostics** | Discovering and identifying all connected endpoints, and assessing their operational status and health. | Automation Engineers, System Integrators |
| **Process Orchestration and Optimization** | Designing control logic to coordinate machines and transform device telemetry into factory-level insights. | Automation Engineers |
| **Machine-Level Integration and Commissioning** | Assembling hardware modules into functional machines and validating their readiness for deployment. | System Integrators, Firmware Engineers |
| **Custom Equipment Development** | Prototyping and refining machines using standardized building blocks to meet specific production goals. | Automation Engineers |
| **Firmware Development for Endpoint Devices** | Implementing device-specific functionality using standardized communication libraries for interoperability. | Firmware Engineers |
| **Performance Monitoring and Data Collection** | Gathering and analyzing telemetry to optimize workflows and maintain operational efficiency. | Automation Engineers, Factory Operators |

### **Use Case: Endpoint Enumeration and Diagnostics**

Endpoint enumeration and diagnostics are foundational capabilities within the IoTFoundry architecture, enabling automation engineers and system integrators to manage and maintain IIoT systems effectively. Enumeration refers to the process of discovering and identifying all connected endpoints—such as sensors, motors, and microcontrollers—within a machine or production line. This includes assigning unique identifiers, classifying device types, and registering their capabilities within the orchestration framework. Enumeration is critical for establishing a coherent view of the system topology, ensuring that all components are accounted for and addressable by higher-level control logic.

Diagnostics, by contrast, involves assessing the operational status and health of these endpoints once they have been enumerated. This includes monitoring communication integrity, detecting faults, and retrieving telemetry such as error codes, performance metrics, and environmental readings. Together, enumeration and diagnostics provide the visibility and insight necessary to maintain system reliability and optimize performance.

Automation engineers use these capabilities to coordinate machine behavior and validate orchestration logic, while system integrators rely on them during machine commissioning and integration. By leveraging standardized protocols like MCTP and PLDM, IoTFoundry ensures that enumeration and diagnostics can be performed consistently across heterogeneous devices, reducing integration complexity and enabling scalable deployment. These functions form the backbone of intelligent automation, allowing systems to be both discoverable and self-aware within the broader IIoT ecosystem.

### **Use Case: Process Orchestration and Optimization**

Process orchestration and optimization is a critical use case within the IoTFoundry architecture, primarily driven by automation engineers. Their responsibilities center on designing control logic that governs how machines, line controllers, and endpoints interact to execute complex production workflows. By managing task sequences, resolving interdependencies, and optimizing resource allocation, automation engineers ensure that manufacturing processes remain efficient, adaptable, and resilient to change. 

PLDM plays a particularly important role in bridging low-level device telemetry with higher-level orchestration frameworks. Its structured data model allows endpoint information—such as operational status, sensor readings, and fault conditions—to be captured in a format that is easily transformed into Redfish-compliant representations. Redfish, a DMTF standard, is widely used for system-level management and orchestration, and its schema has been extended in collaboration with PICMG to address the specific needs of industrial IoT environments. This alignment enables automation engineers to aggregate machine-level data into factory-level insights, facilitating centralized control, predictive analytics, and scalable automation strategies.

By leveraging PLDM as a foundation for endpoint data and Redfish for orchestration semantics, IoTFoundry ensures that automation engineers can design systems that are both granular in control and unified in oversight. This layered approach simplifies integration, enhances visibility, and supports the deployment of intelligent, interoperable manufacturing systems that meet the evolving demands of Factory 4.0.

### **Use Case: Machine-Level Integration and Commissioning**

Machine-level integration and commissioning is a key responsibility of system integrators, who assemble microcontrollers, sensors, actuators, and other components into fully functional machines ready for deployment. Integration refers to the process of combining these hardware modules and ensuring they communicate and operate as a cohesive unit. Commissioning follows integration and involves validating that the assembled machine performs as intended—verifying connectivity, functionality, and readiness for production use. These steps are essential to transforming modular components into reliable, interoperable systems that can be orchestrated within a factory environment.

IoTFoundry accelerates this process by leveraging open-source communication protocols and data representation standards, specifically MCTP (Management Component Transport Protocol) and PLDM (Platform Level Data Model). MCTP provides a transport layer for exchanging messages between endpoints, while PLDM defines structured data models for device capabilities, telemetry, and control. Together, they create a unified interface for endpoint communication, enabling consistent behavior across diverse hardware components. This uniformity reduces the need for custom integration logic, allowing system integrators to focus on assembling and validating machines rather than troubleshooting proprietary interfaces.

By adopting IoTFoundry’s communication and data standards, system integrators gain access to a plug-and-play environment where components are discoverable, manageable, and semantically aligned. This approach not only simplifies machine-level integration but also lays the groundwork for higher-level orchestration and analytics, supporting the broader goals of Factory 4.0.

### **Use Case: Custom Equipment Development**

Custom equipment development is a growing use case for automation engineers, especially in the context of Factory 4.0. Using standardized hardware and software building blocks provided by IoTFoundry, they can prototype and refine machines tailored to specific production goals. This modular approach allows for rapid adaptation to changing requirements without extensive reengineering. It also promotes innovation by lowering the barrier to entry for designing intelligent, responsive equipment.

### **Use Case: Firmware Development for Endpoint Devices**

Firmware development for endpoint devices is a specialized use case led by firmware engineers, typically employed by companies that manufacture microcontrollers, smart sensors, or smart motors. Rather than creating communication libraries from scratch, these developers utilize standardized libraries provided by the IoTFoundry ecosystem to enable MCTP and PLDM protocol support on their devices. This approach allows firmware engineers to focus on the unique functionality of the device—such as sensing, actuation, or control logic—while ensuring seamless interoperability with other compliant components in the IIoT environment.

By adopting these standardized libraries, firmware developers guarantee that their devices can be discovered, enumerated, and orchestrated within a unified system architecture. IoTFoundry distributes these libraries in formats compatible with widely used toolchains, including STM32Cube, Zephyr, PlatformIO, and Arduino IDE, making integration straightforward and accessible. This consistency across platforms accelerates development, reduces integration errors, and promotes a plug-and-play experience for system integrators and automation engineers.

### **Use Case: Performance Monitoring and Data Collection**

Performance monitoring and data collection is essential for maintaining operational efficiency and enabling continuous improvement. Factory operators use HMIs to observe environmental and machine-level metrics, such as temperature, vibration, and energy consumption. Automation engineers analyze this telemetry to identify bottlenecks, optimize workflows, and reduce downtime. IoTFoundry’s standardized data representation ensures that metrics are consistently formatted and easily integrated into analytics pipelines.

## **High-Level Requirements** {#high-level-requirements}

The following requirements define the essential capabilities and architectural principles that the IoTFoundry project shall fulfill to meet the needs of its stakeholders and support the documented use cases. These requirements are derived from the project’s scope, the responsibilities of key roles, and the operational demands of industrial automation environments. They emphasize interoperability, scalability, and alignment with open standards, ensuring that IoTFoundry remains a robust and future-ready foundation for IIoT deployments. Each requirement reflects a critical function necessary to enable seamless integration, efficient orchestration, and reliable performance across diverse hardware and software platforms.

### **REQ1: Standardized Communication Protocol Support**

IoTFoundry shall provide robust, open-source support for MCTP and PLDM protocols across both Linux-based orchestration systems and microcontroller-driven endpoints. This includes kernel-level enhancements, user-space tooling, and firmware libraries that ensure consistent transport and data modeling. Protocol compliance shall be maintained in alignment with DMTF and PICMG specifications and extended to accommodate industrial IoT needs as defined by this document.

### **REQ2: Linux-Based Enumeration and Diagnostic Tools**

The architecture shall include tools for discovering, identifying, and monitoring endpoints within IIoT environments. These tools shall support enumeration (topology mapping, device classification, capability registration) and diagnostics (status reporting, fault detection, telemetry retrieval). They shall be accessible to automation engineers and system integrators and operate reliably across heterogeneous hardware.

### **REQ3: Modular Firmware Libraries for Microcontrollers**

IoTFoundry shall deliver and maintain standardized firmware libraries that implement MCTP and PLDM for commonly used microcontroller families. These libraries shall be compatible with popular development environments such as STM32Cube, Zephyr, PlatformIO, and Arduino IDE. The libraries shall abstract protocol complexity, enabling firmware engineers to focus on device-specific functionality while ensuring interoperability.

### **REQ4: Unified Data Representation and Transformation**

The system shall enforce consistent data schemas for telemetry, control, and status reporting across all endpoints. PLDM-based data shall be easily transformable into Redfish-compliant representations to support higher-level orchestration. This requirement shall ensure seamless integration between machine-level data and factory-level management systems, enabling centralized control and analytics.

### **REQ5: Plug-and-Play Hardware Integration**

IoTFoundry shall support a plug-and-play model for endpoint hardware, allowing system integrators to assemble machines from standardized components with minimal custom integration. This includes consistent device discovery, predictable behavior, and semantic alignment across sensors, actuators, and controllers. The architecture shall reduce commissioning time and simplify validation workflows.

### **REQ6: Extensible Architecture for Future Hardware**

The system shall be designed to accommodate new microcontroller families and evolving protocol standards. This includes modular library structures, versioning support, and community-driven extension mechanisms. IoTFoundry shall remain adaptable to future hardware capabilities and maintain long-term relevance in dynamic IIoT environments.

### **REQ7: Support for Process Orchestration and Optimization**

IoTFoundry shall enable automation engineers to define and execute orchestration logic that coordinates machine behavior across production lines. This includes task sequencing, interdependency management, and resource optimization. The architecture shall expose endpoint capabilities in a way that supports granular control and scalable system design.

### **REQ8: Telemetry Access for Monitoring and Analytics**

The system shall surface standardized telemetry data—such as cycle times, energy usage, fault rates, and environmental conditions—through orchestration interfaces and HMIs. This data shall be accessible to automation engineers and factory operators for performance monitoring, diagnostics, and continuous improvement.

### **REQ9: Role-Based Interaction Models**

IoTFoundry shall support differentiated interaction models for each stakeholder role. Automation engineers shall require orchestration and diagnostic tools; system integrators shall need integration and commissioning utilities; firmware engineers shall need protocol libraries and test harnesses; factory operators shall need intuitive HMIs with access to telemetry and alerts. These interfaces shall be tailored to each role’s domain expertise and operational context.

### **REQ10: Open Collaboration and Community Alignment**

All contributions to IoTFoundry—whether kernel patches, tooling enhancements, or firmware libraries—shall be developed in close collaboration with the open-source community. This includes upstream engagement with the Linux kernel, alignment with DMTF and PICMG standards, and transparent governance to ensure broad adoption and interoperability.


---


## **Connection Model** {#connection-model}

This section provides an overview of the communication model supported by the IoTFoundry architecture. It describes the layered networking architecture used to connect Endpoints to Linux systems, progressing from physical interfaces to transport protocols and data representation. It establishes the conceptual foundation for understanding how endpoints communicate within the IoTFoundry ecosystem.

### **Physical Layer Subsystem**

At the foundation of the IoTFoundry communication model are serial interfaces—specifically RS-232 and RS-485. These interfaces have been selected for their electrical robustness, simplicity, and widespread support across legacy and modern factory equipment. RS-232 offers a straightforward point-to-point connection model, suitable for direct communication between microcontrollers and host systems. Although limited in range and noise immunity, RS-232 is ideal for configuration, diagnostics, and low-speed data exchange.

RS-485, by contrast, supports differential signaling, which enhances noise resistance and allows for long-distance communication—often exceeding hundreds of meters. Its ability to support multidrop configurations enables multiple devices to share a single communication bus, reducing wiring complexity and cost. This makes RS-485 particularly well-suited for distributed control systems and sensor networks in electrically noisy industrial environments. The ubiquity of these interfaces ensures compatibility with existing infrastructure and simplifies integration for system designers and firmware developers.

In multidrop RS-485 networks, collision avoidance and endpoint identification are critical to maintaining reliable communication. Master-slave communication is required in multidrop scenarios, as unrequested transmission from any endpoint might collide with transmission from another.  Implications for MCTP in this mode are that dynamic discovery is not possible due to possible collisions on Get Endpoint ID broadcast responses, and Discovery Notify messages should not be sent by endpoints because of the high likelihood of collision with other bus traffic.  The primary PLDM implication is that event-driven communications cannot be supported since they rely upon endpoint-initiated communication.  The benefits of multidrop RS-485 should be weighed against the limitations of this use model. 

A summary of these physical transports is provided in **Table 3** below.

**Table 3 — Comparison of Serial Transports for Physical Layer**

| Serial Transport | Transceiver Type | Scalability | Supports MCTP Dynamic Discovery | Supports MCTP Discovery Notify | Supports PLDM Event Driven Messages |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **RS-232** | Single-Ended | Point to Point | Yes | Yes | Yes |
| **RS-485** | Differential | Point to Point | Yes | Yes | Yes |
| **RS-485 Multidrop** | Differential | Up to at least 32 nodes | No | No | No |

IoTFoundry supports each of these serial transportation modes, allowing the system integrator or factory automation engineer to choose the best solution based on their particular implementation requirements.

### **Physical Layer Software Architecture**

Serial communication over UART requires a coordinated software stack on both the Linux host and the microcontroller endpoint, with each side managing its own hardware interface, driver logic, and application-level behavior. At the physical layer, UART transmits data asynchronously using TX and RX lines, optionally supplemented by RTS/CTS for hardware flow control. The electrical connection may use RS-232 or RS-485. This physical link forms the bridge between the UART peripheral on the microcontroller and the serial port on the Linux system.Major software components to support physical layer communications are shown in Figure 2\.

| Figure 2 \- Physical Layer Component Diagram |
| :---- |
| ![][image2] |

On the Linux side, the UART hardware is exposed through onboard serial ports or USB-to-serial adapters. These are managed by kernel-level device drivers that handle interrupt servicing, buffer management, baud rate configuration, and flow control. 

Above the driver layer, the Linux TTY subsystem provides a standardized character device interface, abstracting serial ports as `/dev/tty*` devices. This allows user-space applications to interact with serial interfaces using familiar POSIX APIs such as `open()`, `read()`, and `write()`. The TTY layer also supports line discipline, buffering, and terminal control features. 

On the microcontroller side, UART communication is handled by the built-in UART peripheral, which is configured through firmware to match the desired baud rate, parity, stop bits, and interrupt behavior. Driver libraries provided by the microcontroller vendor or open-source RTOS platforms—such as STM32Cube HAL, Zephyr UART API, Arduino’s Serial class, or FreeRTOS UART drivers—manage the low-level transmission and reception of data. These drivers typically support interrupt-driven or DMA-based communication and implement ring buffers to handle incoming and outgoing data efficiently. 

At the application layer, firmware developers implement to parse commands, and manage control flows by directly accessing the driver API.

The connection between the Linux system and the microcontroller is established through the physical UART link, normally in the form of a cable.

### **Transport and Control Layer**

Building on the physical layer, IoTFoundry employs the Management Component Transport Protocol (MCTP) to provide a lightweight, reliable transport mechanism tailored for microcontroller-based endpoints. MCTP defines a base message transfer unit of 64 bytes, minimizing memory requirements and simplifying buffer management. For larger payloads, MCTP supports packetization, allowing messages to be split and reassembled efficiently. Transport-level reliability is ensured through packet-level CRC validation and automatic retransmission, making MCTP resilient to transient communication faults.

The control model implemented over MCTP follows primarily a client-server paradigm. In this architecture, the Endpoint acts as a passive server, while the Linux device functions as the client. The client initiates communication by sending PLDM commands to the Endpoint, which processes the request and returns a structured response. This model supports deterministic control and simplifies orchestration logic, as endpoints remain responsive to centralized commands without requiring complex negotiation protocols.  

PLDM also optionally supports event-driven communication, which allows subscribers to receive messages when specific data within the data model changes.  Event-driven communication cannot be supported on multidrop serial deployments.

#### Primary Components of Linux MCTP Transport and Control

The Management Component Transport Protocol (MCTP) was officially introduced into the Linux kernel in version 5.12, released in April 2021, as part of a growing effort to support DMTF-defined protocols for platform management and device communication. MCTP has since matured into a modular and extensible stack within Linux. Today, it includes kernel-level routing infrastructure, transport bindings such as mctp-serial, and user-space tools and libraries that enable endpoint discovery, configuration, and protocol orchestration. Major components are shown in **Figure 3**.

| Figure 3 \- Primary Components of Linux MCTP Transport and Control |
| :---- |
| ![][image3] |

The Linux MCTP stack is architecturally composed of two relatively independent subsystems: the MCTP core and the MCTP-serial module (or other modules for different transports). The MCTP core is responsible for implementing core routing logic and managing socket creation for MCTP communication. It is not invoked directly by user-space applications; instead, it is activated by the Linux networking subsystem when a user interacts with sockets bound to MCTP-capable interfaces—such as those created by the MCTP-serial module. The core maintains routing tables based on Endpoint IDs (EIDs), dispatches messages to appropriate interfaces, and integrates with the Linux socket layer via the `AF_MCTP` address family.

The MCTP-serial module operates independently and is triggered when a user applies the `mctp-serial` line discipline to a serial port using the ioctl system call. This action configures the serial port to operate as an MCTP transport endpoint. Upon activation, the module creates a unique `mctpserial` net device and registers it with the kernel’s networking subsystem. It also installs callbacks to handle DSP0253-compliant framing, error detection, and encoding of MCTP messages before they are transmitted through the associated TTY device. Like the MCTP core, the mctp-serial module is not directly accessed by user-space tools; its lifecycle and behavior are managed through kernel interfaces and device configuration.

The Linux networking subsystem provides the foundational infrastructure for both socket-based communication and interface management. It uses the `net_device` abstraction to represent network interfaces and supports multiple protocol families, including `AF_INET`, `AF_PACKET`, and `AF_MCTP`. Sockets created in user space are routed through this subsystem, which determines the appropriate net device and protocol handler based on the socket’s configuration. For control and configuration tasks, the networking subsystem exposes the Netlink interface—a kernel-to-user-space messaging system used to manage routing tables, interface states, and protocol-specific parameters. 

The ioctl subsystem in Linux serves as a flexible mechanism for performing device-specific control operations that go beyond standard file I/O. It allows user-space applications to send commands to kernel drivers, configure device parameters, and query status information. In the context of MCTP-serial, ioctl is used to assign the `N_MCTP` line discipline to a serial port, effectively transforming it into an MCTP transport endpoint. This invocation triggers the mctp-serial module to initialize the link, register the net device, and begin handling MCTP traffic.

At the time of the writing of this document, Linux does not handle device enumeration, configuration, or processing of control messages.  This is expected to be handled by usespace code using primarily the sockets interface.

#### Microcontroller MCTP Transport Layer Components

To support MCTP communication on a microcontroller is organized into a set of lightweight, modular components that handle framing, segmentation, reassembly, and control message processing. This architecture is designed to operate over a serial transport, assuming a functional UART layer is already in place. It separates responsibilities cleanly to ensure scalability and maintainability, while keeping memory usage predictable and low. **Figure 4** shows the relationship of the main components.

| Figure 4 \- Primary Components of Microcontroller MCTP Transport and Control |
| :---- |
| ![][image4] |

The RX Frame Decoder is responsible for parsing incoming byte streams and identifying valid MCTP frames according to the DSP0253 specification. It monitors the stream for start-of-packet delimiters, extracts length fields, and validates checksums to ensure frame integrity. This component operates incrementally, decoding frames as bytes arrive to avoid buffering entire streams in memory. Once a complete and valid frame is identified, it is passed to the receive handler for reassembly. To minimize memory usage, the decoder should use a compact ring buffer.

The Transmit Framer prepares outbound MCTP frames for transmission. It takes segmented message fragments and wraps them with the necessary framing elements, including start delimiters, length indicators, and checksums. This ensures that the receiving endpoint can reliably detect and validate each frame. The framer should operate in-place, modifying buffers directly to avoid unnecessary copying. Once framed, the data is handed off to the underlying transport layer for transmission. This separation allows the transmit logic to remain focused on framing without being coupled to segmentation or hardware concerns.

The receive handler collects decoded MCTP frames and reassembles them into complete messages when they span multiple packets. It tracks sequence numbers, message tags, and EIDs to ensure proper ordering and completeness. Once a full message is assembled, it is placed into a receive queue for application-level consumption. To conserve memory, the reassembler should use fixed-size message slots and implement timeout-based cleanup for incomplete or abandoned messages. This prevents memory leaks and ensures predictable behavior in constrained environments.

The transmit handler breaks large messages into smaller MCTP frames suitable for transmission. It segments messages based on the maximum frame size and appends metadata such as sequence numbers and message tags. These fragments are then passed to the transmit framer for encoding. To reduce memory overhead, the segmenter should avoid deep copies and instead use pointer-based slicing of the original message buffer. This allows frames to be sent in-place, which is critical for microcontrollers with limited RAM.

The Control Message Handler is responsible for processing MCTP control messages, which are essential for managing routing, endpoint discovery, and protocol negotiation. When a message is received with the control message type, this handler parses the payload and executes the appropriate logic—such as responding to EID requests, updating routing tables, or acknowledging version queries. It may also generate control responses and queue them for transmission. To minimize memory usage, the handler should reuse existing message buffers and operate with a stateless design where possible. This component ensures that the microcontroller can participate in MCTP network management and remain compliant with the protocol specification.

The application interface provides a simple and efficient API for upper-layer firmware to interact with the MCTP stack. It exposes functions such as `mctp_recv()` to retrieve complete messages from the receive queue and `mctp_send(msg, dest_eid)` to submit messages for transmission. This interface abstracts away the complexity of framing, segmentation, and reassembly, allowing the application to focus on message-level logic. Internally, the interface should manage shallow queues with fixed-size slots to avoid dynamic memory allocation and ensure deterministic performance.

### **Data Representation Layer**

At the highest layer of the stack, IoTFoundry utilizes the Platform Level Data Model (PLDM) to define a structured and extensible interface for endpoint capabilities and telemetry. Each Endpoint maintains a repository of Platform Descriptor Records (PDRs), which describe its functional attributes, supported commands, and data structures. These records are binary-encoded to minimize transmission overhead and storage requirements, making them well-suited for resource-constrained devices.

PLDM optionally supports event-driven communication, which allows subscribers to receive messages when specific data within the data model changes.  Event-driven communication cannot be supported on multidrop serial deployments.

Importantly, PLDM data structures are designed to be easily transformed into Redfish-compliant representations. Redfish, a DMTF standard for system-level management, has been extended in collaboration with PICMG to support industrial IoT scenarios. This alignment allows endpoint telemetry and control data to be aggregated and interpreted within higher-level orchestration frameworks, enabling centralized management, predictive analytics, and scalable automation strategies.

#### Data Representation and Application in Linux

The implementation of the PLDM (Platform Level Data Model) client in Linux is architected as a modular system composed of multiple user-space components, each responsible for a distinct aspect of PLDM communication, data management, and system control. This is shown in **Figure 5**.

| Figure 5 \- Linux Data Representation Layer |
| :---- |
| ![][image5] |

Although not directly part of the PLDM, MCTP Enumeration and Configuration Agent is included in this architecture. It is responsible for discovering and configuring MCTP endpoints. This agent initiates communication with endpoints, assigns or verifies Endpoint IDs (EIDs), and monitors link health. It may periodically poll endpoints or listen for heartbeat failures to detect endpoint loss or recovery. This component ensures that the PLDM client has a reliable and up-to-date view of the available devices on the MCTP network.

The core of the system is the PLDM Client, which acts as a centralized repository for Platform Descriptor Records (PDRs) collected from each endpoint. Upon initialization or when new endpoints are discovered, the client queries each device for its PDR repository and stores the results in a structured format. This centralized PDR database enables efficient lookup and correlation of platform capabilities, sensors, effecters, and other PLDM-defined entities. The client may also expose APIs for querying this repository from other components or applications.

An optional PLDM Listener can be included to support asynchronous, event-driven communication. This component listens for PLDM event messages from remote endpoints—such as sensor threshold crossings, state changes, or firmware update notifications—and updates the PDR repository or other internal state accordingly. It may also invoke user-defined callback functions to trigger additional actions, such as logging, alerting, or automated control responses. This listener enhances responsiveness and reduces the need for polling.

To bridge the PLDM data model with external management systems, an optional Redfish Agent may be deployed. This agent translates the internal PDR repository into Redfish schema objects and serves them via a Redfish-compliant REST API. It enables higher-level orchestration tools to query system inventory, sensor status, and control interfaces using standardized Redfish calls. The agent may also support Redfish eventing and patch operations, allowing remote systems to modify platform state through Redfish while internally routing those changes to PLDM commands.

The Application Layer is responsible for actively interacting with endpoints by sending PLDM commands. This may include reading sensor values, setting controller states, initiating firmware updates, or performing diagnostics. The application uses the PLDM client’s APIs to construct and dispatch requests, and may rely on the centralized PDR repository to determine endpoint capabilities and message formats. It serves as the control interface for system automation, diagnostics, or policy enforcement.

Finally, a Human-Machine Interface (HMI) provides user interaction with the system. Depending on the deployment, the HMI may communicate directly with the application layer for low-level control, or interface with the Redfish Agent for a higher-level, abstracted view of the system. This flexibility allows the HMI to be tailored for technicians, administrators, or automated scripts, depending on the use case.

While linux does have some tools to support construction of this architecture, no cohesive solution currently exists.  IoTFoundry will supply all these functions except for the application code and optional Redfish Agent as a userspace library.  Thus allowing custom application code to be written with minimal effort.  Hooks to the Redfish agent will be accomplished by a yet-to-be-determined method, but likely will involve interprocess communication, or interaction through a shared database interface.

#### Microcontroller Data Representation

The microcontroller portion of the PLDM stack is designed to provide lightweight, responsive, and standards-compliant support for PLDM-based communication and control in embedded environments. It consists of three primary components: a PLDM server function, an optional event-driven communication agent, and a control/monitoring function. Together, these components enable the microcontroller to participate as a PLDM responder, manage platform data, and interact with external sensors and motors in a structured and interoperable manner. The main components are shown in **Figure 6\.**

| Figure 5 \- Microcontroller Data Representation Layer |
| :---- |
| ![][image6] |

At the core of the stack is the PLDM Server Function, which acts as the responder to incoming PLDM requests from external clients. This server parses incoming PLDM messages from the MCTP stack, validates their structure and intent, and dispatches them to appropriate handlers based on the PLDM type and command. It supports essential PLDM protocols such as Base, Platform Monitoring and Control, and optionally Firmware Update, depending on the application. The server accesses a local repository of Platform Descriptor Records (PDRs), which define the microcontroller’s exposed capabilities—such as sensors, effecters, and control interfaces. These PDRs are used to interpret incoming commands and generate appropriate responses, ensuring compliance with PLDM specifications.

Complementing the server is an optional Event-Driven Communication Agent, which enables the microcontroller to initiate asynchronous PLDM messages. This agent is useful for sending event notifications, such as sensor threshold crossings, state changes, or fault conditions, without waiting for a client poll. It monitors internal conditions and triggers outbound PLDM event messages when configured thresholds or conditions are met. These messages may be routed to the linux PLDM client, allowing for real-time updates and proactive system behavior. The agent may also support event logging and retransmission policies to ensure reliable delivery in noisy or lossy environments.

The third component is the Control and Monitoring Function, which interfaces directly with the microcontroller’s hardware resources. It collects sensor data, monitors system status, and manages control outputs such as GPIOs, actuators, or power rails. This function serves as the operational backend for the PLDM stack, supplying real-time data to the PLDM server and executing control actions based on PLDM commands. When a PLDM client writes new values to effecters or modifies control-related PDRs, the control function interprets these changes and applies them to the hardware. This bidirectional integration ensures that the PLDM stack reflects the true state of the system and can respond dynamically to external control.

The PDRs used by the PLDM server are central to this architecture. They define the structure, types, and relationships of all manageable entities on the microcontroller. For industrial control applications, the PICMG IoT.1 IoT Firmware Specification provides detailed guidance on how to construct and interpret PDRs for sensors, effecters, and control domains. This includes standardized formats for sensors, digital outputs, analog inputs, and more, enabling interoperability across vendors and platforms. By adhering to IoT.1, the microcontroller can expose its capabilities in a way that is immediately usable by compliant PLDM clients and management systems.

[image1]: {{ '/assets/images/architecture/image1.png' | relative_url }}
[image2]: {{ '/assets/images/architecture/image2.png' | relative_url }}
[image3]: {{ '/assets/images/architecture/image3.png' | relative_url }}
[image4]: {{ '/assets/images/architecture/image4.png' | relative_url }}
[image5]: {{ '/assets/images/architecture/image5.png' | relative_url }}
[image6]: {{ '/assets/images/architecture/image6.png' | relative_url }}

