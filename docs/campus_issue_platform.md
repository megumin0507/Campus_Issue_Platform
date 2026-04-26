##### **Campus Issue Platform – Pipeline**



This platform works together with **campus\_issue\_data**.

That repo first collects and structures raw campus information into the database, while **campus\_issue\_platform** is the actual website that lets users browse, understand, and discuss issues.

* First, the platform reads structured data from the database, especially two main objects:

&#x20;**events** = one concrete piece of information, and

&#x20;**issues** = one larger campus issue made from multiple related events.

* Then the backend organizes the data for the frontend. It provides APIs for listing events, listing issues, opening one issue page, loading comments, handling login, and returning user data.
* When a user opens an event, they can read its basic information such as title, content, time, and source, and then jump to the related issue page for deeper understanding. This matches the MVP goal of first showing reliable organized information.
* When a user opens an issue page, the backend collects all related events under the same issue, sorts them into a timeline, and prepares an AI summary so the user can quickly understand the context of the whole issue.
* After reading the issue, the user can join discussion by posting comments or replies. This is the interaction part of the MVP.



In short, the platform flow is:

&#x20;database data → backend API → frontend pages → user reads issue → timeline/summary shown → user comments and interacts.





\--------------------------------------------------------------------------





##### Folder structure





campus\_issue\_platform/

│

├─ README.md

├─ requirements.txt

├─ .env

├─ .gitignore

│

├─ apps/

│  ├─ backend/

│  │  ├─ main.py

│  │  ├─ config.py

│  │  │

│  │  ├─ api/

│  │  │  ├─ deps.py

│  │  │  ├─ routes/

│  │  │  │  ├─ health.py

│  │  │  │  ├─ events.py

│  │  │  │  ├─ issues.py

│  │  │  │  ├─ comments.py

│  │  │  │  └─ users.py

│  │  │

│  │  ├─ models/

│  │  │  ├─ issue.py

│  │  │  ├─ event.py

│  │  │  ├─ user.py

│  │  │  └─ comment.py

│  │  │

│  │  ├─ schemas/

│  │  │  ├─ issue.py

│  │  │  ├─ event.py

│  │  │  ├─ user.py

│  │  │  ├─ comment.py

│  │  │  └─ auth.py

│  │  │

│  │  ├─ services/

│  │  │  ├─ issue\_service.py

│  │  │  ├─ event\_service.py

│  │  │  ├─ timeline\_service.py

│  │  │  ├─ summary\_service.py

│  │  │  ├─ comment\_service.py

│  │  │

│  │  ├─ llm/

│  │  │  ├─ client.py

│  │  │  ├─ prompts/

│  │  │  │  └─ issue\_summary.txt

│  │  │  └─ summarizer.py

│  │  │

│  │  ├─ repositories/

│  │  │  ├─ issue\_repository.py

│  │  │  ├─ event\_repository.py

│  │  │  ├─ user\_repository.py

│  │  │  └─ comment\_repository.py

│  │  │

│  │  ├─ db/

│  │  │  ├─ session.py

│  │  │  ├─ base.py

│  │  │  ├─ migrations/

│  │  │  └─ seed.py

│  │  │

│  │  ├─ core/

│  │  │  ├─ security.py

│  │  │  ├─ permissions.py

│  │  │  ├─ constants.py

│  │  │  └─ exceptions.py

│  │  │

│  │  └─ utils/

│  │     ├─ pagination.py

│  │     ├─ time.py

│  │     └─ formatters.py

│  │

│  └─ frontend/

│     ├─ package.json

│     ├─ public/

│     └─ src/

│        ├─ main.tsx

│        ├─ App.tsx

│        │

│        ├─ pages/

│        │  ├─ HomePage.tsx

│        │  ├─ EventListPage.tsx

│        │  ├─ IssueListPage.tsx

│        │  ├─ IssueDetailPage.tsx

│        │

│        ├─ components/

│        │  ├─ layout/

│        │  │  ├─ Navbar.tsx

│        │  │  └─ PageShell.tsx

│        │  ├─ events/

│        │  │  ├─ EventCard.tsx

│        │  │  └─ EventMeta.tsx

│        │  ├─ issues/

│        │  │  ├─ IssueCard.tsx

│        │  │  ├─ IssueHeader.tsx

│        │  │  ├─ Timeline.tsx

│        │  │  └─ SummaryBox.tsx

│        │  ├─ comments/

│        │  │  ├─ CommentList.tsx

│        │  │  ├─ CommentItem.tsx

│        │  │  └─ CommentEditor.tsx

│        │  └─ common/

│        │     ├─ Button.tsx

│        │     ├─ Loading.tsx

│        │     └─ EmptyState.tsx

│        │

│        ├─ api/

│        │  ├─ client.ts

│        │  ├─ events.ts

│        │  ├─ issues.ts

│        │  ├─ comments.ts

│        │

│        ├─ hooks/

│        │  ├─ useEvents.ts

│        │  ├─ useIssues.ts

│        │  ├─ useIssueDetail.ts

│        │  └─ useComments.ts

│        │

│        ├─ types/

│        │  ├─ event.ts

│        │  ├─ issue.ts

│        │  ├─ comment.ts

│        │  └─ user.ts

│        │

│        └─ utils/

│           ├─ time.ts

│           └─ text.ts

│

├─ shared/

│  ├─ topic\_list.json

│  ├─ api\_contract.md

│  └─ sample\_payloads/

│

├─ scripts/

│  ├─ dev\_backend.py

│  ├─ dev\_frontend.sh

│  └─ reset\_db.py

│

└─ tests/

&#x20;  ├─ backend/

&#x20;  │  ├─ test\_issue\_api.py

&#x20;  │  ├─ test\_event\_api.py

&#x20;  │  ├─ test\_comment\_api.py

&#x20;  │  └─ test\_timeline\_service.py

&#x20;  └─ frontend/

&#x20;     └─ component\_tests/



\--------------------------------------------------------------------------



The project structure is separated by stage, so each file or folder has one clear job. This makes the pipeline easier to debug and easier to extend later.



* **apps/**

&#x20;Main application code of the project. It contains both backend and frontend.

* **apps/backend/**

&#x20;The server side of the platform. It handles API requests, database access, business logic, authentication, permissions, timeline building, AI summary generation, and comment handling.

* **apps/backend/api/**

&#x20;Defines the API layer.

&#x20;The routes/ folder contains endpoints such as health check, auth, events, issues, comments, and users. deps.py stores shared API dependencies.

* **apps/backend/models/**

&#x20;Database models for core objects like issue, event, user, and comment. These represent how data is stored internally.

* **apps/backend/schemas/**

&#x20;Request and response data formats used by the API. Helps keep backend input/output clean and consistent.

* **apps/backend/services/**

&#x20;Main business logic layer.

&#x20;For example: issue loading, event loading, timeline generation, AI summary generation, comments, and authentication.

* **apps/backend/llm/**

&#x20;Handles LLM-related functions.

&#x20;Includes the LLM client, prompts, and summarizer used for generating issue summaries.

* **apps/backend/repositories/**

&#x20;Data access layer.

&#x20;These files talk directly to the database and fetch/store issues, events, users, and comments.

* **apps/backend/db/**

&#x20;Database setup files, including session handling, base definitions, migrations, and seed data.

* **apps/backend/core/**

&#x20;Shared backend system logic, such as security, permissions, constants, and exception handling.

* **apps/backend/utils/**

&#x20;Small reusable helper functions, such as pagination, time formatting, and output formatting.



\--------------------------------------------------------------------------



* **apps/frontend/**

&#x20;The website UI. It is responsible for showing pages, components, and user interactions.

* **apps/frontend/src/pages/**

&#x20;Page-level views such as home page, event list page, issue list page, issue detail page, login page, and profile page.

* **apps/frontend/src/components/**

&#x20;Reusable UI pieces.

&#x20;It is grouped by purpose, such as layout, events, issues, comments, and common components.

* **apps/frontend/src/api/**

&#x20;Frontend API wrapper files.

&#x20;These call the backend endpoints for events, issues, comments, and auth.

* **apps/frontend/src/hooks/**

&#x20;Custom frontend hooks for loading and managing page data, such as issue detail, events, and comments.

* **apps/frontend/src/types/**

&#x20;Shared TypeScript type definitions for event, issue, comment, and user data.

* **apps/frontend/src/utils/**

&#x20;Small frontend helper functions, such as time and text utilities.



\--------------------------------------------------------------------------



* **shared/**

&#x20;Shared files used by both frontend and backend, such as the topic list, API contract, and sample payloads. This helps both sides follow the same data rules.



* **scripts/**

&#x20;Development helper scripts, such as starting backend/frontend locally and resetting the database.



* **tests/**

&#x20;Test files for both backend and frontend.

&#x20;Used to check whether APIs, timeline logic, and UI components work correctly.

