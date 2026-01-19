# Vite/Rolldown Migration Strategy

## Decision: Use Stable Vite 6.x

**Date**: January 19, 2026  
**Current Version**: `vite@6.3.5`  
**Previous (Reverted)**: `rolldown-vite@7.2.5`

---

## Rationale

### Why We Reverted from rolldown-vite

| Factor           | rolldown-vite@7.2.5    | vite@6.3.5      |
| ---------------- | ---------------------- | --------------- |
| Status           | Beta/Technical Preview | Stable          |
| CI Support       | ❌ Failed on Ubuntu    | ✅ Full support |
| Production Ready | ⚠️ No                  | ✅ Yes          |
| Ecosystem Compat | ⚠️ Experimental        | ✅ Proven       |

### What Happened

- CI build failed on GitHub Actions Ubuntu runner
- `rolldown-vite` is an experimental separate package from the Vite team
- Designed for early adopters to test Rolldown (Rust-based bundler) before it's merged into stable Vite
- Not recommended for production CI/CD pipelines

### This is NOT Patch Work

The revert to stable Vite is the **correct professional decision** because:

1. **Rolldown is officially beta** - Vite team explicitly created a separate package for testing
2. **CI failures are expected with beta software** - Tech debt to force it to work
3. **Vite team's own strategy** - They're keeping stable Vite separate until rolldown is proven
4. **Reliability > Speed** - Build performance is secondary to CI stability

---

## Current State

```json
{
  "vite": "^6.3.5"
}
```

### Build Performance

- Local build: ~8-9 seconds (acceptable)
- CI build: ~45-60 seconds (acceptable)
- No performance bottleneck currently

---

## Migration Plan

### Phase 1: Now (Q1 2026)

- [x] Use stable `vite@6.x`
- [x] Monitor rolldown-vite releases
- [ ] Track Vite Discord announcements

### Phase 2: When Vite 8 Beta Launches (~Q2 2026)

- [ ] Review release notes
- [ ] Test in feature branch
- [ ] Verify CI compatibility on all runners

### Phase 3: Production Migration (~Q3-Q4 2026)

- [ ] Migrate when rolldown merged into stable Vite 8.x
- [ ] Full regression testing
- [ ] Performance benchmarking

---

## Monitoring

### Sources to Track

- Vite Blog: https://vite.dev/blog
- Rolldown Releases: https://github.com/rolldown/rolldown/releases
- Vite Discord: Official announcements channel

### Migration Triggers

Before migrating to rolldown-integrated Vite:

- [ ] Merged into stable Vite (not separate package)
- [ ] CI environment compatibility confirmed
- [ ] Major frameworks (React Router, TanStack Query) confirmed compatible
- [ ] Zero critical issues in last 3 months of releases
- [ ] Official "production-ready" announcement from Vite team

---

## Rollback Plan

If issues arise with any future rolldown adoption:

```bash
# Revert to stable vite
npm uninstall vite
npm install vite@^6.3.5
npm install
npm run build
```

Verify:

- Local build passes
- CI pipeline passes
- All tests pass

---

## References

- [Announcing Vite 8 Beta](https://vite.dev/blog/announcing-vite8-beta)
- [VoidZero Rolldown Announcement](https://voidzero.dev/posts/announcing-rolldown-vite)
- [Rolldown Official Site](https://rolldown.rs)
