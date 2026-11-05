# Git Workflow — Branch-First Development

## Core Rule

**Never commit directly to `main` (or `master`).** All work must be done in a dedicated feature/module branch, committed there, reviewed, and only then merged into `main`.

---

## Branch Naming Convention

Use one of the following prefixes:

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feature/` | `feature/user-auth` |
| Module | `module/` | `module/inventory` |
| Bugfix | `fix/` | `fix/login-redirect` |
| Refactor | `refactor/` | `refactor/tailwind-config` |
| Hotfix | `hotfix/` | `hotfix/critical-bug` |

Branch names must be lowercase, kebab-case, and descriptive.

---

## Standard Workflow

### 1. Start from an up-to-date `main`

```bash
git checkout main
git pull origin main
```

### 2. Create a new feature/module branch

```bash
git checkout -b module/your-module-name
```

### 3. Do the work

Write code, add assets (e.g. images), test locally.

### 4. Commit only on the feature branch

```bash
git add .
git commit -m "feat(module): describe your change"
```

**Do not** run `git commit` while on `main`.

### 5. Push the feature branch

```bash
git push -u origin module/your-module-name
```

### 6. Open a pull request

Open a PR targeting `main`. Describe what changed and how to test it.

### 7. Review and merge

After review and CI pass, merge the PR into `main` via the Git host UI (or CLI). Do not force-push to `main`.

### 8. Clean up

```bash
git checkout main
git pull origin main
git branch -d module/your-module-name
git push origin --delete module/your-module-name
```

---

## What to Commit

- Source code changes
- Configuration changes
- Assets (images, icons, fonts) placed in `resources/images/` or `public/images/`
- Lock files when dependencies change (`composer.lock`, `package-lock.json`)

## What NOT to Commit

- `.env` (use `.env.example`)
- `node_modules/`, `vendor/`
- Build output (`build/`, `dist/`)
- IDE files (`.idea/`, `.vscode/`)
- Secrets, tokens, API keys

---

## Protecting `main`

On your Git host (GitHub/GitLab/Bitbucket), enable branch protection for `main`:

- Require pull request reviews before merging
- Require status checks/CI to pass
- Restrict direct pushes to `main` (admins only)
- Require up-to-date branches before merging

---

## Emergency Hotfix

If a critical bug must be fixed on `main` immediately:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/fix-description
# make fix, commit, push
git push -u origin hotfix/fix-description
```

Open a PR and merge to `main` as fast as possible, then deploy.

---

## Image / Asset Placement

Place new images under:

```
resources/images/modules/<module-name>/
```

or

```
public/images/<module-name>/
```

Reference them in Blade/Inertia/React components via relative paths or the `asset()` helper.

---

## Summary Checklist

- [ ] Branch created off `main`
- [ ] Work committed on feature branch only
- [ ] Branch pushed to remote
- [ ] PR opened against `main`
- [ ] PR reviewed and approved
- [ ] PR merged into `main`
- [ ] Feature branch deleted locally and remotely
