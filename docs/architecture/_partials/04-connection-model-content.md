# Connection Model

This page describes the layered networking model used to connect microcontroller Endpoints to Linux hosts, from physical interfaces up through transport and data representation.

## Physical Layer

IoTFoundry targets serial interfaces (UART) over RS-232 and RS-485 due to their robustness and ubiquity in industrial environments. RS-485 supports differential signaling and multidrop topologies but introduces limitations for dynamic discovery and event-driven messages because of collision risk on shared buses.

Design notes:

- RS-232: simple point-to-point use cases (configuration, diagnostics).
- RS-485 (point-to-point): longer range with noise immunity.
- RS-485 (multidrop): supports many nodes but *cannot* safely support MCTP dynamic discovery or PLDM event-driven communications in typical multidrop setups.

## Physical Layer Software

- Linux side: UART devices are exposed as `/dev/tty*` and handled via kernel drivers + the TTY subsystem. Userspace interacts with serial ports using POSIX APIs.
- Microcontroller side: typical UART peripheral drivers (vendor HAL, Zephyr, Arduino APIs) with interrupt or DMA-driven buffers.

## Transport and Control Layer

IoTFoundry uses MCTP as the transport for microcontroller endpoints. Linux provides an MCTP core and transport bindings such as `mctp-serial`. The `mctp-serial` module is typically enabled by assigning the `N_MCTP` line discipline to a serial port; it registers a net device and integrates with the kernel networking stack.

On microcontrollers, the MCTP implementation should be modular and lightweight, with components such as:

- RX frame decoder and receive handler (incremental decoding, reassembly).
- Transmit framer and transmit handler (segmentation, in-place framing).
- Control message handler for EID requests, routing updates, and other management traffic.
- Simple application interface (e.g., `mctp_recv()`, `mctp_send(msg, dest_eid)`).

## Data Representation Layer

PLDM is used for structured device capabilities and telemetry. Endpoints store PDRs (Platform Descriptor Records) that describe sensors, effecters, and other resources. PLDM can be transformed into Redfish representations to integrate endpoint data into higher-level orchestration systems.

Linux components typically include a PLDM client, an optional PLDM listener for events, and tooling to collect and store PDRs. IoTFoundry intends to supply a userspace library that implements these functions (excluding application code and optional Redfish agent).

## Microcontroller Considerations

- Keep MCTP/PLDM implementations small and deterministic (fixed-size buffers, ring buffers, timeout cleanup).
- Avoid dynamic memory where possible; prefer in-place framing/segmentation and shallow queues.
- Event-driven PLDM messages are not suitable for multidrop RS-485 topologies.

## Diagrams

See `/images/architecture-diagram.svg` for a top-level diagram. More detailed component diagrams are available under `/images/` (physical, transport, data layers) and may be expanded as the architecture grows.
