export const careerGoals = [
  {
    _id: "career_software_engineer",
    name: "Software Engineer",
    description: "Builds reliable software systems by combining programming fundamentals, backend services, databases, testing, and design trade-offs.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 12,
    domains: ["Programming", "Backend", "Databases", "Testing", "System Design"]
  },
  {
    _id: "career_frontend_developer",
    name: "Frontend Developer",
    description: "Creates accessible, performant user interfaces and connects them to real APIs with maintainable state and component architecture.",
    difficulty: "Beginner",
    estimatedDurationWeeks: 10,
    domains: ["HTML/CSS", "JavaScript", "React", "Accessibility", "Performance"]
  },
  {
    _id: "career_backend_developer",
    name: "Backend Developer",
    description: "Designs APIs, data models, authentication, background jobs, caching, and deployment-ready server systems.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 12,
    domains: ["APIs", "Databases", "Security", "Testing", "Deployment"]
  },
  {
    _id: "career_data_engineer",
    name: "Data Engineer",
    description: "Builds data pipelines, models, orchestration, quality checks, and storage layers that analytics and AI teams can trust.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 14,
    domains: ["Python", "SQL", "ETL", "Warehousing", "Cloud"]
  },
  {
    _id: "career_devops_engineer",
    name: "DevOps Engineer",
    description: "Automates delivery, infrastructure, observability, and reliability practices across containers, CI/CD, and cloud systems.",
    difficulty: "Advanced",
    estimatedDurationWeeks: 14,
    domains: ["Linux", "Docker", "CI/CD", "Cloud", "Monitoring"]
  },
  {
    _id: "career_full_stack_developer",
    name: "Full Stack Developer",
    description: "Ships complete product features across accessible UI, API design, authentication, database modeling, testing, and deployment.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 14,
    domains: ["React", "Node.js", "APIs", "Databases", "Deployment"]
  },
  {
    _id: "career_qa_engineer",
    name: "QA / Test Automation Engineer",
    description: "Builds test strategy, automated browser/API checks, regression suites, accessibility checks, and release quality signals.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 12,
    domains: ["Testing", "Playwright", "API Testing", "CI/CD", "Accessibility"]
  },
  {
    _id: "career_api_platform_engineer",
    name: "API Platform Engineer",
    description: "Designs reliable API contracts, authentication, versioning, rate limits, documentation, observability, and integration standards.",
    difficulty: "Advanced",
    estimatedDurationWeeks: 13,
    domains: ["API Design", "OpenAPI", "GraphQL", "Security", "Observability"]
  },
  {
    _id: "career_cybersecurity_analyst",
    name: "Cybersecurity Analyst",
    description: "Investigates threats, hardens systems, analyzes logs, understands web vulnerabilities, and communicates risk clearly.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 14,
    domains: ["Networking", "Linux", "OWASP", "Incident Response", "SIEM"]
  },
  {
    _id: "career_machine_learning_engineer",
    name: "Machine Learning Engineer",
    description: "Turns data and models into evaluated, deployable services with Python, APIs, Docker, monitoring, and MLOps habits.",
    difficulty: "Advanced",
    estimatedDurationWeeks: 16,
    domains: ["Python", "ML", "Model Evaluation", "MLOps", "Deployment"]
  },
  {
    _id: "career_mobile_developer",
    name: "Mobile Developer",
    description: "Builds reliable mobile experiences with native or cross-platform UI, API integration, local storage, testing, and releases.",
    difficulty: "Intermediate",
    estimatedDurationWeeks: 13,
    domains: ["Mobile UX", "Kotlin", "SwiftUI", "React Native", "Release"]
  },
  {
    _id: "career_cloud_engineer",
    name: "Cloud Engineer",
    description: "Designs secure cloud infrastructure, networking, IAM, containers, infrastructure as code, monitoring, and cost-aware operations.",
    difficulty: "Advanced",
    estimatedDurationWeeks: 15,
    domains: ["Cloud", "IAM", "Networking", "Terraform", "Kubernetes"]
  }
] as const;

export const skillGraph = {
  career_software_engineer: [
    "JavaScript", "TypeScript", "Git", "HTTP Basics", "REST APIs", "Node.js", "Express",
    "MongoDB", "Testing", "Docker", "System Design", "Authentication"
  ],
  career_frontend_developer: [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "State Management",
    "Accessibility", "API Integration", "Testing", "Performance"
  ],
  career_backend_developer: [
    "JavaScript", "TypeScript", "Node.js", "Express", "REST APIs", "Authentication",
    "MongoDB", "Redis", "Testing", "Docker", "Security"
  ],
  career_data_engineer: [
    "Python", "SQL", "Data Modeling", "ETL", "Airflow", "Spark", "Data Warehousing",
    "Docker", "Cloud Basics", "Monitoring"
  ],
  career_devops_engineer: [
    "Linux Basics", "Networking", "Git", "Docker", "CI/CD", "Kubernetes",
    "Cloud Basics", "Terraform", "Monitoring", "Security"
  ],
  career_full_stack_developer: [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "State Management",
    "Node.js", "REST APIs", "Authentication", "MongoDB", "Testing", "Docker", "Deployment"
  ],
  career_qa_engineer: [
    "Testing", "Test Planning", "Playwright", "API Testing", "CI/CD",
    "Bug Reporting", "Accessibility", "Performance Testing", "Security Basics"
  ],
  career_api_platform_engineer: [
    "HTTP Basics", "API Design", "REST APIs", "GraphQL", "OpenAPI",
    "Authentication", "Rate Limiting", "Observability", "Testing", "Security"
  ],
  career_cybersecurity_analyst: [
    "Networking", "Linux Basics", "Security Basics", "Threat Modeling", "OWASP Top 10",
    "SIEM", "Incident Response", "Python", "Cloud Security", "Authentication"
  ],
  career_machine_learning_engineer: [
    "Python", "SQL", "Statistics", "Machine Learning", "Data Modeling",
    "Model Evaluation", "MLOps", "APIs", "Docker", "Cloud Basics", "Monitoring"
  ],
  career_mobile_developer: [
    "Mobile UX", "Kotlin", "Swift & SwiftUI", "React Native", "API Integration",
    "Local Storage", "Testing", "Performance", "Release Management"
  ],
  career_cloud_engineer: [
    "Linux Basics", "Networking", "Cloud Basics", "IAM", "Docker", "Kubernetes",
    "Terraform", "Monitoring", "Security", "CI/CD", "Cost Management"
  ]
};

export const prerequisiteEdges = [
  ["REST APIs", "HTTP Basics"],
  ["Express", "Node.js"],
  ["Authentication", "REST APIs"],
  ["Docker", "Linux Basics"],
  ["Testing", "JavaScript"],
  ["React", "JavaScript"],
  ["API Integration", "REST APIs"],
  ["Kubernetes", "Docker"],
  ["Terraform", "Cloud Basics"],
  ["Airflow", "Python"],
  ["Spark", "Python"],
  ["Data Warehousing", "SQL"],
  ["Deployment", "Docker"],
  ["Playwright", "Testing"],
  ["API Testing", "REST APIs"],
  ["API Design", "HTTP Basics"],
  ["GraphQL", "API Design"],
  ["OpenAPI", "API Design"],
  ["Rate Limiting", "REST APIs"],
  ["Observability", "Monitoring"],
  ["Threat Modeling", "Security Basics"],
  ["OWASP Top 10", "Security Basics"],
  ["SIEM", "Linux Basics"],
  ["Incident Response", "SIEM"],
  ["Cloud Security", "Cloud Basics"],
  ["Machine Learning", "Python"],
  ["Model Evaluation", "Machine Learning"],
  ["MLOps", "Model Evaluation"],
  ["APIs", "Python"],
  ["React Native", "JavaScript"],
  ["Release Management", "Testing"],
  ["IAM", "Cloud Basics"],
  ["Cost Management", "Cloud Basics"]
];

export const quizTemplates = {
  career_software_engineer: [
    {
      id: "se_q1",
      skillTag: "TypeScript",
      question: "A function receives data from an API where some fields may be missing. What TypeScript approach best reduces runtime surprises?",
      options: [
        "Model the response with optional fields and validate the payload before using it.",
        "Use `any` for the response because APIs are external.",
        "Disable strict mode so the compiler accepts the shape.",
        "Cast every response with `as User` and trust the backend."
      ],
      correctOptionIndex: 0
    },
    {
      id: "se_q2",
      skillTag: "REST APIs",
      question: "A client creates a new roadmap. Which HTTP response is most appropriate when the resource is successfully created?",
      options: ["201 Created with the new resource or its identifier.", "204 No Content because POST never returns data.", "404 Not Found because the roadmap did not exist before.", "500 Internal Server Error because creation changes server state."],
      correctOptionIndex: 0
    },
    {
      id: "se_q3",
      skillTag: "Testing",
      question: "Which test gives the best confidence that authentication protects a private route?",
      options: [
        "An integration test that calls the route with no token, invalid token, and valid token.",
        "A snapshot test of the login button.",
        "A unit test that checks a string contains `jwt`.",
        "A manual browser click after every code change."
      ],
      correctOptionIndex: 0
    },
    {
      id: "se_q4",
      skillTag: "System Design",
      question: "A feature generates roadmaps and may take several seconds. What design keeps the API responsive?",
      options: [
        "Put generation in a queue and return job/progress state to the client.",
        "Block the HTTP request until all AI and database work is complete.",
        "Run the generation in the frontend browser only.",
        "Disable authentication for that endpoint."
      ],
      correctOptionIndex: 0
    },
    {
      id: "se_q5",
      skillTag: "MongoDB",
      question: "When is embedding subdocuments in MongoDB usually a good choice?",
      options: [
        "When child data is commonly loaded and updated with the parent, such as roadmap phases and tasks.",
        "When the child data must be queried globally with many independent owners.",
        "Only when the document contains fewer than three fields.",
        "Never; MongoDB documents should always mimic SQL tables."
      ],
      correctOptionIndex: 0
    },
    {
      id: "se_q6",
      skillTag: "Docker",
      question: "Why should an application container read configuration from environment variables?",
      options: [
        "So the same image can run in development, staging, and production with different settings.",
        "So secrets are hard-coded during image build.",
        "So the database schema is generated automatically.",
        "So Docker can replace automated tests."
      ],
      correctOptionIndex: 0
    }
  ],
  career_frontend_developer: [
    {
      id: "fe_q1",
      skillTag: "Accessibility",
      question: "A custom icon button opens a menu. What must it include for screen reader and keyboard users?",
      options: ["A clear accessible name, keyboard focus state, and correct expanded/menu semantics.", "Only a colorful icon.", "A tooltip that appears on hover only.", "A larger box shadow."],
      correctOptionIndex: 0
    },
    {
      id: "fe_q2",
      skillTag: "React",
      question: "A component fetches data when `careerGoalId` changes. What should the effect depend on?",
      options: ["`careerGoalId`, because it controls which data is fetched.", "No dependencies, to avoid re-rendering.", "The whole `window` object.", "A random value to force refreshes."],
      correctOptionIndex: 0
    },
    {
      id: "fe_q3",
      skillTag: "Performance",
      question: "A page renders 2,000 rows and feels slow. What is a practical first optimization?",
      options: ["Paginate or virtualize the list so fewer DOM nodes render at once.", "Increase all animation durations.", "Move all state into localStorage.", "Use larger images to reduce layout shifts."],
      correctOptionIndex: 0
    },
    {
      id: "fe_q4",
      skillTag: "State Management",
      question: "Which state should usually stay local instead of going into a global store?",
      options: ["A text input's current draft value inside one form.", "The authenticated user session.", "A selected organization used across the app.", "Feature flags loaded for the whole app."],
      correctOptionIndex: 0
    },
    {
      id: "fe_q5",
      skillTag: "API Integration",
      question: "How should a frontend handle an API request that may fail?",
      options: ["Show loading, success, empty, and error states with actionable copy.", "Assume success and leave a blank panel if it fails.", "Retry infinitely without telling the user.", "Hide errors in the console only."],
      correctOptionIndex: 0
    },
    {
      id: "fe_q6",
      skillTag: "CSS",
      question: "What prevents layout shift in cards with dynamic content?",
      options: ["Stable sizing constraints, predictable grid tracks, and text wrapping rules.", "Only using absolute positioning.", "Setting all text to 8px.", "Removing responsive behavior."],
      correctOptionIndex: 0
    }
  ],
  career_backend_developer: [
    {
      id: "be_q1",
      skillTag: "Authentication",
      question: "What is a sound JWT refresh-token practice?",
      options: ["Use short-lived access tokens and store/rotate refresh tokens server-side or in a controlled store.", "Make access tokens valid forever.", "Store passwords in JWT payloads.", "Disable token expiry to reduce backend code."],
      correctOptionIndex: 0
    },
    {
      id: "be_q2",
      skillTag: "Redis",
      question: "Which backend use case is Redis especially good for?",
      options: ["Rate limits, queues, cached responses, and short-lived session state.", "Long-term normalized relational reporting.", "Replacing all application validation.", "Serving static React HTML by default."],
      correctOptionIndex: 0
    },
    {
      id: "be_q3",
      skillTag: "Security",
      question: "What should happen before user input reaches database queries?",
      options: ["Validate and sanitize it against a schema or explicit rules.", "Trust it if the frontend has a form.", "Convert everything to strings and save it.", "Only validate admin users."],
      correctOptionIndex: 0
    },
    {
      id: "be_q4",
      skillTag: "Testing",
      question: "Which test is most useful for a POST endpoint that creates a resource?",
      options: ["A request-level test covering valid body, invalid body, auth failure, and persisted result.", "Only a test that the route file exists.", "A screenshot test of the API docs.", "A test that waits one second."],
      correctOptionIndex: 0
    },
    {
      id: "be_q5",
      skillTag: "MongoDB",
      question: "What is a common reason to add an index in MongoDB?",
      options: ["A query filters or sorts frequently on a field such as `userId` or `createdAt`.", "Every field should always have an index.", "Indexes make writes free.", "Indexes replace validation."],
      correctOptionIndex: 0
    },
    {
      id: "be_q6",
      skillTag: "Docker",
      question: "Why use Docker Compose in development?",
      options: ["To run the API and its dependent services with repeatable networking and configuration.", "To avoid writing backend code.", "To make MongoDB become a browser app.", "To remove the need for environment variables."],
      correctOptionIndex: 0
    }
  ],
  career_data_engineer: [
    {
      id: "de_q1",
      skillTag: "ETL",
      question: "A daily pipeline fails halfway through. What design makes reruns safer?",
      options: ["Idempotent steps with checkpoints or partition-based writes.", "Appending duplicate rows every rerun.", "Deleting all historical data first.", "Running only on a developer laptop."],
      correctOptionIndex: 0
    },
    {
      id: "de_q2",
      skillTag: "SQL",
      question: "A query aggregates revenue by month but duplicates rows after a join. What should you inspect first?",
      options: ["The join cardinality and whether the join keys are unique at the intended grain.", "The CSS of the dashboard.", "Whether Python is installed.", "The color palette of the chart."],
      correctOptionIndex: 0
    },
    {
      id: "de_q3",
      skillTag: "Data Modeling",
      question: "What does choosing the correct grain of a fact table mean?",
      options: ["Defining exactly what one row represents before adding measures.", "Choosing the smallest font size for reports.", "Putting every metric in one JSON field.", "Avoiding dimensions."],
      correctOptionIndex: 0
    },
    {
      id: "de_q4",
      skillTag: "Monitoring",
      question: "Which signal is most useful for pipeline quality?",
      options: ["Freshness, row counts, schema changes, null rates, and failed tasks.", "Only CPU temperature.", "Only the number of files in a folder.", "Whether the UI has animations."],
      correctOptionIndex: 0
    },
    {
      id: "de_q5",
      skillTag: "Airflow",
      question: "What is an Airflow DAG primarily used to define?",
      options: ["A scheduled graph of tasks and dependencies.", "A frontend route tree.", "A MongoDB collection schema.", "A CSS animation timeline."],
      correctOptionIndex: 0
    },
    {
      id: "de_q6",
      skillTag: "Cloud Basics",
      question: "Why separate compute from storage in many data platforms?",
      options: ["To scale processing and storage independently and reduce operational coupling.", "To make SQL impossible.", "To avoid access controls.", "To remove the need for backups."],
      correctOptionIndex: 0
    }
  ],
  career_devops_engineer: [
    {
      id: "do_q1",
      skillTag: "CI/CD",
      question: "What should a CI pipeline do before deploying to production?",
      options: ["Run tests, build artifacts, validate configuration, and fail fast on errors.", "Deploy every commit without checks.", "Ask developers to test manually only.", "Delete logs to save space."],
      correctOptionIndex: 0
    },
    {
      id: "do_q2",
      skillTag: "Docker",
      question: "What is the main purpose of a Docker image?",
      options: ["Package application code and runtime dependencies into a reproducible artifact.", "Store user passwords.", "Replace source control.", "Make network latency disappear."],
      correctOptionIndex: 0
    },
    {
      id: "do_q3",
      skillTag: "Monitoring",
      question: "Which set best represents the four golden signals of monitoring?",
      options: ["Latency, traffic, errors, and saturation.", "HTML, CSS, JavaScript, and images.", "Users, admins, roles, and sessions.", "Branches, commits, tags, and remotes."],
      correctOptionIndex: 0
    },
    {
      id: "do_q4",
      skillTag: "Kubernetes",
      question: "What problem does a Kubernetes Deployment primarily solve?",
      options: ["Managing desired replicas and rolling updates for pods.", "Writing application business logic.", "Designing SQL joins.", "Replacing all security reviews."],
      correctOptionIndex: 0
    },
    {
      id: "do_q5",
      skillTag: "Terraform",
      question: "Why keep infrastructure definitions in version control?",
      options: ["To review, reproduce, and audit infrastructure changes.", "To hide infrastructure from teammates.", "To make cloud costs invisible.", "To avoid planning changes."],
      correctOptionIndex: 0
    },
    {
      id: "do_q6",
      skillTag: "Linux Basics",
      question: "A service fails to start on Linux. What is a practical first investigation path?",
      options: ["Check service status, logs, environment, ports, permissions, and recent changes.", "Reinstall the operating system immediately.", "Change the UI colors.", "Ignore logs and retry forever."],
      correctOptionIndex: 0
    }
  ],
  career_full_stack_developer: [
    {
      id: "fs_q1",
      skillTag: "React",
      question: "A full-stack feature lets users save portfolio projects. What is the best first vertical slice?",
      options: ["A small end-to-end flow: validated form, API route, database write, loading/error UI, and one integration test.", "Only a polished empty frontend screen.", "Only a database collection with no route.", "A diagram before any runnable code exists."],
      correctOptionIndex: 0
    },
    {
      id: "fs_q2",
      skillTag: "REST APIs",
      question: "The frontend needs to update one field of a roadmap task. Which API contract is easiest to reason about?",
      options: ["A specific authenticated PATCH route with validation and a clear response shape.", "A generic endpoint that accepts any object and writes it directly.", "A GET request that mutates state.", "A route that returns HTML instead of JSON."],
      correctOptionIndex: 0
    },
    {
      id: "fs_q3",
      skillTag: "Authentication",
      question: "What should the frontend assume about protected API calls?",
      options: ["They can fail because of missing, expired, or invalid credentials and need a user-safe recovery path.", "They always succeed after a user signs in once.", "They should include the password in every request.", "They do not need error handling if the UI is attractive."],
      correctOptionIndex: 0
    },
    {
      id: "fs_q4",
      skillTag: "MongoDB",
      question: "A user owns many roadmap tasks. What modeling decision should come before coding?",
      options: ["Decide whether tasks are embedded or referenced based on query patterns, update frequency, and document growth.", "Always put every entity in one document forever.", "Always split every field into a separate collection.", "Choose the model by alphabetical order."],
      correctOptionIndex: 0
    },
    {
      id: "fs_q5",
      skillTag: "Deployment",
      question: "What makes a full-stack deployment easier to debug after release?",
      options: ["Environment-based config, health checks, logs, build artifacts, and a documented rollback path.", "Manual edits on the server after every deploy.", "Only testing on localhost.", "Hiding server errors from logs."],
      correctOptionIndex: 0
    }
  ],
  career_qa_engineer: [
    {
      id: "qa_q1",
      skillTag: "Test Planning",
      question: "A release changes login, registration, and onboarding. What is the strongest QA starting point?",
      options: ["Map critical user journeys, risks, acceptance criteria, and the minimum automated checks before release.", "Click random buttons until something breaks.", "Test only the happy path once.", "Wait for users to report failures."],
      correctOptionIndex: 0
    },
    {
      id: "qa_q2",
      skillTag: "Playwright",
      question: "Which Playwright test is most valuable for an auth page?",
      options: ["A test that fills the form, submits, verifies navigation, and checks visible error states for invalid credentials.", "A test that only verifies the page title.", "A test that sleeps for five seconds.", "A test that depends on a hidden browser extension."],
      correctOptionIndex: 0
    },
    {
      id: "qa_q3",
      skillTag: "API Testing",
      question: "What should an API regression suite check for a protected POST route?",
      options: ["Valid request, invalid body, missing auth, invalid auth, and persisted result.", "Only whether the server returns any status code.", "Only CSS class names.", "Only a screenshot of the JSON."],
      correctOptionIndex: 0
    },
    {
      id: "qa_q4",
      skillTag: "Bug Reporting",
      question: "What makes a bug report actionable for engineers?",
      options: ["Clear steps, expected result, actual result, environment, severity, and evidence such as logs or screenshots.", "A vague statement that the app feels wrong.", "A private note with no reproduction.", "Only the tester's opinion about the design."],
      correctOptionIndex: 0
    },
    {
      id: "qa_q5",
      skillTag: "CI/CD",
      question: "How should automated tests behave in CI?",
      options: ["Run deterministically, fail with useful output, and block release on critical regressions.", "Pass locally but fail randomly in CI.", "Require a person to click through every test.", "Ignore failures on the main branch."],
      correctOptionIndex: 0
    }
  ],
  career_api_platform_engineer: [
    {
      id: "api_q1",
      skillTag: "API Design",
      question: "A public endpoint returns roadmap tasks. What is a strong API design habit?",
      options: ["Define resource names, status codes, pagination, error format, and versioning before clients depend on it.", "Return whatever the database stores today.", "Use a different response shape every time.", "Hide errors behind 200 responses."],
      correctOptionIndex: 0
    },
    {
      id: "api_q2",
      skillTag: "OpenAPI",
      question: "Why maintain an OpenAPI specification?",
      options: ["It documents contracts, supports client generation, and makes request/response changes reviewable.", "It replaces all backend tests.", "It makes authentication unnecessary.", "It is only useful for CSS."],
      correctOptionIndex: 0
    },
    {
      id: "api_q3",
      skillTag: "GraphQL",
      question: "When can GraphQL be a good fit?",
      options: ["When clients need flexible nested reads and the team can control schema, authorization, and query cost.", "When every operation is a simple file download.", "When no one wants schema governance.", "When the database has no relationships."],
      correctOptionIndex: 0
    },
    {
      id: "api_q4",
      skillTag: "Rate Limiting",
      question: "What is the goal of rate limiting an API?",
      options: ["Protect availability and fairness by limiting abusive or accidental high-volume traffic.", "Make all requests slower for no reason.", "Replace input validation.", "Prevent developers from using logs."],
      correctOptionIndex: 0
    },
    {
      id: "api_q5",
      skillTag: "Observability",
      question: "Which signals help operate an API platform?",
      options: ["Latency, error rate, throughput, saturation, trace IDs, and high-cardinality-safe logs.", "Only the number of CSS files.", "Only how many developers like the endpoint name.", "Only a manual spreadsheet updated monthly."],
      correctOptionIndex: 0
    }
  ],
  career_cybersecurity_analyst: [
    {
      id: "cy_q1",
      skillTag: "Threat Modeling",
      question: "A team adds file uploads. What should a security analyst ask first?",
      options: ["Who can upload, what file types are allowed, where files execute, how they are scanned, and what abuse cases exist.", "Whether the upload button is orange.", "How to skip logging to save time.", "Whether the feature has a catchy name."],
      correctOptionIndex: 0
    },
    {
      id: "cy_q2",
      skillTag: "OWASP Top 10",
      question: "Which practice reduces injection risk?",
      options: ["Use parameterized queries or safe query builders plus input validation.", "Concatenate raw user input into queries.", "Trust the frontend form validation only.", "Store all input as admin-approved."],
      correctOptionIndex: 0
    },
    {
      id: "cy_q3",
      skillTag: "SIEM",
      question: "What makes logs useful in a SIEM investigation?",
      options: ["Consistent timestamps, identities, source IPs, event types, outcomes, and correlation IDs.", "Only success messages with no user context.", "Logs stored only in a developer's browser.", "Randomly formatted text with no severity."],
      correctOptionIndex: 0
    },
    {
      id: "cy_q4",
      skillTag: "Incident Response",
      question: "What is a good first response to suspected account compromise?",
      options: ["Preserve evidence, contain access, rotate credentials if needed, and document timeline and impact.", "Delete all logs immediately.", "Post speculation publicly.", "Change unrelated UI colors."],
      correctOptionIndex: 0
    },
    {
      id: "cy_q5",
      skillTag: "Networking",
      question: "Why does network knowledge matter in security analysis?",
      options: ["It helps interpret ports, protocols, DNS, traffic flows, and suspicious communication patterns.", "It replaces authentication.", "It guarantees malware cannot run.", "It is only useful for hardware repair."],
      correctOptionIndex: 0
    }
  ],
  career_machine_learning_engineer: [
    {
      id: "ml_q1",
      skillTag: "Model Evaluation",
      question: "A classifier reports 95% accuracy on imbalanced data. What should you inspect?",
      options: ["Class distribution, precision, recall, confusion matrix, and business cost of false positives/negatives.", "Only the color of the chart.", "Only whether Python ran without errors.", "Only the model file size."],
      correctOptionIndex: 0
    },
    {
      id: "ml_q2",
      skillTag: "Machine Learning",
      question: "What is data leakage?",
      options: ["Training with information that would not be available at prediction time.", "A database running out of disk.", "A slow CSS animation.", "An API returning JSON."],
      correctOptionIndex: 0
    },
    {
      id: "ml_q3",
      skillTag: "MLOps",
      question: "What makes an ML model production-ready?",
      options: ["Versioned data/model artifacts, reproducible training, monitored predictions, rollback, and clear evaluation thresholds.", "A notebook that runs once on one laptop.", "A model with no owner.", "A dashboard with no metrics."],
      correctOptionIndex: 0
    },
    {
      id: "ml_q4",
      skillTag: "APIs",
      question: "A model is exposed as an API. What should the service validate?",
      options: ["Input schema, feature ranges, authentication, timeout behavior, and safe error responses.", "Only that the request body is not empty.", "Only that the route name is short.", "Nothing if the client is internal."],
      correctOptionIndex: 0
    },
    {
      id: "ml_q5",
      skillTag: "Monitoring",
      question: "Which monitoring signal is specific to ML systems?",
      options: ["Data drift, prediction distribution changes, model latency, and real-world outcome feedback.", "Only server hostname.", "Only CSS bundle size.", "Only branch count."],
      correctOptionIndex: 0
    }
  ],
  career_mobile_developer: [
    {
      id: "mb_q1",
      skillTag: "Mobile UX",
      question: "What matters most when designing a mobile form?",
      options: ["Clear labels, correct keyboard types, reachable actions, validation feedback, and resilient offline/slow-network behavior.", "Small tap targets to fit more fields.", "Hover-only controls.", "A desktop-only layout scaled down."],
      correctOptionIndex: 0
    },
    {
      id: "mb_q2",
      skillTag: "API Integration",
      question: "A mobile app loses connection while saving. What should the UX do?",
      options: ["Show pending/error state, avoid duplicate writes, and let the user retry safely.", "Pretend the save worked forever.", "Crash the app.", "Delete the draft immediately."],
      correctOptionIndex: 0
    },
    {
      id: "mb_q3",
      skillTag: "Local Storage",
      question: "What data should be handled carefully in local mobile storage?",
      options: ["Tokens, personal data, drafts, and cached API responses with expiration or encryption where appropriate.", "Only icon names.", "Only public marketing copy.", "Nothing; all local storage is equally safe."],
      correctOptionIndex: 0
    },
    {
      id: "mb_q4",
      skillTag: "Testing",
      question: "Which test combination gives useful mobile confidence?",
      options: ["Unit tests for logic, component/UI tests for screens, and device/emulator checks for critical flows.", "Only manual testing on one phone.", "Only a backend API test.", "Only a screenshot of the app icon."],
      correctOptionIndex: 0
    },
    {
      id: "mb_q5",
      skillTag: "Release Management",
      question: "What should happen before publishing a mobile release?",
      options: ["Versioning, changelog, crash monitoring, store metadata, permission review, and rollback/patch plan.", "Skip testing if the app launches.", "Change package IDs randomly.", "Remove analytics and logs."],
      correctOptionIndex: 0
    }
  ],
  career_cloud_engineer: [
    {
      id: "cl_q1",
      skillTag: "IAM",
      question: "What is a least-privilege IAM policy?",
      options: ["A policy granting only the permissions needed for a role or workload to perform its job.", "A policy giving every user administrator access.", "A password naming convention.", "A dashboard color setting."],
      correctOptionIndex: 0
    },
    {
      id: "cl_q2",
      skillTag: "Networking",
      question: "Why separate public and private subnets?",
      options: ["To limit direct internet exposure and control how internal workloads reach external services.", "To make all services publicly reachable.", "To avoid using firewalls.", "To increase UI animation speed."],
      correctOptionIndex: 0
    },
    {
      id: "cl_q3",
      skillTag: "Terraform",
      question: "What should you review in a Terraform plan?",
      options: ["Resources created, changed, destroyed, dependencies, sensitive values, and whether the diff matches intent.", "Only the number of files in the repo.", "Only the terminal theme.", "Nothing; plans are always safe."],
      correctOptionIndex: 0
    },
    {
      id: "cl_q4",
      skillTag: "Kubernetes",
      question: "A pod is crash-looping. What is a practical investigation path?",
      options: ["Inspect pod events, logs, env/config, probes, image version, resource limits, and recent deployments.", "Delete the whole cluster first.", "Assume the frontend caused it.", "Ignore it until the next sprint."],
      correctOptionIndex: 0
    },
    {
      id: "cl_q5",
      skillTag: "Cost Management",
      question: "What helps control cloud cost without guessing?",
      options: ["Tags, budgets, usage reports, right-sizing, autoscaling, and deleting unused resources.", "Turning off monitoring.", "Using only the largest instances.", "Hiding invoices from the team."],
      correctOptionIndex: 0
    }
  ]
} as const;

export const resources = [
  { _id: "res_mdnd_js", title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", type: "documentation", skillTags: ["JavaScript"], level: "Beginner", language: "en" },
  { _id: "res_ts_handbook", title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", type: "documentation", skillTags: ["TypeScript"], level: "Beginner", language: "en" },
  { _id: "res_express", title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html", type: "documentation", skillTags: ["Express", "REST APIs"], level: "Intermediate", language: "en" },
  { _id: "res_mongodb", title: "MongoDB University Basics", url: "https://learn.mongodb.com/", type: "course", skillTags: ["MongoDB"], level: "Beginner", language: "en" },
  { _id: "res_docker", title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", type: "documentation", skillTags: ["Docker"], level: "Beginner", language: "en" },
  { _id: "res_react", title: "React Documentation", url: "https://react.dev/learn", type: "documentation", skillTags: ["React"], level: "Beginner", language: "en" },
  { _id: "res_testing", title: "Testing JavaScript", url: "https://testingjavascript.com/", type: "course", skillTags: ["Testing"], level: "Intermediate", language: "en" },
  { _id: "res_linux", title: "Linux Journey", url: "https://linuxjourney.com/", type: "course", skillTags: ["Linux Basics"], level: "Beginner", language: "en" },
  { _id: "res_sql", title: "SQLBolt", url: "https://sqlbolt.com/", type: "practice", skillTags: ["SQL"], level: "Beginner", language: "en" },
  { _id: "res_python", title: "Python Tutorial", url: "https://docs.python.org/3/tutorial/", type: "documentation", skillTags: ["Python"], level: "Beginner", language: "en" },
  { _id: "res_k8s", title: "Kubernetes Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", type: "documentation", skillTags: ["Kubernetes"], level: "Intermediate", language: "en" },
  { _id: "res_a11y", title: "Web Accessibility by W3C", url: "https://www.w3.org/WAI/fundamentals/", type: "documentation", skillTags: ["Accessibility"], level: "Beginner", language: "en" },
  { _id: "res_playwright", title: "Playwright Documentation", url: "https://playwright.dev/docs/intro", type: "documentation", skillTags: ["Playwright", "Testing"], level: "Intermediate", language: "en" },
  { _id: "res_owasp_top10", title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "documentation", skillTags: ["OWASP Top 10", "Security Basics"], level: "Intermediate", language: "en" },
  { _id: "res_openapi", title: "OpenAPI Specification", url: "https://spec.openapis.org/oas/latest.html", type: "documentation", skillTags: ["OpenAPI", "API Design"], level: "Intermediate", language: "en" },
  { _id: "res_graphql", title: "GraphQL Learn", url: "https://graphql.org/learn/", type: "documentation", skillTags: ["GraphQL", "API Design"], level: "Intermediate", language: "en" },
  { _id: "res_google_ml", title: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", type: "course", skillTags: ["Machine Learning", "Model Evaluation"], level: "Intermediate", language: "en" },
  { _id: "res_android", title: "Android Developers: Kotlin Basics", url: "https://developer.android.com/kotlin", type: "documentation", skillTags: ["Kotlin", "Mobile UX"], level: "Beginner", language: "en" },
  { _id: "res_swiftui", title: "Apple SwiftUI Tutorials", url: "https://developer.apple.com/tutorials/swiftui", type: "documentation", skillTags: ["Swift & SwiftUI", "Mobile UX"], level: "Beginner", language: "en" },
  { _id: "res_react_native", title: "React Native Documentation", url: "https://reactnative.dev/docs/getting-started", type: "documentation", skillTags: ["React Native", "Mobile UX"], level: "Beginner", language: "en" },
  { _id: "res_terraform", title: "Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", type: "documentation", skillTags: ["Terraform", "Cloud Basics"], level: "Intermediate", language: "en" }
] as const;

export const projects = [
  { _id: "proj_api_tasks", title: "Production-grade task API", description: "Design an Express API with JWT, MongoDB indexes, validation, tests, and Dockerized deployment.", skillTags: ["Express", "REST APIs", "MongoDB", "Authentication", "Testing"], level: "Intermediate", estimatedHours: 16 },
  { _id: "proj_react_dashboard", title: "Career dashboard in React", description: "Build a data-driven dashboard with loading/error states, accessible controls, and API integration.", skillTags: ["React", "API Integration", "State Management", "Accessibility"], level: "Beginner", estimatedHours: 14 },
  { _id: "proj_docker_deploy", title: "Docker Compose deployment lab", description: "Containerize an API, database, cache, and admin UI with healthchecks and environment configuration.", skillTags: ["Docker", "Linux Basics", "CI/CD"], level: "Intermediate", estimatedHours: 10 },
  { _id: "proj_pipeline_data", title: "Reliable ETL pipeline", description: "Extract, validate, transform, and load data with idempotent runs and basic quality checks.", skillTags: ["Python", "SQL", "ETL", "Data Modeling"], level: "Intermediate", estimatedHours: 18 },
  { _id: "proj_ci_cd", title: "CI/CD release pipeline", description: "Configure automated tests, build artifacts, deployment steps, and rollback notes.", skillTags: ["CI/CD", "Docker", "Git"], level: "Intermediate", estimatedHours: 12 },
  { _id: "proj_full_stack_portfolio", title: "Full-stack portfolio tracker", description: "Ship a React and Node.js app with auth, MongoDB persistence, tests, Docker, and a deployment checklist.", skillTags: ["React", "Node.js", "REST APIs", "MongoDB", "Deployment"], level: "Intermediate", estimatedHours: 22 },
  { _id: "proj_qa_release_suite", title: "Automated release confidence suite", description: "Build Playwright and API tests for auth, onboarding, and roadmap generation with CI reporting.", skillTags: ["Playwright", "API Testing", "CI/CD", "Bug Reporting"], level: "Intermediate", estimatedHours: 14 },
  { _id: "proj_api_contract_gateway", title: "API contract and gateway lab", description: "Design an OpenAPI-first service with auth, rate limits, docs, error format, tracing, and contract tests.", skillTags: ["API Design", "OpenAPI", "Rate Limiting", "Observability", "Testing"], level: "Advanced", estimatedHours: 18 },
  { _id: "proj_security_incident_lab", title: "Web security incident lab", description: "Threat-model a vulnerable app, identify OWASP risks, collect logs, and write an incident report.", skillTags: ["Threat Modeling", "OWASP Top 10", "SIEM", "Incident Response"], level: "Intermediate", estimatedHours: 16 },
  { _id: "proj_ml_service", title: "Monitored ML prediction service", description: "Train a small model, expose predictions through an API, containerize it, and monitor latency and drift signals.", skillTags: ["Machine Learning", "Model Evaluation", "APIs", "Docker", "Monitoring"], level: "Advanced", estimatedHours: 24 },
  { _id: "proj_mobile_offline_app", title: "Offline-capable mobile learning app", description: "Build a mobile client with API sync, local drafts, validation states, tests, and a release checklist.", skillTags: ["Mobile UX", "API Integration", "Local Storage", "Testing", "Release Management"], level: "Intermediate", estimatedHours: 20 },
  { _id: "proj_cloud_foundation", title: "Cloud foundation module", description: "Provision a secure cloud network with IAM, containers, monitoring, budget tags, and Terraform review notes.", skillTags: ["Cloud Basics", "IAM", "Networking", "Terraform", "Cost Management"], level: "Advanced", estimatedHours: 20 }
] as const;
