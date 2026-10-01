import type { ReactNode } from "react";
import { ArrowRight, BookOpen, Bot, Database, FileText, Github, Monitor, Quote } from "@/components/icons";
import { Screenshot, type SlotName } from "@/components/Screenshot";
import { ButtonLink, CheckList, CodeBlock, Eyebrow, SectionHeading, Strong, TextLink } from "@/components/ui";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <RunItYourself />
      <ProjectStatus />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-brand-border bg-[radial-gradient(60rem_30rem_at_15%_-10%,var(--grounded-primary-subtle),transparent_70%)]"
    >
      <div className="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:py-24">
        <div>
          <a
            href={site.releaseNotesUrl}
            className="inline-flex items-center gap-2 rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-brand-muted shadow-brand-1 hover:text-brand-text"
          >
            <span className="rounded-full bg-brand-primary-subtle px-2 py-0.5 text-brand-primary-subtle-text">{site.version}</span>
            <span>Open source, MIT licensed</span>
            <ArrowRight className="size-3.5" />
          </a>
          <h1 id="hero-title" className="mt-6 text-4xl font-semibold tracking-tight text-brand-text sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Agents that answer only from your sources, with citations
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
            Grounded is a self-hosted, open-source platform where teams turn their documents and websites into
            knowledge bases and publish agents that answer only from them, with citations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.docsUrl}>
              <BookOpen className="size-4" />
              Read the docs
            </ButtonLink>
            <ButtonLink href={site.repoUrl} variant="secondary">
              <Github className="size-4" />
              View on GitHub
            </ButtonLink>
            <ButtonLink href={site.demoUrl} variant="ghost">
              <Monitor className="size-4" />
              See it running
            </ButtonLink>
          </div>
          <p className="mt-4 max-w-xl text-sm text-brand-subtle">
            &ldquo;See it running&rdquo; opens a public agent on the maintainer&apos;s instance: ask it anything,
            no sign-in needed. To run Grounded yourself, <TextLink href="#run-it-yourself">start the local demo</TextLink>.
          </p>
        </div>
        <Screenshot slot="chat-answer-with-claims" priority caption={false} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------- How it works */

const steps: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <FileText className="size-5" />,
    title: "Sources",
    body: "Upload PDF, DOCX, PPTX, HTML, Markdown and text files, or crawl a website. The crawler follows sitemaps and robots.txt, re-syncs on a schedule and stays inside an admin allowlist.",
  },
  {
    icon: <Database className="size-5" />,
    title: "Knowledge bases",
    body: "Sources become passages, searched with hybrid vector and keyword retrieval. Text repeated across a site, such as navigation and footers, is left out of search.",
  },
  {
    icon: <Bot className="size-5" />,
    title: "Agents",
    body: "An agent answers from one or more knowledge bases. Drafts are published as immutable versions, for the team, for everyone who signs in, or for the public.",
  },
  {
    icon: <Quote className="size-5" />,
    title: "Answers you can check",
    body: "Every answer cites the passages it used. With an optional SystemOne model, each claim is checked against its source.",
  },
];

function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="how-it-works" eyebrow="How it works" title="From sources to answers you can check">
          <p>
            One install serves many teams. Each team brings its own sources and publishes its own agents; platform
            admins set the rules for all of them.
          </p>
        </SectionHeading>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative rounded-card bg-brand-surface p-6 shadow-brand-1">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-brand-primary-subtle text-brand-primary-subtle-text">
                  {step.icon}
                </span>
                <span className="font-mono text-xs text-brand-subtle">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-14 max-w-5xl">
          <Screenshot slot="agent-build" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Features */

function Feature({
  id,
  eyebrow,
  title,
  lead,
  bullets,
  media,
  note,
  reverse = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  bullets: ReactNode[];
  media: ReactNode;
  note?: ReactNode;
  reverse?: boolean;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-brand-border py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h3 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-brand-text sm:text-3xl">
            {title}
          </h3>
          <div className="mt-4 text-lg leading-relaxed text-brand-muted">{lead}</div>
          <CheckList items={bullets} />
          {note ? (
            <p className="mt-6 rounded-md border-l-2 border-brand-border-strong bg-brand-surface-sunken px-4 py-3 text-sm text-brand-muted">
              {note}
            </p>
          ) : null}
        </div>
        <div className={`min-w-0 space-y-8 ${reverse ? "lg:order-1" : ""}`}>{media}</div>
      </div>
    </section>
  );
}

function Shots({ slots }: { slots: SlotName[] }) {
  return (
    <>
      {slots.map((slot) => (
        <Screenshot key={slot} slot={slot} />
      ))}
    </>
  );
}

const verdicts = [
  {
    label: "Supported",
    tone: "bg-brand-success-subtle text-brand-success-text",
    body: "At least one of the sources the sentence cites backs it.",
  },
  {
    label: "Not supported",
    tone: "bg-brand-danger-subtle text-brand-danger-text",
    body: "The cited sources don't back the sentence.",
  },
  {
    label: "Uncited",
    tone: "bg-brand-warning-subtle text-brand-warning-text",
    body: "A factual sentence that cites nothing.",
  },
];

function VerdictCard() {
  return (
    <div className="rounded-card bg-brand-surface p-6 shadow-brand-2">
      <p className="text-sm font-semibold text-brand-text">Each factual sentence gets one verdict</p>
      <dl className="mt-4 space-y-4">
        {verdicts.map((v) => (
          <div key={v.label} className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:items-baseline">
            <dt>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${v.tone}`}>{v.label}</span>
            </dt>
            <dd className="text-sm text-brand-muted">{v.body}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 border-t border-brand-border pt-4 text-sm text-brand-muted">
        The answer shows a one-line summary above its sources, for example{" "}
        <q className="font-medium text-brand-text">9 of 10 claims supported</q>. Evaluations count the same claims, so chat and
        test results agree.
      </p>
    </div>
  );
}

const apiExample = `curl https://grounded.example.org/v1/chat/completions \\
  -H "Authorization: Bearer $GROUNDED_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "agent:help-desk/it-help",
    "messages": [{"role": "user", "content": "How do I reset my password?"}]
  }'`;

const kustomizeExample = `# kustomization.yaml in your own overlay repository
resources:
  - https://github.com/ncecere/grounded//deploy/kubernetes/base?ref=v0.3.0
images:
  - name: ghcr.io/ncecere/grounded
    digest: sha256:<digest from the release notes>`;

const mcpExample = `{
  "mcpServers": {
    "grounded": {
      "type": "http",
      "url": "https://grounded.example.edu/mcp",
      "headers": { "Authorization": "Bearer \${GROUNDED_API_KEY}" }
    }
  }
}`;

const cosignExample = `cosign verify ghcr.io/ncecere/grounded@sha256:<digest> \\
  --certificate-identity-regexp '^https://github.com/ncecere/grounded/\\.github/workflows/' \\
  --certificate-oidc-issuer https://token.actions.githubusercontent.com`;

function Features() {
  return (
    <div id="features" className="scroll-mt-16">
      <section aria-labelledby="features-title" className="border-t border-brand-border bg-brand-surface py-16">
        <div className="container-page">
          <SectionHeading id="features-title" eyebrow="Features" title="What you get in one install">
            <p>
              Answers people can verify, tests that catch regressions, and the controls a platform team needs to run
              it for many teams. Everything below is in {site.version}; optional features stay off until an admin
              turns them on.
            </p>
          </SectionHeading>
        </div>
      </section>

      <Feature
        id="feature-answers"
        eyebrow="Grounded answers"
        title="Numbered citations, and a verdict for every claim"
        lead={
          <p>
            Answers stream into the chat with numbered citation chips. A chip opens the claim it supports and the
            passage behind it, and <q>Show source</q> jumps to the passage. New in v0.3.0: answers start sooner, and
            until the first words the chat says what the agent is doing, such as searching its knowledge or checking the
            passages.
          </p>
        }
        bullets={[
          <>
            <Strong>Strict grounding</Strong> is on by default: when the sources have nothing relevant, the agent gives
            the team&apos;s refusal message instead of guessing.
          </>,
          <>
            <Strong>Per-claim verification:</Strong> with SystemOne citation checks on, each factual sentence of an
            answer is a claim with one verdict. The OpenAI-compatible API returns the same <code>claims[]</code>.
          </>,
          <>
            SystemOne can also <Strong>re-rank passages</Strong>, drop prompt injections and spot questions outside an
            agent&apos;s scope.
          </>,
          <>Conversations are private to the person who had them, who can export or delete them.</>,
        ]}
        note={
          <>
            SystemOne is optional: it needs a model service that answers <code>POST /v1/systemone</code>. Without
            one, answers still cite their passages, but claims aren&apos;t checked one by one.
          </>
        }
        media={<VerdictCard />}
      />

      <Feature
        id="feature-evaluations"
        eyebrow="Evaluations"
        title="Catch regressions after every change"
        reverse
        lead={
          <p>
            An evaluation set is a list of test questions, each with the documents a good result finds and, for
            answers, phrases it must mention. Run it after you change a source, an agent or a model, and see what got
            worse and what came back instead.
          </p>
        }
        bullets={[
          <>
            A <Strong>retrieval check</Strong> (recall@k and MRR, nearly free) or a <Strong>full-answer check</Strong>:
            cites an expected document, mentions the phrases, doesn&apos;t refuse wrongly, and with SystemOne on, the
            share of supported claims.
          </>,
          <>
            Write questions, import them from CSV or ragbench&apos;s JSONL, or add them from your own conversations
            and the agent&apos;s Try it panel.
          </>,
          <>
            Sets can run after a publish, after an embedding-profile switch, or nightly when documents changed. A
            drop notifies the team&apos;s editors.
          </>,
          <>
            The team Overview shows each set&apos;s latest score and trend, and the Evaluations page filters to
            regressions.
          </>,
        ]}
        note={<>Evaluations test retrieval and answers, not an agent&apos;s tools beyond knowledge-base search.</>}
        media={<Shots slots={["evaluations-runs", "team-overview-quality-and-spend"]} />}
      />

      <Feature
        id="feature-governance"
        eyebrow="Governance"
        title="Controls a platform team can stand behind"
        lead={
          <p>
            Platform admins set the rules for every team, and by default they can&apos;t read team content. The admin
            Overview shows which optional features are on, with a link to where each is set.
          </p>
        }
        bullets={[
          <>
            <Strong>Classification levels</Strong> (Open, Sensitive and Restricted by default, configurable) decide
            which models may process data and which audiences an agent may have. They&apos;re checked on every change
            and again on every query.
          </>,
          <>
            <Strong>Moderation</Strong> is required for public agents and fails closed. Use a{" "}
            <code>/moderations</code> endpoint, a guardrail model, a chat model as a classifier, or a SystemOne model.
          </>,
          <>
            <Strong>Retention and legal holds:</Strong> periods are configurable per kind of record, a dry run shows
            what a run would delete, and legal holds keep what they cover.
          </>,
          <>
            <Strong>Break-glass:</Strong> time-boxed, read-only access to one team&apos;s conversations or documents,
            with a written reason and, if the install requires it, a second admin&apos;s approval. Every read is
            audited and the team&apos;s owners are told.
          </>,
          <>
            An <Strong>audit log</Strong> of every change, and an access log. Team analytics never contain message
            content.
          </>,
        ]}
        media={<Shots slots={["admin-overview-features"]} />}
      />

      <Feature
        id="feature-costs"
        eyebrow="Costs and budgets"
        title="See what each team spends, and cap it"
        reverse
        lead={
          <p>
            Cost tracking is off by default. Admins enter dated prices per model and unit, then choose how strict to
            be.
          </p>
        }
        bullets={[
          <>
            <Strong>Track only:</Strong> spend per team, agent and model, with a daily chart and CSV export.
          </>,
          <>
            <Strong>Enforce:</Strong> monthly team budgets with a warning at 80%. At 100%, the team&apos;s chats,
            searches and ingestion pause until an admin raises the budget, grants an extension, or the month ends.
          </>,
          <>Teams can override the platform&apos;s mode, so one team can pilot Enforce first.</>,
          <>Team owners and admins see their spend on the team Overview; members only see the banner.</>,
        ]}
        note={<>Budgets are checked with a short cache, so a team can overshoot by about 30 seconds of use.</>}
        media={<Shots slots={["costs-overview"]} />}
      />

      <section aria-labelledby="feature-ocr-sso" className="border-t border-brand-border py-20 sm:py-24">
        <div className="container-page">
          <h3 id="feature-ocr-sso" className="sr-only">
            OCR and SSO groups
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <MiniFeature
              id="feature-ocr"
              eyebrow="OCR"
              title="Read scanned documents"
              body={
                <>
                  <p>
                    Off by default. <Strong>Admin → Parsing &amp; OCR</Strong> turns on one backend: the Tesseract
                    sidecar image <code>ghcr.io/ncecere/grounded-ocr</code>, Apache Tika&apos;s <code>-full</code>{" "}
                    image, or a vision model.
                  </p>
                  <p>
                    Only pages without a text layer are read, and PNG, JPEG and single-page TIFF uploads become
                    one-page documents. OCR is bounded per document, per worker and per team per day, and can be
                    turned off per source.
                  </p>
                </>
              }
              slot="admin-parsing-ocr"
            />
            <MiniFeature
              id="feature-sso"
              eyebrow="SSO groups"
              title="Team membership from your identity provider"
              body={
                <>
                  <p>
                    <Strong>Admin → SSO groups</Strong> maps an identity-provider group to a team role. At each
                    sign-in, memberships a rule created are added, raised, lowered or removed.
                  </p>
                  <p>
                    Memberships made by hand or by invite are never touched, a rule never removes a team&apos;s last
                    owner, and every rule shows a dry run before it&apos;s saved. Sign-in is OIDC.
                  </p>
                </>
              }
              slot="admin-sso-groups"
            />
          </div>
        </div>
      </section>

      <Feature
        id="feature-channels"
        eyebrow="Channels"
        title="Web chat, an embeddable widget, or any OpenAI client"
        lead={<p>Publish an agent once and use it wherever people already are.</p>}
        bullets={[
          <>
            <Strong>Web chat</Strong> in the Grounded UI, with conversation history, feedback on answers, and a
            directory of agents published to everyone who signs in.
          </>,
          <>
            An <Strong>embeddable widget</Strong> (an iframe) with publishable keys, allowed origins and optional
            CAPTCHA, plus public agent pages.
          </>,
          <>
            An <Strong>OpenAI-compatible API:</Strong> each agent is a model named{" "}
            <code>agent:{"{team}"}/{"{agent}"}</code> on <code>POST /v1/chat/completions</code>, with citations in the
            response.
          </>,
          <>
            <Strong>AI tools</Strong> such as coding agents and desktop assistants, over MCP (below).
          </>,
          <>
            Public agents get per-IP and per-session rate limits, daily query and token caps, a platform-wide switch
            and a kill switch.
          </>,
        ]}
        media={
          <>
            <Screenshot slot="agent-share" />
            <CodeBlock label="Ask an agent from any OpenAI-compatible client">{apiExample}</CodeBlock>
          </>
        }
      />


      <Feature
        id="feature-mcp"
        eyebrow="MCP"
        title="MCP both ways: AI tools use Grounded, and agents call approved tools"
        reverse
        lead={
          <p>
            New in v0.3.0: Grounded speaks the Model Context Protocol in both directions. Both are off until a platform
            admin turns them on.
          </p>
        }
        bullets={[
          <>
            <Strong>Use Grounded from AI tools:</Strong> coding agents, desktop assistants and other MCP clients search
            knowledge bases and ask agents at <code>/mcp</code>, with an API key that has the MCP scope. Answers come
            back with citations and claim verdicts, under the same classification, limits, budgets and audit log as the
            API.
          </>,
          <>
            <Strong>OAuth sign-in</Strong> (experimental): a person can connect a tool by signing in and approving it,
            instead of pasting a key, and disconnect it later.
          </>,
          <>
            <Strong>Agents call approved tools:</Strong> platform admins register remote MCP servers, read and approve
            each tool, and set the most sensitive data each server may receive. Editors pick approved tools for an
            agent.
          </>,
          <>
            <Strong>Tool results are sources:</Strong> a result is treated as untrusted data and cited like a passage,
            so claim checks cover it too. Every call is bounded, metered and audited.
          </>,
        ]}
        note={
          <>
            OAuth sign-in is experimental and may change. Agents reach outside MCP servers over https with a static
            header; OAuth to outside servers isn&apos;t supported yet.
          </>
        }
        media={
          <>
            <Screenshot slot="mcp-tool-source" />
            <CodeBlock label="Connect an MCP client to Grounded">{mcpExample}</CodeBlock>
          </>
        }
      />

      <section aria-labelledby="feature-health-tracing" className="border-t border-brand-border py-20 sm:py-24">
        <div className="container-page">
          <h3 id="feature-health-tracing" className="sr-only">
            Stored health and tracing
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            <MiniFeature
              id="feature-health"
              eyebrow="Stored health"
              title={"Know what's failing, and since when"}
              body={
                <>
                  <p>
                    Every <Strong>Test</Strong> button stores its result, and the worker re-tests enabled connections,
                    models and MCP servers every 15 minutes. The scheduled check costs nothing: it reads model and tool
                    lists and never sends a prompt.
                  </p>
                  <p>
                    Admin lists show <q>Healthy · 3 minutes ago</q> or <q>Failing · since 2 hours ago</q>, failures
                    appear under Needs attention on the admin Overview, and an alert fires after 30 minutes.
                  </p>
                </>
              }
              slot="health-connections"
            />
            <MiniFeature
              id="feature-tracing"
              eyebrow="Tracing"
              title="Follow one answer from request to model call"
              body={
                <>
                  <p>
                    Set <code>OTEL_EXPORTER_OTLP_ENDPOINT</code> and Grounded sends OpenTelemetry traces to Tempo,
                    Jaeger or a collector. One answer is one trace across HTTP, retrieval, model calls, SystemOne
                    checks, MCP tool calls and background jobs.
                  </p>
                  <p>
                    Spans hold IDs, names, counts and timings, never questions, answers, passages or tool data. Off
                    unless configured.
                  </p>
                </>
              }
              slot="tracing-trace"
            />
          </div>
        </div>
      </section>

      <Feature
        id="feature-kubernetes"
        eyebrow="Operations"
        title="Built for Kubernetes"
        lead={
          <p>
            Grounded is one Go binary with the React UI embedded, run as an API and a worker. PostgreSQL with pgvector
            is the system of record, next to Valkey and S3-compatible storage.
          </p>
        }
        bullets={[
          <>
            A <Strong>Kustomize base</Strong> with probes, PodDisruptionBudgets, restricted security contexts and
            default-deny NetworkPolicies, optional components (Postgres or CloudNativePG, Valkey, backups, Ingress,
            Tika, OCR, monitoring, tracing) and two example overlays.
          </>,
          <>
            <Strong>Signed images:</Strong> multi-arch (amd64 and arm64), distroless and non-root, built only in CI,
            scanned with Trivy, signed keylessly with cosign, with SBOM and provenance attestations.
          </>,
          <>
            <Strong>Zero-downtime upgrades</Strong> with expand/contract migrations, checked by an upgrade test in CI.
            Encryption keys rotate without downtime too.
          </>,
          <>
            <Strong>Observability:</Strong> Prometheus metrics, five Grafana dashboards, 24 alerts with runbooks and
            SLO burn-rate rules, and optional OpenTelemetry traces. <code>grounded doctor</code> checks the
            configuration and every dependency.
          </>,
        ]}
        media={
          <>
            <CodeBlock label="Reference the base at a release tag">{kustomizeExample}</CodeBlock>
            <CodeBlock label="Check the image was signed by the project's workflows">{cosignExample}</CodeBlock>
          </>
        }
      />
    </div>
  );
}

function MiniFeature({
  id,
  eyebrow,
  title,
  body,
  slot,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  slot: SlotName;
}) {
  return (
    <article aria-labelledby={id} className="flex min-w-0 flex-col rounded-card bg-brand-surface p-6 shadow-brand-1 sm:p-8">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h4 id={id} className="mt-2 text-xl font-semibold tracking-tight text-brand-text sm:text-2xl">
        {title}
      </h4>
      <div className="mt-4 space-y-3 leading-relaxed text-brand-muted">{body}</div>
      <div className="mt-8">
        <Screenshot slot={slot} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------ Run it yourself */

const demoCommands = `git clone https://github.com/ncecere/grounded.git
cd grounded
docker compose -f compose.demo.yaml up --build     # or: make demo`;

const requirements = [
  "Kubernetes 1.30 or later",
  "PostgreSQL 17 with pgvector 0.8 or later",
  "Valkey or Redis 7 or later",
  "S3-compatible object storage",
  "An OIDC identity provider",
  "An OpenAI-compatible model gateway (LiteLLM, vLLM, SGLang or a hosted API)",
];

function RunItYourself() {
  return (
    <section aria-labelledby="run-it-yourself" className="border-t border-brand-border bg-brand-surface py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="run-it-yourself" eyebrow="Run it yourself" title="Try it in five minutes">
          <p>All you need is Docker. No model keys are required.</p>
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <CodeBlock label="Start the local demo">{demoCommands}</CodeBlock>
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-brand-muted marker:text-brand-subtle">
              <li>
                The first start builds the image, seeds a <Strong>Demo</Strong> team and crawls about 100 pages of the
                Go documentation, which takes about two minutes.
              </li>
              <li>
                Open <code>http://localhost:8080</code>, sign in as <Strong>Dev Platform Admin</Strong>, and ask the{" "}
                <Strong>Go docs assistant</Strong> one of its starter questions.
              </li>
            </ol>
            <p className="mt-6 rounded-md border-l-2 border-brand-border-strong bg-brand-surface-sunken px-4 py-3 text-sm text-brand-muted">
              The demo&apos;s answers come from a fake model built into the binary: it quotes the best-matching
              passages and isn&apos;t a language model. Retrieval, citations and the UI are real, and you can point it
              at a real gateway. It uses development sign-in and example keys, so keep it on your machine.{" "}
              <TextLink href={site.demoDocUrl}>What the demo creates</TextLink>
            </p>
          </div>
          <div className="rounded-card bg-brand-bg p-6 shadow-brand-1 sm:p-8">
            <h3 className="text-lg font-semibold text-brand-text">Running it for real</h3>
            <p className="mt-2 text-sm text-brand-muted">
              Grounded runs on Kubernetes. Your install keeps its own overlay in its own repository and needs:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-brand-muted">
              {requirements.map((r) => (
                <li key={r} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.docsUrl}>
                Self-hosting docs
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href={site.kubernetesGuideUrl} variant="secondary">
                Kubernetes guide on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Project status */

function ProjectStatus() {
  return (
    <section aria-labelledby="project-status" className="border-t border-brand-border py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="project-status" eyebrow="Project status" title="Where Grounded is today">
          <p>Grounded is young. Here is what that means before you depend on it.</p>
        </SectionHeading>
        <dl className="mt-10 grid gap-4 md:grid-cols-3">
          <StatusCard title="Pre-1.0, one maintainer">
            The whole design is built and tested, but it hasn&apos;t had long production use yet, and one person
            maintains it. Issues and contributions are welcome.
          </StatusCard>
          <StatusCard title="What should stay stable">
            Through 0.x: the OpenAI-compatible chat endpoint, the widget embed, the environment variables and the
            Kubernetes resource names that overlays patch. The native REST API, metric names and the UI may change
            between minor releases.
          </StatusCard>
          <StatusCard title="Upgrades">
            Forward-only and without downtime. Take a backup first; going back means restoring it. Each release&apos;s
            notes list its known limitations.
          </StatusCard>
        </dl>
        <p className="mt-8 text-brand-muted">
          Read the <TextLink href={site.releaseNotesUrl}>{site.version} release notes</TextLink> and the{" "}
          <TextLink href={site.roadmapUrl}>roadmap</TextLink>.
        </p>
      </div>
    </section>
  );
}

function StatusCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-card bg-brand-surface p-6 shadow-brand-1">
      <dt className="font-semibold text-brand-text">{title}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-brand-muted">{children}</dd>
    </div>
  );
}
