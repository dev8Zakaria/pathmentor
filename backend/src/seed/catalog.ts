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
  ["Data Warehousing", "SQL"]
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
  { _id: "res_a11y", title: "Web Accessibility by W3C", url: "https://www.w3.org/WAI/fundamentals/", type: "documentation", skillTags: ["Accessibility"], level: "Beginner", language: "en" }
] as const;

export const projects = [
  { _id: "proj_api_tasks", title: "Production-grade task API", description: "Design an Express API with JWT, MongoDB indexes, validation, tests, and Dockerized deployment.", skillTags: ["Express", "REST APIs", "MongoDB", "Authentication", "Testing"], level: "Intermediate", estimatedHours: 16 },
  { _id: "proj_react_dashboard", title: "Career dashboard in React", description: "Build a data-driven dashboard with loading/error states, accessible controls, and API integration.", skillTags: ["React", "API Integration", "State Management", "Accessibility"], level: "Beginner", estimatedHours: 14 },
  { _id: "proj_docker_deploy", title: "Docker Compose deployment lab", description: "Containerize an API, database, cache, and admin UI with healthchecks and environment configuration.", skillTags: ["Docker", "Linux Basics", "CI/CD"], level: "Intermediate", estimatedHours: 10 },
  { _id: "proj_pipeline_data", title: "Reliable ETL pipeline", description: "Extract, validate, transform, and load data with idempotent runs and basic quality checks.", skillTags: ["Python", "SQL", "ETL", "Data Modeling"], level: "Intermediate", estimatedHours: 18 },
  { _id: "proj_ci_cd", title: "CI/CD release pipeline", description: "Configure automated tests, build artifacts, deployment steps, and rollback notes.", skillTags: ["CI/CD", "Docker", "Git"], level: "Intermediate", estimatedHours: 12 }
] as const;
