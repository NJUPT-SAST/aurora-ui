export default {
    "packages/ui-universal/**/*.{js,cjs,ts,json,css,scss,tsx,sass}": () => [
        "pnpm --filter @sast/ui-universal lint",
        "pnpm --filter @sast/ui-universal build",
        "git add ."
    ],
    "docs/**/*.{js,cjs,ts,html,json,css,scss,tsx,sass,md,mdx}": () => [
        "pnpm --filter @sast/ui-docs build",
        "git add ."
    ],
    "packages/ui-react/**/*.{js,cjs,ts,html,json,css,scss,tsx,sass}": () => [
        "pnpm --filter @sast/ui-react test",
        "pnpm --filter @sast/ui-react format",
        "pnpm --filter @sast/ui-react lint",
        "git add ."
    ],
    // "*.*": () => "pnpm cz"
}