# GEOPRIX Motorsport

**Global motorsport universe management system.**

A management platform for a persistent fictional motorsport universe. GeoPrix remains the external race simulation engine; session results are entered here after each simulation.

## Product principles
- Persistent historical records for teams, drivers, circuits, championships and results.
- Hybrid control: the administrator manages the sporting universe while the platform organizes records and standings.
- Real-world geography with fictional sporting organizations.
- Initial category: GEOPRIX Formula.
- Initial championship concept: GEOPRIX World Formula Championship, planned for 2026.
- Initial grid target: 11 teams and 22 drivers (two drivers per team).
- Weekend sessions: qualifying, race and post-race. No free practice.

## Initial attributes
Team attributes (0–100): Power and Dowforce (label retained as originally specified).

Driver attributes (0–100): Race Pace, Qualifying, Overtaking, Defending and Consistency.

## Stack
Next.js App Router, React, TypeScript and Lucide icons.

## Development
Run `npm install`, then `npm run dev`.

## Roadmap
The current commit establishes the first frontend foundation. Next milestones: persistent database storage, authentication, and functional modules for teams, drivers, circuits, championships, calendars and results.

## Data integrity
Use stable IDs for entities. Historical references must remain valid when names or current affiliations change. Avoid destructive deletion of entities with recorded sporting history.
