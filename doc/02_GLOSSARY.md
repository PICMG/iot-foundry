##
## **Glossary of Terms** {#glossary-of-terms}

This section contains a glossary of terms as they are used in this project.

| Term | Definition |
| ----- | ----- |
| **Binary-Encoding** | A compact data format used to reduce transmission and storage overhead, suitable for resource-constrained devices. |
| **Effecter** | A controllable endpoint resource defined in PLDM, such as a GPIO or actuator. |
| **Endpoint** | A microcontroller-based device that communicates using MCTP and PLDM, exposing telemetry and control interfaces. |
| **Event Logging** | The process of logging local events. |
| **Event-Driven Communication** | A feature that allows endpoints to send messages, when triggered by a local event. |
| **Firmware Update** | A method of applying firmware changes to endpoint devices. |
| **GPIO (General-Purpose Input/Output)** | A type of hardware control interface consisting of digital inputs and/or outputs. |
| **Human-Machine Interface (HMI)** | A user interface that allows technicians or administrators to interact with the system. |
| **MCTP (Management Component Transport Protocol)** | A lightweight communication protocol used to send messages between devices like microcontrollers and Linux systems. It supports small packets, error checking, and message reassembly, making it reliable and efficient for industrial and embedded systems |
| **PDR (Platform Descriptor Record)** | A binary-encoded data structure that describes an endpoint’s capabilities, commands, and telemetry interfaces. |
| **PLDM (Platform Level Data Model)** | A protocol layered over MCTP that defines structured commands, responses, and data models for platform management. |
| **Redfish** | A DMTF-defined RESTful API and schema for system-level management, extended for industrial IoT by PICMG. |
| **Resource-Constrained Device** | A device with limited memory and processing power, such as a microcontroller, for which binary-encoded PDRs are optimized. |
| **Retransmission Policy** | A mechanism of a Communication to ensure reliable delivery of messages in noisy environments. |
| **Sensor Threshold Crossing** | A condition that occurs when a sensor value exceeds a defined limit. |
| **Socket** | A software interface that enables communication between applications over a network. In Linux, sockets allow user-space programs to send and receive data using protocols like TCP, UDP, or MCTP. |
| **Telemetry** | Data collected from endpoint devices, such as sensor readings and system status, used for monitoring and orchestration. |
| **User-Space** | The portion of a computer’s operating system where applications and user-level processes run, separate from the kernel.  |

