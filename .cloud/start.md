# Website starter development

Use the existing checkout at `/workspace/-2`. Each cloud task is already isolated; do not create a Git worktree unless the user explicitly requests one. Preserve user changes and do not reset or overwrite repository files during setup.

## Retained setup
The managed environment provides Node.js 24.19.0, npm, Python Playwright, and Chromium at /usr/bin/chromium. The repository pins its Node version in .nvmrc and dependencies in package-lock.json. The environment snapshot retains node_modules and the generated dist directory; live processes must be restarted. No secrets, backend services, or environment variables are required by the app.

If dependencies need refreshing, execute the saved install script from /workspace/-2. It exports npm_config_cache=/workspace/.cache/npm, runs npm ci, then npm run build. Do not modify package manifests or lockfiles merely to make setup succeed. Build includes TypeScript checking.

## Start
From /workspace/-2, run `npm run dev` in a persistent execution session. It listens on 0.0.0.0:5173 with strictPort enabled. Reuse an existing service only after verifying that it serves this project. Inspect startup output on failure; do not kill unrelated processes to free the port.

## Readiness
Run the following from /workspace/-2 after startup. This checks an actual rendered page and a functional theme toggle, rather than only checking the port:

```bash
python3 - <<'PY'
from playwright.sync_api import sync_playwright, expect
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    page = browser.new_page(color_scheme='light')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    response = page.goto('http://127.0.0.1:5173/', wait_until='networkidle')
    assert response is not None and response.status == 200
    expect(page.get_by_role('heading', level=1)).to_have_text('让想法，有个开始。')
    page.get_by_role('button', name='切换至深色主题').click()
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    page.reload(wait_until='networkidle')
    expect(page.locator('html')).to_have_attribute('data-theme', 'dark')
    assert not errors, errors
    browser.close()
print('Website startup and theme persistence: passed')
PY
```

For production validation, run `npm run build`, then `npm run preview` in a persistent session; it listens on port 4173. Use the same readiness check with port 4173. Development and preview servers are for local validation; do not publish localhost preview links in the onboarding UI. Publishing the cloud environment is separate from deploying the website.
