---
name: claudekit-cli
description: >-
  Provides instructions and commands for using the ClaudeKit CLI (`ck`).
  ClaudeKit CLI is a command-line bootstrapping and updating tool for ClaudeKit projects,
  managing multi-agent orchestration, agent chaining protocols, skills directory migrations,
  and starter kits. Use whenever the user asks about ClaudeKit, running `ck` commands,
  setting up ClaudeKit starter kits, managing ClaudeKit skills, or using multi-agent chaining protocols.
---

# ClaudeKit CLI (`ck`) Skill Guide

ClaudeKit CLI (`ck`) is a command-line tool for bootstrapping, managing, and orchestrating ClaudeKit projects and multi-agent workflows.

## Prerequisites & Installation

ClaudeKit CLI is installed globally via npm:
```bash
npm install -g claudekit-cli
```

Verify installation:
```bash
ck --version
```

## Key Commands Reference

### 1. Project Initialization & Setup
- `ck new`: Interactively create a new ClaudeKit project.
- `ck new --dir <project-name> --kit <kit-name>`: Create a project with a specific starter kit (e.g. `engineer`).
- `ck init -g`: Initialize ClaudeKit globally in the user environment.
- `ck new --install-skills`: Install skill dependencies (Python, Node packages, system tools) automatically.
- `ck new --opencode --gemini`: Enable optional packages for OpenCode and Gemini integrations.

### 2. Updating & Maintenance
- `ck update`: Update project template files and skills to the latest versions from upstream.
- `ck doctor`: Run diagnostic health checks on your ClaudeKit installation, node/bun runtime, and token permissions.
- `ck list`: List all available and installed ClaudeKit templates and kits.

### 3. Skills Management
- `ck skills list`: List all active skills configured in the ClaudeKit project.
- `ck skills install <skill-name>`: Install a specific skill from the ClaudeKit repository.
- `ck skills update`: Update all local skill runbooks and dependencies.

## Multi-Agent Orchestration Protocol

ClaudeKit defines standard agent roles and execution chaining patterns:

### Sequential Chaining
Chain sub-agents when tasks have dependencies or require outputs from previous steps:
1. **Planning**: `planner` agent generates an implementation plan with numbered tasks in `./plans`.
2. **Implementation**: Sub-agents implement code following established architectural patterns.
3. **Testing**: `tester` agent executes test suites, identifies failures, and validates coverage.
4. **Code Review**: `code-reviewer` agent inspects code against quality and security standards.
5. **Documentation**: `docs-manager` updates markdown documentation in `./docs`.

### Parallel Execution
Spawn multiple sub-agents simultaneously for independent tasks:
- **Code + Tests + Docs**: When implementing separate, non-conflicting components.
- **Multi-feature Branches**: Isolated sub-agents working across independent modules.
