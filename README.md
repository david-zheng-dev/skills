# Nimbus Skills

Internal agent skills for the engineering workflow — installable into Claude Code and other agents.
Nimbus 内部研发流程 agent 技能（PRD 评审、原型 HTML 评审等）。

## Skills

| Skill        | Description                          | Invoke      |
| ------------ | ------------------------------------ | ----------- |
| `prd-review` | 以研发视角评审 PRD 与原型 HTML 并输出报告 | `/prd-review` |

## Installation

**Option 1 — Open skills CLI (works with most agents):**
```bash
npx skills@latest add david-zheng-dev/skills
```

**Option 2 — Claude Code marketplace:**
```bash
claude plugin marketplace add david-zheng-dev/skills
claude plugin install nimbus-skills@nimbus
```

After install, invoke a skill in your agent, e.g. `/prd-review`.

## Repository Layout

| Path                              | Purpose                              |
| --------------------------------- | ------------------------------------ |
| `skills/<category>/<name>/SKILL.md` | Skill definition                     |
| `.claude-plugin/`                 | Claude Code plugin + marketplace manifest |
| `.changeset/`, `scripts/`         | Versioning (Changesets)              |
| `LICENSE`                         | MIT (Copyright David)                |

## Development

```bash
npm install                       # install version toolchain
npx changeset                     # record a change (patch/minor/major)
npm run version                   # bump version + sync plugin.json + write CHANGELOG
npm run check-plugin-version      # CI guard: verify version consistency
```

To add a skill: create `skills/<category>/<name>/SKILL.md` with at least `name` and `description` frontmatter.

## License

MIT — Copyright David. See [LICENSE](./LICENSE).
