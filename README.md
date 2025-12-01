# IoTFoundry Microcontroller Communications Libraries for Industrial Internet of Things

![License](https://img.shields.io/github/license/PICMG/iot-foundry)
![Coverage](https://img.shields.io/codecov/c/github/PICMG/iot-foundry)
![Issues](https://img.shields.io/github/issues/PICMG/iot-foundry)
![Forks](https://img.shields.io/github/forks/PICMG/iot-foundry)
![Stars](https://img.shields.io/github/stars/PICMG/iot-foundry)
![Last Commit](https://img.shields.io/github/last-commit/PICMG/iot-foundry)


IoTFoundry is a series of applications and libraries for embedded microcontroller platforms that implement the Management Component Transport Protocol (MCTP), and Platform Level Data Model (PLDM) protocols over teh microcontroller's serial interface.  Both of these protocols are standardized by the Distributed Management Task Force (DMTF) and copies of these specifications may be freely downloaded from the DMTF here:
- [MCTP Specification](https://www.dmtf.org/documents/pmci/management-component-transport-protocol-mctp-base-specification-131)
- [MCTP Serial Transport Binding Specification](https://www.dmtf.org/documents/pmci/mctp-serial-transport-binding-specification-100)
- [PLDM Specification](https://www.dmtf.org/sites/default/files/standards/documents/DSP0240_1.2.0.pdf)

Together, these two specifications provide lightweight, robust transport and application-layer data communications suitable for small-scale embedded devices.

The first goals of this project, by phase are:
- **Phase 1** 
    - Implement Linux-based test environment for valiation of MCTP, leveraging existing Linux support.
    - Implement MCTP communications support for Arduino devices with testing on Uno, and NanoEvery platforms.
    - Develop release process for MCTP library code
- **Phase 2**
    - Implement PLDM server code for Uno and NanoEvery that communicates on top of MCTP protocol
    - Implement Linux client and validation strategy for PLDM endpoints.
    -- Develop release process for PLDM library code
- **Phase 3**
    -- Implement MCTP and PLDM for additional tbd processor architecture

---
## Related Sub-projects
* libsermctp: Resources for linux userpsace development.  
* ardiuno-mctp:

## Other Resources
The following may be useful resources for this project.

- [PICMG IoT Firmware Refererence Code](https://github.com/PICMG/iot_firmware): MCTP and PLDM code for two microcontroller architectures written by the PICMG organization.
- [Linux MCTP Documentation](https://docs.kernel.org/networking/mctp.html): The documentation for the Linux MCTP sockets API.
- [CodeConstruct Userspace tools for MCTP stacke management](https://github.com/CodeConstruct/mctp): Two utilities for running an MCTP network from a local linux machine.
