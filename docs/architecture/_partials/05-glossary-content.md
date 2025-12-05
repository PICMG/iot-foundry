# Glossary of Terms

This glossary defines terms used in the IoTFoundry documentation.

| Term | Definition |
| ----- | ----- |
| Binary-Encoding | A compact data format used to reduce transmission and storage overhead, suitable for resource-constrained devices. |
| Effecter | A controllable endpoint resource defined in PLDM, such as a GPIO or actuator. |
| Endpoint | A microcontroller-based device that communicates using MCTP and PLDM, exposing telemetry and control interfaces. |
| Event-Driven Communication | A feature that allows endpoints to send messages when triggered by a local event. |
| Firmware Update | A method of applying firmware changes to endpoint devices. |
| GPIO (General-Purpose Input/Output) | A hardware control interface consisting of digital inputs and/or outputs. |
| HMI (Human-Machine Interface) | A user interface that allows technicians or administrators to interact with the system. |
| MCTP | Management Component Transport Protocol, a lightweight transport for platform management communications. |
| PDR | Platform Descriptor Record — a binary-encoded data structure describing an endpoint’s capabilities. |
| PLDM | Platform Level Data Model — protocol layered over MCTP defining structured commands and data models. |
| Redfish | A DMTF-defined RESTful API and schema for system-level management. |
| Resource-Constrained Device | A device with limited memory and processing power, such as a microcontroller. |
| Retransmission Policy | Mechanisms that ensure reliable delivery of messages in noisy environments. |
| Socket | A software interface that enables communication between applications; in Linux this includes AF_MCTP. |
| Telemetry | Data collected from endpoint devices used for monitoring and orchestration. |
| User-Space | The portion of the OS where applications and user-level processes run. |
