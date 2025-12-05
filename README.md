# IoTFoundry

![License](https://img.shields.io/github/license/PICMG/iot-foundry)
![Issues](https://img.shields.io/github/issues/PICMG/iot-foundry)

This repository is the umbrella specification and governance repository for the IoTFoundry project collection. It does not contain product code or libraries. Instead this repo contains:

- the overall architecture and reference design for the IoTFoundry family of projects,
- the contributor agreement, contribution workflow, and the project's code of conduct,
- links and pointers to each sub-project repository where implementation code is maintained.

If you are looking for implementation code (libraries, examples, or firmware), please follow the links in the `Related projects` section — each implementation is hosted in its own repository under the IoTFoundry umbrella.

## Table of contents

- Purpose
- Repository contents
- Architecture overview
- Governance & contributor agreement
- How sub-projects are organized
- How to add or onboard a sub-project
- Contributing
- License and code of conduct
- Resources

## Purpose

This repository exists to provide a single place for high-level architecture, governance, and onboarding guidance for the IoTFoundry family of projects.

About PICMG

PICMG (the PCI Industrial Computer Manufacturers Group) is a consortium that develops open standards for industrial and telecom computing systems. PICMG developed the IoT.x family of specifications (IoT.1 and IoT.2) in collaboration with the DMTF to define vendor-independent firmware interfaces, data models, and a scalable network architecture for industrial IoT.

Purpose and rationale

- Provide a shared, authoritative source for cross-project architecture and design decisions that affect multiple sub-projects.
- Host the legal and governance documents that apply to the umbrella (contributor agreement, license, code of conduct).
- Provide guidance and recommended layouts for maintainers and contributors running individual implementation repositories.

PICMG's IoT.x standards specify how devices and systems should interoperate, but without a common, open software infrastructure adopters are often forced to build point solutions or reimplement shared functionality. IoTFoundry addresses this gap by coordinating architecture, governance, and by pointing to sub-projects that provide reference implementations, reusable libraries, and test harnesses. The goal is to accelerate adoption of IoT.x-based solutions, reduce duplicated engineering effort, and improve interoperability across vendors and platforms.

## Repository contents

- `doc/` — architecture documents, reference specifications, and design notes that are shared across sub-projects.
- `linux/` — host-side design notes and system-requirements documents.
- `microcontroller/` — reference organization and example layouts for microcontroller-targeted repositories (no production code here).
- `CONTRIBUTING.md` — contributor guidance and CLA information.
- `CODE_OF_CONDUCT.md` — behavioral expectations for community participation.
- `LICENSE` — the repository license that applies to the umbrella materials.

## Architecture overview

The IoTFoundry architecture defines how MCTP and PLDM are used across constrained devices and host systems. See `doc/` for detailed diagrams and component descriptions. At a high level:

- Edge device (microcontroller): MCTP serial transport + optional PLDM handlers for device management.
- Host/system (Linux or other): MCTP userspace tools, test harnesses, and PLDM clients.
- Testing & Validation: host-driven test harnesses for verifying protocol conformance, interop, and release validation.

If you'd like a short architectural diagram added to the repo (SVG/PNG), tell me which components to include and I will add it under `doc/`.

## Rationale

PICMG's IoT.x family of specifications (IoT.1 and IoT.2) defines vendor-independent firmware interfaces, data models, and a scalable network architecture (including Redfish integration) to enable multi-vendor interoperability for industrial IoT. While these standards define what devices and systems should do and how they should interoperate, the absence of a shared, open software infrastructure means adopters often build point solutions or reimplement common functionality.

IoTFoundry exists to fill that gap: by producing reference architecture, governance, and (where appropriate in sub-project repositories) reusable reference implementations, libraries, and test harnesses, the project lowers the barrier to adoption for IoT.x-based solutions. This accelerates deployment, reduces duplicated engineering effort, and helps ensure consistent, interoperable implementations across vendors and platforms.

This work complements PICMG resources such as the IoT Firmware reference code and the IoT.x Builder/Configurator tools. See the PICMG IoT.x overview for more detail: https://www.picmg.org/openstandards/hardware-platform-management/iotx/ and the reference firmware repo: https://github.com/PICMG/iot_firmware

## Governance & contributor agreement

All sub-projects under the IoTFoundry umbrella are expected to follow the governance and contributor rules defined here unless a sub-project explicitly states an alternative in its own repository.

- See `CONTRIBUTING.md` for the contributor license agreement (CLA) or alternative contributor terms.
- See `CODE_OF_CONDUCT.md` for community standards and expected behavior.

If maintainers of a sub-project require a different contributor agreement, that must be clearly documented in the sub-project repository and linked from this repo.

## How sub-projects are organized

Each implementation or library is hosted in a separate repository. Recommended minimal structure for a sub-project repository:

- `README.md` — project description, supported platforms, and status.
- `LICENSE` — clear license file (compatible with umbrella rules).
- `CONTRIBUTING.md` (optional) — if a sub-project needs additional contribution rules.
- `doc/` — implementation-specific notes and design.
- `examples/` or `firmware/` — implementation code (if present in that repo).

Maintain common metadata and badges so it is easy to find status and CI links for each sub-project.

## How to add or onboard a sub-project

To add a repository to the IoTFoundry umbrella:

1. Create the implementation repository under the `PICMG` GitHub organization (or the appropriate org).
2. Include the files described above (`README.md`, `LICENSE`, `doc/`, etc.).
3. Open a pull request in this repository adding the sub-project to the `Related projects` section with a one-line description and link.
4. Maintain a clear license and contributor guidance in the sub-project repository; if it differs from the umbrella, note this explicitly in the PR.

## Contributing

Contributions to this repository are primarily documentation, architecture updates, and governance changes. Process:

1. Open an issue describing the proposed change.
2. Discuss and reach consensus on the issue.
3. Submit a focused pull request with the change and link the relevant issue.

Large or policy-level changes should be discussed on an issue and, where appropriate, reviewed by the project maintainers.

## License and code of conduct

This repository is covered by the `LICENSE` in the repository root. Community expectations are defined in `CODE_OF_CONDUCT.md`.

## Resources

- DMTF MCTP & PLDM specifications (see `doc/` for local references)
- PICMG IoT Firmware Reference Code: https://github.com/PICMG/iot_firmware
- Linux MCTP Documentation: https://docs.kernel.org/networking/mctp.html

---

If you'd like, I can now:

- add a short architecture diagram under `doc/`,
- expand `CONTRIBUTING.md` to include a formal CLA flow and checklist for new sub-projects, or
- add a `Related projects` section with links to known implementation repositories.
