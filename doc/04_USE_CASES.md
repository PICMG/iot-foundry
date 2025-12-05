
# 

# **Use Cases and Requirements** {#system-requirements}

This section defines the system requirements for the IoTFoundry project, offering a structured overview of its intended operational context. Rather than addressing implementation-level details, the purpose here is to articulate the roles of anticipated users, the primary use cases, and the essential functional requirements that the system must satisfy. 

By clarifying the interactions between factory operators, automation engineers, firmware developers, and system integrators, this section establishes a foundation for understanding how IoTFoundry will be utilized within diverse Industrial IoT environments. The use cases presented will illustrate the practical scenarios in which the system is expected to operate, while the requirements will reflect the capabilities necessary to ensure reliability, scalability, and interoperability across heterogeneous manufacturing systems.

## **Key Roles** {#key-roles}

IoTFoundry facilitates the coordinated efforts of multiple stakeholders, each contributing distinct expertise to the development, deployment, and operation of Industrial IoT systems. This section defines the key roles involved in the ecosystem, clarifying their responsibilities and interactions within the broader framework. These role definitions serve as a foundation for aligning technical capabilities with operational and development needs.

A summary of these roles is given in **Table 1** below.  More detailed descriptions of each are provided in further subsections.

| Table 1 \- Roles Summary |  |  |
| :---: | ----- | ----- |

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

| Table 2 \- Use Case Summary |  |  |
| :---: | ----- | ----- |

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

