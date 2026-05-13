---
name: create-issue
description: Creates a structured issue.md file in the project root, designed to be implemented by a junior programmer or a cheaper AI model. Use when the user asks to "create an issue", "write up a task", "create a ticket", or "document what needs to be done". The agent enriches the user's description with codebase context to produce a clear, self-contained, and unambiguous issue.
user-invocable: true
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash"]
---

# Create Issue

Generate a clear, self-contained `issue.md` at the project root. The file must be detailed enough for a junior programmer or a cheaper AI model to implement without needing to ask follow-up questions.

---

## Guiding Principle

Write the issue as if the implementer has **no prior context** about the feature or the conversation that produced it. Every decision already made should be stated explicitly. Ambiguity is the enemy — if something could be interpreted two ways, pick one and say so.

---

## Process

### 1. Understand the user's intent

Read the user's description carefully. Extract:

- What needs to be built or changed
- Why it's needed (if stated)
- Any constraints or preferences the user mentioned

### 2. Enrich with codebase context

Before writing, gather project context in this priority order — stop once you have enough to write the issue concretely:

**Step A — Read the curated agent context file (preferred)**

```bash
cat AGENTS.md 2>/dev/null || cat CLAUDE.md 2>/dev/null || echo "No agent context file found."
```

If found, this file is the primary source of truth for project structure, conventions, and key file locations. Prefer it over all other discovery methods.

**Step B — Grep for topic-relevant files**

Only run this if Step A didn't give enough context about the specific area the issue touches:

```bash
# Replace the search term with keywords relevant to the issue topic
grep -r "<topic>" --include="*.ts" --include="*.tsx" --include="*.js" -l . \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next
```

**Step C — Directory structure (last resort)**

Only run this if Steps A and B left the project structure genuinely unclear:

```bash
find . -maxdepth 3 \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  -not -path '*/.next/*'
```

Use whatever you find to reference exact files, existing naming conventions, and dependencies that affect the task.

### 3. Write `issue.md`

Use the template below. Write every section — do not leave any as a placeholder. Use the Write tool to save the file directly to the project root.

---

## `issue.md` Template

```markdown
# <Issue Title>

> **For the implementer:** This issue is self-contained. Read it fully before starting. If anything is unclear, re-read the Notes section before asking.

---

## Overview

<4 sentences. What is this issue about and why does it need to be done? State the goal plainly — no filler, no marketing language.>

---

## Scope

<What area of the codebase does this touch? Name the relevant modules, directories, or layers (e.g. "This affects the API route layer under `app/api/` and the auth utility in `lib/auth.ts`"). Keep it to 2–4 sentences.>

---

## Tasks

<Numbered list of high-level steps the implementer should follow in order. Each task should be one clear action. Reference real file paths and module names from the codebase where relevant.>

1.
2.
3.

---

## Acceptance Criteria

<Bullet list of specific, verifiable conditions that must be true when the work is done. Each item should be a pass/fail check — no vague criteria like "works correctly".>

- [ ]
- [ ]
- [ ]

---

## Out of Scope

<Bullet list of things the implementer must NOT do or change as part of this issue. Be explicit about adjacent areas they might be tempted to touch.>

-
- ***

## Notes

<Any additional context that doesn't fit above: third-party docs, existing patterns to follow, known gotchas, decisions already made and why, or links to relevant code. If there are none, write "None." — do not leave this section empty.>
```

---

## Writing Rules

These apply to every section:

- **Be concrete.** Name real files, real functions, real routes — not "the relevant module" or "the appropriate service".
- **One idea per sentence.** Long compound sentences hide ambiguity.
- **Tasks are high-level steps**, not implementation details. "Add a logout endpoint to `app/api/auth/`" not "open the file, add a function, export it...".
- **Acceptance Criteria are checkboxes**, not descriptions. The implementer should be able to tick each one without judgment calls.
- **Out of Scope prevents scope creep.** If the user said "don't touch the UI yet" or "leave the old endpoint in place", put it here.
- **No filler.** Avoid "It's worth noting", "Importantly", "This will ensure that". Say the thing directly.

---

## After Writing

Confirm to the user:

- That `issue.md` has been written to the project root
- A one-line summary of what the issue covers

Do not print the full file contents back into the conversation.

---

## Safety Rules

- NEVER overwrite an existing `issue.md` without asking the user first — they may have work in progress
- NEVER include secrets, tokens, or credentials in the issue file
